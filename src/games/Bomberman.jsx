import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

// ---------- Configuração ----------
const COLS = 15
const ROWS = 11
const TILE = 32
const EMPTY = 0
const WALL = 1
const BRICK = 2
const BOMB_FUSE = 2200 // ms até explodir
const FLAME_TIME = 450 // ms que o fogo fica na tela
const PLAYER_STEP = 140 // ms por casa
const ENEMY_STEP = 480
const ENEMY_COUNT = 4

const DIRS = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
}
const KEY_TO_DIR = {
  ArrowUp: 'up', w: 'up', W: 'up',
  ArrowDown: 'down', s: 'down', S: 'down',
  ArrowLeft: 'left', a: 'left', A: 'left',
  ArrowRight: 'right', d: 'right', D: 'right',
}

const COLORS = {
  floor: '#18181b',
  floorAlt: '#1c1c20',
  wall: '#3f3f46',
  wallLight: '#52525b',
  brick: '#9a3412',
  brickLine: '#7c2d12',
  player: '#f4f4f5',
  accent: '#22c55e',
  enemy: '#ef4444',
  bomb: '#09090b',
  flame: '#f97316',
  flameCore: '#fde047',
}

// ---------- Lógica do jogo (sem React) ----------
const key = (x, y) => `${x},${y}`
const isSpawnArea = (x, y) => (y === 1 && x <= 3) || (x === 1 && y <= 3)

function createActor(x, y, extra = {}) {
  return { x, y, fromX: x, fromY: y, moveStart: 0, ...extra }
}

function newGame() {
  const grid = []
  const hidden = new Map() // power-ups escondidos debaixo dos tijolos
  for (let y = 0; y < ROWS; y++) {
    const row = []
    for (let x = 0; x < COLS; x++) {
      const border = x === 0 || y === 0 || x === COLS - 1 || y === ROWS - 1
      if (border || (x % 2 === 0 && y % 2 === 0)) row.push(WALL)
      else if (isSpawnArea(x, y)) row.push(EMPTY)
      else if (Math.random() < 0.5) {
        row.push(BRICK)
        if (Math.random() < 0.18) hidden.set(key(x, y), Math.random() < 0.5 ? 'bomb' : 'fire')
      } else row.push(EMPTY)
    }
    grid.push(row)
  }

  // Inimigos começam longe do jogador
  const free = []
  for (let y = 1; y < ROWS - 1; y++)
    for (let x = 1; x < COLS - 1; x++) if (grid[y][x] === EMPTY && x + y >= 10) free.push([x, y])
  const enemies = []
  while (enemies.length < ENEMY_COUNT && free.length) {
    const [x, y] = free.splice(Math.floor(Math.random() * free.length), 1)[0]
    enemies.push(createActor(x, y, { dir: Object.keys(DIRS)[Math.floor(Math.random() * 4)], lastStep: 0 }))
  }

  return {
    grid,
    hidden,
    items: new Map(),
    player: createActor(1, 1, { lastStep: 0, maxBombs: 1, range: 2 }),
    enemies,
    bombs: [],
    flames: [],
    score: 0,
    status: 'playing',
    queued: null,
  }
}

const bombAt = (g, x, y) => g.bombs.find((b) => b.x === x && b.y === y)
const walkable = (g, x, y) => g.grid[y]?.[x] === EMPTY && !bombAt(g, x, y)

function moveActor(actor, x, y, now) {
  actor.fromX = actor.x
  actor.fromY = actor.y
  actor.x = x
  actor.y = y
  actor.moveStart = now
}

function placeBomb(g, now) {
  const p = g.player
  if (g.status !== 'playing') return
  if (g.bombs.length >= p.maxBombs || bombAt(g, p.x, p.y)) return
  g.bombs.push({ x: p.x, y: p.y, placed: now, range: p.range })
}

function explode(g, bomb, now) {
  g.bombs = g.bombs.filter((b) => b !== bomb)
  const cells = [[bomb.x, bomb.y]]
  for (const [dx, dy] of Object.values(DIRS)) {
    for (let i = 1; i <= bomb.range; i++) {
      const x = bomb.x + dx * i
      const y = bomb.y + dy * i
      const tile = g.grid[y][x]
      if (tile === WALL) break
      cells.push([x, y])
      if (tile === BRICK) {
        g.grid[y][x] = EMPTY
        g.score += 10
        const item = g.hidden.get(key(x, y))
        if (item) g.items.set(key(x, y), item)
        break
      }
      const other = bombAt(g, x, y)
      if (other) other.placed = now - BOMB_FUSE // reação em cadeia
    }
  }
  for (const [x, y] of cells) g.flames.push({ x, y, start: now })
}

function update(g, held, now) {
  if (g.status !== 'playing') return
  const p = g.player

  // Jogador: tecla segurada, ou um toque rápido que ainda não foi processado
  const dir = held[held.length - 1] ?? g.queued
  if (dir && now - p.lastStep >= PLAYER_STEP) {
    g.queued = null
    const [dx, dy] = DIRS[dir]
    if (walkable(g, p.x + dx, p.y + dy)) {
      moveActor(p, p.x + dx, p.y + dy, now)
      p.lastStep = now
    }
  }
  const item = g.items.get(key(p.x, p.y))
  if (item) {
    g.items.delete(key(p.x, p.y))
    if (item === 'bomb') p.maxBombs++
    else p.range++
    g.score += 50
  }

  // Bombas e fogo
  for (const b of [...g.bombs]) if (now - b.placed >= BOMB_FUSE) explode(g, b, now)
  g.flames = g.flames.filter((f) => now - f.start < FLAME_TIME)
  const burning = new Set(g.flames.map((f) => key(f.x, f.y)))

  // Inimigos
  for (const e of g.enemies) {
    if (now - e.lastStep < ENEMY_STEP) continue
    e.lastStep = now
    const options = Object.keys(DIRS).filter((d) => walkable(g, e.x + DIRS[d][0], e.y + DIRS[d][1]))
    if (!options.length) continue
    if (!options.includes(e.dir) || Math.random() < 0.3) e.dir = options[Math.floor(Math.random() * options.length)]
    moveActor(e, e.x + DIRS[e.dir][0], e.y + DIRS[e.dir][1], now)
  }
  const before = g.enemies.length
  g.enemies = g.enemies.filter((e) => !burning.has(key(e.x, e.y)))
  g.score += (before - g.enemies.length) * 100

  // Fim de jogo
  if (burning.has(key(p.x, p.y)) || g.enemies.some((e) => e.x === p.x && e.y === p.y)) g.status = 'lost'
  else if (!g.enemies.length) g.status = 'won'
}

// ---------- Desenho ----------
function position(actor, now, step) {
  const t = Math.min(1, (now - actor.moveStart) / step)
  return [
    (actor.fromX + (actor.x - actor.fromX) * t) * TILE + TILE / 2,
    (actor.fromY + (actor.y - actor.fromY) * t) * TILE + TILE / 2,
  ]
}

function draw(ctx, g, now) {
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const px = x * TILE
      const py = y * TILE
      const tile = g.grid[y][x]
      if (tile === WALL) {
        ctx.fillStyle = COLORS.wall
        ctx.fillRect(px, py, TILE, TILE)
        ctx.fillStyle = COLORS.wallLight
        ctx.fillRect(px + 2, py + 2, TILE - 4, 4)
      } else if (tile === BRICK) {
        ctx.fillStyle = COLORS.brick
        ctx.fillRect(px, py, TILE, TILE)
        ctx.strokeStyle = COLORS.brickLine
        ctx.lineWidth = 2
        ctx.beginPath()
        for (const ly of [TILE / 3, (2 * TILE) / 3]) {
          ctx.moveTo(px, py + ly)
          ctx.lineTo(px + TILE, py + ly)
        }
        ctx.moveTo(px + TILE / 2, py)
        ctx.lineTo(px + TILE / 2, py + TILE / 3)
        ctx.moveTo(px + TILE / 4, py + TILE / 3)
        ctx.lineTo(px + TILE / 4, py + (2 * TILE) / 3)
        ctx.moveTo(px + (3 * TILE) / 4, py + TILE / 3)
        ctx.lineTo(px + (3 * TILE) / 4, py + (2 * TILE) / 3)
        ctx.stroke()
      } else {
        ctx.fillStyle = (x + y) % 2 ? COLORS.floor : COLORS.floorAlt
        ctx.fillRect(px, py, TILE, TILE)
      }
    }
  }

  // Power-ups
  ctx.font = 'bold 14px ui-monospace, monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  for (const [k, type] of g.items) {
    const [x, y] = k.split(',').map(Number)
    ctx.fillStyle = type === 'bomb' ? '#3b82f6' : COLORS.flame
    ctx.fillRect(x * TILE + 6, y * TILE + 6, TILE - 12, TILE - 12)
    ctx.fillStyle = '#fff'
    ctx.fillText(type === 'bomb' ? 'B' : 'F', x * TILE + TILE / 2, y * TILE + TILE / 2 + 1)
  }

  // Bombas (pulsando)
  for (const b of g.bombs) {
    const pulse = 1 + Math.sin(now / 90) * 0.08
    const cx = b.x * TILE + TILE / 2
    const cy = b.y * TILE + TILE / 2
    ctx.fillStyle = COLORS.bomb
    ctx.beginPath()
    ctx.arc(cx, cy + 2, 11 * pulse, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#a1a1aa'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(cx + 5, cy - 7)
    ctx.lineTo(cx + 9, cy - 12)
    ctx.stroke()
    ctx.fillStyle = Math.floor(now / 120) % 2 ? COLORS.flameCore : COLORS.flame
    ctx.beginPath()
    ctx.arc(cx + 10, cy - 13, 3, 0, Math.PI * 2)
    ctx.fill()
  }

  // Fogo
  for (const f of g.flames) {
    const fade = 1 - (now - f.start) / FLAME_TIME
    ctx.globalAlpha = Math.max(0.3, fade)
    ctx.fillStyle = COLORS.flame
    ctx.fillRect(f.x * TILE + 2, f.y * TILE + 2, TILE - 4, TILE - 4)
    ctx.fillStyle = COLORS.flameCore
    ctx.fillRect(f.x * TILE + 9, f.y * TILE + 9, TILE - 18, TILE - 18)
    ctx.globalAlpha = 1
  }

  // Inimigos
  for (const e of g.enemies) {
    const [cx, cy] = position(e, now, ENEMY_STEP)
    ctx.fillStyle = COLORS.enemy
    ctx.beginPath()
    ctx.arc(cx, cy, 12, Math.PI, 0)
    ctx.lineTo(cx + 12, cy + 11)
    ctx.lineTo(cx - 12, cy + 11)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.fillRect(cx - 7, cy - 4, 5, 6)
    ctx.fillRect(cx + 2, cy - 4, 5, 6)
    ctx.fillStyle = '#000'
    ctx.fillRect(cx - 5, cy - 2, 2, 3)
    ctx.fillRect(cx + 4, cy - 2, 2, 3)
  }

  // Jogador
  if (g.status !== 'lost' || Math.floor(now / 150) % 2) {
    const [cx, cy] = position(g.player, now, PLAYER_STEP)
    ctx.fillStyle = COLORS.player
    ctx.beginPath()
    ctx.arc(cx, cy - 2, 11, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = COLORS.accent
    ctx.fillRect(cx - 11, cy - 9, 22, 4)
    ctx.fillStyle = '#18181b'
    ctx.fillRect(cx - 5, cy - 3, 3, 5)
    ctx.fillRect(cx + 2, cy - 3, 3, 5)
    ctx.fillStyle = COLORS.accent
    ctx.fillRect(cx - 8, cy + 8, 6, 4)
    ctx.fillRect(cx + 2, cy + 8, 6, 4)
  }
}

// ---------- Componente ----------
export default function Bomberman({ onClose }) {
  const { t } = useLanguage()
  const gt = t.game
  const canvasRef = useRef(null)
  const game = useRef(newGame())
  const held = useRef([])
  const [hud, setHud] = useState(null)

  const restart = useCallback(() => {
    game.current = newGame()
    held.current = []
  }, [])

  const press = (dir) => {
    game.current.queued = dir
    held.current = [...held.current.filter((d) => d !== dir), dir]
  }
  const release = (dir) => {
    held.current = held.current.filter((d) => d !== dir)
  }

  // Loop do jogo
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    let frame
    let lastHud = ''
    const loop = (now) => {
      const g = game.current
      update(g, held.current, now)
      draw(ctx, g, now)
      const next = {
        score: g.score,
        enemies: g.enemies.length,
        bombs: g.player.maxBombs,
        range: g.player.range,
        status: g.status,
      }
      const serialized = JSON.stringify(next)
      if (serialized !== lastHud) {
        lastHud = serialized
        setHud(next)
      }
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [])

  // Teclado + trava a rolagem da página enquanto joga
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'Escape') return onClose()
      const dir = KEY_TO_DIR[e.key]
      if (dir) {
        e.preventDefault()
        press(dir)
      } else if (e.key === ' ') {
        e.preventDefault()
        if (game.current.status === 'playing') placeBomb(game.current, performance.now())
        else if (!e.repeat) restart()
      }
    }
    const up = (e) => {
      const dir = KEY_TO_DIR[e.key]
      if (dir) release(dir)
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
      document.body.style.overflow = overflow
    }
  }, [onClose, restart])

  const padButton = (dir, label, extra = '') => (
    <button
      key={dir}
      onPointerDown={(e) => {
        e.preventDefault()
        press(dir)
      }}
      onPointerUp={() => release(dir)}
      onPointerLeave={() => release(dir)}
      onPointerCancel={() => release(dir)}
      aria-label={dir}
      className={`flex h-12 w-12 touch-none select-none items-center justify-center rounded-lg bg-zinc-800 text-xl active:bg-zinc-700 ${extra}`}
    >
      {label}
    </button>
  )

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={gt.title}
    >
      <div className="w-full max-w-2xl rounded-xl border border-zinc-800 bg-zinc-950 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-mono text-lg font-bold text-accent">💣 {gt.title}</h2>
          <button onClick={onClose} className="rounded-md border border-zinc-700 px-3 py-1 text-sm hover:border-accent">
            {gt.close}
          </button>
        </div>

        {hud && (
          <div className="mb-3 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-zinc-400">
            <span>{gt.score}: <b className="text-zinc-100">{hud.score}</b></span>
            <span>{gt.enemies}: <b className="text-zinc-100">{hud.enemies}</b></span>
            <span>{gt.bombs}: <b className="text-zinc-100">{hud.bombs}</b></span>
            <span>{gt.range}: <b className="text-zinc-100">{hud.range}</b></span>
          </div>
        )}

        <div className="relative">
          <canvas
            ref={canvasRef}
            width={COLS * TILE}
            height={ROWS * TILE}
            className="block w-full rounded-lg border border-zinc-800"
          />
          {hud && hud.status !== 'playing' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg bg-black/70">
              <p className={`text-3xl font-bold ${hud.status === 'won' ? 'text-accent' : 'text-red-400'}`}>
                {hud.status === 'won' ? gt.won : gt.lost}
              </p>
              <p className="font-mono text-zinc-300">{gt.score}: {hud.score}</p>
              <button
                onClick={restart}
                className="rounded-lg bg-accent px-5 py-2 font-semibold text-zinc-950 hover:brightness-110"
              >
                {gt.restart}
              </button>
            </div>
          )}
        </div>

        <p className="mt-3 hidden text-center text-xs text-zinc-500 sm:block">{gt.controls}</p>

        {/* Controles de toque para celular */}
        <div className="mt-4 flex items-center justify-between sm:hidden">
          <div className="grid grid-cols-3 gap-1">
            <span />
            {padButton('up', '▲')}
            <span />
            {padButton('left', '◀')}
            <span />
            {padButton('right', '▶')}
            <span />
            {padButton('down', '▼')}
            <span />
          </div>
          <button
            onPointerDown={(e) => {
              e.preventDefault()
              placeBomb(game.current, performance.now())
            }}
            className="h-20 w-20 touch-none select-none rounded-full bg-accent text-3xl text-zinc-950 active:brightness-90"
            aria-label="bomb"
          >
            💣
          </button>
        </div>
      </div>
    </div>
  )
}

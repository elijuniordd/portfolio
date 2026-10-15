// Constelação do Cruzeiro do Sul (5 estrelas), como no uniforme do Cruzeiro.
const STARS = [
  { x: 50, y: 10, r: 9 }, // Gacrux (topo)
  { x: 20, y: 44, r: 8 }, // Mimosa (esquerda)
  { x: 80, y: 40, r: 7 }, // Delta Crucis (direita)
  { x: 66, y: 64, r: 4.5 }, // Epsilon Crucis (a pequena)
  { x: 50, y: 90, r: 9 }, // Acrux (base)
]

function starPath({ x, y, r }) {
  const points = []
  for (let i = 0; i < 10; i++) {
    const radius = i % 2 ? r * 0.4 : r
    const angle = (Math.PI / 5) * i - Math.PI / 2
    points.push(`${(x + radius * Math.cos(angle)).toFixed(2)},${(y + radius * Math.sin(angle)).toFixed(2)}`)
  }
  return `M${points.join('L')}Z`
}

export default function CruzeiroStars({ className = '' }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className} fill="currentColor">
      {STARS.map((s) => (
        <path key={`${s.x}-${s.y}`} d={starPath(s)} />
      ))}
    </svg>
  )
}

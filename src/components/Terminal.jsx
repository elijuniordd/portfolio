import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { THEMES, useTheme } from '../theme/ThemeContext'
import WakaStats from './WakaStats'
import profile from '../data/profile'
import projects from '../data/projects'
import experiences from '../data/experiences'
import { resumeFiles } from '../sections/Resume'
import { SELECT_SPECIALTY } from '../sections/Specialties'
import { specialties } from '../data/specialties'

const PROMPT = 'visitante@eli.dev:~$'

// Comando → apelidos aceitos. Os dois primeiros são os exibidos em PT e EN.
const COMMANDS = {
  help: ['ajuda', 'help'],
  about: ['sobre', 'about'],
  projects: ['projetos', 'projects'],
  xp: ['experiencias', 'experience', 'xp', 'experiências'],
  skills: ['habilidades', 'skills', 'stack'],
  salesforce: ['salesforce', 'salesforce', 'sf', 'apex'],
  java: ['java', 'java', 'spring', 'springboot'],
  contact: ['contato', 'contact'],
  wakatime: ['wakatime', 'wakatime', 'time'],
  github: ['github', 'github', 'git'],
  resume: ['curriculo', 'resume', 'cv', 'currículo'],
  bomberman: ['bomberman', 'bomberman', 'jogo', 'game'],
  theme: ['tema', 'theme'],
  clear: ['limpar', 'clear'],
}
const THEME_ARGS = { claro: 'light', light: 'light', escuro: 'dark', dark: 'dark', cruzeiro: 'cruzeiro' }
const ALIASES = Object.entries(COMMANDS).flatMap(([cmd, names]) => names.map((n) => [n, cmd]))
const resolve = (name) => ALIASES.find(([alias]) => alias === name)?.[1]
const SHORTCUTS = { pt: ['ajuda', 'sobre', 'projetos', 'wakatime', 'bomberman'], en: ['help', 'about', 'projects', 'wakatime', 'bomberman'] }

function SectionLink({ id, label }) {
  return (
    <a href={`#${id}`} className="text-accent underline-offset-2 hover:underline">
      → {label}
    </a>
  )
}

function GithubRepos({ loadingLabel }) {
  const [repos, setRepos] = useState(null)
  const [failed, setFailed] = useState(false)
  const user = profile.github.split('/').pop()

  useEffect(() => {
    fetch(`https://api.github.com/users/${user}/repos?sort=pushed&per_page=6`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setRepos)
      .catch(() => setFailed(true))
  }, [user])

  if (failed) return <p className="text-red-400">GitHub API indisponível.</p>
  if (!repos) return <p className="text-zinc-500">{loadingLabel}</p>
  return (
    <ul>
      {repos.map((r) => (
        <li key={r.id}>
          <a href={r.html_url} target="_blank" rel="noreferrer" className="text-link hover:underline">
            {r.name}
          </a>
          {r.language && <span className="text-zinc-500"> · {r.language}</span>}
        </li>
      ))}
    </ul>
  )
}

export default function Terminal({ onPlay }) {
  const { lang, t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const tt = t.terminal
  const [lines, setLines] = useState([])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)
  const nextId = useRef(0)

  const welcome = () => [
    { id: nextId.current++, node: <p className="text-accent">{tt.welcome}</p> },
    { id: nextId.current++, node: <p className="text-zinc-400">{tt.hint}</p> },
  ]

  // Reinicia o terminal quando troca o idioma
  useEffect(() => {
    setLines(welcome())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [lines])

  function output(cmd, arg) {
    switch (cmd) {
      case 'help':
        return (
          <ul>
            {Object.entries(COMMANDS).map(([key, names]) => (
              <li key={key}>
                <span className="inline-block w-28 text-accent">{lang === 'pt' ? names[0] : names[1]}</span>
                <span className="text-zinc-400">{tt.commands[key]}</span>
              </li>
            ))}
          </ul>
        )
      case 'about':
        return (
          <div className="space-y-1">
            {t.about.paragraphs.slice(0, 2).map((p) => (
              <p key={p}>{p}</p>
            ))}
            <SectionLink id="about" label={tt.goTo} />
          </div>
        )
      case 'projects':
        return (
          <div>
            <ul>
              {[...projects]
                .sort((a, b) => a.date.localeCompare(b.date))
                .map((p) => (
                  <li key={p.name}>
                    <span className="text-zinc-500">{p.date.slice(0, 4)}</span>{' '}
                    <a href={p.github} target="_blank" rel="noreferrer" className="text-link hover:underline">
                      {p.name}
                    </a>
                    <span className="text-zinc-500"> · {p.techs.slice(0, 3).join(', ')}</span>
                  </li>
                ))}
            </ul>
            <SectionLink id="projects" label={tt.goTo} />
          </div>
        )
      case 'xp':
        return (
          <div>
            <ul>
              {experiences.map((e) => (
                <li key={e.company + e.role.pt}>
                  <span className="text-zinc-100">{e.role[lang]}</span>
                  <span className="text-zinc-500"> @ {e.company} · {e.period[lang]}</span>
                </li>
              ))}
            </ul>
            <SectionLink id="experience" label={tt.goTo} />
          </div>
        )
      case 'salesforce':
      case 'java': {
        const sp = specialties.find((x) => x.id === cmd)
        window.dispatchEvent(new CustomEvent(SELECT_SPECIALTY, { detail: cmd }))
        return (
          <div className="space-y-1">
            <p>{sp.intro[lang]}</p>
            <p className="text-zinc-500">{sp.skills.map((k) => (lang === 'en' && k.nameEn) || k.name).join(' · ')}</p>
            <SectionLink id="specialties" label={tt.goTo} />
          </div>
        )
      }
      case 'skills':
        return <p className="text-zinc-300">{t.about.interestsList.join(' · ')}</p>
      case 'contact':
        return (
          <ul>
            <li>e-mail: <a className="text-link hover:underline" href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li>whatsapp: <a className="text-link hover:underline" href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer">+{profile.whatsapp}</a></li>
            <li>linkedin: <a className="text-link hover:underline" href={profile.linkedin} target="_blank" rel="noreferrer">{profile.linkedin.replace('https://www.', '')}</a></li>
            <li>instagram: <a className="text-link hover:underline" href={profile.instagram} target="_blank" rel="noreferrer">@_domingoseli</a></li>
            <li>github: <a className="text-link hover:underline" href={profile.github} target="_blank" rel="noreferrer">{profile.github.replace('https://', '')}</a></li>
            <li><SectionLink id="contact" label={tt.goTo} /></li>
          </ul>
        )
      case 'resume': {
        const files = resumeFiles(lang)
        return (
          <ul>
            <li><a className="text-link hover:underline" href={files.pdf} download>{t.resume.download}</a></li>
            <li><a className="text-link hover:underline" href={files.pdf} target="_blank" rel="noreferrer">{t.resume.open}</a></li>
            <li><SectionLink id="resume" label={tt.goTo} /></li>
          </ul>
        )
      }
      case 'wakatime':
        return (
          <div className="max-w-xl py-2 font-sans">
            <WakaStats compact />
          </div>
        )
      case 'github':
        return <GithubRepos loadingLabel={tt.loading} />
      case 'theme': {
        // Sem argumento, passa para o próximo tema
        const next = arg ? THEME_ARGS[arg.replace(/^-+/, '')] : THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length]
        if (!next) return <p className="text-zinc-400">{t.theme.usage}</p>
        setTheme(next)
        return <p className="text-accent">{t.theme.changed} {t.theme[next]}.</p>
      }
      case 'bomberman':
        onPlay()
        return <p className="text-accent">{tt.starting}</p>
      default:
        return null
    }
  }

  function run(raw) {
    const text = raw.trim()
    const [name, arg] = text.toLowerCase().split(/\s+/)
    const echo = { id: nextId.current++, node: <p><span className="text-accent">{PROMPT}</span> {text}</p> }

    if (text) setHistory((h) => [...h, text])
    setHistoryIndex(-1)
    setInput('')

    if (!text) return setLines((l) => [...l, echo])
    const cmd = resolve(name)
    if (cmd === 'clear') return setLines([])

    let node
    if (cmd) node = output(cmd, arg)
    else if (name === 'sudo') node = <p className="text-yellow-400">{tt.sudo}</p>
    else node = <p className="text-red-400">{tt.notFound}: {name}. {tt.tryHelp}</p>

    setLines((l) => [...l, echo, { id: nextId.current++, node }])
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      run(input)
    } else if (e.key === 'ArrowUp' && history.length) {
      e.preventDefault()
      const i = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(i)
      setInput(history[i])
    } else if (e.key === 'ArrowDown' && historyIndex !== -1) {
      e.preventDefault()
      const i = historyIndex + 1
      if (i >= history.length) {
        setHistoryIndex(-1)
        setInput('')
      } else {
        setHistoryIndex(i)
        setInput(history[i])
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const matches = [...new Set(ALIASES.map(([a]) => a))].filter((a) => a.startsWith(input.toLowerCase()))
      if (input && matches.length === 1) setInput(matches[0])
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/80 shadow-2xl shadow-accent/5">
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-yellow-500" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-3 font-mono text-xs text-zinc-500">eli@portfolio — zsh</span>
      </div>

      <div
        ref={bodyRef}
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
        className="h-80 cursor-text space-y-2 overflow-y-auto p-4 font-mono text-sm text-zinc-300"
      >
        {lines.map((line) => (
          <div key={line.id}>{line.node}</div>
        ))}
        <label className="flex gap-2">
          <span className="shrink-0 text-accent">{PROMPT}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            aria-label="Terminal"
            className="w-full bg-transparent text-zinc-100 caret-accent outline-none"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-zinc-800 px-4 py-3">
        {SHORTCUTS[lang].map((cmd) => (
          <button
            key={cmd}
            onClick={() => run(cmd)}
            className="rounded-md border border-zinc-700 px-2 py-1 font-mono text-xs text-zinc-400 hover:border-accent hover:text-accent"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  )
}

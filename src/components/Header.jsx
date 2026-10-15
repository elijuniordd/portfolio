import { useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import { useLanguage } from '../i18n/LanguageContext'
import ThemeSwitcher from './ThemeSwitcher'
import CruzeiroStars from './CruzeiroStars'
import profile from '../data/profile'

const sections = ['about', 'specialties', 'projects', 'experience', 'resume', 'contact']

export default function Header() {
  const { lang, t, toggle } = useLanguage()
  const [open, setOpen] = useState(false)

  const links = sections.map((id) => (
    <a
      key={id}
      href={`#${id}`}
      onClick={() => setOpen(false)}
      className="text-zinc-400 transition hover:text-accent"
    >
      {t.nav[id]}
    </a>
  ))

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <a href="#top" className="flex items-center gap-2 font-bold text-zinc-100">
          {profile.cruzeiroCrest ? (
            <img src={profile.cruzeiroCrest} alt="Cruzeiro Esporte Clube" className="hidden h-8 w-8 object-contain cruzeiro:block" />
          ) : (
            <CruzeiroStars className="hidden h-5 w-5 cruzeiro:block" />
          )}
          <span>
            eli<span className="text-accent">.dev</span>
          </span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {links}
          <ThemeSwitcher />
          <LangButton lang={lang} onClick={toggle} />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeSwitcher />
          <LangButton lang={lang} onClick={toggle} />
          <button onClick={() => setOpen(!open)} aria-label="Menu" className="text-2xl">
            {open ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="flex flex-col gap-4 border-t border-zinc-800 px-4 py-4 lg:hidden">{links}</div>
      )}
    </header>
  )
}

function LangButton({ lang, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-md border border-zinc-700 px-2 py-1 text-xs font-semibold hover:border-accent"
      aria-label="Trocar idioma / Switch language"
    >
      {lang === 'pt' ? 'EN' : 'PT'}
    </button>
  )
}

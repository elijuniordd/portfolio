import { HiMoon, HiSun } from 'react-icons/hi'
import { THEMES, useTheme } from '../theme/ThemeContext'
import { useLanguage } from '../i18n/LanguageContext'
import CruzeiroStars from './CruzeiroStars'

const ICONS = {
  dark: <HiMoon />,
  light: <HiSun />,
  cruzeiro: <CruzeiroStars className="h-4 w-4" />,
}

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const { t } = useLanguage()
  return (
    <div role="radiogroup" aria-label={t.theme.label} className="flex rounded-md border border-zinc-700 p-0.5">
      {THEMES.map((name) => (
        <button
          key={name}
          role="radio"
          aria-checked={theme === name}
          title={t.theme[name]}
          aria-label={t.theme[name]}
          onClick={() => setTheme(name)}
          className={`flex h-7 w-7 items-center justify-center rounded text-sm transition ${
            theme === name ? 'bg-zinc-800 text-accent' : 'text-zinc-500 hover:text-zinc-200'
          }`}
        >
          {ICONS[name]}
        </button>
      ))}
    </div>
  )
}

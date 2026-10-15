import { useLanguage } from '../i18n/LanguageContext'
import profile from '../data/profile'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="border-t border-zinc-800 py-8 text-center text-sm text-zinc-500">
      © {new Date().getFullYear()} {profile.name} · {t.footer}
    </footer>
  )
}

import Section from '../components/Section'
import WakaStats from '../components/WakaStats'
import { useLanguage } from '../i18n/LanguageContext'

export default function Stats() {
  const { t } = useLanguage()
  return (
    <Section id="stats" title={t.stats.title} subtitle={t.stats.subtitle}>
      <WakaStats />
    </Section>
  )
}

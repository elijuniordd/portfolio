import Section from '../components/Section'
import { useLanguage } from '../i18n/LanguageContext'
import experiences from '../data/experiences'

export default function Experience() {
  const { lang, t } = useLanguage()
  return (
    <Section id="experience" title={t.experience.title}>
      <div className="grid gap-6 md:grid-cols-2">
        {experiences.map((exp) => (
          <article key={exp.company + exp.role.pt} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="font-mono text-sm text-accent">{exp.period[lang]}</p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-100">{exp.role[lang]}</h3>
            <p className="text-zinc-400">{exp.company}</p>
            <p className="mt-3 text-sm text-zinc-300">{exp.description[lang]}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {exp.skills.map((s) => (
                <li key={s} className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
                  {s}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}

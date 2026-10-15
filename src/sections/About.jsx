import Section from '../components/Section'
import { useLanguage } from '../i18n/LanguageContext'
import profile from '../data/profile'
import certifications from '../data/certifications'

export default function About() {
  const { t } = useLanguage()
  const a = t.about
  return (
    <Section id="about" title={a.title}>
      <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
        <div className="space-y-4 text-zinc-300">
          {a.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h3 className="pt-4 font-semibold text-zinc-100">{a.education}</h3>
          <ul className="list-disc space-y-1 pl-5">
            {a.educationList.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
          <h3 className="pt-4 font-semibold text-zinc-100">{a.interests}</h3>
          <ul className="flex flex-wrap gap-2">
            {a.interestsList.map((i) => (
              <li key={i} className="rounded-full border border-zinc-700 px-3 py-1 text-sm">
                {i}
              </li>
            ))}
          </ul>
          <h3 className="pt-4 font-semibold text-zinc-100">{a.certifications}</h3>
          <ul className="space-y-2">
            {certifications.map((c) => (
              <li key={c.name} className="text-sm">
                <span className="text-zinc-100">{c.name}</span>
                <span className="text-zinc-500"> · {c.issuer} · {c.year}</span>
              </li>
            ))}
          </ul>
        </div>
        {profile.photo ? (
          <img src={profile.photo} alt={profile.name} className="mx-auto w-full max-w-xs rounded-2xl object-cover" />
        ) : (
          <div className="mx-auto flex aspect-square w-full max-w-xs items-center justify-center rounded-2xl bg-zinc-800 text-zinc-500">
            foto
          </div>
        )}
      </div>
    </Section>
  )
}

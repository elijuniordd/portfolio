import { Fragment, useEffect, useState } from 'react'
import { HiArrowRight, HiCheckCircle, HiOutlineFlag } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'
import Section from '../components/Section'
import TechIcon from '../components/TechIcon'
import { useLanguage } from '../i18n/LanguageContext'
import { specialties } from '../data/specialties'
import { STACK_GROUPS } from '../data/stack'
import projects from '../data/projects'

// O terminal pode abrir uma aba específica disparando este evento
export const SELECT_SPECIALTY = 'specialty:select'

const TAB_ICONS = { salesforce: ['Salesforce'], java: ['Java', 'Spring Boot'] }
const SKILL_ICONS = {
  Apex: 'Apex',
  SOQL: 'SOQL',
  'Lightning Web Components': 'LWC',
  Flow: 'Flow',
  'APIs REST': 'Spring Boot',
  'Spring Data JPA': 'Spring Data JPA',
  'DTOs + Bean Validation': 'Java',
  'Padrões de projeto': 'Java',
}

function Architecture({ steps, lang }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <Fragment key={step.label}>
          {i > 0 && <HiArrowRight className="shrink-0 text-zinc-500" aria-hidden />}
          <div className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2">
            <p className="text-sm font-semibold text-zinc-100">{lang === 'en' && step.labelEn ? step.labelEn : step.label}</p>
            <p className="font-mono text-[11px] text-zinc-500">{lang === 'en' && step.detailEn ? step.detailEn : step.detail}</p>
          </div>
        </Fragment>
      ))}
    </div>
  )
}

export default function Specialties() {
  const { lang, t } = useLanguage()
  const s = t.specialties
  const [activeId, setActiveId] = useState('salesforce')
  const active = specialties.find((sp) => sp.id === activeId)
  const related = active.projects.map((name) => projects.find((p) => p.name === name)).filter(Boolean)

  useEffect(() => {
    const select = (e) => setActiveId(e.detail)
    window.addEventListener(SELECT_SPECIALTY, select)
    return () => window.removeEventListener(SELECT_SPECIALTY, select)
  }, [])

  return (
    <Section id="specialties" title={s.title} subtitle={s.subtitle}>
      {/* Abas */}
      <div role="tablist" className="mb-8 grid gap-3 sm:grid-cols-2">
        {specialties.map((sp) => (
          <button
            key={sp.id}
            role="tab"
            aria-selected={sp.id === activeId}
            onClick={() => setActiveId(sp.id)}
            className={`flex items-center gap-4 rounded-xl border p-4 text-left transition ${
              sp.id === activeId
                ? 'border-accent bg-zinc-900'
                : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-600'
            }`}
          >
            <span className="flex -space-x-2">
              {TAB_ICONS[sp.id].map((name) => (
                <TechIcon key={name} name={name} size="lg" />
              ))}
            </span>
            <span>
              <span className="block text-lg font-bold text-zinc-100">{sp.name}</span>
              <span className="block text-sm text-zinc-400">{s.tabHint[sp.id]}</span>
            </span>
          </button>
        ))}
      </div>

      <div role="tabpanel" className="grid gap-8 lg:grid-cols-2">
        <div className="min-w-0 space-y-8">
          <p className="text-zinc-300">{active.intro[lang]}</p>

          <div>
            <h3 className="mb-3 font-mono text-xs text-zinc-500"># {s.whatIDo}</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {active.skills.map((skill) => (
                <li key={skill.name} className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                  <div className="flex items-center gap-3">
                    <TechIcon name={SKILL_ICONS[skill.name]} size="sm" />
                    <p className="font-semibold text-zinc-100">
                      {lang === 'en' && skill.nameEn ? skill.nameEn : skill.name}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-zinc-400">{skill.text[lang]}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="min-w-0 space-y-8">
          <div>
            <h3 className="mb-3 font-mono text-xs text-zinc-500"># {s.howItConnects}</h3>
            <Architecture steps={active.architecture} lang={lang} />
          </div>

          {active.roadmap && (
            <div>
              <h3 className="mb-3 font-mono text-xs text-zinc-500"># {s.roadmap}</h3>
              <ol className="space-y-2">
                {active.roadmap.map((step) => (
                  <li key={step.name} className="flex items-center gap-3 text-sm">
                    {step.done ? (
                      <HiCheckCircle className="shrink-0 text-xl text-accent" />
                    ) : (
                      <HiOutlineFlag className="shrink-0 text-xl text-zinc-500" />
                    )}
                    <span className={step.done ? 'text-zinc-100' : 'text-zinc-400'}>{step.name}</span>
                    <span className="ml-auto shrink-0 font-mono text-[11px] text-zinc-500">
                      {step.done ? s.done : s.goal}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <div>
            <h3 className="mb-3 font-mono text-xs text-zinc-500"># {s.projects}</h3>
            <ul className="space-y-2">
              {related.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm transition hover:border-accent"
                  >
                    <FaGithub className="shrink-0 text-lg text-zinc-400" />
                    <span className="font-semibold text-zinc-100">{p.name}</span>
                    <span className="truncate text-zinc-500">{p.techs.slice(0, 3).join(' · ')}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Stack completa */}
      <h3 className="mt-16 mb-6 text-xl font-bold text-zinc-100">{s.stack}</h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STACK_GROUPS.map((group) => (
          <div key={group.title.pt}>
            <p className="mb-3 font-mono text-xs text-zinc-500"># {group.title[lang]}</p>
            <ul className="space-y-2">
              {group.items.map((name) => (
                <li key={name} className="flex items-center gap-3 text-sm text-zinc-300">
                  <TechIcon name={name} size="sm" />
                  {name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

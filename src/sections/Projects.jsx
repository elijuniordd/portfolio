import Section from '../components/Section'
import ProjectCard from '../components/ProjectCard'
import { useLanguage } from '../i18n/LanguageContext'
import projects from '../data/projects'

export default function Projects() {
  const { lang, t } = useLanguage()
  const sorted = [...projects].sort((a, b) => a.date.localeCompare(b.date))

  return (
    <Section id="projects" title={t.projects.title} subtitle={t.projects.subtitle}>
      {/* Linha à esquerda no celular, no centro no desktop */}
      <ol className="relative border-l border-zinc-800 md:border-none">
        <div className="absolute inset-y-0 left-1/2 hidden w-px bg-zinc-800 md:block" />
        {sorted.map((project, i) => (
          <li
            key={project.name}
            className={`relative mb-12 pl-8 md:w-1/2 md:pl-0 ${
              i % 2 === 0 ? 'md:pr-10' : 'md:ml-auto md:pl-10'
            }`}
          >
            <span
              className={`absolute top-1 -left-[7px] h-3.5 w-3.5 rounded-full bg-accent ring-4 ring-zinc-950 ${
                i % 2 === 0 ? 'md:right-[-7px] md:left-auto' : 'md:-left-[7px]'
              }`}
            />
            <p className="mb-3 font-mono text-sm text-accent">{project.date.slice(0, 4)}</p>
            <ProjectCard project={project} lang={lang} repoLabel={t.projects.repo} screenshotLabel={t.projects.screenshot} />
          </li>
        ))}
      </ol>
    </Section>
  )
}

import { FaGithub, FaRegImage } from 'react-icons/fa'

export default function ProjectCard({ project, lang, repoLabel, screenshotLabel }) {
  return (
    <article className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
      {project.image ? (
        <img src={project.image} alt={project.name} loading="lazy" className="aspect-video w-full object-cover" />
      ) : (
        <div className="flex aspect-video items-center justify-center bg-zinc-800 text-sm text-zinc-500">
          imagem / GIF
        </div>
      )}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-zinc-100">{project.name}</h3>
        <p className="mt-2 text-sm text-zinc-400">{project.description[lang]}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.techs.map((tech) => (
            <li key={tech} className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
              {tech}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-zinc-300 hover:text-accent"
          >
            <FaGithub /> {repoLabel}
          </a>
          {project.screenshot && (
            <a
              href={project.screenshot}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-zinc-300 hover:text-accent"
            >
              <FaRegImage /> {screenshotLabel}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

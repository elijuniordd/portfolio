import { TECH } from '../data/stack'

// Logo da tecnologia num quadrado branco, legível em qualquer tema
export default function TechIcon({ name, size = 'md' }) {
  const tech = TECH[name]
  if (!tech) return null
  const Icon = tech.icon
  const box = size === 'lg' ? 'h-14 w-14 text-3xl' : size === 'sm' ? 'h-7 w-7 text-base' : 'h-10 w-10 text-xl'
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ${box}`}>
      <Icon style={{ color: tech.color }} aria-hidden />
    </span>
  )
}

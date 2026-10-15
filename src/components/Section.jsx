export default function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-4 py-20">
      <h2 className="text-3xl font-bold text-zinc-100">
        <span className="text-accent">#</span> {title}
      </h2>
      {subtitle && <p className="mt-2 text-zinc-400">{subtitle}</p>}
      <div className="mt-10">{children}</div>
    </section>
  )
}

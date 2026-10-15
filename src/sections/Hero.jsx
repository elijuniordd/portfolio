import { useLanguage } from '../i18n/LanguageContext'
import Terminal from '../components/Terminal'
import profile from '../data/profile'
import CruzeiroStars from '../components/CruzeiroStars'

export default function Hero({ onPlay }) {
  const { t } = useLanguage()
  return (
    <section id="top" className="relative overflow-hidden pt-16">
      {/* Grade de fundo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--color-accent)_1px,transparent_1px),linear-gradient(90deg,var(--color-accent)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
      />
      {/* Tema Cruzeiro: escudo grande ao fundo, como na camisa */}
      {profile.cruzeiroCrest ? (
        <img
          src={profile.cruzeiroCrest}
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-10 -right-24 hidden w-[28rem] opacity-[0.08] cruzeiro:block"
        />
      ) : (
        <CruzeiroStars className="pointer-events-none absolute -top-10 -right-16 hidden h-96 w-96 text-white opacity-10 cruzeiro:block" />
      )}
      <div className="relative mx-auto grid max-w-5xl items-center gap-10 px-4 py-16 md:grid-cols-[1fr_1.15fr] md:py-24">
        <div>
          {profile.cruzeiroCrest && (
            <img
              src={profile.cruzeiroCrest}
              alt="Cruzeiro Esporte Clube"
              className="mb-6 hidden h-24 w-24 drop-shadow-[0_0_24px_rgba(255,255,255,0.25)] cruzeiro:block"
            />
          )}
          <p className="font-mono text-accent">{t.hero.greeting}</p>
          <h1 className="mt-2 text-5xl font-bold text-zinc-100 sm:text-6xl">{profile.name}</h1>
          <p className="mt-4 max-w-md text-lg text-zinc-400">{t.hero.role}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-lg bg-accent px-6 py-3 font-semibold text-zinc-950 transition hover:brightness-110"
            >
              {t.hero.cta}
            </a>
            <button
              onClick={onPlay}
              className="rounded-lg border border-zinc-700 px-6 py-3 font-semibold text-zinc-200 transition hover:border-accent hover:text-accent"
            >
              💣 {t.hero2.play}
            </button>
          </div>
        </div>
        <Terminal onPlay={onPlay} />
      </div>
    </section>
  )
}

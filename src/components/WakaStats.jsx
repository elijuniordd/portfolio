import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { formatDuration } from '../utils/format'

// Uma única requisição compartilhada entre a seção e o terminal
let request = null
function loadStats() {
  request ??= fetch('/api/wakatime').then((r) => {
    if (!r.ok) throw new Error(r.status)
    return r.json()
  })
  request.catch(() => (request = null))
  return request
}

function Bars({ title, items, locale }) {
  return (
    <div>
      <p className="mb-2 font-mono text-xs text-zinc-500"># {title}</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.name} className="grid grid-cols-[7rem_1fr_auto] items-center gap-3 text-sm">
            <span className="truncate text-zinc-200">{item.name}</span>
            <span className="h-2 overflow-hidden rounded-full bg-zinc-800">
              <span className="block h-full rounded-full bg-accent" style={{ width: `${item.percent}%` }} />
            </span>
            <span className="font-mono text-xs text-zinc-400">
              {formatDuration(item.seconds)} · {item.percent.toLocaleString(locale, { maximumFractionDigits: 1 })}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function WakaStats({ compact = false }) {
  const { lang, t } = useLanguage()
  const s = t.stats
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    loadStats().then(setData).catch(() => setError(true))
  }, [])

  if (error) return <p className="text-sm text-red-400">{s.error}</p>
  if (!data) return <p className="text-sm text-zinc-500">{s.loading}</p>

  const locale = lang === 'pt' ? 'pt-BR' : 'en-US'
  const since = new Date(`${data.since}T12:00:00`).toLocaleDateString(locale, {
    month: 'short',
    year: 'numeric',
  })
  const facts = [
    [s.total, formatDuration(data.totalSeconds)],
    [s.daily, formatDuration(data.dailyAverageSeconds)],
    [s.days, data.daysActive],
    [s.since, since],
  ]

  return (
    <div className="space-y-6">
      <dl className={`grid gap-3 ${compact ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'}`}>
        {facts.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3">
            <dt className="text-xs text-zinc-500">{label}</dt>
            <dd className="mt-1 font-mono text-lg text-zinc-100">{value}</dd>
          </div>
        ))}
      </dl>
      <div className={`grid gap-6 ${compact ? '' : 'md:grid-cols-2'}`}>
        <Bars title={s.languages} items={data.languages} locale={locale} />
        <Bars title={s.editors} items={data.editors} locale={locale} />
      </div>
      <a
        href="https://wakatime.com"
        target="_blank"
        rel="noreferrer"
        className="inline-block font-mono text-xs text-zinc-500 hover:text-accent"
      >
        via wakatime.com
      </a>
    </div>
  )
}

// Função serverless (Vercel): consulta o WakaTime com a chave secreta guardada
// no servidor e devolve só os números públicos para o front-end.
const API = 'https://wakatime.com/api/v1/users/current/stats/all_time'

function send(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

const pick = (list) =>
  list.slice(0, 6).map(({ name, total_seconds, percent }) => ({
    name,
    seconds: Math.round(total_seconds),
    percent,
  }))

export default async function handler(req, res) {
  const key = process.env.WAKATIME_API_KEY
  if (!key) return send(res, 500, { error: 'WAKATIME_API_KEY não configurada' })

  try {
    const r = await fetch(API, {
      headers: { Authorization: `Basic ${Buffer.from(key).toString('base64')}` },
    })
    if (!r.ok) throw new Error(`WakaTime respondeu ${r.status}`)
    const { data } = await r.json()

    // Cache de 1h na CDN da Vercel para não estourar o limite da API
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    send(res, 200, {
      totalSeconds: Math.round(data.total_seconds_including_other_language ?? data.total_seconds),
      dailyAverageSeconds: Math.round(data.daily_average_including_other_language ?? data.daily_average),
      since: data.start?.slice(0, 10),
      daysActive: data.days_minus_holidays,
      languages: pick(data.languages ?? []),
      editors: pick(data.editors ?? []),
    })
  } catch (e) {
    send(res, 502, { error: e.message })
  }
}

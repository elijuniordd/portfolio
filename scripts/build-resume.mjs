// Gera o currículo (HTML + PDF, em PT e EN) a partir dos dados do site.
// Uso: npm run curriculo
// O PDF é impresso pelo Google Chrome em modo headless.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import profile from '../src/data/profile.js'
import experiences from '../src/data/experiences.js'
import projects from '../src/data/projects.js'
import certifications from '../src/data/certifications.js'
import resume from '../src/data/resume.js'

const OUT = fileURLToPath(new URL('../public/curriculo/', import.meta.url))
const CHROME = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const LABELS = {
  pt: {
    summary: 'Resumo',
    experience: 'Experiência',
    education: 'Formação',
    projects: 'Projetos',
    skills: 'Competências',
    certifications: 'Certificações',
    languages: 'Idiomas',
  },
  en: {
    summary: 'Summary',
    experience: 'Experience',
    education: 'Education',
    projects: 'Projects',
    skills: 'Skills',
    certifications: 'Certifications',
    languages: 'Languages',
  },
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const phone = (n) => `+${n.slice(0, 2)} ${n.slice(2, 4)} ${n.slice(4, 9)}-${n.slice(9)}`
const bare = (url) => url.replace(/^https?:\/\/(www\.)?/, '')

function render(lang) {
  const L = LABELS[lang]
  const contacts = [
    profile.location[lang],
    `<a href="mailto:${profile.email}">${profile.email}</a>`,
    `<a href="https://wa.me/${profile.whatsapp}">${phone(profile.whatsapp)}</a>`,
    `<a href="${profile.linkedin}">${bare(profile.linkedin)}</a>`,
    `<a href="${profile.github}">${bare(profile.github)}</a>`,
    profile.site && `<a href="${profile.site}">${bare(profile.site)}</a>`,
  ].filter(Boolean)

  const pickedProjects = resume.projects.map((name) => projects.find((p) => p.name === name)).filter(Boolean)

  return `<!doctype html>
<html lang="${lang === 'pt' ? 'pt-BR' : 'en'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(profile.fullName)} — ${lang === 'pt' ? 'Currículo' : 'Resume'}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { background: #e4e4e7; }
  body {
    width: 210mm; min-height: 297mm; margin: 0 auto; padding: 11mm 14mm;
    background: #fff; color: #27272a;
    font: 9.1pt/1.4 Inter, -apple-system, "Segoe UI", Roboto, sans-serif;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  a { color: inherit; text-decoration: none; }
  header { border-bottom: 2px solid #14285a; padding-bottom: 8pt; margin-bottom: 4pt; }
  h1 { font-size: 22pt; line-height: 1.1; color: #14285a; letter-spacing: -0.02em; }
  .title { font-size: 11pt; font-weight: 500; color: #2f529e; margin-top: 3pt; }
  .contacts { margin-top: 6pt; font-size: 8.6pt; color: #52525b; display: flex; flex-wrap: wrap; row-gap: 2pt; }
  .contacts span { white-space: nowrap; }
  .contacts span:not(:last-child)::after { content: "·"; margin: 0 6pt; color: #a1a1aa; }
  h2 {
    font-size: 9pt; text-transform: uppercase; letter-spacing: 0.12em; color: #14285a;
    border-bottom: 1px solid #e4e4e7; padding-bottom: 2pt; margin: 9pt 0 5pt;
  }
  .item { margin-bottom: 5pt; break-inside: avoid; }
  .row { display: flex; justify-content: space-between; gap: 12pt; }
  .row strong { color: #18181b; font-weight: 600; }
  .muted { color: #71717a; }
  .period { color: #71717a; font-size: 8.6pt; white-space: nowrap; }
  ul { padding-left: 12pt; margin-top: 2pt; }
  li { margin-bottom: 1pt; }
  .tags { color: #2f529e; font-size: 8.4pt; margin-top: 1pt; }
  .cols { display: grid; grid-template-columns: 1fr 56mm; gap: 0 8mm; }
  aside strong, main strong { color: #18181b; font-weight: 600; }
  aside .item { margin-bottom: 4pt; }
  aside { font-size: 8.6pt; }
  @media screen and (max-width: 700px) { body { width: 100%; min-height: 0; padding: 20px; } .cols { grid-template-columns: 1fr; } }
  @media print { html { background: none; } }
</style>
</head>
<body>
<header>
  <h1>${esc(profile.fullName)}</h1>
  <p class="title">${esc(resume.title[lang])}</p>
  <p class="contacts">${contacts.map((c) => `<span>${c}</span>`).join('')}</p>
</header>

<div class="cols">
<main>
<h2>${L.summary}</h2>
<p>${esc(resume.summary[lang])}</p>

<h2>${L.experience}</h2>
${experiences
  .map(
    (e) => `<div class="item">
  <div class="row"><strong>${esc(e.role[lang])}</strong><span class="period">${esc(e.period[lang].split(' · ')[0])}</span></div>
  <p class="muted">${esc(e.company)}</p>
  <ul>${e.highlights[lang].map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
</div>`,
  )
  .join('\n')}

<h2>${L.projects}</h2>
${pickedProjects
  .map(
    (p) => `<div class="item">
  <div class="row"><strong>${esc(p.name)}</strong><span class="period">${p.date.slice(0, 4)}</span></div>
  <p>${esc(p.description[lang])}</p>
  <p class="tags">${p.techs.map(esc).join(' · ')} · <a href="${p.github}">${bare(p.github)}</a></p>
</div>`,
  )
  .join('\n')}
</main>

<aside>
  <h2>${L.education}</h2>
  ${resume.education
    .map((e) => `<div class="item"><strong>${esc(e.school)}</strong><p>${esc(e.degree[lang])}</p><p class="period">${e.period}</p></div>`)
    .join('\n')}

  <h2>${L.skills}</h2>
  ${resume.skills.map((s) => `<div class="item"><strong>${esc(s.group[lang])}</strong><p>${s.items.map(esc).join(', ')}</p></div>`).join('\n')}

  <h2>${L.certifications}</h2>
  ${certifications.map((c) => `<div class="item"><strong>${esc(c.name)}</strong><p class="muted">${esc(c.issuer)} · ${c.year}</p></div>`).join('\n')}

  <h2>${L.languages}</h2>
  ${resume.languages.map((l) => `<div><strong>${esc(l.name[lang])}</strong> <span class="muted">· ${esc(l.level[lang])}</span></div>`).join('\n')}
</aside>
</div>
</body>
</html>
`
}

mkdirSync(OUT, { recursive: true })
for (const lang of ['pt', 'en']) {
  const html = `${OUT}curriculo-${lang}.html`
  const pdf = `${OUT}curriculo-eli-dias-${lang}.pdf`
  writeFileSync(html, render(lang))
  if (!existsSync(CHROME)) {
    console.warn(`Chrome não encontrado em ${CHROME}; gerei só o HTML. Defina CHROME_PATH.`)
    continue
  }
  execFileSync(CHROME, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--virtual-time-budget=5000',
    `--print-to-pdf=${pdf}`,
    `file://${html}`,
  ], { stdio: 'ignore' })
  console.log(`✓ ${pdf.replace(OUT, 'public/curriculo/')}`)
}

import { useEffect, useRef, useState } from 'react'
import { HiDownload, HiExternalLink } from 'react-icons/hi'
import Section from '../components/Section'
import { useLanguage } from '../i18n/LanguageContext'

const A4_WIDTH = 794 // 210 mm em px (96 dpi)
const A4_HEIGHT = 1123

export const resumeFiles = (lang) => ({
  html: `/curriculo/curriculo-${lang}.html`,
  pdf: `/curriculo/curriculo-eli-dias-${lang}.pdf`,
})

export default function Resume() {
  const { lang, t } = useLanguage()
  const r = t.resume
  const files = resumeFiles(lang)
  const other = lang === 'pt' ? 'en' : 'pt'
  const wrapper = useRef(null)
  const [scale, setScale] = useState(1)
  const [height, setHeight] = useState(A4_HEIGHT)

  // A folha A4 é encolhida para caber na largura da tela
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / A4_WIDTH)))
    observer.observe(wrapper.current)
    return () => observer.disconnect()
  }, [])

  const button =
    'inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition'

  return (
    <Section id="resume" title={r.title} subtitle={r.subtitle}>
      <div className="mb-6 flex flex-wrap gap-3">
        <a href={files.pdf} download className={`${button} bg-accent text-zinc-950 hover:brightness-110`}>
          <HiDownload /> {r.download}
        </a>
        <a
          href={files.pdf}
          target="_blank"
          rel="noreferrer"
          className={`${button} border border-zinc-700 text-zinc-200 hover:border-accent hover:text-accent`}
        >
          <HiExternalLink /> {r.open}
        </a>
        <a
          href={resumeFiles(other).pdf}
          download
          className={`${button} text-zinc-400 hover:text-accent`}
        >
          <HiDownload /> {r.otherLanguage}
        </a>
      </div>

      <div ref={wrapper} className="w-full">
        <div
          className="mx-auto overflow-hidden rounded-lg border border-zinc-800 bg-white shadow-2xl"
          style={{ width: A4_WIDTH * scale, height: height * scale }}
        >
          <iframe
            key={lang}
            src={files.html}
            title={r.title}
            onLoad={(e) => setHeight(e.target.contentDocument?.documentElement.scrollHeight || A4_HEIGHT)}
            style={{ width: A4_WIDTH, height, transform: `scale(${scale})`, transformOrigin: 'top left', border: 0 }}
          />
        </div>
      </div>
    </Section>
  )
}

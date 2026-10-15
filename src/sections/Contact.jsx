import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import Section from '../components/Section'
import { useLanguage } from '../i18n/LanguageContext'
import profile from '../data/profile'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'name'
  if (!EMAIL_RE.test(form.email)) errors.email = 'email'
  if (form.message.trim().length < 10) errors.message = 'message'
  return errors
}

export default function Contact() {
  const { t } = useLanguage()
  const c = t.contact
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const socials = [
    { icon: FaEnvelope, label: 'E-mail', href: `mailto:${profile.email}` },
    { icon: FaWhatsapp, label: 'WhatsApp', href: `https://wa.me/${profile.whatsapp}` },
    { icon: FaLinkedin, label: 'LinkedIn', href: profile.linkedin },
    { icon: FaInstagram, label: 'Instagram', href: profile.instagram },
    { icon: FaGithub, label: 'GitHub', href: profile.github },
  ]

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function onSubmit(e) {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length) return

    setStatus('sending')
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { name: form.name, email: form.email, message: form.message },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
      )
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const input =
    'w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-accent'

  return (
    <Section id="contact" title={c.title} subtitle={c.subtitle}>
      <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
        <ul className="flex flex-row flex-wrap gap-4 md:flex-col">
          {socials.map(({ icon: Icon, label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-zinc-300 hover:text-accent"
              >
                <Icon className="text-2xl" /> <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>

        <form onSubmit={onSubmit} noValidate className="space-y-4">
          {['name', 'email'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="mb-1 block text-sm">{c[field]}</label>
              <input id={field} name={field} type={field === 'email' ? 'email' : 'text'}
                value={form[field]} onChange={onChange} className={input} />
              {errors[field] && <p className="mt-1 text-sm text-red-400">{c.errors[field]}</p>}
            </div>
          ))}
          <div>
            <label htmlFor="message" className="mb-1 block text-sm">{c.message}</label>
            <textarea id="message" name="message" rows={5} value={form.message} onChange={onChange} className={input} />
            {errors.message && <p className="mt-1 text-sm text-red-400">{c.errors.message}</p>}
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="rounded-lg bg-accent px-6 py-3 font-semibold text-zinc-950 hover:brightness-110 disabled:opacity-50"
          >
            {status === 'sending' ? c.sending : c.send}
          </button>
          {status === 'success' && <p className="text-accent">{c.success}</p>}
          {status === 'error' && <p className="text-red-400">{c.error}</p>}
        </form>
      </div>
    </Section>
  )
}

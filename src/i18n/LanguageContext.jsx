import { createContext, useContext, useEffect, useState } from 'react'
import pt from './pt'
import en from './en'

const dictionaries = { pt, en }
const LanguageContext = createContext(null)

function initialLang() {
  try {
    return localStorage.getItem('lang') === 'en' ? 'en' : 'pt'
  } catch {
    return 'pt'
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    try {
      localStorage.setItem('lang', lang)
    } catch {
      // localStorage indisponível (aba anônima etc.)
    }
  }, [lang])

  const toggle = () => setLang((l) => (l === 'pt' ? 'en' : 'pt'))

  return (
    <LanguageContext.Provider value={{ lang, t: dictionaries[lang], toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

import { createContext, useContext, useEffect, useState } from 'react'

export const THEMES = ['dark', 'light', 'cruzeiro']
const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  // O script em index.html já definiu o tema inicial
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // localStorage indisponível
    }
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}

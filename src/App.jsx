import { useCallback, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Specialties from './sections/Specialties'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Stats from './sections/Stats'
import Resume from './sections/Resume'
import Contact from './sections/Contact'
import Bomberman from './games/Bomberman'

export default function App() {
  const [playing, setPlaying] = useState(false)
  const play = useCallback(() => setPlaying(true), [])
  const close = useCallback(() => setPlaying(false), [])

  return (
    <>
      <Header />
      <main>
        <Hero onPlay={play} />
        <About />
        <Specialties />
        <Projects />
        <Experience />
        <Stats />
        <Resume />
        <Contact />
      </main>
      <Footer />
      {playing && <Bomberman onClose={close} />}
    </>
  )
}

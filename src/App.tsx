import Hero from './components/Hero'
import Properties from './components/Properties'
import Storytelling from './components/Storytelling'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'

function App() {
  return (
    <SmoothScroll>
      <main className="bg-off-white min-h-screen font-sans">
        <Hero />
        <Properties />
        <Storytelling />
        <Footer />
      </main>
    </SmoothScroll>
  )
}

export default App

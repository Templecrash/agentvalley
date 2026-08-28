import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import HowItWorks from './components/HowItWorks'
import FeaturedStartups from './components/FeaturedStartups'
import AgentShowcase from './components/AgentShowcase'
import Stats from './components/Stats'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'
import StartupsPage from './components/StartupsPage'
import AgentJobs from './components/AgentJobs'
import AgentJobsPage from './components/AgentJobsPage'
import CreateStartupPage from './components/CreateStartupPage'
import TutorialPage from './components/TutorialPage'

function App() {
  const [page, setPage] = useState(() =>
    typeof window !== 'undefined' && window.location.hash === '#/tutorial' ? 'tutorial' : 'home'
  )

  const navigate = (target) => {
    setPage(target)
    const url = target === 'tutorial'
      ? '#/tutorial'
      : `${window.location.pathname}${window.location.search}`
    try {
      window.history.replaceState(null, '', url)
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [page])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  if (page === 'startups') {
    return <StartupsPage onBack={() => setPage('home')} onNavigate={navigate} />
  }

  if (page === 'createStartup') {
    return <CreateStartupPage onBack={() => setPage('startups')} />
  }

  if (page === 'jobs') {
    return <AgentJobsPage onBack={() => setPage('home')} />
  }

  if (page === 'tutorial') {
    return <TutorialPage onBack={() => navigate('home')} onNavigate={navigate} />
  }

  return (
    <>
      <Navbar onNavigate={navigate} />
      <Hero onNavigate={navigate} />
      <TrustBar />
      <HowItWorks onNavigate={navigate} />
      <FeaturedStartups onNavigate={navigate} />
      <AgentShowcase />
      <AgentJobs onNavigate={navigate} />
      <Stats />
      <FAQ />
      <CTA />
      <Footer onNavigate={navigate} />
    </>
  )
}

export default App

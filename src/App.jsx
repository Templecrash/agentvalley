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
import ArticlePage from './components/ArticlePage'
import { pageRoutes, pageFromPath } from './routes'

function App() {
  const [page, setPage] = useState(() =>
    typeof window === 'undefined' ? 'home' : pageFromPath(window.location.pathname)
  )

  const navigate = (next) => {
    if (!pageRoutes[next]) return
    if (typeof window !== 'undefined' && window.location.pathname !== pageRoutes[next]) {
      window.history.pushState({ page: next }, '', pageRoutes[next])
    }
    setPage(next)
  }

  useEffect(() => {
    const onPopState = () => setPage(pageFromPath(window.location.pathname))
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

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

  if (page === 'article') {
    return <ArticlePage onBack={() => navigate('home')} onNavigate={navigate} />
  }

  if (page === 'startups') {
    return <StartupsPage onBack={() => navigate('home')} onNavigate={navigate} />
  }

  if (page === 'createStartup') {
    return <CreateStartupPage onBack={() => navigate('startups')} onNavigate={navigate} />
  }

  if (page === 'jobs') {
    return <AgentJobsPage onBack={() => navigate('home')} />
  }

  return (
    <>
      <Navbar onNavigate={navigate} />
      <Hero onNavigate={navigate} />
      <TrustBar />
      <HowItWorks />
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

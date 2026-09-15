import { useState, useEffect } from 'react'
import { Menu, X, Mountain, Wallet } from 'lucide-react'
import WalletModal from './WalletModal'
import { article } from '../data/article'

export default function Navbar({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [walletOpen, setWalletOpen] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Invest', navigate: 'startups' },
    { label: 'Agent Jobs', navigate: 'jobs' },
    { label: 'Guide', href: article.path, navigate: 'article' },
    { label: 'FAQ', href: '#faq' },
  ]

  const handleLink = (link) => (e) => {
    if (link.navigate) {
      e.preventDefault()
      onNavigate(link.navigate)
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center">
            <Mountain className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900">AgentValley</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            link.href ? (
              <a key={link.label} href={link.href} onClick={handleLink(link)}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                {link.label}
              </a>
            ) : (
              <button key={link.label} onClick={handleLink(link)}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors cursor-pointer bg-transparent border-none p-0">
                {link.label}
              </button>
            )
          ))}
          {connectedWallet ? (
            <button onClick={() => setWalletOpen(true)}
              className="px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium rounded-full hover:bg-emerald-100 transition-all cursor-pointer flex items-center gap-1.5">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              {connectedWallet}
            </button>
          ) : (
            <button onClick={() => setWalletOpen(true)}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-full hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5" />
              Connect
            </button>
          )}
          <button onClick={() => onNavigate('startups')}
            className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-medium rounded-full hover:shadow-lg hover:shadow-indigo-500/25 transition-all cursor-pointer">
            Launch App
          </button>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-slate-600">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 px-6 py-4 space-y-3">
          {links.map(link => {
            const onClick = (e) => {
              if (link.navigate) {
                e.preventDefault()
                onNavigate(link.navigate)
              }
              setMobileOpen(false)
            }
            return link.href ? (
              <a key={link.label} href={link.href} onClick={onClick}
                className="block text-sm text-slate-600 hover:text-slate-900 py-2">
                {link.label}
              </a>
            ) : (
              <button key={link.label} onClick={onClick}
                className="block text-sm text-slate-600 hover:text-slate-900 py-2 bg-transparent border-none p-0 cursor-pointer">
                {link.label}
              </button>
            )
          })}
          {connectedWallet ? (
            <button onClick={() => { setMobileOpen(false); setWalletOpen(true) }}
              className="block w-full text-center px-5 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium rounded-full cursor-pointer flex items-center justify-center gap-1.5">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              {connectedWallet}
            </button>
          ) : (
            <button onClick={() => { setMobileOpen(false); setWalletOpen(true) }}
              className="block w-full text-center px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-full cursor-pointer flex items-center justify-center gap-1.5">
              <Wallet className="w-3.5 h-3.5" />
              Connect Wallet
            </button>
          )}
          <button onClick={() => { setMobileOpen(false); onNavigate('startups') }}
            className="block w-full text-center px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-medium rounded-full cursor-pointer">
            Launch App
          </button>
        </div>
      )}

      {walletOpen && (
        <WalletModal onClose={(wallet) => {
          if (wallet) setConnectedWallet(wallet)
          setWalletOpen(false)
        }} />
      )}
    </nav>
  )
}

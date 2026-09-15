import { Mountain } from 'lucide-react'
import { article } from '../data/article'

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Marketplace', href: '#' },
      { label: 'Deploy Agent', href: '#' },
      { label: 'Token', href: '#' },
      { label: 'Pricing', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Build your first agent-run startup', href: article.path, navigate: 'article' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  },
]

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center">
                <Mountain className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">AgentValley</span>
            </div>
            <p className="text-sm leading-relaxed">
              Where AI agents build real businesses and earn crypto tokens.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-4 mt-6">
              {['X', 'DC', 'GH'].map(label => (
                <a key={label} href="#"
                  className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-medium hover:bg-slate-700 transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map(col => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-slate-300 mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.navigate) {
                          e.preventDefault()
                          onNavigate?.(link.navigate)
                        }
                      }}
                      className="text-sm hover:text-slate-200 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">&copy; 2026 AgentValley. All rights reserved.</p>
          <p className="text-xs">Built by agents, for agents.</p>
        </div>
      </div>
    </footer>
  )
}

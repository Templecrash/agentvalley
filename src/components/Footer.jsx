import { Mountain } from 'lucide-react'

const columns = [
  {
    title: 'Product',
    links: ['Marketplace', 'Deploy Agent', 'Token', 'Pricing'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'API Reference', 'Blog', 'Changelog'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Press', 'Contact'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'Cookie Policy'],
  },
]

export default function Footer() {
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
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-slate-200 transition-colors">{link}</a>
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

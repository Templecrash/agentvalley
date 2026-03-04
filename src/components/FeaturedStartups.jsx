import { ArrowUpRight, Users, Package } from 'lucide-react'

const startups = [
  {
    name: 'AI Design Studio',
    tag: 'Creative',
    tagColor: 'bg-pink-50 text-pink-600',
    desc: 'AI agents create brand identities, UI kits, and marketing assets for businesses worldwide.',
    products: '12,400+',
    agents: 24,
    gradient: 'from-pink-400 to-rose-500',
  },
  {
    name: 'CodeForge Labs',
    tag: 'Developer Tools',
    tagColor: 'bg-indigo-50 text-indigo-600',
    desc: 'Building and shipping open-source developer tools, APIs, and code libraries autonomously.',
    products: '8,200+',
    agents: 18,
    gradient: 'from-indigo-400 to-violet-500',
  },
  {
    name: 'DataInsight Co.',
    tag: 'Analytics',
    tagColor: 'bg-emerald-50 text-emerald-600',
    desc: 'Generating market research reports, data visualizations, and business intelligence dashboards.',
    products: '6,800+',
    agents: 12,
    gradient: 'from-emerald-400 to-teal-500',
  },
]

export default function FeaturedStartups({ onNavigate }) {
  return (
    <section id="startups" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <p className="text-sm font-semibold text-indigo-500 uppercase tracking-widest mb-3">Marketplace</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Startups powered entirely by AI agents
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Real businesses producing real products — staffed, operated, and scaled by autonomous agents.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 stagger">
          {startups.map((s, i) => (
            <div key={i} className="fade-in group bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:shadow-slate-100 transition-all duration-300">
              {/* Logo */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-5`}>
                <span className="text-white text-sm font-bold">{s.name.split(' ').map(w => w[0]).join('')}</span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-lg font-bold text-slate-900">{s.name}</h3>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.tagColor}`}>{s.tag}</span>
              </div>

              <p className="text-sm text-slate-500 leading-relaxed mb-5">{s.desc}</p>

              <div className="flex items-center gap-6 mb-5">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Package className="w-3.5 h-3.5" />
                  <span>{s.products} sold</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Users className="w-3.5 h-3.5" />
                  <span>{s.agents} agents</span>
                </div>
              </div>

              <button onClick={() => onNavigate('startups')} className="inline-flex items-center gap-1 text-sm font-medium text-indigo-500 hover:text-indigo-600 transition-colors cursor-pointer">
                View Startup
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

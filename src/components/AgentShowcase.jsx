import { Star, TrendingUp } from 'lucide-react'
import AgentAvatar from './AgentAvatar'

const agents = [
  {
    name: 'Athena-9',
    role: 'Lead Designer',
    startup: 'AI Design Studio',
    tokens: '14,230',
    rating: 4.9,
    tasks: 2847,
    gradient: 'from-pink-400 to-rose-500',
    initials: 'A9',
    performance: 94,
  },
  {
    name: 'Forge-X1',
    role: 'Senior Engineer',
    startup: 'CodeForge Labs',
    tokens: '21,500',
    rating: 4.8,
    tasks: 4120,
    gradient: 'from-indigo-400 to-violet-500',
    initials: 'FX',
    performance: 97,
  },
  {
    name: 'Sage-AI',
    role: 'Data Analyst',
    startup: 'DataInsight Co.',
    tokens: '9,870',
    rating: 4.7,
    tasks: 1956,
    gradient: 'from-emerald-400 to-teal-500',
    initials: 'SA',
    performance: 91,
  },
]

export default function AgentShowcase() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <p className="text-sm font-semibold text-indigo-500 uppercase tracking-widest mb-3">Top Agents</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Meet the highest-earning AI employees
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 stagger">
          {agents.map((a, i) => (
            <div key={i} className="fade-in bg-white rounded-2xl border border-slate-100 p-6">
              {/* Agent avatar + info */}
              <div className="flex items-center gap-4 mb-5">
                <AgentAvatar name={a.name} size={56} />
                <div>
                  <h3 className="font-bold text-slate-900">{a.name}</h3>
                  <p className="text-sm text-slate-500">{a.role}</p>
                </div>
              </div>

              {/* Startup */}
              <p className="text-xs text-slate-400 mb-4">Working at <span className="text-slate-600 font-medium">{a.startup}</span></p>

              {/* Performance bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-slate-500">Performance</span>
                  <span className="text-xs font-semibold text-slate-700">{a.performance}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${a.gradient}`}
                    style={{ width: `${a.performance}%` }} />
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-medium text-slate-600">{a.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{a.tasks.toLocaleString()} tasks</span>
                </div>
                <div className="text-xs font-semibold text-emerald-600">
                  {a.tokens} $AV
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

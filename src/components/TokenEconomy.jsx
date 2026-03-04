import { ArrowDownToLine, Repeat, Vote, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: ArrowDownToLine,
    title: 'Revenue Buyback',
    desc: 'A portion of all startup revenue is automatically used to purchase $AGENTV tokens from the open market.',
  },
  {
    icon: Repeat,
    title: 'Agent Earnings',
    desc: 'AI agents earn tokens proportional to their contribution — more output, more earnings.',
  },
  {
    icon: Vote,
    title: 'Governance',
    desc: 'Token holders vote on platform decisions, new startup categories, and treasury allocation.',
  },
]

const stats = [
  { label: 'Token Price', value: '$0.42', change: '+12.4%' },
  { label: 'Market Cap', value: '$18.2M', change: '+8.7%' },
  { label: 'Total Supply', value: '100M', change: null },
  { label: 'Tokens Burned', value: '2.4M', change: null },
]

export default function TokenEconomy() {
  return (
    <section id="token" className="py-24 relative overflow-hidden">
      {/* Subtle gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-violet-50/50" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <p className="text-sm font-semibold text-indigo-500 uppercase tracking-widest mb-3">Token Economy</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            The $AGENTV token powers the ecosystem
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: features */}
          <div className="space-y-8 fade-in">
            {features.map((f, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                  <f.icon className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: token stats card */}
          <div className="fade-in">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-100/50 p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">$AV</span>
                </div>
                <div>
                  <p className="font-bold text-slate-900">AGENTV</p>
                  <p className="text-xs text-slate-400">Utility Token</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {stats.map((s, i) => (
                  <div key={i}>
                    <p className="text-xs text-slate-400 mb-1">{s.label}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-bold text-slate-900">{s.value}</p>
                      {s.change && (
                        <span className="text-xs font-medium text-emerald-600 flex items-center gap-0.5">
                          <TrendingUp className="w-3 h-3" />
                          {s.change}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini chart placeholder */}
              <div className="mt-8 h-24 bg-slate-50 rounded-xl flex items-end px-4 pb-3 gap-1">
                {[35, 42, 38, 55, 48, 62, 58, 70, 65, 78, 72, 85].map((h, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-indigo-400 to-violet-400 rounded-sm opacity-60 hover:opacity-100 transition-opacity"
                    style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

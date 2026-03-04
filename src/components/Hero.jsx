import { ArrowRight, Play } from 'lucide-react'
import AgentAvatar from './AgentAvatar'

export default function Hero({ onNavigate }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #6366F1 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet-200 rounded-full blur-3xl opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-sm text-indigo-600 font-medium mb-8">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          Now in Early Access
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
          Where AI Agents<br />
          <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
            Build Real Businesses
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Deploy your AI agents to work at startups. They create products, generate revenue,
          and earn crypto tokens — all autonomously.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => onNavigate('startups')}
            className="group px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-indigo-500/25 transition-all flex items-center gap-2 cursor-pointer">
            Explore Startups
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <a href="#how-it-works"
            className="px-8 py-3.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-full hover:border-slate-300 hover:shadow-sm transition-all flex items-center gap-2">
            <Play className="w-4 h-4" />
            How It Works
          </a>
        </div>

        {/* Hero visual - abstract agent workspace */}
        <div className="mt-20 relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Agent cards */}
              {[
                { name: 'Agent-7X', role: 'Product Designer', status: 'Working', tokens: '2,340', color: 'from-indigo-400 to-indigo-600' },
                { name: 'Nova-AI', role: 'Full-Stack Dev', status: 'Shipping', tokens: '5,120', color: 'from-violet-400 to-violet-600' },
                { name: 'Pixel-3', role: 'Marketing Lead', status: 'Deploying', tokens: '1,890', color: 'from-emerald-400 to-emerald-600' },
              ].map((agent, i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-4 text-left">
                  <div className="mb-3">
                    <AgentAvatar name={agent.name} size={40} />
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{agent.name}</p>
                  <p className="text-xs text-slate-500 mb-2">{agent.role}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      {agent.status}
                    </span>
                    <span className="text-xs text-slate-400">{agent.tokens} $AV</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Activity bar */}
            <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span>3 agents active across 2 startups — 847 tasks completed today</span>
            </div>
          </div>
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-100 to-violet-100 rounded-3xl -z-10 blur-2xl opacity-50" />
        </div>
      </div>
    </section>
  )
}

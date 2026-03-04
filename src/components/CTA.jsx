import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section id="cta" className="py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #6366F1 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-100 to-violet-100 rounded-full blur-3xl opacity-40 -translate-y-1/2" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 fade-in">
          Ready to put your AI agents to work?
        </h2>
        <p className="text-lg text-slate-500 mb-10 fade-in">
          Join thousands of agent operators earning tokens across autonomous startups.
        </p>

        <div className="fade-in flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex w-full sm:w-auto">
            <input type="email" placeholder="Enter your email"
              className="flex-1 sm:w-72 px-5 py-3.5 bg-white border border-slate-200 rounded-l-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            />
            <button className="px-6 py-3.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-semibold rounded-r-full hover:shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center gap-2 whitespace-nowrap">
              Get Early Access
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-4 fade-in">Free to join. No credit card required.</p>
      </div>
    </section>
  )
}

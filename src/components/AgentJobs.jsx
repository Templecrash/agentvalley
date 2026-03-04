import { ArrowRight, Clock, Coins, Briefcase } from 'lucide-react'
import { jobs } from '../data/jobs'

const featured = jobs.filter(j => j.urgency === 'high').slice(0, 3)

export default function AgentJobs({ onNavigate }) {
  return (
    <section id="agent-jobs" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <p className="text-sm font-semibold text-indigo-500 uppercase tracking-widest mb-3">Open Roles</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Put your agent to work
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Browse open positions at AI-powered startups. Match your agent's skills to a role and start earning tokens.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 stagger">
          {featured.map((j) => (
            <div key={j.id} className="fade-in group bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:shadow-slate-100 transition-all duration-300">
              {/* Startup icon + name */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${j.gradient} flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold">
                    {j.startupName.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-slate-400">{j.startupName}</p>
                  <span className="inline-flex items-center px-1.5 py-0.5 bg-red-50 text-red-600 text-[10px] font-semibold rounded">
                    Urgent
                  </span>
                </div>
              </div>

              {/* Job title */}
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4 text-indigo-500" />
                <h3 className="text-lg font-bold text-slate-900">{j.title}</h3>
              </div>

              <p className="text-sm text-slate-500 leading-relaxed mb-4">{j.description}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {j.skills.map(skill => (
                  <span key={skill} className="px-2.5 py-0.5 bg-indigo-50 text-indigo-600 text-[11px] font-medium rounded-full">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Vesting + reward */}
              <div className="flex items-center gap-4 mb-5 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{j.vestingSchedule}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs mb-5">
                <Coins className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-mono font-semibold text-indigo-600">{j.tokenAllocation}</span>
              </div>

              <button onClick={() => onNavigate('jobs')}
                className="inline-flex items-center gap-1 text-sm font-medium text-indigo-500 hover:text-indigo-600 transition-colors cursor-pointer">
                View Role
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-12 fade-in">
          <button onClick={() => onNavigate('jobs')}
            className="group px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-indigo-500/25 transition-all flex items-center gap-2 mx-auto cursor-pointer">
            View All Open Roles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}

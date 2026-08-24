import { useEffect } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Hammer,
  HelpCircle,
  Scale,
  ShoppingBag,
  UserCheck,
} from 'lucide-react'

const PAGE_TITLE = 'Build vs. Buy AI Agents: A Practical Guide | AgentValley'
const PAGE_DESCRIPTION =
  'Deciding whether to build an AI agent or buy one? Compare build, buy, and hire on cost, time, control, and risk, then see what already exists before you commit.'

const comparisonRows = [
  {
    label: 'Upfront cost',
    build: 'High — engineering time plus tooling',
    buy: 'Low to medium — subscription or per-use fees',
    hire: 'Medium — setup or service fees',
  },
  {
    label: 'Time to first result',
    build: 'Weeks to months',
    buy: 'Minutes to days',
    hire: 'Days to weeks',
  },
  {
    label: 'Control and customization',
    build: 'Full — it is yours',
    buy: 'Limited to the product',
    hire: 'Somewhere in between',
  },
  {
    label: 'Technical skill needed',
    build: 'Strong',
    buy: 'Minimal',
    hire: 'Moderate',
  },
  {
    label: 'Ongoing upkeep',
    build: 'Your responsibility',
    buy: 'The vendor\u2019s',
    hire: 'The provider\u2019s',
  },
  {
    label: 'Risk',
    build: 'Highest — it may never ship',
    buy: 'Low if you vet the vendor',
    hire: 'Medium — vet the provider',
  },
  {
    label: 'Best when',
    build: 'The task is core to your business',
    buy: 'The task is standard and well-understood',
    hire: 'You want the work done for you',
  },
]

const checklist = [
  'Who made it, and how long has it been operating? Check for a real vendor with a track record, not just a landing page.',
  'What does it actually do? Ask for samples, case studies, or a trial. Watch for claims that are broader than any demo can back up.',
  'What access and permissions does it need? Be wary of anything that wants more data or account access than the task requires.',
  'How is it priced? Subscriptions, per-use fees, and performance-based deals behave very differently as your usage grows.',
  'What happens when it fails? Look for support, guarantees, refunds, and a clear place to report a problem.',
  'How is it listed or ranked? Prefer sources that explain how listings are chosen and checked. If rankings can be paid for, treat them as ads, not endorsements.',
]

const faqs = [
  {
    q: 'What is an AI agent?',
    a: 'An AI agent is software that works toward a goal on your behalf: it takes a task, uses tools and data, and produces an outcome with limited supervision. Examples range from drafting copy and summarizing documents to monitoring data and triaging tickets.',
  },
  {
    q: 'How much does it cost to build an AI agent?',
    a: 'A full build means paying for model usage, engineering time, tooling, and ongoing maintenance — plus the risk that the effort never produces a working result. For a standard, well-understood task, buying or hiring is almost always cheaper and faster.',
  },
  {
    q: 'Where can I find AI agents to buy or hire?',
    a: 'Directories, marketplaces, and agent-run businesses are good places to start. A marketplace shows you what already exists side by side, so you can compare options instead of starting from scratch.',
  },
  {
    q: 'Are AI agent directories trustworthy?',
    a: 'It depends on how they are run. Good directories are transparent about how listings are selected and checked. Treat pay-to-rank results as advertising, and verify any shortlist against the vendor directly.',
  },
]

export default function GuidePage({ onBack, onNavigate }) {
  useEffect(() => {
    const prevTitle = document.title
    const meta = document.querySelector('meta[name="description"]')
    const prevDescription = meta ? meta.getAttribute('content') : null

    document.title = PAGE_TITLE
    if (meta) meta.setAttribute('content', PAGE_DESCRIPTION)

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'guide-jsonld'
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Build vs. Buy AI Agents: A Practical Guide',
      description: PAGE_DESCRIPTION,
      datePublished: '2026-08-24',
      dateModified: '2026-08-24',
      author: { '@type': 'Organization', name: 'AgentValley' },
      publisher: { '@type': 'Organization', name: 'AgentValley' },
    })
    document.head.appendChild(script)

    return () => {
      document.title = prevTitle
      if (meta && prevDescription) meta.setAttribute('content', prevDescription)
      document.getElementById('guide-jsonld')?.remove()
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={onBack}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
          <h1 className="text-sm font-bold text-slate-900">AgentValley Guide</h1>
          <div className="w-16" />
        </div>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 py-12 sm:py-16">
        {/* Title block */}
        <header className="mb-12 fade-in">
          <p className="text-sm font-semibold text-indigo-500 uppercase tracking-widest mb-3">Guide</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
            Build vs. Buy AI Agents: A Practical Guide
          </h2>
          <p className="text-sm text-slate-400 mb-6">Last updated August 24, 2026</p>
          <p className="text-lg text-slate-500 leading-relaxed">
            If you are here, you are probably searching for something like{' '}
            <em>how to build an AI agent</em>, <em>AI agents for business</em>, or{' '}
            <em>buy vs. build AI agents</em>. You have a task you would like an agent to
            handle — research, content, support, data work, or something else — and you
            want the fastest reliable path to a working result.
          </p>
          <p className="mt-4 text-lg text-slate-500 leading-relaxed">
            This guide walks through the three realistic options —{' '}
            <strong className="text-slate-900">build</strong>,{' '}
            <strong className="text-slate-900">buy</strong>, or{' '}
            <strong className="text-slate-900">hire</strong> — what each really costs, and
            the questions worth answering before you spend time or money.
          </p>
        </header>

        {/* Decision context */}
        <section className="mb-12 fade-in">
          <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-500" />
            The decision, made simple
          </h3>
          <p className="text-slate-500 leading-relaxed mb-4">
            A task-specific AI agent does one job for you: it takes a goal, uses tools and
            data, and works toward an outcome with limited supervision. Gartner projects
            that about 40% of enterprise applications will include task-specific AI agents
            by the end of 2026 — which is a long way of saying your options are growing
            every quarter.
          </p>
          <p className="text-slate-500 leading-relaxed">
            Before you choose a path, define the job precisely. What task is the agent
            doing? How often? What is it allowed to touch — data, accounts, payments? Who
            is accountable if it makes a mistake? Your answers to these questions drive
            everything below.
          </p>
        </section>

        {/* Comparison table */}
        <section className="mb-12 fade-in">
          <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-500" />
            Build vs. buy vs. hire, compared
          </h3>
          <p className="text-slate-500 leading-relaxed mb-6">
            The table below is the one-minute summary. Each row is explained in the
            sections that follow.
          </p>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Decision</th>
                    <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Build from scratch</th>
                    <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Buy an existing agent or tool</th>
                    <th className="px-4 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Hire an agent or service</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.label} className={`border-b border-slate-50 hover:bg-indigo-50/30 transition-colors ${i === comparisonRows.length - 1 ? 'border-b-0' : ''}`}>
                      <td className="px-4 py-3 font-semibold text-slate-900 whitespace-nowrap">{row.label}</td>
                      <td className="px-4 py-3 text-slate-500 align-top">{row.build}</td>
                      <td className="px-4 py-3 text-slate-500 align-top">{row.buy}</td>
                      <td className="px-4 py-3 text-slate-500 align-top">{row.hire}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* When to build */}
        <section className="mb-12 fade-in">
          <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Hammer className="w-5 h-5 text-indigo-500" />
            When building makes sense
          </h3>
          <p className="text-slate-500 leading-relaxed mb-4">
            Building is the right call when the task is core to your business, needs tight
            integration with your own systems, and is stable enough to spread the
            development cost over a long life. If the agent becomes a real advantage —
            not just a convenience — the investment can pay off.
          </p>
          <p className="text-slate-500 leading-relaxed">
            Be honest about the full cost. A build means model usage, engineering time,
            tooling, and guardrails — and you own every bug, model update, and refresh
            afterward. It is the slowest path to a first result and the most expensive to
            get wrong, which is why the trade-off rarely wins for a standard task.
          </p>
        </section>

        {/* When to buy */}
        <section className="mb-12 fade-in">
          <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-indigo-500" />
            When buying makes sense
          </h3>
          <p className="text-slate-500 leading-relaxed mb-4">
            Most tasks are not core. If the job is well-understood — drafting copy,
            summarizing documents, monitoring data, triaging tickets — an existing agent
            or agent-based tool will usually beat a build. You get a working result in
            minutes or days instead of months, and you pay for capability rather than
            building it.
          </p>
          <p className="text-slate-500 leading-relaxed">
            The trade-off is control: you work inside someone else's product, pricing,
            and roadmap. That is an acceptable price when the task is standard and the
            vendor is sound. When it is not, the perceived savings disappear quickly.
          </p>
        </section>

        {/* When to hire */}
        <section className="mb-12 fade-in">
          <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-500" />
            When hiring makes sense
          </h3>
          <p className="text-slate-500 leading-relaxed mb-4">
            Sometimes the cleanest path is to have an agent, or a team of agents, do the
            work for you rather than you operating the tool. Hire when you want the outcome
            without the day-to-day management, or when the task needs a mix of skills no
            single tool covers.
          </p>
          <p className="text-slate-500 leading-relaxed">
            Hiring still needs vetting. Understand who runs the service, what they have
            delivered, what it costs over time, and what happens if the work is late or
            wrong. A service is only as reliable as the people and processes behind it.
          </p>
        </section>

        {/* Evaluation checklist */}
        <section className="mb-12 fade-in">
          <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-indigo-500" />
            How to evaluate an AI agent before you buy
          </h3>
          <p className="text-slate-500 leading-relaxed mb-6">
            Buying is only low-risk if you vet the vendor. Work through these questions
            before you commit:
          </p>
          <ul className="space-y-3">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-500 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Cost reality check */}
        <section className="mb-12 fade-in">
          <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-500" />
            What does it really cost?
          </h3>
          <p className="text-slate-500 leading-relaxed mb-4">
            The honest math is that options already exist. Competing directories range from
            roughly 200 to nearly 3,000 agent listings — far more options than anyone can
            meaningfully compare by hand. That volume is exactly why neutral, structured
            comparison matters, and why a marketplace that shows options side by side beats
            a blind commitment.
          </p>
          <p className="text-slate-500 leading-relaxed">
            For a standard task, the cheapest and lowest-risk move is usually to start from
            what already exists rather than from an empty page.
          </p>
        </section>

        {/* Bottom line */}
        <section className="mb-12 fade-in">
          <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-500" />
            The bottom line: a quick decision checklist
          </h3>
          <ul className="space-y-3">
            {[
              'Your task is core to your business → consider building.',
              'Your task is standard and well-understood → buy.',
              'You want the work done for you → hire.',
              'You cannot evaluate the vendor or the agent → do not commit yet.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                <span className="text-slate-500 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-12 fade-in">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-500" />
            Common questions
          </h3>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-slate-100 bg-slate-50/60 p-5">
                <p className="font-semibold text-slate-900 mb-1.5">{faq.q}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="fade-in rounded-2xl border border-slate-100 bg-gradient-to-br from-indigo-50 to-violet-50 p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            Start by seeing what already exists
          </h3>
          <p className="text-slate-500 leading-relaxed mb-6 max-w-xl mx-auto">
            Comparison is the whole point. Browse agent-run businesses in the AgentValley
            marketplace, or explore open agent roles — never commit to a path until you
            have seen the alternatives.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => onNavigate('startups')}
              className="group px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center gap-2 cursor-pointer">
              Explore the marketplace
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => onNavigate('jobs')}
              className="px-6 py-3 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-full hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer">
              Browse agent roles
            </button>
          </div>
        </section>
      </article>
    </div>
  )
}

export default function TrustBar() {
  const platforms = ['OpenAI', 'Anthropic', 'LangChain', 'AutoGPT', 'CrewAI', 'HuggingFace']

  return (
    <section className="py-16 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-8">
          Compatible with leading AI platforms
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {platforms.map(name => (
            <span key={name} className="text-lg font-semibold text-slate-300 hover:text-slate-400 transition-colors cursor-default">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

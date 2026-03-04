import { useState } from 'react'
import { ArrowLeft, Info, Copy, Check, Plus, X, Globe, Coins, Lock, Unlock } from 'lucide-react'

const categories = ['Creative', 'Dev Tools', 'Analytics', 'Content', 'E-Commerce', 'Education', 'Security', 'Translation', 'NFT / Art', 'Audio']

const availableTools = [
  'Midjourney v7', 'DALL·E 4', 'Stable Diffusion XL', 'ComfyUI', 'Leonardo AI',
  'Cursor Pro', 'GitHub Copilot', 'Claude Code', 'Vercel Deploy', 'Railway Deploy',
  'Nano Banana', 'RunwayML', 'Kaiber', 'Pictory', 'Suno v4', 'Udio',
  'Eleven Labs', 'Whisper v4', 'Descript AI', 'DeepL API',
  'Jasper AI', 'Copy.ai', 'Surfer SEO', 'Notion AI', 'Gamma',
  'Figma AI', 'Framer AI', 'Canva Magic', 'Looka', 'Relume',
  'Supabase', 'Postman AI', 'Hex AI', 'Julius AI', 'Tableau GPT',
  'Zapier AI', 'Make.com', 'Apify', 'BrowseAI', 'Perplexity Pro',
  'Snyk AI', 'Semgrep', 'SonarQube', 'Loom AI', 'Buffer AI',
]

const gradientOptions = [
  { label: 'Pink', value: 'from-pink-400 to-rose-500' },
  { label: 'Indigo', value: 'from-indigo-400 to-violet-500' },
  { label: 'Emerald', value: 'from-emerald-400 to-teal-500' },
  { label: 'Blue', value: 'from-blue-400 to-cyan-500' },
  { label: 'Orange', value: 'from-orange-400 to-amber-500' },
  { label: 'Purple', value: 'from-purple-400 to-fuchsia-500' },
  { label: 'Yellow', value: 'from-yellow-400 to-orange-500' },
  { label: 'Teal', value: 'from-teal-400 to-emerald-500' },
  { label: 'Rose', value: 'from-rose-400 to-pink-500' },
  { label: 'Slate', value: 'from-slate-400 to-gray-600' },
]

function emptyRole() {
  return { title: '', description: '', tools: [], tokenAllocation: '' }
}

export default function CreateStartupPage({ onBack }) {
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(null)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Creative')
  const [tokenName, setTokenName] = useState('')
  const [website, setWebsite] = useState('')
  const [vestingSchedule, setVestingSchedule] = useState('')
  const [visibility, setVisibility] = useState('public')
  const [gradient, setGradient] = useState(gradientOptions[0].value)
  const [roles, setRoles] = useState([emptyRole()])

  const [toolSearch, setToolSearch] = useState('')
  const [activeRoleToolIdx, setActiveRoleToolIdx] = useState(null)

  const updateRole = (idx, field, value) => {
    setRoles(prev => prev.map((r, i) => i === idx ? { ...r, [field]: value } : r))
  }

  const addToolToRole = (idx, tool) => {
    setRoles(prev => prev.map((r, i) => {
      if (i !== idx) return r
      if (r.tools.includes(tool)) return r
      return { ...r, tools: [...r.tools, tool] }
    }))
    setToolSearch('')
  }

  const removeToolFromRole = (idx, tool) => {
    setRoles(prev => prev.map((r, i) => {
      if (i !== idx) return r
      return { ...r, tools: r.tools.filter(t => t !== tool) }
    }))
  }

  const addRole = () => setRoles(prev => [...prev, emptyRole()])
  const removeRole = (idx) => setRoles(prev => prev.filter((_, i) => i !== idx))

  const canSubmit = name && description && tokenName && website && vestingSchedule &&
    roles.every(r => r.title && r.description && r.tokenAllocation)

  const generateInstructions = (role) => {
    return `You are joining ${name} as a ${role.title}.

Company: ${name} — ${description}
Category: ${category}
Website: ${website}
Token: $${tokenName.replace(/^\$/, '')}
Vesting: ${vestingSchedule}
Revenue model: 100% of revenue is used to buy back the $${tokenName.replace(/^\$/, '')} token.

Your role: ${role.title}
Description: ${role.description}
Required tools: ${role.tools.length > 0 ? role.tools.join(', ') : 'None specified'}
Token reward: ${role.tokenAllocation} $${tokenName.replace(/^\$/, '')}

To begin working, visit ${website} and follow the onboarding instructions.`
  }

  const handleCopy = async (text, roleIdx) => {
    await navigator.clipboard.writeText(text)
    setCopied(roleIdx)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleSubmit = () => {
    if (canSubmit) setSubmitted(true)
  }

  const inputClass = 'w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100'

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={onBack}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Startups
          </button>
          <h1 className="text-sm font-bold text-slate-900">Create a Startup</h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {!submitted ? (
          <>
            {/* Startup Details */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Startup Details</h2>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Startup Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)}
                    placeholder="e.g. AI Design Studio" className={inputClass} />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">What does this startup do?</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)}
                    placeholder="Describe the products or services your AI agents will create..."
                    rows={3} className={inputClass + ' resize-none'} />
                </div>

                {/* Category + Color */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                    <select value={category} onChange={e => setCategory(e.target.value)} className={inputClass}>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Brand Color</label>
                    <div className="flex flex-wrap gap-2">
                      {gradientOptions.map(g => (
                        <button key={g.value} onClick={() => setGradient(g.value)}
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${g.value} transition-all ${
                            gradient === g.value ? 'ring-2 ring-indigo-500 ring-offset-2 scale-110' : 'hover:scale-105'
                          }`} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Token Name + Website */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Token Name</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-mono">$</span>
                      <input type="text" value={tokenName} onChange={e => setTokenName(e.target.value.toUpperCase())}
                        placeholder="MYTOKEN" className={inputClass + ' pl-7 font-mono'} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Company Website</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input type="url" value={website} onChange={e => setWebsite(e.target.value)}
                        placeholder="https://mycompany.valley" className={inputClass + ' pl-9'} />
                    </div>
                  </div>
                </div>

                {/* Vesting Schedule */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Vesting Schedule</label>
                  <input type="text" value={vestingSchedule} onChange={e => setVestingSchedule(e.target.value)}
                    placeholder="e.g. 4 months, 25% monthly" className={inputClass} />
                </div>

                {/* Creation Cost Banner */}
                <div className="flex items-start gap-3 px-4 py-3 bg-amber-50 rounded-lg border border-amber-100">
                  <Coins className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-amber-900">Startup Creation Cost</p>
                    <p className="text-xs text-amber-700 mt-0.5">
                      Creating a startup costs <strong>500 $PROMPT</strong> (Wayfinder). This covers token deployment and initial bonding curve setup.
                    </p>
                  </div>
                </div>

                {/* Revenue Model Banner */}
                <div className="flex items-start gap-3 px-4 py-3 bg-indigo-50 rounded-lg border border-indigo-100">
                  <Info className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-indigo-900">100% Revenue Buyback</p>
                    <p className="text-xs text-indigo-600 mt-0.5">
                      All revenue generated by this startup will be used to buy back {tokenName ? `$${tokenName.replace(/^\$/, '')}` : 'your'} tokens from the open market, increasing token value for all holders.
                    </p>
                  </div>
                </div>

                {/* Graduation Fee Banner */}
                <div className="flex items-start gap-3 px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                  <Info className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Graduation Fee</p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Upon graduation (bonding curve reaches $100K), <strong>3% of the total token supply</strong> is allocated to AgentValley as a platform fee.
                    </p>
                  </div>
                </div>

                {/* Job Visibility */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Job Visibility</label>
                  <div className="flex items-center gap-2">
                    {[
                      { key: 'public', label: 'Public', icon: Unlock, desc: 'Anyone can see and apply' },
                      { key: 'private', label: 'Private', icon: Lock, desc: 'Invite only' },
                    ].map(v => (
                      <button key={v.key} onClick={() => setVisibility(v.key)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          visibility === v.key
                            ? 'bg-indigo-500 text-white'
                            : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                        }`}>
                        <v.icon className="w-3.5 h-3.5" />
                        {v.label}
                      </button>
                    ))}
                    <span className="text-xs text-slate-400 ml-2">
                      {visibility === 'public' ? 'Anyone can see and apply to roles' : 'Only invited agents can join'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Roles */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900">Open Roles ({roles.length})</h2>
                <button onClick={addRole}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                  Add Role
                </button>
              </div>

              <div className="space-y-6">
                {roles.map((role, idx) => (
                  <div key={idx} className="border border-slate-100 rounded-lg p-5 relative">
                    {roles.length > 1 && (
                      <button onClick={() => removeRole(idx)}
                        className="absolute top-3 right-3 p-1 text-slate-300 hover:text-red-500 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    )}

                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Role {idx + 1}</p>

                    <div className="space-y-4">
                      {/* Title */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Job Title</label>
                        <input type="text" value={role.title} onChange={e => updateRole(idx, 'title', e.target.value)}
                          placeholder="e.g. Frontend Engineer" className={inputClass} />
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Job Description</label>
                        <textarea value={role.description} onChange={e => updateRole(idx, 'description', e.target.value)}
                          placeholder="What will this agent do in this role?"
                          rows={2} className={inputClass + ' resize-none'} />
                      </div>

                      {/* Permissions / Tools */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Required Permissions</label>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {role.tools.map(tool => (
                            <span key={tool} className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-600 text-xs font-medium rounded-full">
                              {tool}
                              <button onClick={() => removeToolFromRole(idx, tool)} className="hover:text-red-500">
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="relative">
                          <input type="text" value={activeRoleToolIdx === idx ? toolSearch : ''}
                            onFocus={() => setActiveRoleToolIdx(idx)}
                            onChange={e => { setToolSearch(e.target.value); setActiveRoleToolIdx(idx) }}
                            placeholder="Search tools to add..."
                            className={inputClass} />
                          {activeRoleToolIdx === idx && toolSearch && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-40 overflow-y-auto z-10">
                              {availableTools
                                .filter(t => t.toLowerCase().includes(toolSearch.toLowerCase()) && !role.tools.includes(t))
                                .slice(0, 8)
                                .map(tool => (
                                  <button key={tool} onClick={() => addToolToRole(idx, tool)}
                                    className="block w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                                    {tool}
                                  </button>
                                ))}
                              {availableTools.filter(t => t.toLowerCase().includes(toolSearch.toLowerCase()) && !role.tools.includes(t)).length === 0 && (
                                <p className="px-3 py-2 text-sm text-slate-400">No matching tools</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Token Allocation */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Token Allocation</label>
                        <div className="relative">
                          <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-500" />
                          <input type="text" value={role.tokenAllocation} onChange={e => updateRole(idx, 'tokenAllocation', e.target.value)}
                            placeholder="e.g. 5,000" className={inputClass + ' pl-9'} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button onClick={handleSubmit} disabled={!canSubmit}
              className={`w-full py-3.5 rounded-full text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                canSubmit
                  ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:shadow-xl hover:shadow-indigo-500/25 cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}>
              Create Startup
            </button>
          </>
        ) : (
          /* ===== PREVIEW / SUBMITTED STATE ===== */
          <>
            {/* Startup Summary */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0`}>
                  <span className="text-white text-sm font-bold">
                    {name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{name}</h2>
                  <p className="text-sm text-slate-500">{description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-slate-400 text-xs">Category</p>
                  <p className="font-semibold text-slate-900">{category}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Token</p>
                  <p className="font-mono font-semibold text-indigo-600">${tokenName.replace(/^\$/, '')}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Vesting</p>
                  <p className="font-semibold text-slate-900">{vestingSchedule}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Visibility</p>
                  <p className="font-semibold text-slate-900 flex items-center gap-1">
                    {visibility === 'public' ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                    {visibility === 'public' ? 'Public' : 'Private'}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Website</p>
                  <p className="font-semibold text-indigo-500">{website}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Open Roles</p>
                  <p className="font-semibold text-slate-900">{roles.length}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-slate-400 text-xs">Revenue Model</p>
                  <p className="font-semibold text-emerald-600">100% buyback → ${tokenName.replace(/^\$/, '')}</p>
                </div>
              </div>
            </div>

            {/* Agent Instructions per role */}
            <h3 className="text-lg font-bold text-slate-900 mb-4">Agent Instructions</h3>
            <p className="text-sm text-slate-500 mb-6">
              Share these instructions with anyone — they can paste them into Claude or any AI agent to join your team.
            </p>

            {roles.map((role, idx) => {
              const instructions = generateInstructions(role)
              return (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                        <span className="text-white text-[8px] font-bold">{idx + 1}</span>
                      </div>
                      <h4 className="font-semibold text-slate-900">{role.title}</h4>
                    </div>
                    <button onClick={() => handleCopy(instructions, idx)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        copied === idx
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                      }`}>
                      {copied === idx ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied === idx ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="bg-slate-50 rounded-lg p-4 text-xs text-slate-700 font-mono whitespace-pre-wrap overflow-x-auto border border-slate-100 leading-relaxed">
                    {instructions}
                  </pre>
                </div>
              )
            })}

            {/* Edit / Back */}
            <div className="flex items-center gap-3 mt-6">
              <button onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-full hover:bg-slate-50 transition-colors cursor-pointer">
                Edit Startup
              </button>
              <button onClick={onBack}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-indigo-500/25 transition-all cursor-pointer">
                Back to Startups
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

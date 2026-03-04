import { useState } from 'react'
import { ArrowLeft, Search, ChevronUp, ChevronDown, Clock, Coins, Rocket } from 'lucide-react'
import { jobs } from '../data/jobs'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const columns = [
  { key: 'startup', label: 'Startup' },
  { key: 'title', label: 'Job Title' },
  { key: 'skills', label: 'Permissions' },
  { key: 'vestingSchedule', label: 'Vesting' },
  { key: 'tokenAllocation', label: 'Token Reward' },
  { key: 'urgency', label: 'Urgency' },
  { key: 'postedDate', label: 'Posted' },
  { key: 'action', label: '' },
]

export default function AgentJobsPage({ onBack }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [sortKey, setSortKey] = useState('postedDate')
  const [sortDir, setSortDir] = useState('desc')

  const handleSort = (key) => {
    if (key === 'action' || key === 'skills') return
    if (sortKey === key) {
      setSortDir(d => d === 'desc' ? 'asc' : 'desc')
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  let filtered = jobs.filter(j => {
    const q = search.toLowerCase()
    const matchesSearch = !q || j.startupName.toLowerCase().includes(q) ||
      j.title.toLowerCase().includes(q) || j.skills.join(' ').toLowerCase().includes(q) ||
      j.tokenAllocation.toLowerCase().includes(q)
    const matchesFilter = filter === 'all' ||
      (filter === 'high' && j.urgency === 'high') ||
      (filter === 'medium' && j.urgency === 'medium') ||
      (filter === 'low' && j.urgency === 'low')
    return matchesSearch && matchesFilter
  })

  filtered.sort((a, b) => {
    let av, bv
    switch (sortKey) {
      case 'startup': av = a.startupName; bv = b.startupName; return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
      case 'title': av = a.title; bv = b.title; return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
      case 'vestingSchedule': av = a.vestingSchedule; bv = b.vestingSchedule; return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
      case 'tokenAllocation': av = a.tokenAllocation; bv = b.tokenAllocation; return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
      case 'urgency': {
        const map = { high: 3, medium: 2, low: 1 }
        av = map[a.urgency]; bv = map[b.urgency]; break
      }
      case 'postedDate': av = new Date(a.postedDate).getTime(); bv = new Date(b.postedDate).getTime(); break
      default: av = new Date(a.postedDate).getTime(); bv = new Date(b.postedDate).getTime()
    }
    return sortDir === 'asc' ? av - bv : bv - av
  })

  const uniqueStartups = new Set(jobs.map(j => j.startupId)).size
  const urgentCount = jobs.filter(j => j.urgency === 'high').length

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={onBack}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Home
          </button>
          <h1 className="text-sm font-bold text-slate-900">Agent Jobs</h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Title row */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-6">
            <h2 className="text-2xl font-extrabold text-slate-900">Agent Jobs</h2>
            <div className="hidden sm:flex items-center gap-4 text-sm text-slate-500">
              <span><strong className="text-slate-900">{jobs.length}</strong> open roles</span>
              <span className="text-slate-300">|</span>
              <span><strong className="text-slate-900">{uniqueStartups}</strong> startups hiring</span>
              <span className="text-slate-300">|</span>
              <span><strong className="text-red-500">{urgentCount}</strong> urgent</span>
            </div>
          </div>

          <button className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap">
            <Rocket className="w-4 h-4" />
            Deploy Your Agent
          </button>
        </div>

        {/* Filters row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-48 pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div className="flex items-center gap-1">
              {[
                { key: 'all', label: 'All' },
                { key: 'high', label: 'Urgent' },
                { key: 'medium', label: 'Medium' },
                { key: 'low', label: 'Open' },
              ].map(f => (
                <button key={f.key} onClick={() => setFilter(f.key)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    filter === f.key
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100'
                  }`}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  {columns.map(col => (
                    <th key={col.key}
                      onClick={() => handleSort(col.key)}
                      className={`px-4 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap ${
                        col.key !== 'action' && col.key !== 'skills' ? 'cursor-pointer hover:text-slate-600 select-none' : ''
                      }`}>
                      <div className="flex items-center gap-1">
                        {col.label}
                        {sortKey === col.key && (
                          sortDir === 'desc'
                            ? <ChevronDown className="w-3 h-3 text-indigo-500" />
                            : <ChevronUp className="w-3 h-3 text-indigo-500" />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((j, i) => (
                  <tr key={j.id}
                    className={`border-b border-slate-50 hover:bg-indigo-50/30 transition-colors ${
                      i === filtered.length - 1 ? 'border-b-0' : ''
                    }`}>
                    {/* Startup */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${j.gradient} flex items-center justify-center shrink-0`}>
                          <span className="text-white text-[10px] font-bold">
                            {j.startupName.split(' ').map(w => w[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 truncate">{j.startupName}</p>
                          <p className="text-[11px] text-slate-400 truncate">{j.startupDescription}</p>
                        </div>
                      </div>
                    </td>

                    {/* Job Title */}
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-slate-900 whitespace-nowrap">{j.title}</p>
                      <p className="text-[11px] text-slate-400 truncate max-w-[200px]">{j.description}</p>
                    </td>

                    {/* Skills */}
                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {j.skills.slice(0, 3).map(skill => (
                          <span key={skill} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-medium rounded-full whitespace-nowrap">
                            {skill}
                          </span>
                        ))}
                        {j.skills.length > 3 && (
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-medium rounded-full">
                            +{j.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Vesting */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {j.vestingSchedule}
                      </div>
                    </td>

                    {/* Token Reward */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Coins className="w-3 h-3 text-amber-500" />
                        <span className="font-mono font-semibold text-indigo-600 text-xs">{j.tokenAllocation}</span>
                      </div>
                    </td>

                    {/* Urgency */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {j.urgency === 'high' ? (
                        <span className="inline-flex items-center px-2 py-0.5 bg-red-50 text-red-600 text-[11px] font-semibold rounded-md">
                          Urgent
                        </span>
                      ) : j.urgency === 'medium' ? (
                        <span className="inline-flex items-center px-2 py-0.5 bg-amber-50 text-amber-700 text-[11px] font-semibold rounded-md">
                          Medium
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[11px] font-semibold rounded-md">
                          Open
                        </span>
                      )}
                    </td>

                    {/* Posted */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="text-slate-600 text-xs">{formatDate(j.postedDate)}</span>
                    </td>

                    {/* Join */}
                    <td className="px-4 py-3.5">
                      <button className="py-1.5 px-3 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer text-center">
                        Join
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-400">No jobs match your search.</p>
            </div>
          )}
        </div>

        {/* Mobile cards fallback */}
        <div className="sm:hidden mt-6 space-y-3">
          <p className="text-xs text-slate-400 text-center">Scroll table horizontally, or view cards below</p>
          {filtered.map(j => (
            <div key={j.id} className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${j.gradient} flex items-center justify-center shrink-0`}>
                  <span className="text-white text-[10px] font-bold">
                    {j.startupName.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 text-sm">{j.title}</p>
                  <p className="text-[11px] text-slate-400">{j.startupName}</p>
                </div>
                {j.urgency === 'high' ? (
                  <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-semibold rounded-md">Urgent</span>
                ) : j.urgency === 'medium' ? (
                  <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-semibold rounded-md">Medium</span>
                ) : (
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-semibold rounded-md">Open</span>
                )}
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {j.skills.map(skill => (
                  <span key={skill} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-medium rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-slate-400">Vesting</p>
                  <p className="font-semibold text-slate-900">{j.vestingSchedule}</p>
                </div>
                <div>
                  <p className="text-slate-400">Reward</p>
                  <p className="font-mono font-semibold text-indigo-600">{j.tokenAllocation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

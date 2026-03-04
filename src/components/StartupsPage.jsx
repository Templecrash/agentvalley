import { useState } from 'react'
import { ArrowLeft, ExternalLink, TrendingUp, TrendingDown, Search, ChevronUp, ChevronDown, Plus } from 'lucide-react'
import { startups } from '../data/startups'
import BuyModal from './BuyModal'

function formatCurrency(n) {
  if (n >= 1000000) return '$' + (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return '$' + (n / 1000).toFixed(0) + 'K'
  return '$' + n
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

const columns = [
  { key: 'name', label: 'Startup' },
  { key: 'agents', label: 'Agents' },
  { key: 'founded', label: 'Founded' },
  { key: 'revenue', label: 'Revenue' },
  { key: 'tokenName', label: 'Token' },
  { key: 'mcap', label: 'MCAP' },
  { key: 'tokenPrice', label: 'Price' },
  { key: 'priceChange24h', label: '24h ($)' },
  { key: 'priceChangePercent', label: '24h (%)' },
  { key: 'graduated', label: 'Status' },
  { key: 'product', label: 'Product' },
  { key: 'action', label: '' },
]

export default function StartupsPage({ onBack, onNavigate }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [sortKey, setSortKey] = useState('revenue')
  const [sortDir, setSortDir] = useState('desc')
  const [buyStartup, setBuyStartup] = useState(null)

  const handleSort = (key) => {
    if (key === 'product') return
    if (sortKey === key) {
      setSortDir(d => d === 'desc' ? 'asc' : 'desc')
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  let filtered = startups.filter(s => {
    const q = search.toLowerCase()
    const matchesSearch = !q || s.name.toLowerCase().includes(q) ||
      s.tag.toLowerCase().includes(q) || s.tokenName.toLowerCase().includes(q)
    const matchesFilter = filter === 'all' ||
      (filter === 'graduated' && s.graduated) ||
      (filter === 'incubating' && !s.graduated)
    return matchesSearch && matchesFilter
  })

  filtered.sort((a, b) => {
    let av, bv
    switch (sortKey) {
      case 'name': av = a.name; bv = b.name; return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
      case 'agents': av = a.agents; bv = b.agents; break
      case 'founded': av = new Date(a.founded).getTime(); bv = new Date(b.founded).getTime(); break
      case 'revenue': av = a.revenue; bv = b.revenue; break
      case 'tokenPrice': av = a.tokenPrice || 0; bv = b.tokenPrice || 0; break
      case 'mcap': av = a.mcap || 0; bv = b.mcap || 0; break
      case 'priceChange24h': av = a.priceChange24h || 0; bv = b.priceChange24h || 0; break
      case 'priceChangePercent': av = a.priceChangePercent || 0; bv = b.priceChangePercent || 0; break
      case 'graduated': av = a.graduated ? 1 : 0; bv = b.graduated ? 1 : 0; break
      default: av = a.revenue; bv = b.revenue
    }
    return sortDir === 'asc' ? av - bv : bv - av
  })

  const totalRevenue = startups.reduce((sum, s) => sum + s.revenue, 0)
  const totalAgents = startups.reduce((sum, s) => sum + s.agents, 0)
  const graduatedCount = startups.filter(s => s.graduated).length

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
          <h1 className="text-sm font-bold text-slate-900">AgentValley Startups</h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Title row */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-6">
            <h2 className="text-2xl font-extrabold text-slate-900">Startups</h2>
            <div className="hidden sm:flex items-center gap-4 text-sm text-slate-500">
              <span><strong className="text-slate-900">{startups.length}</strong> startups</span>
              <span className="text-slate-300">|</span>
              <span><strong className="text-slate-900">{totalAgents}</strong> agents</span>
              <span className="text-slate-300">|</span>
              <span><strong className="text-slate-900">{formatCurrency(totalRevenue)}</strong> revenue</span>
              <span className="text-slate-300">|</span>
              <span><strong className="text-emerald-600">{graduatedCount}</strong> graduated</span>
            </div>
          </div>

          <button onClick={() => onNavigate('createStartup')} className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap">
            <Plus className="w-4 h-4" />
            Create an AI Startup
          </button>
        </div>

        {/* Filters row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-48 pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
            <div className="flex items-center gap-1">
              {['all', 'graduated', 'incubating'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    filter === f
                      ? 'bg-indigo-500 text-white'
                      : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100'
                  }`}>
                  {f === 'all' ? 'All' : f === 'graduated' ? 'Graduated' : 'Incubating'}
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
                        col.key !== 'product' ? 'cursor-pointer hover:text-slate-600 select-none' : ''
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
                {filtered.map((s, i) => (
                  <tr key={s.id}
                    className={`border-b border-slate-50 hover:bg-indigo-50/30 transition-colors ${
                      i === filtered.length - 1 ? 'border-b-0' : ''
                    }`}>
                    {/* Startup name + tag */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.gradient} flex items-center justify-center shrink-0`}>
                          <span className="text-white text-[10px] font-bold">
                            {s.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 truncate">{s.name}</p>
                          <p className="text-[11px] text-slate-400 truncate">{s.description}</p>
                        </div>
                      </div>
                    </td>

                    {/* Agents */}
                    <td className="px-4 py-3.5 text-center">
                      <span className="font-semibold text-slate-900">{s.agents}</span>
                    </td>

                    {/* Founded */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="text-slate-600">{formatDate(s.founded)}</span>
                    </td>

                    {/* Revenue */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="font-semibold text-slate-900">{formatCurrency(s.revenue)}</span>
                    </td>

                    {/* Token */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className="font-mono font-semibold text-indigo-600 text-xs">{s.tokenName}</span>
                    </td>

                    {/* MCAP */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {s.mcap !== null ? (
                        <span className="font-semibold text-slate-900">{formatCurrency(s.mcap)}</span>
                      ) : s.bondingCurve != null ? (
                        <div className="min-w-[100px]">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-semibold text-amber-600">{Math.round(s.bondingCurve / 1000)}K / 100K</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all"
                              style={{ width: `${(s.bondingCurve / 100000) * 100}%` }} />
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {s.tokenPrice !== null ? (
                        <span className="font-semibold text-slate-900">${s.tokenPrice.toFixed(3)}</span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>

                    {/* 24h $ change */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {s.priceChange24h !== null ? (
                        <span className={`flex items-center gap-0.5 font-semibold text-xs ${
                          s.priceChange24h >= 0 ? 'text-emerald-600' : 'text-red-500'
                        }`}>
                          {s.priceChange24h >= 0 ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {s.priceChange24h >= 0 ? '+' : ''}${Math.abs(s.priceChange24h).toFixed(4)}
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>

                    {/* 24h % change */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {s.priceChangePercent !== null ? (
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${
                          s.priceChangePercent >= 0
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-red-50 text-red-600'
                        }`}>
                          {s.priceChangePercent >= 0 ? '+' : ''}{s.priceChangePercent}%
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {s.graduated ? (
                        <span className="inline-flex items-center px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[11px] font-semibold rounded-md">
                          Graduated
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 bg-amber-50 text-amber-700 text-[11px] font-semibold rounded-md">
                          Incubating
                        </span>
                      )}
                    </td>

                    {/* Product link */}
                    <td className="px-4 py-3.5">
                      <a href={s.productUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-indigo-500 hover:text-indigo-700 transition-colors whitespace-nowrap">
                        Visit
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>

                    {/* Action button */}
                    <td className="px-4 py-3.5">
                      {s.graduated ? (
                        <button onClick={() => setBuyStartup(s)} className="w-[72px] py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer text-center">
                          Buy
                        </button>
                      ) : (
                        <button onClick={() => setBuyStartup(s)} className="w-[72px] py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer text-center">
                          Invest
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-400">No startups match your search.</p>
            </div>
          )}
        </div>

        {/* Mobile cards fallback */}
        <div className="sm:hidden mt-6 space-y-3">
          <p className="text-xs text-slate-400 text-center">Scroll table horizontally, or view cards below</p>
          {filtered.map(s => (
            <div key={s.id} className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.gradient} flex items-center justify-center shrink-0`}>
                  <span className="text-white text-[10px] font-bold">
                    {s.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{s.name}</p>
                  <p className="text-[11px] text-slate-400">{s.tag}</p>
                </div>
                {s.graduated ? (
                  <span className="ml-auto px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-semibold rounded-md">Grad</span>
                ) : (
                  <span className="ml-auto px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-semibold rounded-md">Incub</span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <p className="text-slate-400">Agents</p>
                  <p className="font-semibold text-slate-900">{s.agents}</p>
                </div>
                <div>
                  <p className="text-slate-400">Revenue</p>
                  <p className="font-semibold text-slate-900">{formatCurrency(s.revenue)}</p>
                </div>
                <div>
                  <p className="text-slate-400">Token</p>
                  <p className="font-mono font-semibold text-indigo-600">{s.tokenName}</p>
                </div>
                <div>
                  <p className="text-slate-400">MCAP</p>
                  {s.mcap ? (
                    <p className="font-semibold text-slate-900">{formatCurrency(s.mcap)}</p>
                  ) : s.bondingCurve != null ? (
                    <div>
                      <p className="text-[10px] font-semibold text-amber-600 mb-0.5">{Math.round(s.bondingCurve / 1000)}K / 100K</p>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                          style={{ width: `${(s.bondingCurve / 100000) * 100}%` }} />
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-300">—</p>
                  )}
                </div>
                <div>
                  <p className="text-slate-400">Price</p>
                  <p className="font-semibold text-slate-900">{s.tokenPrice ? `$${s.tokenPrice.toFixed(3)}` : '—'}</p>
                </div>
                <div>
                  <p className="text-slate-400">24h</p>
                  {s.priceChange24h !== null ? (
                    <p className={`font-semibold ${s.priceChange24h >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                      {s.priceChange24h >= 0 ? '+' : ''}${Math.abs(s.priceChange24h).toFixed(4)}
                    </p>
                  ) : <p className="text-slate-300">—</p>}
                </div>
                <div>
                  <p className="text-slate-400">24h %</p>
                  {s.priceChangePercent !== null ? (
                    <p className={`font-semibold ${s.priceChangePercent >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                      {s.priceChangePercent >= 0 ? '+' : ''}{s.priceChangePercent}%
                    </p>
                  ) : <p className="text-slate-300">—</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {buyStartup && <BuyModal startup={buyStartup} onClose={() => setBuyStartup(null)} />}
    </div>
  )
}

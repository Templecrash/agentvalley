import { useState } from 'react'
import { X, Check } from 'lucide-react'

const wallets = [
  {
    name: 'MetaMask',
    icon: '🦊',
    color: 'from-orange-400 to-amber-500',
    desc: 'Popular browser extension wallet',
  },
  {
    name: 'Phantom',
    icon: '👻',
    color: 'from-purple-500 to-violet-600',
    desc: 'Solana & multi-chain wallet',
  },
  {
    name: 'WalletConnect',
    icon: '🔗',
    color: 'from-blue-400 to-cyan-500',
    desc: 'Connect via QR code',
  },
  {
    name: 'Coinbase Wallet',
    icon: '🔵',
    color: 'from-blue-500 to-indigo-600',
    desc: 'By Coinbase',
  },
  {
    name: 'Rabby',
    icon: '🐰',
    color: 'from-indigo-400 to-violet-500',
    desc: 'Smart multi-chain wallet',
  },
]

export default function WalletModal({ onClose }) {
  const [connecting, setConnecting] = useState(null)
  const [connected, setConnected] = useState(null)

  const handleConnect = (wallet) => {
    setConnecting(wallet.name)
    setTimeout(() => {
      setConnecting(null)
      setConnected(wallet.name)
      setTimeout(() => onClose(wallet.name), 1200)
    }, 1500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900">Connect Wallet</h3>
          <button onClick={() => onClose(null)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wallet list */}
        <div className="px-4 py-4 space-y-2">
          {wallets.map(wallet => (
            <button key={wallet.name} onClick={() => handleConnect(wallet)}
              disabled={connecting !== null || connected !== null}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                connected === wallet.name
                  ? 'bg-emerald-50 border border-emerald-200'
                  : connecting === wallet.name
                    ? 'bg-indigo-50 border border-indigo-200'
                    : 'bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 cursor-pointer'
              }`}>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${wallet.color} flex items-center justify-center text-lg shrink-0`}>
                {wallet.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900">{wallet.name}</p>
                <p className="text-[11px] text-slate-400">{wallet.desc}</p>
              </div>
              {connecting === wallet.name && (
                <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin shrink-0" />
              )}
              {connected === wallet.name && (
                <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100">
          <p className="text-[11px] text-slate-400 text-center">
            By connecting, you agree to the AgentValley Terms of Service
          </p>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { X, Info, Check, Coins } from 'lucide-react'

export default function BuyModal({ startup, onClose }) {
  const [amount, setAmount] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const numAmount = parseFloat(amount) || 0
  const price = startup.tokenPrice || 0
  const subtotal = numAmount * price
  const fee = subtotal * 0.0025
  const total = subtotal + fee

  const handleConfirm = () => {
    if (numAmount > 0) {
      setConfirmed(true)
      setTimeout(() => onClose(), 1500)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${startup.gradient} flex items-center justify-center`}>
              <span className="text-white text-xs font-bold">
                {startup.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-slate-900">
                {startup.graduated ? 'Buy' : 'Invest in'} {startup.tokenName}
              </h3>
              <p className="text-xs text-slate-400">{startup.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Pay with */}
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Pay with</label>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">W</span>
              </div>
              <span className="text-sm font-semibold text-slate-900">$PROMPT</span>
              <span className="text-xs text-slate-400 ml-auto">Wayfinder</span>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">
              Amount of {startup.tokenName}
            </label>
            <div className="relative">
              <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
              <input
                type="number"
                min="0"
                step="any"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                autoFocus
              />
            </div>
            {price > 0 && (
              <p className="text-[11px] text-slate-400 mt-1">
                Price: ${price.toFixed(3)} per {startup.tokenName}
              </p>
            )}
          </div>

          {/* Calculation */}
          {numAmount > 0 && (
            <div className="bg-slate-50 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-medium text-slate-900">{subtotal.toFixed(4)} $PROMPT</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Fee (0.25%) 🔥</span>
                <span className="font-medium text-amber-600">{fee.toFixed(4)} $PROMPT</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-900">Total</span>
                <span className="font-bold text-indigo-600">{total.toFixed(4)} $PROMPT</span>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="flex items-start gap-2.5 px-3 py-2.5 bg-indigo-50 rounded-lg border border-indigo-100">
            <Info className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
            <p className="text-[11px] text-indigo-600 leading-relaxed">
              All transactions are settled in Wayfinder <strong>$PROMPT</strong>. The 0.25% fee is burned 🔥 on every transaction.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center gap-3">
          {!confirmed ? (
            <>
              <button onClick={handleConfirm} disabled={numAmount <= 0}
                className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  numAmount > 0
                    ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:shadow-lg hover:shadow-indigo-500/25 cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}>
                Confirm Purchase
              </button>
              <button onClick={onClose}
                className="px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
                Cancel
              </button>
            </>
          ) : (
            <div className="flex-1 py-2.5 bg-emerald-50 text-emerald-600 rounded-full text-sm font-semibold flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              Purchase submitted!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'

function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * target))
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      }
    }, { threshold: 0.5 })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return [count, ref]
}

const metrics = [
  { value: 12400, suffix: '+', label: 'Agents Deployed' },
  { value: 340, suffix: '+', label: 'Startups Running' },
  { value: 89000, suffix: '+', label: 'Products Created' },
  { value: 2400000, suffix: '', label: 'Tokens Distributed', format: true },
]

function formatNumber(n, format) {
  if (format && n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '') + (n >= 1000000 ? 'M' : 'K')
  return n.toString()
}

function StatItem({ value, suffix, label, format }) {
  const [count, ref] = useCountUp(value)
  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-2">
        {formatNumber(count, format)}{suffix}
      </p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="py-24 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {metrics.map((m, i) => (
            <StatItem key={i} {...m} />
          ))}
        </div>
      </div>
    </section>
  )
}

import { analytics } from '@launchfury/analytics'

const INGEST_HOST = 'https://launchfury.com'

let initialized = false

function getWriteKey() {
  return import.meta.env.VITE_LAUNCHFURY_ANALYTICS_WRITE_KEY
}

export function initAnalytics() {
  if (initialized) return
  const writeKey = getWriteKey()
  if (!writeKey) return
  initialized = true
  analytics.init({ writeKey, host: INGEST_HOST })
}

export function track(event, properties) {
  if (!initialized) return
  analytics.capture(event, properties)
}

export function trackPage(page, properties) {
  track('page_viewed', { page, ...properties })
}

import { beforeEach, describe, expect, it, vi } from 'vitest'

const { analyticsMock } = vi.hoisted(() => ({
  analyticsMock: {
    init: vi.fn(),
    capture: vi.fn(),
    identify: vi.fn(),
    reset: vi.fn(),
  },
}))

vi.mock('@launchfury/analytics', () => ({
  analytics: analyticsMock,
}))

async function loadModule() {
  return import('./analytics.js')
}

describe('analytics', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.unstubAllEnvs()
    vi.clearAllMocks()
  })

  it('initializes once with the browser write key and canonical ingest host', async () => {
    vi.stubEnv('VITE_LAUNCHFURY_ANALYTICS_WRITE_KEY', 'test-write-key')
    const { initAnalytics } = await loadModule()

    initAnalytics()
    initAnalytics()

    expect(analyticsMock.init).toHaveBeenCalledTimes(1)
    expect(analyticsMock.init).toHaveBeenCalledWith({
      writeKey: 'test-write-key',
      host: 'https://launchfury.com',
    })
  })

  it('does not initialize when no write key is configured', async () => {
    const { initAnalytics } = await loadModule()

    initAnalytics()

    expect(analyticsMock.init).not.toHaveBeenCalled()
  })

  it('forwards tracked events to the SDK after init', async () => {
    vi.stubEnv('VITE_LAUNCHFURY_ANALYTICS_WRITE_KEY', 'test-write-key')
    const { initAnalytics, track } = await loadModule()
    initAnalytics()

    track('create_startup_submitted', { category: 'Analytics', roles: 1 })

    expect(analyticsMock.capture).toHaveBeenCalledWith('create_startup_submitted', {
      category: 'Analytics',
      roles: 1,
    })
  })

  it('records page views with a page name', async () => {
    vi.stubEnv('VITE_LAUNCHFURY_ANALYTICS_WRITE_KEY', 'test-write-key')
    const { initAnalytics, trackPage } = await loadModule()
    initAnalytics()

    trackPage('startups')

    expect(analyticsMock.capture).toHaveBeenCalledWith('page_viewed', { page: 'startups' })
  })

  it('no-ops tracking before init', async () => {
    const { track } = await loadModule()

    track('any_event')

    expect(analyticsMock.capture).not.toHaveBeenCalled()
  })
})

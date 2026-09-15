import { article } from './data/article'

export const pageRoutes = {
  home: '/',
  startups: '/startups',
  createStartup: '/create-startup',
  jobs: '/agent-jobs',
  article: article.path,
}

export function pageFromPath(pathname) {
  const normalized = pathname.replace(/\/+$/, '') || '/'
  const match = Object.entries(pageRoutes).find(([, path]) => path === normalized)
  return match ? match[0] : 'home'
}

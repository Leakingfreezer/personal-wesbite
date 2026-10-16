import { createBrowserRouter } from 'react-router'
import SiteLayout from './components/layout/SiteLayout'
import HomePage, { homeLoader } from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import RouteErrorPage from './pages/RouteErrorPage'

/**
 * Every URL the site responds to lives here.
 * `errorElement` on each page keeps the nav visible when a page fails or a slug doesn't exist.
 */
export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    // Shown for a moment on first visit while the page's data loads (e.g. opening a case-study link directly).
    hydrateFallbackElement: <div aria-busy="true" className="min-h-svh" />,
    children: [
      { index: true, element: <HomePage />, loader: homeLoader, errorElement: <RouteErrorPage /> },
      {
        // One template for every case study. `lazy` downloads its code only when someone
        // opens a case study, so the homepage stays small and fast.
        path: 'work/:slug',
        lazy: async () => {
          const { default: Component, caseStudyLoader } = await import('./pages/CaseStudyPage')
          return { Component, loader: caseStudyLoader }
        },
        errorElement: <RouteErrorPage />,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

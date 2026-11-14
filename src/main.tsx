import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { Analytics } from '@vercel/analytics/react'
import { router } from './router'
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* Visitor counts → Vercel dashboard → your project → Analytics tab. Renders nothing visible. */}
    <Analytics />
  </StrictMode>,
)

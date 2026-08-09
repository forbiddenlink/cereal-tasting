import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/index.css'

async function bootAnalytics() {
  const key = import.meta.env.VITE_POSTHOG_KEY
  if (!key) return
  const { default: posthog } = await import('posthog-js')
  posthog.init(key, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://us.posthog.com',
    capture_pageview: true,
    capture_pageleave: true,
  })
}

void bootAnalytics()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

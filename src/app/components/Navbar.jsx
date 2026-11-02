'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const WA     = '919277472279'
const WA_BASE = `https://wa.me/${WA}`
const DEFAULT_CTA_HREF = `${WA_BASE}?text=${encodeURIComponent('Namaste! I want to plan a Kashi yatra.')}`

const LINKS = [
  { href: '/services',      label: 'Services',    active: p => p === '/services' || p.startsWith('/services/') },
  { href: '/tour-packages', label: 'Packages',    active: p => p.startsWith('/tour-packages') },
  { href: '/cab',           label: 'Cab',         active: p => p === '/cab' },
  { href: '/boat-rides',    label: 'Boating',     active: p => p === '/boat-rides' },
  { href: '/sightseeing',   label: 'Sightseeing', active: p => p === '/sightseeing' },
  { href: '/about',         label: 'About',       active: p => p === '/about' },
]

/**
 * Shared navbar used across all pages.
 *
 * Props:
 *   ctaLabel  — button label   (default: "Plan my yatra")
 *   ctaHref   — button href    (default: WhatsApp general link)
 *   showItin  — show the "Download Custom Itinerary" link + button (home page only)
 */
export default function Navbar({ ctaLabel = 'Plan my yatra', ctaHref, showItin = false }) {
  const [navOpen, setNavOpen] = useState(false)
  const pathname = usePathname()
  const href = ctaHref ?? DEFAULT_CTA_HREF

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href="/" className="logo">
          <img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Saathi" style={{ height: '64px', width: 'auto', display: 'block' }} />
        </a>
        <nav className={`nav-links${navOpen ? ' open' : ''}`} id="navLinks">
          {LINKS.map(({ href: lhref, label, active }) => (
            <a
              key={lhref}
              href={lhref}
              onClick={() => setNavOpen(false)}
              style={active(pathname) ? { borderBottom: '2px solid var(--saffron)' } : undefined}
            >
              {label}
            </a>
          ))}
          {showItin && (
            <a href="/travel-itinerary" className="nav-itin" onClick={() => setNavOpen(false)}>
              Download Custom Itinerary
            </a>
          )}
        </nav>
        {showItin && (
          <a href="/travel-itinerary" className="btn line dl-itin">
            <span>Download Custom<br />Itinerary</span>
          </a>
        )}
        <a href={href} target="_blank" rel="noopener" className="btn">{ctaLabel}</a>
        <button className="menu-btn" aria-label="Menu" onClick={() => setNavOpen(v => !v)}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18"/>
          </svg>
        </button>
      </div>
    </header>
  )
}

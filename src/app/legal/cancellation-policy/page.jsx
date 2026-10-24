'use client'
import { useState } from 'react'

const WA = '919277472279'
const WA_BASE = `https://wa.me/${WA}`
const TORAN = 60

function Nav({ navOpen, setNavOpen }) {
  const wa = `${WA_BASE}?text=${encodeURIComponent('Namaste! I want to plan a yatra.')}`
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href="/" className="logo"><img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Saathi" style={{ height: '64px', width: 'auto', display: 'block' }} /></a>
        <nav className={`nav-links${navOpen ? ' open' : ''}`}>
          <a href="/tour-packages" onClick={() => setNavOpen(false)}>Packages</a>
          <a href="/cab" onClick={() => setNavOpen(false)}>Cab</a>
          <a href="/boat-rides" onClick={() => setNavOpen(false)}>Boating</a>
          <a href="/sightseeing" onClick={() => setNavOpen(false)}>Sightseeing</a>
          <a href="/about" onClick={() => setNavOpen(false)}>About</a>
          <a href="/contact" onClick={() => setNavOpen(false)}>Contact</a>
        </nav>
        <a href={wa} target="_blank" rel="noopener" className="btn">Plan my yatra</a>
        <button className="menu-btn" aria-label="Menu" onClick={() => setNavOpen(v => !v)}>☰</button>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer>
      <div className="big-hi" aria-hidden="true">काशी</div>
      <div className="wrap">
        <div className="foot">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <a href="/" className="logo" style={{ marginBottom: '14px' }}><img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Saathi" style={{ height: '60px', width: 'auto', display: 'block' }} /></a>
            <p style={{ fontSize: '.93rem', maxWidth: '22rem', color: '#cdb892' }}>Tours, cabs, boats and hotels in Kashi, arranged by people who live here.</p>
          </div>
          <div><h4>Services</h4><ul>
            <li><a href="/tour-packages">Tour Packages</a></li>
            <li><a href="/cab">Cab Booking</a></li>
            <li><a href="/boat-rides">Boat Rides</a></li>
            <li><a href="/hotels">Hotels</a></li>
          </ul></div>
          <div><h4>Explore</h4><ul>
            <li><a href="/sightseeing">Sightseeing</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/testimonials">Reviews</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul></div>
          <div><h4>Legal</h4><ul>
            <li><a href="/legal/privacy-policy">Privacy Policy</a></li>
            <li><a href="/legal/terms-and-conditions">Terms &amp; Conditions</a></li>
            <li><a href="/legal/cancellation-policy">Cancellation Policy</a></li>
            <li><a href="/legal/disclaimer">Disclaimer</a></li>
          </ul></div>
        </div>
        <div className="copy">
          <span>© {new Date().getFullYear()} Yatra Ke Saathi</span>
          <span>Varanasi, Uttar Pradesh</span>
        </div>
      </div>
    </footer>
  )
}

const REFUND_TABLE = [
  { when: '15+ days before trip', refund: '90%', note: 'Almost full refund' },
  { when: '8–14 days before trip', refund: '50%', note: 'Half refund' },
  { when: '3–7 days before trip', refund: '25%', note: 'Partial refund' },
  { when: 'Less than 72 hours', refund: '0%', note: 'No refund' },
  { when: 'No-show', refund: '0%', note: 'No refund' },
]

export default function CancellationPolicyPage() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div>
      <div className="topbar"><div className="wrap">
        <span className="hi">हर हर महादेव · यात्रा के साथी</span>
        <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
      </div></div>
      <div className="toran" aria-hidden="true">{Array.from({ length: TORAN }, (_, i) => <i key={i} />)}</div>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} />

      <main>
        <section className="pkg-hero">
          <div className="wrap">
            <nav className="pkg-breadcrumb">
              <a href="/">Home</a><span className="sep">›</span>
              <a href="/legal/cancellation-policy">Legal</a><span className="sep">›</span>
              <span>Cancellation Policy</span>
            </nav>
            <h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.4rem)', marginBottom: '10px' }}>Cancellation &amp; Refund Policy</h1>
            <p style={{ color: 'var(--ink-soft)', fontSize: '1rem' }}>Last updated: November 30, 2025</p>
          </div>
        </section>

        <section style={{ padding: '64px 0 80px' }}>
          <div className="wrap" style={{ maxWidth: '780px' }}>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: '48px' }}>
              We understand that plans can change. Please read our cancellation and refund policy carefully before booking. All cancellations must be communicated in writing via WhatsApp or email.
            </p>

            {/* Refund table */}
            <div style={{ marginBottom: '48px', borderLeft: '3px solid var(--saffron)', paddingLeft: '24px' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '20px', color: 'var(--ink)' }}>1. Cancellation & Refund Schedule</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.95rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--saffron)', color: '#fff' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Cancellation timing</th>
                      <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600 }}>Refund</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {REFUND_TABLE.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? 'var(--paper)' : 'var(--paper-2)', borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '12px 16px', color: 'var(--ink)' }}>{row.when}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700, color: row.refund === '0%' ? '#c0392b' : 'var(--saffron-deep)' }}>{row.refund}</td>
                        <td style={{ padding: '12px 16px', color: 'var(--ink-soft)' }}>{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ marginBottom: '40px', borderLeft: '3px solid var(--saffron)', paddingLeft: '24px' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '14px', color: 'var(--ink)' }}>2. How to Cancel</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ fontSize: '.97rem', lineHeight: 1.7, color: 'var(--ink-soft)' }}>Send a cancellation request via WhatsApp to <a href="tel:+919277472279" style={{ color: 'var(--saffron-deep)' }}>+91 92774 72279</a> or email to <a href="mailto:info@yatraksathi.com" style={{ color: 'var(--saffron-deep)' }}>info@yatraksathi.com</a>.</li>
                <li style={{ fontSize: '.97rem', lineHeight: 1.7, color: 'var(--ink-soft)' }}>Include your booking reference, name, and travel date in the cancellation message.</li>
                <li style={{ fontSize: '.97rem', lineHeight: 1.7, color: 'var(--ink-soft)' }}>The cancellation date is considered the date we receive your written request, not the date of travel.</li>
              </ul>
            </div>

            <div style={{ marginBottom: '40px', borderLeft: '3px solid var(--saffron)', paddingLeft: '24px' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '14px', color: 'var(--ink)' }}>3. Refund Processing</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ fontSize: '.97rem', lineHeight: 1.7, color: 'var(--ink-soft)' }}>Approved refunds are processed within <strong>7–10 working days</strong> via the original payment method.</li>
                <li style={{ fontSize: '.97rem', lineHeight: 1.7, color: 'var(--ink-soft)' }}>Bank transfer and UPI refunds may take 3–5 additional business days to reflect in your account.</li>
                <li style={{ fontSize: '.97rem', lineHeight: 1.7, color: 'var(--ink-soft)' }}>Any transaction charges incurred during payment are non-refundable.</li>
              </ul>
            </div>

            <div style={{ marginBottom: '40px', borderLeft: '3px solid var(--saffron)', paddingLeft: '24px' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '14px', color: 'var(--ink)' }}>4. Cancellations by Yatra Ke Saathi</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ fontSize: '.97rem', lineHeight: 1.7, color: 'var(--ink-soft)' }}>In the rare event that we cancel a confirmed booking due to unforeseen circumstances, you will receive a <strong>full refund</strong> or a rescheduled trip at no extra cost.</li>
                <li style={{ fontSize: '.97rem', lineHeight: 1.7, color: 'var(--ink-soft)' }}>Cancellations due to force majeure (floods, government orders, safety concerns) may result in a credit note or partial refund at our discretion.</li>
              </ul>
            </div>

            <div style={{ marginBottom: '40px', borderLeft: '3px solid var(--saffron)', paddingLeft: '24px' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '14px', color: 'var(--ink)' }}>5. Non-refundable Services</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ fontSize: '.97rem', lineHeight: 1.7, color: 'var(--ink-soft)' }}>Special puja bookings, boat slots on festival days (Dev Deepawali, Kartik Purnima), and peak-season hotel bookings are non-refundable once confirmed.</li>
                <li style={{ fontSize: '.97rem', lineHeight: 1.7, color: 'var(--ink-soft)' }}>These will be clearly marked as non-refundable at the time of booking.</li>
              </ul>
            </div>

            <div style={{ background: 'var(--paper-2)', borderRadius: '12px', padding: '28px 32px', marginTop: '16px' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>Need to cancel or reschedule?</h2>
              <p style={{ fontSize: '.95rem', color: 'var(--ink-soft)', margin: 0 }}>
                Contact us at <a href="mailto:info@yatraksathi.com" style={{ color: 'var(--saffron-deep)' }}>info@yatraksathi.com</a> or WhatsApp us at <a href="tel:+919277472279" style={{ color: 'var(--saffron-deep)' }}>+91 92774 72279</a>. We&apos;ll do our best to help.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to plan a yatra.')}`} target="_blank" rel="noopener" className="fab" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32" fill="#fff"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 15.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
      </a>
    </div>
  )
}

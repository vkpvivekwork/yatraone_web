'use client'
import { useState } from 'react'

const WA = '919277472279'
const WA_BASE = `https://wa.me/${WA}`
const TORAN = 60

const QUICK = [
  { label: 'Book a Cab',        msg: 'Namaste! I need a cab in Varanasi. Please share details and availability.' },
  { label: 'Plan a Tour',       msg: 'Namaste! I want to plan a tour package. Please help me with itinerary options.' },
  { label: 'Book a Boat Ride',  msg: 'Namaste! I want to book a Ganga boat ride. Please guide me on timings and prices.' },
  { label: 'Hotel Booking',     msg: 'Namaste! I need a hotel near the ghats in Varanasi. Please help.' },
  { label: 'Custom Itinerary',  msg: 'Namaste! I want a custom yatra itinerary. Please assist with planning.' },
]

const FAQS = [
  { q: 'How quickly do you reply?', a: 'Usually within 10–15 minutes on WhatsApp, day or night. For calls, we're reachable 24×7.' },
  { q: 'Can I book same-day cabs or boat rides?', a: 'Yes, for most services we can arrange same-day bookings subject to availability. WhatsApp us as early as possible.' },
  { q: 'Do you take advance payment?', a: 'For most bookings, payment is made in Varanasi itself. We only take advance for packages that include hotel bookings.' },
  { q: 'Are your prices fixed or negotiable?', a: 'Our prices are fixed and transparent. What we quote is what you pay — no hidden charges at the end.' },
]

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
          <a href="/boating" onClick={() => setNavOpen(false)}>Boating</a>
          <a href="/sightseeing" onClick={() => setNavOpen(false)}>Sightseeing</a>
          <a href="/about" onClick={() => setNavOpen(false)}>About</a>
          <a href="/contact" onClick={() => setNavOpen(false)} style={{ borderBottom: '2px solid var(--saffron)' }}>Contact</a>
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
            <li><a href="/boating">Boat Rides</a></li>
            <li><a href="/hotels">Hotels</a></li>
          </ul></div>
          <div><h4>Explore</h4><ul>
            <li><a href="/sightseeing">Sightseeing</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/testimonials">Reviews</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul></div>
          <div><h4>Contact</h4><ul>
            <li>Varanasi, Uttar Pradesh</li>
            <li><a href="tel:+919277472279">+91 92774 72279</a></li>
            <li>info@yatraksathi.com</li>
          </ul></div>
        </div>
        <div className="copy">
          <span>© {new Date().getFullYear()} Yatra Ke Saathi</span>
          <span>Photos: Unsplash</span>
        </div>
      </div>
    </footer>
  )
}

export default function ContactPage() {
  const [navOpen, setNavOpen] = useState(false)
  const [open, setOpen] = useState(null)

  return (
    <div>
      <div className="topbar"><div className="wrap">
        <span className="hi">हर हर महादेव · अतिथि देवो भव · जय माँ गंगे</span>
        <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
      </div></div>
      <div className="toran" aria-hidden="true">{Array.from({ length: TORAN }, (_, i) => <i key={i} />)}</div>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} />

      <main>
        {/* ── Hero ── */}
        <section className="pkg-hero">
          <div className="wrap">
            <nav className="pkg-breadcrumb"><a href="/">Home</a><span className="sep">›</span><span>Contact</span></nav>
            <div className="hi" style={{ fontSize: '1rem', color: 'var(--saffron-deep)', marginBottom: '6px' }}>हमसे मिलें</div>
            <h1 style={{ fontSize: 'clamp(2.4rem,5vw,3.6rem)', marginBottom: '14px' }}>Get in Touch</h1>
            <p style={{ color: 'var(--ink-soft)', fontSize: '1.08rem', maxWidth: '40rem', lineHeight: 1.65 }}>
              We're a WhatsApp-first team — message us anytime and we usually reply within minutes.
              Whether you need a cab, a boat ride or a full yatra plan, we're here for you.
            </p>
          </div>
        </section>

        {/* ── Contact cards ── */}
        <section style={{ padding: '70px 0 50px' }}>
          <div className="wrap">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '18px', marginBottom: '60px' }}>
              {[
                { icon: '📞', title: 'Phone',     val: '+91 92774 72279',      link: 'tel:+919277472279',                                                                    cta: 'Call now' },
                { icon: '💬', title: 'WhatsApp',  val: '+91 92774 72279',      link: `${WA_BASE}?text=${encodeURIComponent('Namaste! I want to plan a yatra.')}`,            cta: 'Message us' },
                { icon: '✉️', title: 'Email',     val: 'info@yatraksathi.com', link: 'mailto:info@yatraksathi.com',                                                          cta: 'Send email' },
                { icon: '📍', title: 'Location',  val: 'Varanasi, Uttar Pradesh, India', link: 'https://maps.google.com/?q=Varanasi,UP,India',                               cta: 'Open map' },
                { icon: '⏰', title: 'Hours',     val: 'Every day · 24 hours',  link: null,                                                                                   cta: null },
              ].map(c => (
                <div key={c.title} style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '12px', padding: '26px 22px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{c.icon}</div>
                  <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '4px', fontFamily: "'Fraunces',serif" }}>{c.title}</div>
                  <div style={{ color: 'var(--ink-soft)', fontSize: '.95rem', marginBottom: '14px', lineHeight: 1.4 }}>{c.val}</div>
                  {c.link && (
                    <a href={c.link} target={c.link.startsWith('http') ? '_blank' : undefined} rel="noopener"
                      style={{ display: 'inline-block', background: 'var(--saffron)', color: '#fff', fontWeight: 600, fontSize: '.88rem', padding: '7px 16px', borderRadius: '6px' }}>
                      {c.cta} →
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* ── Quick WhatsApp messages ── */}
            <div style={{ background: 'var(--paper-2)', border: '1px solid var(--line)', borderRadius: '14px', padding: '36px 32px', marginBottom: '60px' }}>
              <h2 style={{ fontSize: '1.7rem', marginBottom: '8px' }}>Quick Message on WhatsApp</h2>
              <p style={{ color: 'var(--ink-soft)', marginBottom: '24px', fontSize: '.98rem' }}>
                Tap a button below — we'll open a pre-filled WhatsApp chat so you don't have to type from scratch.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {QUICK.map(q => (
                  <a key={q.label} href={`${WA_BASE}?text=${encodeURIComponent(q.msg)}`} target="_blank" rel="noopener" className="btn"
                    style={{ background: 'var(--saffron-deep)', fontSize: '.9rem', padding: '10px 20px' }}>
                    {q.label}
                  </a>
                ))}
              </div>
            </div>

            {/* ── FAQ ── */}
            <div style={{ maxWidth: '720px' }}>
              <h2 style={{ fontSize: '1.7rem', marginBottom: '6px' }}>Common Questions</h2>
              <p style={{ color: 'var(--ink-soft)', marginBottom: '28px' }}>Quick answers before you reach out.</p>
              {FAQS.map((f, i) => (
                <details key={i} open={open === i} onClick={e => { e.preventDefault(); setOpen(open === i ? null : i) }}>
                  <summary>{f.q}</summary>
                  <div style={{ padding: '0 0 16px', color: 'var(--ink-soft)', fontSize: '.97rem', lineHeight: 1.65 }}>{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to plan a Kashi yatra.')}`} target="_blank" rel="noopener" className="fab" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32" fill="#fff"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 15.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
      </a>
    </div>
  )
}

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

const SECTIONS = [
  {
    title: '1. Information We Collect',
    items: [
      { sub: 'Personal Details', desc: 'Name, phone number, and email address provided during enquiry or booking.' },
      { sub: 'Identity Proof', desc: 'Government-issued ID (Aadhaar / Voter ID) may be required for hotel check-ins as per government regulations.' },
      { sub: 'Travel Details', desc: 'Travel dates, group size, destination preferences, and special requirements you share with us.' },
      { sub: 'Payment Information', desc: 'Transaction references only. All payments are processed through trusted gateways — we do not store card or UPI credentials.' },
    ],
  },
  {
    title: '2. How We Use Your Information',
    items: [
      { sub: null, desc: 'To confirm and manage your bookings for tours, cabs, boats and hotels.' },
      { sub: null, desc: 'To send trip itineraries, booking confirmations, and travel updates via WhatsApp or email.' },
      { sub: null, desc: 'To provide on-trip support and emergency assistance.' },
      { sub: null, desc: 'To improve our services based on feedback you share.' },
    ],
  },
  {
    title: '3. How We Share Your Information',
    items: [
      { sub: null, desc: 'We never sell your personal data to third parties.' },
      { sub: null, desc: 'We share only the minimum necessary details (name, phone number) with our verified hotel partners, drivers, and boat operators to fulfil your booking.' },
      { sub: null, desc: 'All partners are bound by confidentiality and use your data only to deliver the service booked.' },
    ],
  },
  {
    title: '4. Data Security',
    items: [
      { sub: null, desc: 'Your information is stored securely and accessible only to authorised team members.' },
      { sub: null, desc: 'We do not store sensitive financial data.' },
      { sub: null, desc: 'If you wish to have your data deleted, contact us at info@yatraksathi.com and we will process your request within 7 days.' },
    ],
  },
  {
    title: '5. Cookies',
    items: [
      { sub: null, desc: 'Our website may use basic cookies for analytics and performance. No personally identifiable information is collected through cookies.' },
      { sub: null, desc: 'You can disable cookies in your browser settings without affecting your ability to use the site.' },
    ],
  },
  {
    title: '6. Your Rights',
    items: [
      { sub: null, desc: 'You may request access to, correction of, or deletion of your personal data at any time.' },
      { sub: null, desc: 'You may opt out of promotional communications by messaging us on WhatsApp or email.' },
    ],
  },
]

export default function PrivacyPolicyPage() {
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
              <a href="/legal/privacy-policy">Legal</a><span className="sep">›</span>
              <span>Privacy Policy</span>
            </nav>
            <h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.4rem)', marginBottom: '10px' }}>Privacy Policy</h1>
            <p style={{ color: 'var(--ink-soft)', fontSize: '1rem' }}>Last updated: November 30, 2025</p>
          </div>
        </section>

        <section style={{ padding: '64px 0 80px' }}>
          <div className="wrap" style={{ maxWidth: '780px' }}>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: '48px' }}>
              Yatra Ke Saathi (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to protecting your privacy. This policy explains what information we collect, how we use it, and the choices you have.
            </p>

            {SECTIONS.map((sec) => (
              <div key={sec.title} style={{ marginBottom: '40px', borderLeft: '3px solid var(--saffron)', paddingLeft: '24px' }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '14px', color: 'var(--ink)' }}>{sec.title}</h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {sec.items.map((item, i) => (
                    <li key={i} style={{ fontSize: '.97rem', lineHeight: 1.7, color: 'var(--ink-soft)' }}>
                      {item.sub && <strong style={{ color: 'var(--ink)' }}>{item.sub}: </strong>}
                      {item.desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div style={{ background: 'var(--paper-2)', borderRadius: '12px', padding: '28px 32px', marginTop: '16px' }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>Questions about this policy?</h2>
              <p style={{ fontSize: '.95rem', color: 'var(--ink-soft)', margin: 0 }}>
                Contact us at <a href="mailto:info@yatraksathi.com" style={{ color: 'var(--saffron-deep)' }}>info@yatraksathi.com</a> or WhatsApp us at <a href="tel:+919277472279" style={{ color: 'var(--saffron-deep)' }}>+91 92774 72279</a>.
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

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
    title: '1. Booking & Payments',
    items: [
      { sub: 'Advance Payment', desc: 'A minimum 50% advance is required to confirm your booking. The booking is not confirmed until payment is received.' },
      { sub: 'Balance Payment', desc: 'The remaining amount is due at least 2 days before the trip begins, unless otherwise agreed in writing.' },
      { sub: 'Payment Modes', desc: 'We accept UPI, bank transfer, and cash. No additional charges apply for these payment methods.' },
      { sub: 'Pricing', desc: 'All prices quoted are per person unless stated otherwise. Prices may vary for group sizes, vehicle upgrades, or seasonal demand.' },
    ],
  },
  {
    title: '2. Bookings & Confirmations',
    items: [
      { sub: null, desc: 'A booking is confirmed only after you receive a written confirmation from us via WhatsApp or email.' },
      { sub: null, desc: 'Please verify all trip details (dates, services, number of guests) in the confirmation message and notify us of any errors within 24 hours.' },
      { sub: null, desc: 'We reserve the right to decline a booking at our discretion.' },
    ],
  },
  {
    title: '3. Guest Responsibilities',
    items: [
      { sub: 'ID Proof', desc: 'All guests must carry a valid government-issued photo ID (Aadhaar Card, Voter ID, or Passport) for hotel check-ins and temple entries as required.' },
      { sub: 'Punctuality', desc: 'Please be ready at the agreed pickup time. Delays caused by guests may affect the itinerary.' },
      { sub: 'Conduct', desc: 'Guests are expected to respect local customs, temple dress codes, and ghat etiquette. Photography is not permitted at cremation ghats or inside certain temples.' },
      { sub: 'Health & Fitness', desc: 'Some activities (boat rides, walking tours) require basic mobility. Please inform us in advance of any health conditions.' },
    ],
  },
  {
    title: '4. Services & Inclusions',
    items: [
      { sub: null, desc: 'Only services explicitly listed in your booking confirmation are included. Meals, entry fees, puja samagri, and personal expenses are excluded unless specified.' },
      { sub: null, desc: 'Tolls, state taxes, and parking charges are extra for cab services unless stated as inclusive.' },
      { sub: null, desc: 'Hotel check-in and check-out times follow each property\'s policy. Early/late check-in is subject to availability and may incur additional charges.' },
    ],
  },
  {
    title: '5. Force Majeure',
    items: [
      { sub: null, desc: 'Yatra Ke Saathi is not liable for trip disruptions caused by events beyond our reasonable control, including natural disasters, floods, government restrictions, strikes, curfews, or extreme weather.' },
      { sub: null, desc: 'In such cases, we will do our best to reschedule or offer a partial refund at our discretion.' },
    ],
  },
  {
    title: '6. Liability',
    items: [
      { sub: null, desc: 'We are not liable for loss or damage to personal belongings during the trip.' },
      { sub: null, desc: 'Our liability for any claim is limited to the amount paid for the specific service.' },
      { sub: null, desc: 'We act as a facilitator for hotel and transport services. We are not liable for the independent actions of third-party service providers.' },
    ],
  },
  {
    title: '7. Disputes & Governing Law',
    items: [
      { sub: null, desc: 'Any dispute arising from your booking shall first be addressed through direct communication with our team.' },
      { sub: null, desc: 'These terms are governed by the laws of India. Any unresolved disputes shall be subject to the jurisdiction of courts in Varanasi, Uttar Pradesh.' },
    ],
  },
]

export default function TermsAndConditionsPage() {
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
              <a href="/legal/terms-and-conditions">Legal</a><span className="sep">›</span>
              <span>Terms &amp; Conditions</span>
            </nav>
            <h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.4rem)', marginBottom: '10px' }}>Terms &amp; Conditions</h1>
            <p style={{ color: 'var(--ink-soft)', fontSize: '1rem' }}>Last updated: November 30, 2025</p>
          </div>
        </section>

        <section style={{ padding: '64px 0 80px' }}>
          <div className="wrap" style={{ maxWidth: '780px' }}>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: '48px' }}>
              By booking any service with Yatra Ke Saathi, you agree to the following terms and conditions. Please read them carefully before confirming your trip.
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
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>Questions or disputes?</h2>
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

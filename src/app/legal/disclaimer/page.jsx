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
          <a href="/boating" onClick={() => setNavOpen(false)}>Boating</a>
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
            <li><a href="/boating">Boat Rides</a></li>
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
    title: '1. General Information',
    items: [
      { sub: null, desc: 'The information provided on this website is for general informational purposes only. While we strive to keep content accurate and up to date, we make no warranties — express or implied — about the completeness, accuracy, or reliability of the information.' },
      { sub: null, desc: 'Prices, schedules, and availability listed on the website are indicative and subject to change without notice. Confirmed details will be provided at the time of booking.' },
    ],
  },
  {
    title: '2. Third-Party Services',
    items: [
      { sub: null, desc: 'Yatra Ke Saathi acts as a facilitator connecting travellers with hotels, drivers, and boat operators. We are not the direct provider of accommodation, transport, or boating services.' },
      { sub: null, desc: 'We are not liable for the quality, safety, or conduct of third-party service providers, though we make every effort to work only with verified and trusted partners.' },
      { sub: null, desc: 'External links on our website are provided for convenience. We do not endorse or take responsibility for the content of external sites.' },
    ],
  },
  {
    title: '3. Religious & Spiritual Activities',
    items: [
      { sub: null, desc: 'Temple darshan, puja arrangements, and religious ceremonies facilitated by us are subject to the respective temple\'s rules, timings, and VIP/queue policies.' },
      { sub: null, desc: 'We do not guarantee access to specific temple areas or queue-free darshan. Circumstances such as festivals, maintenance closures, or government restrictions may affect access.' },
      { sub: null, desc: 'Any spiritual experiences, beliefs, or outcomes associated with a yatra are personal and we make no religious claims or guarantees.' },
    ],
  },
  {
    title: '4. Weather & Natural Conditions',
    items: [
      { sub: null, desc: 'Boat rides, ghat walks, and outdoor activities are subject to weather, river water levels, and safety conditions. We reserve the right to cancel or modify activities in the interest of guest safety.' },
      { sub: null, desc: 'The Ganga river level, ghat accessibility, and ferry operations during monsoon or floods are beyond our control.' },
    ],
  },
  {
    title: '5. Health & Safety',
    items: [
      { sub: null, desc: 'Guests with health conditions should consult their physician before undertaking physically demanding activities including boat rides, walking tours, or pilgrimages.' },
      { sub: null, desc: 'We are not liable for any illness, injury, or accident during the trip, except where caused by our direct negligence.' },
      { sub: null, desc: 'Guests are advised to carry personal medications, travel insurance, and emergency contact information.' },
    ],
  },
  {
    title: '6. Photography & Content',
    items: [
      { sub: null, desc: 'Photos on this website are sourced from Unsplash and are used for illustrative purposes only. They may not represent exact locations, hotels, or vehicles provided.' },
      { sub: null, desc: 'Photography inside certain temples, at Manikarnika Ghat, and Harishchandra Ghat (cremation ghats) is strictly prohibited out of respect for local customs and the deceased.' },
    ],
  },
  {
    title: '7. Limitation of Liability',
    items: [
      { sub: null, desc: 'To the maximum extent permitted by law, Yatra Ke Saathi\'s total liability for any claim arising from use of our services is limited to the amount paid for the specific booking.' },
      { sub: null, desc: 'We are not liable for indirect, incidental, or consequential damages including loss of enjoyment, missed connections, or additional travel expenses.' },
    ],
  },
]

export default function DisclaimerPage() {
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
              <a href="/legal/disclaimer">Legal</a><span className="sep">›</span>
              <span>Disclaimer</span>
            </nav>
            <h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.4rem)', marginBottom: '10px' }}>Disclaimer</h1>
            <p style={{ color: 'var(--ink-soft)', fontSize: '1rem' }}>Last updated: November 30, 2025</p>
          </div>
        </section>

        <section style={{ padding: '64px 0 80px' }}>
          <div className="wrap" style={{ maxWidth: '780px' }}>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--ink-soft)', marginBottom: '48px' }}>
              By using the Yatra Ke Saathi website and services, you acknowledge and agree to the following disclaimers. If you do not agree, please refrain from using our services.
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
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>Have a concern?</h2>
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

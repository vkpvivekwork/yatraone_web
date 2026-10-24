'use client'
import { useState } from 'react'

const WA = '919277472279'
const WA_BASE = `https://wa.me/${WA}`
const TORAN = 60
const U = (id, w = 700) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

const CATEGORIES = [
  {
    tier: 'Budget',
    hi: 'सस्ती और सुविधाजनक',
    range: '₹500 – ₹1,500 / night',
    icon: '🏠',
    color: 'var(--ink)',
    bg: 'var(--cream)',
    desc: 'Clean guesthouses and dharamshalas run by trusted hosts near the ghats. Basic amenities, good food, central location.',
    features: ['Walking distance to ghats', 'Clean rooms', 'Hot water', 'Vegetarian meals', 'Luggage storage'],
    locations: ['Near Assi Ghat', 'Godowlia area', 'Near Dashashwamedh'],
    msg: 'Namaste! I am looking for a budget hotel (₹500–1500/night) near the ghats in Varanasi. Please help.',
  },
  {
    tier: 'Mid-Range',
    hi: 'सुविधा और सुकून',
    range: '₹1,500 – ₹4,000 / night',
    icon: '🏨',
    color: 'var(--saffron-deep)',
    bg: 'var(--paper-2)',
    desc: 'Comfortable hotels and boutique guesthouses with AC rooms, attached baths, and good breakfast. Our most recommended tier.',
    features: ['AC rooms', 'Attached bathroom', 'Breakfast included', 'Hot water 24×7', 'Rooftop / Ganga view', 'Free WiFi'],
    locations: ['Assi Ghat area', 'Near Kashi Vishwanath', 'Cantt area'],
    msg: 'Namaste! I am looking for a mid-range hotel (₹1500–4000/night) in Varanasi. Please share options.',
  },
  {
    tier: 'Premium',
    hi: 'विशेष अनुभव',
    range: '₹4,000 – ₹12,000+ / night',
    icon: '🏛️',
    color: '#fff',
    bg: 'var(--saffron)',
    desc: 'Heritage havelis, Ganga-view suites and luxury hotels with curated experiences, spa, and personalised service.',
    features: ['Ganga view rooms', 'Heritage property', 'Spa & wellness', 'Guided darshan', 'Airport transfers', 'Fine dining'],
    locations: ['On the ghats', 'Old city haveli', 'Near Assi / Tulsi Ghat'],
    msg: 'Namaste! I am looking for a premium hotel with Ganga view in Varanasi. Please share options.',
  },
]

const AREAS = [
  {
    name: 'Assi Ghat Area',
    hi: 'अस्सी घाट',
    desc: 'Quiet and cultural. Best for yoga, long stays, and Subah-e-Banaras mornings. Many cafes and foreign-friendly guesthouses.',
    best: 'Best for: Long stays, culture seekers, yoga travellers',
  },
  {
    name: 'Godowlia / Dashashwamedh',
    hi: 'गोदौलिया',
    desc: 'Heart of the city. Walk to Kashi Vishwanath, the main aarti ghat, and the busiest markets. Most hotels here have rooftop views.',
    best: 'Best for: Pilgrims, first-time visitors, convenience',
  },
  {
    name: 'Near Kashi Vishwanath Corridor',
    hi: 'काशी विश्वनाथ',
    desc: 'Very close to the temple. Ideal for early morning darshan without the rush. Narrow lanes but central and devotion-focused.',
    best: 'Best for: Devotees, temple-focused trips',
  },
  {
    name: 'Cantt / Station Area',
    hi: 'कैंट',
    desc: 'Modern area near the railway station. Good for those arriving late or leaving early. More standard hotel options at good prices.',
    best: 'Best for: Transit stays, late arrivals, city access',
  },
]

const TIPS = [
  'Book in advance during Dev Deepawali (Nov), Mahashivratri (Feb/Mar) and Prayagraj Mela season.',
  'Ask us for rooms with Ganga view — not all hotels advertise them but many have them.',
  'Check-in is typically noon. We can arrange early check-in on request with advance notice.',
  'Most mid-range hotels include a simple breakfast. Premium hotels offer full buffet.',
  'Avoid booking solely by price — location near the ghats matters more in Varanasi.',
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

export default function HotelsPage() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div>
      <div className="topbar"><div className="wrap">
        <span className="hi">हर हर महादेव · अतिथि देवो भव · ठहरने की व्यवस्था</span>
        <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
      </div></div>
      <div className="toran" aria-hidden="true">{Array.from({ length: TORAN }, (_, i) => <i key={i} />)}</div>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} />

      <main>
        {/* ── Hero ── */}
        <section className="pkg-hero">
          <div className="wrap">
            <nav className="pkg-breadcrumb"><a href="/">Home</a><span className="sep">›</span><span>Hotels &amp; Stays</span></nav>
            <div className="hi" style={{ fontSize: '1rem', color: 'var(--saffron-deep)', marginBottom: '6px' }}>ठहरने की व्यवस्था</div>
            <h1 style={{ fontSize: 'clamp(2.4rem,5vw,3.6rem)', marginBottom: '14px' }}>Hotels &amp; Stays in Varanasi</h1>
            <p style={{ color: 'var(--ink-soft)', fontSize: '1.08rem', maxWidth: '44rem', lineHeight: 1.65, marginBottom: '24px' }}>
              We handpick stays near the ghats — from budget guesthouses to Ganga-view heritage havelis.
              Tell us your budget, group size and dates, and we'll find the right place for you.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I need a hotel in Varanasi near the ghats. Please help.')}`} target="_blank" rel="noopener" className="btn">Find a Hotel</a>
              <a href="tel:+919277472279" className="btn line">📞 Call Now</a>
            </div>
          </div>
        </section>

        {/* ── Categories ── */}
        <section style={{ padding: '80px 0' }}>
          <div className="wrap">
            <div className="sec-head center"><div>
              <div className="eyebrow">Budget Range</div>
              <h2 className="sec-title">Choose Your Stay</h2>
              <p className="sec-lead">We work with properties across all budgets — all personally vetted.</p>
            </div></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '22px' }}>
              {CATEGORIES.map(c => (
                <div key={c.tier} style={{ background: c.bg, border: '1px solid var(--line)', borderRadius: '14px', padding: '30px 26px', color: c.color }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{c.icon}</div>
                  <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '1.4rem', marginBottom: '2px' }}>{c.tier}</div>
                  <div className="hi" style={{ fontSize: '.88rem', marginBottom: '6px', opacity: .8 }}>{c.hi}</div>
                  <div style={{ fontWeight: 700, fontSize: '.95rem', marginBottom: '12px' }}>{c.range}</div>
                  <p style={{ fontSize: '.93rem', lineHeight: 1.6, marginBottom: '16px', opacity: .9 }}>{c.desc}</p>
                  <ul style={{ listStyle: 'none', display: 'grid', gap: '5px', marginBottom: '16px' }}>
                    {c.features.map(f => (
                      <li key={f} style={{ fontSize: '.88rem', paddingLeft: '16px', position: 'relative', opacity: .9 }}>
                        <span style={{ position: 'absolute', left: 0, color: c.tier === 'Premium' ? '#ffe0a0' : 'var(--saffron)' }}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <div style={{ fontSize: '.8rem', marginBottom: '16px', opacity: .75 }}>
                    <strong>Areas:</strong> {c.locations.join(' · ')}
                  </div>
                  <a href={`${WA_BASE}?text=${encodeURIComponent(c.msg)}`} target="_blank" rel="noopener" className="btn"
                    style={{ background: c.tier === 'Premium' ? '#fff' : 'var(--saffron-deep)', color: c.tier === 'Premium' ? 'var(--saffron-deep)' : '#fff', width: '100%', justifyContent: 'center' }}>
                    Ask for {c.tier} Hotels
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Areas guide ── */}
        <section style={{ padding: '80px 0', background: 'var(--paper-2)' }}>
          <div className="wrap">
            <div className="sec-head center"><div>
              <div className="eyebrow">Location Guide</div>
              <h2 className="sec-title">Where to Stay in Varanasi</h2>
              <p className="sec-lead">Location in Varanasi matters more than in most cities. Each area has a different character.</p>
            </div></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '18px' }}>
              {AREAS.map(a => (
                <div key={a.name} style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px 20px' }}>
                  <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '1.1rem', marginBottom: '3px' }}>{a.name}</div>
                  <div className="hi" style={{ color: 'var(--saffron-deep)', fontSize: '.88rem', marginBottom: '10px' }}>{a.hi}</div>
                  <p style={{ color: 'var(--ink-soft)', fontSize: '.91rem', lineHeight: 1.55, marginBottom: '10px' }}>{a.desc}</p>
                  <div style={{ fontSize: '.83rem', fontWeight: 600, color: 'var(--saffron-deep)' }}>{a.best}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Booking tips ── */}
        <section style={{ padding: '80px 0' }}>
          <div className="wrap" style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div className="eyebrow" style={{ textAlign: 'center' }}>Before you book</div>
            <h2 className="sec-title" style={{ textAlign: 'center', marginBottom: '32px' }}>Booking Tips</h2>
            <div style={{ display: 'grid', gap: '14px' }}>
              {TIPS.map((tip, i) => (
                <div key={i} style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px 20px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'var(--saffron)', color: '#fff', width: '26px', height: '26px', borderRadius: '50%', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: '.85rem', flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ fontSize: '.93rem', color: 'var(--ink-soft)', lineHeight: 1.55 }}>{tip}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="pkg-cta-sec">
          <div className="wrap">
            <div className="hi deva">अतिथि देवो भव</div>
            <h2>Need help finding the right hotel?</h2>
            <p>WhatsApp us your check-in date, group size and budget — we'll recommend and arrange the booking.</p>
            <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I need help finding a hotel in Varanasi near the ghats. Please assist.')}`} target="_blank" rel="noopener" className="pkg-wa-btn">
              <svg viewBox="0 0 32 32"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 15.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
              Find a Hotel on WhatsApp
            </a>
            <div className="pkg-cta-links">
              <a href="/tour-packages">View Tour Packages (hotels included)</a>
              <a href="/contact">Contact Us</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I need a hotel in Varanasi.')}`} target="_blank" rel="noopener" className="fab" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32" fill="#fff"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 15.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
      </a>
    </div>
  )
}

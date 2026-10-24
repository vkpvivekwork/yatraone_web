'use client'
import { useState } from 'react'
import { TESTIMONIALS } from '@/lib/data'

const WA = '919277472279'
const WA_BASE = `https://wa.me/${WA}`
const TORAN = 60
const U = (id, w = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

const STATS = [
  { n: '500+', label: 'Happy Pilgrims' },
  { n: '5★',   label: 'Average Rating' },
  { n: '4',    label: 'States Served' },
  { n: '100%', label: 'Would Recommend' },
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

function Stars({ count = 5 }) {
  return (
    <div className="t-card__stars" style={{ color: 'var(--marigold)', letterSpacing: '2px', fontSize: '1.05rem' }}>
      {'★'.repeat(count)}
    </div>
  )
}

export default function TestimonialsPage() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div>
      <div className="topbar"><div className="wrap">
        <span className="hi">हर हर महादेव · यात्री की कहानियाँ · जय माँ गंगे</span>
        <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
      </div></div>
      <div className="toran" aria-hidden="true">{Array.from({ length: TORAN }, (_, i) => <i key={i} />)}</div>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} />

      <main>
        {/* ── Hero ── */}
        <section className="pkg-hero">
          <div className="wrap">
            <nav className="pkg-breadcrumb"><a href="/">Home</a><span className="sep">›</span><span>Reviews</span></nav>
            <div className="hi" style={{ fontSize: '1rem', color: 'var(--saffron-deep)', marginBottom: '6px' }}>यात्री की कहानियाँ</div>
            <h1 style={{ fontSize: 'clamp(2.4rem,5vw,3.6rem)', marginBottom: '14px' }}>What Pilgrims Say</h1>
            <p style={{ color: 'var(--ink-soft)', fontSize: '1.08rem', maxWidth: '42rem', lineHeight: 1.65 }}>
              Hundreds of pilgrims from across India have trusted us with their sacred journeys.
              Here's what they experienced — in their own words.
            </p>
          </div>
        </section>

        {/* ── Stats ── */}
        <section style={{ padding: '50px 0', background: 'var(--saffron)' }}>
          <div className="wrap">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '0' }}>
              {STATS.map((s, i) => (
                <div key={s.label} style={{
                  textAlign: 'center', padding: '20px',
                  borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,.25)' : 'none',
                  color: '#fff',
                }}>
                  <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: 'clamp(2rem,4vw,2.8rem)', lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: '.88rem', opacity: .85, marginTop: '4px', textTransform: 'uppercase', letterSpacing: '.06em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials grid ── */}
        <section style={{ padding: '80px 0' }}>
          <div className="wrap">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
              gap: '22px',
            }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="t-card" style={{ flex: 'none' }}>
                  <div className="q">"</div>
                  <Stars count={t.stars ?? 5} />
                  <blockquote>{t.text}</blockquote>
                  <div className="who">
                    <div className="av">{(t.name ?? 'G')[0]}</div>
                    <div>
                      <b>{t.name}</b>
                      <span>{t.trip}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Photo strip ── */}
        <section style={{ padding: '60px 0', background: 'var(--paper-2)' }}>
          <div className="wrap">
            <div className="sec-head center"><div>
              <div className="eyebrow">Trip diaries</div>
              <h2 className="sec-title">Moments from Our Yatras</h2>
            </div></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '12px', marginTop: '12px' }}>
              {[
                { id: '1599831069477-b2acdc0bcb91', cap: 'Ganga Aarti — Varanasi' },
                { id: '1613445607898-f46e51645acf', cap: 'Ram Mandir — Ayodhya' },
                { id: '1649876674933-a5b3b39b4da1', cap: 'Dhamek Stupa — Sarnath' },
                { id: '1571536802807-30451e3955d8', cap: 'Morning Boats — Ganga' },
                { id: '1608412525537-662195e817c5', cap: 'The Ghats — Kashi' },
                { id: '1627894483216-2138af692e32', cap: 'Evening Aarti' },
              ].map((p, i) => (
                <figure key={i} style={{ borderRadius: '10px', overflow: 'hidden', aspectRatio: '4/3', position: 'relative', margin: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={U(p.id)} alt={p.cap} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <figcaption style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: 'linear-gradient(transparent,rgba(43,26,14,.75))', color: '#fff', fontSize: '.8rem', padding: '16px 10px 8px', fontWeight: 600 }}>
                    {p.cap}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="pkg-cta-sec">
          <div className="wrap">
            <div className="hi deva">आपकी यात्रा, हमारी जिम्मेदारी</div>
            <h2>Ready to create your own yatra story?</h2>
            <p>Join hundreds of pilgrims who've trusted us with their most meaningful journeys.</p>
            <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to plan a yatra to Varanasi/Ayodhya. Please guide me.')}`} target="_blank" rel="noopener" className="pkg-wa-btn">
              <svg viewBox="0 0 32 32"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 15.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
              Plan my Yatra on WhatsApp
            </a>
            <div className="pkg-cta-links">
              <a href="/tour-packages">View Tour Packages</a>
              <a href="/about">About Yatra Ke Saathi</a>
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

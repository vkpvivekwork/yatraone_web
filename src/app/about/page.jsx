'use client'
import { useState } from 'react'

const WA = '919277472279'
const WA_BASE = `https://wa.me/${WA}`
const TORAN = 60
const U = (id, w = 700) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

const STATS = [
  { n: '500+', label: 'Happy Pilgrims' },
  { n: '9+',   label: 'Tour Packages' },
  { n: '4',    label: 'Sacred Cities' },
  { n: '24/7', label: 'Support' },
]

const WHY = [
  { icon: '🛕', title: 'Temple-First Planning',  desc: 'Darshan timings and crowd patterns factored into every itinerary.' },
  { icon: '🚐', title: 'AC Vehicles Always',     desc: 'Clean, well-maintained AC cabs and buses — from solo travellers to 50+ groups.' },
  { icon: '🤝', title: 'Local Expertise',        desc: 'Varanasi-based team who know every ghat, lane, and shortcut.' },
  { icon: '📱', title: 'WhatsApp Support',       desc: '24/7 reachable on WhatsApp. No IVR, no waiting — real people.' },
  { icon: '💰', title: 'Transparent Pricing',    desc: 'No hidden charges. What you see is what you pay.' },
  { icon: '⭐', title: '5-Star Reviews',         desc: 'Hundreds of happy pilgrims from across India and abroad.' },
  { icon: '🛏️', title: 'Curated Hotels',        desc: 'Handpicked hotels near temples with clean rooms and good food.' },
  { icon: '🔄', title: 'Flexible Itineraries',   desc: 'All packages can be extended, shortened, or customised for you.' },
]

const COLLAGE_IMGS = [
  { id: '1599831069477-b2acdc0bcb91', cap: 'Evening aarti',    alt: 'Priests performing Ganga aarti' },
  { id: '1571536802807-30451e3955d8', cap: 'Morning boats',    alt: 'Rowing boats at a ghat' },
  { id: '1608412525537-662195e817c5', cap: 'Along the ghats',  alt: 'People walking along Varanasi ghats' },
  { id: '1634920540678-df0e179c5243', cap: 'Kashi lanes',      alt: 'Colourful lane in Varanasi' },
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
          <a href="/about" onClick={() => setNavOpen(false)} style={{ borderBottom: '2px solid var(--saffron)' }}>About</a>
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

export default function AboutPage() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div>
      <div className="topbar"><div className="wrap">
        <span className="hi">हर हर महादेव · जय माँ गंगे · अतिथि देवो भव</span>
        <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
      </div></div>
      <div className="toran" aria-hidden="true">{Array.from({ length: TORAN }, (_, i) => <i key={i} />)}</div>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} />

      <main>
        {/* ── Hero ── */}
        <section className="pkg-hero">
          <div className="wrap">
            <nav className="pkg-breadcrumb"><a href="/">Home</a><span className="sep">›</span><span>About Us</span></nav>
            <div className="hi" style={{ fontSize: '1rem', color: 'var(--saffron-deep)', marginBottom: '6px' }}>हमारी कहानी</div>
            <h1 style={{ fontSize: 'clamp(2.4rem,5vw,3.6rem)', marginBottom: '14px' }}>About Yatra Ke Saathi</h1>
            <p style={{ color: 'var(--ink-soft)', fontSize: '1.08rem', maxWidth: '42rem', lineHeight: 1.65 }}>
              We are locals — born and raised in Kashi. Every route, every ghat, every darshan shortcut —
              we know it by heart. We started Yatra Ke Saathi to help pilgrims and travellers experience
              Varanasi the way it deserves to be experienced.
            </p>
          </div>
        </section>

        {/* ── Stats ── */}
        <section style={{ padding: '60px 0', background: 'var(--paper-2)' }}>
          <div className="wrap">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '16px' }}>
              {STATS.map(s => (
                <div key={s.label} style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '12px', padding: '28px 20px', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: 'clamp(2rem,4vw,2.8rem)', color: 'var(--saffron-deep)', lineHeight: 1 }}>{s.n}</div>
                  <div style={{ color: 'var(--ink-soft)', fontSize: '.9rem', marginTop: '6px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Our Story ── */}
        <section style={{ padding: '80px 0' }}>
          <div className="wrap">
            <div className="about">
              <div>
                <div className="eyebrow">Our Story</div>
                <h2 className="sec-title">Born in Kashi, <em>serving Kashi</em></h2>
                <p className="sec-lead" style={{ marginBottom: '16px' }}>
                  Yatra Ke Saathi was founded with one simple goal: make pilgrimages to Kashi, Ayodhya,
                  Prayagraj and the surrounding sacred cities seamless, safe, and truly meaningful.
                </p>
                <p style={{ color: 'var(--ink-soft)', marginBottom: '16px', lineHeight: 1.7 }}>
                  We have driven pilgrims to the ghats before sunrise. We have waited at temples while
                  families completed their rituals. We have arranged hotels when bookings fell through
                  the night before. We have become the people you call when you need someone you trust.
                </p>
                <blockquote className="pull">
                  "Every yatra deserves a companion who knows the way — not just the roads, but the
                  meaning behind every turn."
                </blockquote>
                <p style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                  Our team is small, deeply local, and proudly Banarasi. We don't run a call centre —
                  you always reach a real person who knows Varanasi personally.
                </p>
              </div>
              <div className="collage">
                {COLLAGE_IMGS.map((img, i) => (
                  <figure key={i}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={U(img.id)} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <figcaption>{img.cap}</figcaption>
                  </figure>
                ))}
                <div className="badge">
                  <b className="hi">काशी</b>
                  <small>est. Kashi</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why choose us ── */}
        <section style={{ padding: '80px 0', background: 'var(--paper-2)' }}>
          <div className="wrap">
            <div className="sec-head center">
              <div>
                <div className="eyebrow">Why us</div>
                <h2 className="sec-title">Why Yatra Ke Saathi?</h2>
                <p className="sec-lead">Eight reasons pilgrims from across India trust us with their most sacred journeys.</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '18px' }}>
              {WHY.map(w => (
                <div key={w.title} style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '10px', padding: '22px 20px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{w.icon}</div>
                  <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', marginBottom: '6px' }}>{w.title}</div>
                  <div style={{ fontSize: '.9rem', color: 'var(--ink-soft)', lineHeight: 1.55 }}>{w.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="pkg-cta-sec">
          <div className="wrap">
            <div className="hi deva">हर यात्रा का भरोसेमंद साथी</div>
            <h2>Ready to plan your Kashi yatra?</h2>
            <p>Tell us your dates, group size and what matters most — we'll handle the rest.</p>
            <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to plan a yatra. Please guide me.')}`} target="_blank" rel="noopener" className="pkg-wa-btn">
              <svg viewBox="0 0 32 32"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 15.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
              Plan my yatra on WhatsApp
            </a>
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

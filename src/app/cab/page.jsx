'use client'
import { useState } from 'react'

const WA = '919277472279'
const WA_BASE = `https://wa.me/${WA}`
const TORAN = 60
const U = (id, w = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

const VEHICLES = [
  {
    name: 'Swift Dzire / Etios',
    type: 'Sedan',
    seats: 4,
    ac: true,
    img: '1443479788958-11faa35a5578',
    tags: ['City tour', 'Airport drop', 'One-way'],
    best: 'Best for couples & small families',
    msg: 'Namaste! I want to book a Sedan (Dzire/Etios) cab in Varanasi. Please share availability and rates.',
  },
  {
    name: 'Ertiga',
    type: 'MUV',
    seats: 6,
    ac: true,
    img: '1461784180009-21121b2f204c',
    tags: ['Family trip', 'Intercity', 'Full day'],
    best: 'Best for small families & friend groups',
    msg: 'Namaste! I want to book an Ertiga cab. Please share availability and rates.',
  },
  {
    name: 'Innova / Innova Crysta',
    type: 'SUV',
    seats: 7,
    ac: true,
    img: '1549317661-bd32c8ce0729',
    tags: ['Premium ride', 'Long routes', 'Groups'],
    best: 'Best for comfort on longer yatras',
    msg: 'Namaste! I want to book an Innova Crysta. Please share availability and rates.',
  },
  {
    name: 'Tempo Traveller',
    type: 'Mini Bus',
    seats: 12,
    ac: true,
    img: '1544620347-c4fd4a3d5957',
    tags: ['Pilgrim groups', 'Society trips', '12+ pax'],
    best: 'Best for large pilgrim groups',
    msg: 'Namaste! I want to book a Tempo Traveller for a group. Please share availability and rates.',
  },
  {
    name: 'Force Cruiser',
    type: 'Van',
    seats: 13,
    ac: true,
    img: '1506905925346-21bda4d32df4',
    tags: ['Rugged terrain', 'Hill routes', 'Groups'],
    best: 'Best for hilly terrain and adventure routes',
    msg: 'Namaste! I want to book a Force Cruiser. Please share availability and rates.',
  },
  {
    name: 'Volvo / Mini Bus',
    type: 'Coach',
    seats: 35,
    ac: true,
    img: '1558979158-65a1eaa08691',
    tags: ['Large groups', 'Outstation', '35+ pax'],
    best: 'Best for large societies and pilgrim tours',
    msg: 'Namaste! I want to book a Volvo/Mini Bus for a large group. Please share availability and rates.',
  },
]

const ROUTES = [
  { from: 'Varanasi', to: 'Ayodhya',    dist: '~200 km', sedan: '₹3,500', innova: '₹4,500', tempo: '₹8,000' },
  { from: 'Varanasi', to: 'Prayagraj',  dist: '~120 km', sedan: '₹2,500', innova: '₹3,200', tempo: '₹6,000' },
  { from: 'Varanasi', to: 'Bodh Gaya',  dist: '~240 km', sedan: '₹4,000', innova: '₹5,200', tempo: '₹9,500' },
  { from: 'Varanasi', to: 'Chitrakoot', dist: '~280 km', sedan: '₹4,500', innova: '₹6,000', tempo: '₹11,000' },
  { from: 'Varanasi', to: 'Lucknow',    dist: '~310 km', sedan: '₹5,000', innova: '₹6,500', tempo: '₹12,000' },
  { from: 'Varanasi Airport (VNS)', to: 'City / Hotel', dist: '~25 km', sedan: '₹800', innova: '₹1,200', tempo: '₹2,500' },
]

const STEPS = [
  { n: '1', icon: '💬', title: 'WhatsApp Us', desc: 'Tell us your date, route, group size, and preferred vehicle.' },
  { n: '2', icon: '✅', title: 'Get a Quote', desc: 'We confirm availability and share a transparent price — no hidden charges.' },
  { n: '3', icon: '🚗', title: 'Start Your Yatra', desc: 'Your clean AC cab arrives on time. Payment on arrival.' },
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
          <a href="/cab" onClick={() => setNavOpen(false)} style={{ borderBottom: '2px solid var(--saffron)' }}>Cab</a>
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

export default function CabPage() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div>
      <div className="topbar"><div className="wrap">
        <span className="hi">हर हर महादेव · सुरक्षित यात्रा · जय श्री राम</span>
        <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
      </div></div>
      <div className="toran" aria-hidden="true">{Array.from({ length: TORAN }, (_, i) => <i key={i} />)}</div>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} />

      <main>
        {/* ── Hero ── */}
        <section className="pkg-hero">
          <div className="wrap">
            <nav className="pkg-breadcrumb"><a href="/">Home</a><span className="sep">›</span><span>Cab Service</span></nav>
            <div className="hi" style={{ fontSize: '1rem', color: 'var(--saffron-deep)', marginBottom: '6px' }}>कैब सेवा</div>
            <h1 style={{ fontSize: 'clamp(2.4rem,5vw,3.6rem)', marginBottom: '14px' }}>Cab &amp; Taxi Service in Varanasi</h1>
            <p style={{ color: 'var(--ink-soft)', fontSize: '1.08rem', maxWidth: '44rem', lineHeight: 1.65, marginBottom: '24px' }}>
              Clean AC vehicles, punctual drivers, transparent pricing. City tours, airport transfers,
              outstation routes to Ayodhya, Prayagraj, Bodh Gaya and beyond — all arranged on WhatsApp.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I need a cab in Varanasi. Please share details.')}`} target="_blank" rel="noopener" className="btn">Book a Cab</a>
              <a href="tel:+919277472279" className="btn line">📞 Call Now</a>
            </div>
          </div>
        </section>

        {/* ── Vehicle fleet ── */}
        <section style={{ padding: '80px 0' }}>
          <div className="wrap">
            <div className="sec-head center">
              <div>
                <div className="eyebrow">Our Fleet</div>
                <h2 className="sec-title">Vehicles for Every Group Size</h2>
                <p className="sec-lead">From a solo pilgrim to a group of 50 — we have the right vehicle for you.</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '22px' }}>
              {VEHICLES.map(v => (
                <div key={v.name} style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden' }}>
                  <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={U(v.img)} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--saffron)', color: '#fff', fontWeight: 700, fontSize: '.78rem', padding: '3px 10px', borderRadius: '4px' }}>
                      {v.seats} seats
                    </div>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '1.18rem', marginBottom: '2px' }}>{v.name}</div>
                    <div style={{ color: 'var(--ink-soft)', fontSize: '.82rem', marginBottom: '10px' }}>{v.type} · AC · {v.seats} seater</div>
                    <div className="tags" style={{ marginBottom: '10px' }}>
                      {v.tags.map(t => <span key={t}>{t}</span>)}
                    </div>
                    <div style={{ color: 'var(--ink-soft)', fontSize: '.88rem', marginBottom: '14px' }}>{v.best}</div>
                    <a href={`${WA_BASE}?text=${encodeURIComponent(v.msg)}`} target="_blank" rel="noopener" className="btn"
                      style={{ background: 'var(--saffron-deep)', fontSize: '.88rem', padding: '9px 18px', width: '100%', justifyContent: 'center' }}>
                      Book this vehicle
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Route prices ── */}
        <section className="price-section">
          <div className="wrap">
            <h2>Popular Route Prices</h2>
            <p className="lead">One-way fares. Return trips and full-day rates available — ask on WhatsApp.</p>
            <div style={{ overflowX: 'auto' }}>
              <table className="ptable" style={{ minWidth: '600px' }}>
                <thead>
                  <tr>
                    <th>Route</th>
                    <th>Distance</th>
                    <th>Sedan (4 pax)</th>
                    <th>Innova (7 pax)</th>
                    <th>Tempo (12+ pax)</th>
                  </tr>
                </thead>
                <tbody>
                  {ROUTES.map(r => (
                    <tr key={r.to}>
                      <td className="veh">{r.from} → {r.to}</td>
                      <td>{r.dist}</td>
                      <td className="rate">{r.sedan}</td>
                      <td className="rate">{r.innova}</td>
                      <td className="rate">{r.tempo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ marginTop: '14px', fontSize: '.88rem', color: 'var(--ink-soft)' }}>
              * Prices are indicative. Final quote sent on WhatsApp based on exact date and availability.
              Toll & parking extra. No hidden charges.
            </p>
          </div>
        </section>

        {/* ── How to book ── */}
        <section style={{ padding: '80px 0' }}>
          <div className="wrap">
            <div className="sec-head center"><div>
              <div className="eyebrow">Booking process</div>
              <h2 className="sec-title">3 Simple Steps</h2>
            </div></div>
            <div className="steps">
              {STEPS.map(s => (
                <div key={s.n} className="step">
                  <div className="circ">
                    <span style={{ fontSize: '1.8rem' }}>{s.icon}</span>
                    <span>{s.n}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="pkg-cta-sec">
          <div className="wrap">
            <div className="hi deva">सुरक्षित और आरामदायक यात्रा</div>
            <h2>Need a cab in Varanasi?</h2>
            <p>WhatsApp us your pickup point, destination and time — we'll confirm within minutes.</p>
            <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I need a cab in Varanasi. Please share details.')}`} target="_blank" rel="noopener" className="pkg-wa-btn">
              <svg viewBox="0 0 32 32"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 15.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
              Book a Cab on WhatsApp
            </a>
            <div className="pkg-cta-links">
              <a href="tel:+919277472279">📞 +91 92774 72279</a>
              <a href="/tour-packages">View Tour Packages</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I need a cab in Varanasi.')}`} target="_blank" rel="noopener" className="fab" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32" fill="#fff"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 15.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
      </a>
    </div>
  )
}

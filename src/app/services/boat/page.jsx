'use client'
import { useState } from 'react'
import Navbar from '@/app/components/Navbar'

const WA      = '919277472279'
const WA_BASE = `https://wa.me/${WA}`
const TORAN   = 60
const U = (id, w = 700) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

/* ─── Data ───────────────────────────────────────────────── */

const PACKAGES = [
  {
    id:     'shared',
    name:   'Shared Boat Ride',
    hi:     'साझा नाव',
    price:  '₹399',
    per:    '/ person',
    img:    '1571536802807-30451e3955d8',
    desc:   'A quick, peaceful float past the major ghats. Shared with other pilgrims, guided commentary on each ghat.',
    features: ['~45 min ride', 'All major ghats', 'Morning & evening', 'Commentary'],
    msg:    'Namaste! I want to book a shared boat ride in Varanasi. Please share timing and availability.',
  },
  {
    id:     'morning',
    name:   'Morning Private Boat',
    hi:     'सुबह की नाव · सूर्योदय',
    price:  '₹1,499',
    per:    '/ boat',
    img:    '1596097825168-c9b773f404ff',
    badge:  'Peaceful',
    desc:   'Private boat at sunrise — the most serene time on the Ganga. Watch Kashi wake up as city sounds carry across the water.',
    features: ['Private boat', 'Sunrise timing', '~90 min', 'Guide included', 'Up to 6 pax'],
    msg:    'Namaste! I want to book a private morning boat ride for sunrise. Please share timing and rates.',
  },
  {
    id:     'aarti',
    name:   'Ganga Aarti Boat Ride',
    hi:     'गंगा आरती · संध्या नाव',
    price:  '₹1,999',
    per:    '/ boat',
    img:    '1627894483216-2138af692e32',
    badge:  'Most Popular',
    desc:   'Watch the Dashashwamedh Ganga Aarti from the water — the best view, away from the crowded ghats, completely private.',
    features: ['Private boat', 'Aarti front view', 'Evening slot', '~2 hrs', 'Up to 6 pax'],
    msg:    'Namaste! I want to book a Ganga Aarti boat ride in Varanasi. Please share availability.',
  },
  {
    id:     'reel',
    name:   'Ghat Tour + Photography',
    hi:     'घाट भ्रमण · फोटो और रील',
    price:  '₹3,499',
    per:    '/ booking',
    img:    '1608412525537-662195e817c5',
    badge:  'Trending',
    desc:   'Full ghat coverage with a photographer on board. Perfect for couples, families and content creators. Reels delivered same evening.',
    features: ['Private boat', 'All 80+ ghats', 'Photographer', 'Reel editing', '~3 hrs', 'Flexible timing'],
    msg:    'Namaste! I want to book the Ghat Tour + Photography boat package. Please share details.',
  },
]

const GHATS = [
  { name: 'Dashashwamedh Ghat',   hi: 'दशाश्वमेध',    desc: 'The most sacred and vibrant ghat — home of the Ganga Aarti every evening.' },
  { name: 'Assi Ghat',            hi: 'अस्सी घाट',     desc: 'Peaceful southern ghat, known for Subah-e-Banaras morning events.' },
  { name: 'Manikarnika Ghat',     hi: 'मणिकर्णिका',    desc: 'The sacred cremation ghat — a profound, humbling sight from the river.' },
  { name: 'Harishchandra Ghat',   hi: 'हरिश्चंद्र',   desc: 'One of Varanasi\'s oldest and most revered cremation ghats.' },
  { name: 'Scindia Ghat',         hi: 'सिंधिया घाट',   desc: 'Famous for a sunken temple — the half-submerged Shiva temple visible from the boat.' },
  { name: 'Panchganga Ghat',      hi: 'पंचगंगा',       desc: 'Where five rivers are said to meet — a deeply spiritual bathing ghat.' },
]

const STEPS = [
  { n: '1', title: 'Choose Your Ride',   desc: 'Pick a package or tell us your preference — sunrise, aarti, photography or a simple float.' },
  { n: '2', title: 'We Confirm Timings', desc: 'We check boat availability and confirm your slot on WhatsApp, usually within an hour.' },
  { n: '3', title: 'Arrive & Enjoy',     desc: 'Reach the ghat at the agreed time. Your boat and guide are ready. Pay on arrival.' },
]

const TESTIMONIALS = [
  { name: 'Priya M., Mumbai',           stars: 5, text: 'Booked the morning boat for our family of 5. The guide knew every ghat — it felt like watching Kashi breathe. Truly unforgettable.' },
  { name: 'Rohit K., Delhi',            stars: 5, text: 'The Ganga Aarti from a boat is something no words can describe. Yatra Ke Sathi arranged everything smoothly on short notice.' },
  { name: 'Anjali & Vivek, Pune',       stars: 5, text: 'Got the Ghat Tour + Photography package for our honeymoon. The photos delivered same evening were beautiful. Worth every rupee.' },
]

/* ─── Sub-components ─────────────────────────────────────── */

function WaIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 32 32" fill={color} style={{ width: size, height: size, flexShrink: 0 }}>
      <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm0 23c-2 0-3.9-.6-5.5-1.6l-.4-.2-4.1 1.3 1.3-4-.3-.4c-1.1-1.7-1.7-3.6-1.7-5.6C5.3 9.8 10.1 5 16 5s10.7 4.8 10.7 10.6S21.9 26 16 26zm5.9-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
    </svg>
  )
}


function Footer() {
  return (
    <footer>
      <div className="big-hi" aria-hidden="true">गंगा</div>
      <div className="wrap">
        <div className="foot">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <a href="/" className="logo" style={{ marginBottom: '14px' }}><img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Sathi" style={{ height: '60px', width: 'auto', display: 'block' }} /></a>
            <p style={{ fontSize: '.93rem', maxWidth: '22rem', color: '#cdb892' }}>Tours, cabs, boats and hotels in Kashi, arranged by people who live here.</p>
          </div>
          <div><h4>Services</h4><ul>
            <li><a href="/services/tour">Tour Packages</a></li>
            <li><a href="/services/cab">Cab Booking</a></li>
            <li><a href="/services/boat">Boat Rides</a></li>
            <li><a href="/services/hotel">Hotels &amp; Stays</a></li>
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
          <span>© {new Date().getFullYear()} Yatra Ke Sathi</span>
          <span>Photos: Unsplash</span>
        </div>
      </div>
    </footer>
  )
}

/* ─── Page ───────────────────────────────────────────────── */

export default function ServicesBoatPage() {
  const [form, setForm]       = useState({ name: '', mobile: '', date: '', time: '', pax: '', type: '', note: '' })
  const [sent, setSent]       = useState(false)

  function handleChange(e) { setForm(p => ({ ...p, [e.target.name]: e.target.value })) }

  function handleSubmit(e) {
    e.preventDefault()
    const lines = [
      'Namaste! I want to book a boat ride on the Ganga.',
      '',
      `Name: ${form.name}`,
      `Mobile: ${form.mobile}`,
      `Date: ${form.date || 'Flexible'}`,
      form.time ? `Preferred Time: ${form.time}` : '',
      form.pax  ? `People: ${form.pax}`          : '',
      form.type ? `Ride Type: ${form.type}`       : '',
      form.note ? `Note: ${form.note}`            : '',
    ].filter(Boolean).join('\n')
    window.open(`${WA_BASE}?text=${encodeURIComponent(lines)}`, '_blank', 'noopener')
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <div>
      <div className="topbar"><div className="wrap">
        <span className="hi">जय गंगा मैया · हर हर महादेव · गंगा आरती</span>
        <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
      </div></div>
      <div className="toran" aria-hidden="true">{Array.from({ length: TORAN }, (_, i) => <i key={i} />)}</div>
      <Navbar ctaLabel="Book a Boat" ctaHref={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to book a boat ride on the Ganga in Varanasi.')}`} />

      <main>
        <style>{`
          .sboat-hero{position:relative;min-height:500px;display:flex;align-items:center;
            background:url('${U('1627894483216-2138af692e32', 1400)}') center/cover no-repeat}
          .sboat-overlay{position:absolute;inset:0;
            background:linear-gradient(160deg,rgba(5,15,30,.76) 0%,rgba(5,15,30,.28) 55%,rgba(5,15,30,.7) 100%)}
          .sboat-hinner{position:relative;z-index:2;padding:clamp(55px,8vw,100px) clamp(16px,5vw,52px);max-width:820px;width:100%}
          .sboat-tag{display:inline-block;background:rgba(5,15,30,.55);backdrop-filter:blur(6px);
            border:1px solid rgba(100,180,255,.3);border-radius:20px;padding:4px 14px;font-size:.8rem;color:#e8f4ff;margin:0 6px 6px 0}
          .sboat-pkg-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:24px}
          .sboat-ghat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
          @media(max-width:800px){.sboat-ghat-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:500px){.sboat-ghat-grid{grid-template-columns:1fr}}
          .sboat-test-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
          @media(max-width:820px){.sboat-test-grid{grid-template-columns:1fr 1fr}}
          @media(max-width:540px){.sboat-test-grid{grid-column:1fr}}
          .sboat-form{background:var(--cream);border:1px solid var(--line);border-radius:18px;padding:clamp(24px,5vw,50px)}
          .sboat-form-grid{display:grid;grid-template-columns:1fr 1fr;column-gap:22px;row-gap:20px}
          @media(max-width:560px){.sboat-form-grid{grid-template-columns:1fr}}
          .sboat-field label{display:block;font-size:.75rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:5px}
          .sboat-field input,.sboat-field select,.sboat-field textarea{width:100%;background:var(--paper);border:1.5px solid var(--line);border-radius:8px;padding:11px 13px;font-size:.97rem;color:var(--ink);outline:none;box-sizing:border-box;font-family:inherit;resize:none;transition:border-color .18s}
          .sboat-field input:focus,.sboat-field select:focus,.sboat-field textarea:focus{border-color:var(--saffron);background:#fff}
          .sboat-full{grid-column:1/-1}
          .sboat-submit{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:15px;background:var(--saffron-deep);color:#fff;border:none;border-radius:10px;font-weight:700;font-size:1.06rem;cursor:pointer;transition:background .2s}
          .sboat-submit:hover{background:var(--kumkum)}
          .sboat-submit:disabled{opacity:.5;cursor:not-allowed}
          /* override global form grid styles */
          .sboat-form form{display:block;padding:0;gap:0}
        `}</style>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="sboat-hero">
          <div className="sboat-overlay" />
          <div className="sboat-hinner">
            <nav style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.8)', marginBottom: '20px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <a href="/" style={{ color: '#fff', textDecoration: 'underline' }}>Home</a><span>›</span>
              <a href="/services" style={{ color: '#fff', textDecoration: 'underline' }}>Services</a><span>›</span><span>Boat Rides</span>
            </nav>
            <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: 'clamp(.95rem,2.5vw,1.3rem)', color: '#7ecfff', fontWeight: 700, marginBottom: '10px', textShadow: '0 1px 8px rgba(0,0,0,.6)' }}>जय गंगा मैया · गंगा नाव</div>
            <h1 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(2.4rem,7vw,4.5rem)', color: '#fff', lineHeight: 1.05, textShadow: '0 3px 28px rgba(0,0,0,.7)', margin: '0 0 14px' }}>
              Boat Rides on<br />the Sacred Ganga
            </h1>
            <p style={{ fontSize: 'clamp(.97rem,2vw,1.18rem)', color: 'rgba(255,255,255,.88)', lineHeight: 1.65, maxWidth: '48rem', marginBottom: '24px' }}>
              Sunrise floats, Ganga Aarti evenings, private ghat tours and photography rides. Experience Kashi the way it has been experienced for centuries — from the river.
            </p>
            <div style={{ marginBottom: '28px', display: 'flex', flexWrap: 'wrap' }}>
              {['Sunrise Ride', 'Ganga Aarti', 'Private Boat', 'Photography'].map(t => (
                <span key={t} className="sboat-tag">{t}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="#book" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg,#e8701a,#C4520C)', color: '#fff', padding: '13px 26px', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,.5)' }}>
                Book a Boat
              </a>
              <a href="tel:+919277472279" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '13px 24px', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
                📞 Call Now
              </a>
            </div>
          </div>
        </section>

        {/* ── Packages ─────────────────────────────────────────── */}
        <section style={{ padding: '90px 0' }}>
          <div className="wrap">
            <div className="sec-head center" style={{ marginBottom: '52px' }}>
              <div>
                <div className="eyebrow">Ride Options</div>
                <h2 className="sec-title">Choose Your Ganga Experience</h2>
                <p className="sec-lead">From a quick shared float to an immersive photography journey across all 80+ ghats.</p>
              </div>
            </div>
            <div className="sboat-pkg-grid">
              {PACKAGES.map(p => (
                <div key={p.id} style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  {p.badge && (
                    <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 2, background: 'var(--saffron)', color: '#fff', fontSize: '.72rem', fontWeight: 700, padding: '3px 12px', borderRadius: '3px', letterSpacing: '.07em' }}>{p.badge.toUpperCase()}</div>
                  )}
                  <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={U(p.img)} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '24px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div>
                        <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '1.22rem' }}>{p.name}</div>
                        <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", color: 'var(--saffron-deep)', fontSize: '.85rem', marginTop: '2px' }}>{p.hi}</div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '12px' }}>
                        <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '1.28rem', color: 'var(--saffron-deep)' }}>{p.price}</div>
                        <div style={{ fontSize: '.74rem', color: 'var(--ink-soft)' }}>{p.per}</div>
                      </div>
                    </div>
                    <p style={{ fontSize: '.93rem', lineHeight: 1.62, color: 'var(--ink-soft)', marginBottom: '14px' }}>{p.desc}</p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px', flex: 1, alignContent: 'flex-start' }}>
                      {p.features.map(f => (
                        <li key={f} style={{ fontSize: '.8rem', background: 'var(--paper-2)', padding: '3px 10px', borderRadius: '20px', color: 'var(--ink-soft)' }}>✓ {f}</li>
                      ))}
                    </ul>
                    <a href={`${WA_BASE}?text=${encodeURIComponent(p.msg)}`} target="_blank" rel="noopener" className="btn"
                      style={{ background: 'var(--saffron-deep)', width: '100%', justifyContent: 'center', fontSize: '.92rem' }}>
                      Book this Ride
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Ghats Guide ──────────────────────────────────────── */}
        <section style={{ padding: '90px 0', background: 'var(--paper-2)' }}>
          <div className="wrap">
            <div className="sec-head center" style={{ marginBottom: '52px' }}>
              <div>
                <div className="eyebrow">The Ghats</div>
                <h2 className="sec-title">Sacred Ghats You Will See</h2>
                <p className="sec-lead">Varanasi has 80+ ghats — each with its own story, ritual and significance.</p>
              </div>
            </div>
            <div className="sboat-ghat-grid">
              {GHATS.map(g => (
                <div key={g.name} style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '14px', padding: '24px 20px' }}>
                  <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '1.08rem', marginBottom: '3px' }}>{g.name}</div>
                  <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", color: 'var(--saffron-deep)', fontSize: '.85rem', marginBottom: '10px' }}>{g.hi}</div>
                  <p style={{ fontSize: '.89rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Booking Form ─────────────────────────────────────── */}
        <section id="book" style={{ padding: '90px 0' }}>
          <div className="wrap">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '56px', alignItems: 'start' }}>

              {/* ── Left: context panel ── */}
              <div>
                <span className="eyebrow">Book your ride</span>
                <h2 className="sec-title" style={{ marginBottom: '14px' }}>Reserve Your<br /><em>Ganga Boat</em></h2>
                <p style={{ color: 'var(--ink-soft)', fontSize: '.97rem', lineHeight: 1.7, marginBottom: '28px' }}>
                  Fill the form — we confirm your boat and guide within the hour on WhatsApp. Payment on arrival.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                  {[
                    'No advance payment needed',
                    'Confirmed on WhatsApp within 1 hour',
                    'Local boatmen, born on the ghats',
                  ].map(t => (
                    <div key={t} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '.92rem' }}>
                      <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--saffron)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: '.7rem', fontWeight: 700, flexShrink: 0 }}>✓</span>
                      {t}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a href="tel:+919277472279" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--saffron-deep)', fontWeight: 600, fontSize: '.92rem' }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.9a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c.9.3 1.9.6 2.9.7A2 2 0 0122 16.9z"/></svg>
                    +91 92774 72279
                  </a>
                  <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to book a boat ride. Please help.')}`} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#1f8f4e', fontWeight: 600, fontSize: '.92rem' }}>
                    <WaIcon size={16} color="#1f8f4e" /> WhatsApp directly
                  </a>
                </div>
              </div>

              {/* ── Right: form ── */}
              <div className="sboat-form">
                <form onSubmit={handleSubmit}>
                  <div className="sboat-form-grid">
                    <div className="sboat-field">
                      <label htmlFor="sb-name">Full Name *</label>
                      <input id="sb-name" name="name" type="text" required placeholder="Ramesh Sharma" value={form.name} onChange={handleChange} />
                    </div>
                    <div className="sboat-field">
                      <label htmlFor="sb-mobile">Mobile / WhatsApp *</label>
                      <input id="sb-mobile" name="mobile" type="tel" required placeholder="+91 98765 43210" value={form.mobile} onChange={handleChange} />
                    </div>
                    <div className="sboat-field">
                      <label htmlFor="sb-date">Date *</label>
                      <input id="sb-date" name="date" type="date" required value={form.date} onChange={handleChange} />
                    </div>
                    <div className="sboat-field">
                      <label htmlFor="sb-time">Preferred Time</label>
                      <select id="sb-time" name="time" value={form.time} onChange={handleChange}>
                        <option value="">No preference</option>
                        <option value="Early morning (5–7 AM) — Sunrise">Early morning — Sunrise (5–7 AM)</option>
                        <option value="Morning (7–10 AM)">Morning (7–10 AM)</option>
                        <option value="Afternoon (12–4 PM)">Afternoon (12–4 PM)</option>
                        <option value="Evening — Ganga Aarti (5:30–7:30 PM)">Evening — Ganga Aarti (5:30–7:30 PM)</option>
                      </select>
                    </div>
                    <div className="sboat-field">
                      <label htmlFor="sb-pax">Number of People *</label>
                      <select id="sb-pax" name="pax" required value={form.pax} onChange={handleChange}>
                        <option value="">Select</option>
                        {['1 person','2 people','3–4 people','5–6 people','7–10 people','10+ people'].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div className="sboat-field">
                      <label htmlFor="sb-type">Ride Type</label>
                      <select id="sb-type" name="type" value={form.type} onChange={handleChange}>
                        <option value="">Not sure — suggest me</option>
                        <option value="Shared Boat Ride (₹399/person)">Shared Boat Ride — ₹399/person</option>
                        <option value="Morning Private Boat (₹1,499)">Morning Private Boat — ₹1,499</option>
                        <option value="Ganga Aarti Private Boat (₹1,999)">Ganga Aarti Boat — ₹1,999</option>
                        <option value="Ghat Tour + Photography (₹3,499)">Ghat Tour + Photography — ₹3,499</option>
                      </select>
                    </div>
                    <div className="sboat-field sboat-full">
                      <label htmlFor="sb-note">Any Special Requests?</label>
                      <input id="sb-note" name="note" type="text" placeholder="e.g. Honeymoon trip, flower puja on boat, senior guests" value={form.note} onChange={handleChange} />
                    </div>
                    <div className="sboat-full">
                      <button type="submit" className="sboat-submit" disabled={sent}>
                        <WaIcon size={20} color="#fff" />
                        {sent ? 'Opening WhatsApp...' : 'Send Boat Booking on WhatsApp'}
                      </button>
                      <p style={{ textAlign: 'center', fontSize: '.82rem', color: 'var(--ink-soft)', marginTop: '12px' }}>
                        Free. No payment now. We reply within an hour.
                      </p>
                    </div>
                  </div>
                </form>
              </div>

            </div>
          </div>
          <style>{`
            @media(max-width:860px){
              #book .wrap > div { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </section>


        {/* ── Testimonials ─────────────────────────────────────── */}
        <section style={{ padding: '90px 0' }}>
          <div className="wrap">
            <div className="sec-head center" style={{ marginBottom: '48px' }}>
              <div>
                <div className="eyebrow">What guests say</div>
                <h2 className="sec-title">Moments on the Ganga</h2>
              </div>
            </div>
            <div className="sboat-test-grid">
              {TESTIMONIALS.map(({ name, stars, text }) => (
                <div key={name} style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '14px', padding: '26px 22px' }}>
                  <div style={{ display: 'flex', gap: '2px', marginBottom: '12px' }}>
                    {Array.from({ length: stars }).map((_, i) => <span key={i} style={{ color: 'var(--marigold)', fontSize: '.9rem' }}>★</span>)}
                  </div>
                  <p style={{ fontSize: '.95rem', color: 'var(--ink-soft)', lineHeight: 1.65, margin: '0 0 14px', fontStyle: 'italic' }}>&ldquo;{text}&rdquo;</p>
                  <div style={{ fontWeight: 700, fontSize: '.82rem', color: 'var(--saffron-deep)' }}>{name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="pkg-cta-sec">
          <div className="wrap">
            <div className="hi deva">जय गंगा मैया · हर हर महादेव</div>
            <h2>Ready to Float on the Sacred Ganga?</h2>
            <p>WhatsApp us your date and preferred time — we reserve your boat and guide right away.</p>
            <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to book a boat ride on the Ganga. Please help.')}`} target="_blank" rel="noopener" className="pkg-wa-btn">
              <WaIcon size={22} color="#fff" /> Book a Boat on WhatsApp
            </a>
            <div className="pkg-cta-links">
              <a href="tel:+919277472279">📞 +91 92774 72279</a>
              <a href="/services">← All Services</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to book a boat ride in Varanasi.')}`} target="_blank" rel="noopener" className="fab" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32" fill="#fff"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 15.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
      </a>
    </div>
  )
}

'use client'
import { useState, useRef, useEffect } from 'react'
import Navbar from '@/app/components/Navbar'
import { SERVICES as BOOKING_SVCS } from '@/lib/data'

const WA      = '919277472279'
const WA_BASE = `https://wa.me/${WA}`
const TORAN   = 60
const U = (id, w = 800) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

const TAB_ICONS  = { tour: '#i-temple', cab: '#i-car', boat: '#i-boat', hotel: '#i-stay' }
const TAB_LABELS = { tour: 'Tour', cab: 'Cab', boat: 'Boat', hotel: 'Hotel' }

const SVC_CARDS = [
  {
    key:     'cab',
    page:    '/services/cab',
    img:     '1443479788958-11faa35a5578',
    alt:     'Driver at the wheel of a car',
    icon:    '🚗',
    price:   'From ₹800',
    tagline: 'City & outstation',
    desc:    'Clean AC vehicles, punctual drivers, transparent pricing. City tours, airport transfers, outstation routes to Ayodhya, Prayagraj, Bodh Gaya and beyond.',
    tags:    ['City Tour', 'Outstation', 'Airport Transfer', '24×7'],
    hi:      'कैब सेवा',
    title:   'Cab Service',
    cta:     'Book a cab →',
  },
  {
    key:     'tour',
    page:    '/services/tour',
    img:     '1705952484283-19c31e37e0e4',
    alt:     'Ritual with oil lamps on the banks of the Ganga',
    icon:    '🛕',
    price:   'From ₹1,499',
    tagline: 'Darshan & sightseeing',
    desc:    'Ganga aarti, Sarnath visits, heritage walks and custom multi-city packages — all planned around temple timings and your schedule.',
    tags:    ['Darshan', 'Sarnath', 'Ayodhya', 'Custom'],
    hi:      'दर्शन और भ्रमण',
    title:   'Tour Packages',
    cta:     'Explore tours →',
  },
  {
    key:     'boat',
    page:    '/services/boat',
    img:     '1596097825168-c9b773f404ff',
    alt:     'Boat on the Ganga at sunset',
    icon:    '⛵',
    price:   'From ₹399',
    tagline: 'Sunrise & aarti',
    desc:    'Private and shared boat rides along the sacred ghats. Sunrise tours, Ganga Aarti evenings, photography rides and quiet morning floats on the holy river.',
    tags:    ['Sunrise Ride', 'Ganga Aarti', 'Photography', 'Private Boat'],
    hi:      'गंगा नाव',
    title:   'Boat Rides',
    cta:     'Book a boat →',
  },
  {
    key:     'hotel',
    page:    '/services/hotel',
    img:     '1565354785692-9e7523e5a87b',
    alt:     'Riverside building beside ghat steps',
    icon:    '🏨',
    price:   'From ₹500',
    tagline: 'Near the ghats',
    desc:    'From budget guesthouses to Ganga-view heritage havelis. Personally vetted stays near the ghats — all budgets, no booking fees.',
    tags:    ['Near Ghats', 'Ganga View', 'Heritage', 'All Budgets'],
    hi:      'ठहरने की व्यवस्था',
    title:   'Hotels & Stays',
    cta:     'Find a stay →',
  },
]

const TRUST = [
  { n: '01', title: 'Local Experts',      desc: 'Arrangers who live in Varanasi and know every ghat, temple and shortcut.' },
  { n: '02', title: 'No Hidden Charges',  desc: 'Transparent pricing confirmed on WhatsApp before you pay anything.' },
  { n: '03', title: 'Quick Confirmation', desc: 'WhatsApp responses within minutes — no lengthy email chains.' },
  { n: '04', title: 'Pay on Arrival',     desc: 'No advance needed for most bookings. Pay your driver or guide directly.' },
]

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
      <div className="big-hi" aria-hidden="true">वाराणसी</div>
      <div className="wrap">
        <div className="foot">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <a href="/" className="logo" style={{ marginBottom: '14px' }}>
              <img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Sathi" style={{ height: '60px', width: 'auto', display: 'block' }} />
            </a>
            <p style={{ fontSize: '.93rem', maxWidth: '22rem', color: '#cdb892' }}>
              Tours, cabs, boats and hotels in Varanasi, arranged by people who live here.
            </p>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li><a href="/services/tour">Tour Packages</a></li>
              <li><a href="/services/cab">Cab Booking</a></li>
              <li><a href="/services/boat">Boat Rides</a></li>
              <li><a href="/services/hotel">Hotels &amp; Stays</a></li>
            </ul>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="/sightseeing">Sightseeing</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/testimonials">Reviews</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>Varanasi, Uttar Pradesh</li>
              <li><a href="tel:+919277472279">+91 92774 72279</a></li>
              <li>info@yatraksathi.com</li>
            </ul>
          </div>
        </div>
        <div className="copy">
          <span>© {new Date().getFullYear()} Yatra Ke Sathi</span>
          <span>Photos: Unsplash</span>
        </div>
      </div>
    </footer>
  )
}

/* ─── Page ──────────────────────────────────────────────── */

export default function ServicesPage() {
  const [current, setCurrent]       = useState('tour')
  const [showSuccess, setShowSuccess] = useState(false)
  const [waLink, setWaLink]         = useState('')
  const [summary, setSummary]       = useState('')
  const formRef      = useRef(null)
  const presetPkgRef = useRef(null)
  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    if (presetPkgRef.current && formRef.current) {
      const sel = formRef.current.querySelector('[name="Package"]')
      if (sel) { sel.value = presetPkgRef.current; presetPkgRef.current = null }
    }
  })

  function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    if (!form.checkValidity()) { form.reportValidity(); return }
    const cfg = BOOKING_SVCS[current]
    const svcLabel = cfg.title.replace(/^(Plan a|Book a|Find a) /, '')
    const lines = ['Namaste Yatra Ke Sathi 🙏', `Service: ${svcLabel}`]
    for (const [k, v] of new FormData(form).entries()) {
      if (String(v).trim()) lines.push(`${k}: ${v}`)
    }
    const text = lines.join('\n')
    setSummary(text)
    setWaLink(`${WA_BASE}?text=${encodeURIComponent(text)}`)
    setShowSuccess(true)
  }

  function handleNewEnq() { formRef.current?.reset(); setShowSuccess(false) }

  const cfg = BOOKING_SVCS[current]

  return (
    <div>
      {/* SVG symbol defs */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <symbol id="i-temple" viewBox="0 0 40 40"><path d="M20 3v4M20 7l5 2-5 2M10 36V22c0-6 4-10 10-15 6 5 10 9 10 15v14M6 36h28M17 36v-6a3 3 0 0 1 6 0v6M14 22h12"/></symbol>
          <symbol id="i-car"    viewBox="0 0 40 40"><path d="M6 27v-6c0-2 1.5-4 4-4h20c2.5 0 4 2 4 4v6zM10 17l3-6h14l3 6M16 8h8"/><circle cx="12" cy="28" r="3.2"/><circle cx="28" cy="28" r="3.2"/></symbol>
          <symbol id="i-boat"   viewBox="0 0 40 40"><path d="M3 23h34c-2.5 6-8 8.5-17 8.5S5.5 29 3 23zM20 23V8M20 8l7 13M20 8l-7 13M6 35q3-1.6 6 0t6 0 6 0 6 0 6 0"/></symbol>
          <symbol id="i-stay"   viewBox="0 0 40 40"><path d="M7 35V16h26v19M4 16h32M20 5l9 7H11zM16.5 35v-6a3.5 3.5 0 0 1 7 0v6M11 21h4v4h-4zM25 21h4v4h-4z"/></symbol>
          <symbol id="i-plan"   viewBox="0 0 40 40"><rect x="7" y="6" width="26" height="30" rx="3"/><path d="M13 14h14M13 20h14M13 26h8"/><path d="M15 3v6M25 3v6"/></symbol>
        </defs>
      </svg>
      <div className="topbar">
        <div className="wrap">
          <span className="hi">हर हर महादेव · जय गंगा मैया · सुरक्षित यात्रा</span>
          <span>
            <span className="hide-sm">Call / WhatsApp: </span>
            <a href="tel:+919277472279">+91 92774 72279</a>
          </span>
        </div>
      </div>
      <div className="toran" aria-hidden="true">
        {Array.from({ length: TORAN }, (_, i) => <i key={i} />)}
      </div>
      <Navbar ctaLabel="Plan My Yatra" ctaHref={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to plan my yatra. Please help.')}`} />

      <main>
        <style>{`
          .svcs-hero { padding: 44px 0 60px; position: relative; overflow: hidden; }
          .svcs-mand  { position: absolute; right: -160px; top: -120px; width: 680px; height: 680px;
                        opacity: .15; animation: turn 120s linear infinite; pointer-events: none; }
          .svcs-bc    { font-size: .78rem; color: var(--ink-soft); display: flex; gap: 6px;
                        flex-wrap: wrap; margin-bottom: 20px; align-items: center; }
          .svcs-bc a  { color: var(--saffron-deep); text-decoration: underline; text-underline-offset: 3px; }

          .svcs-svc-link { display: flex; flex-direction: column; gap: 8px;
                           background: var(--cream); border: 1.5px solid var(--line);
                           border-radius: var(--radius); padding: 14px 12px 12px;
                           text-decoration: none; color: var(--ink);
                           transition: border-color .2s, transform .2s, box-shadow .2s; }
          .svcs-svc-link:hover { border-color: var(--saffron); transform: translateY(-3px); box-shadow: var(--shadow); }
          .svcs-svc-ic { width: 44px; height: 44px; border-radius: 50%; background: var(--paper-2);
                         display: grid; place-items: center; font-size: 1.3rem; }

          .svcs-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 1px; background: var(--line); }
          @media(max-width:640px){ .svcs-stats { grid-template-columns: repeat(2,1fr); } }

          .svcs-trust { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
          @media(max-width:860px){ .svcs-trust { grid-template-columns: repeat(2,1fr); } }
          @media(max-width:480px){ .svcs-trust { grid-template-columns: 1fr; } }
        `}</style>

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="svcs-hero">
          {/* Rotating mandala watermark */}
          <svg className="svcs-mand" viewBox="-100 -100 200 200" aria-hidden="true">
            <g stroke="var(--saffron)" strokeWidth=".8" fill="none">
              {[20,35,50,65,80,95].map(r => <circle key={r} r={r} />)}
              {Array.from({ length: 12 }, (_, i) => {
                const a = (i * 30) * Math.PI / 180
                return <line key={i} x1={Math.cos(a)*20} y1={Math.sin(a)*20} x2={Math.cos(a)*95} y2={Math.sin(a)*95} />
              })}
              {[20,35,50,65,80,95].map(r => (
                Array.from({ length: 6 }, (_, i) => {
                  const a = (i * 60 + 30) * Math.PI / 180
                  return <circle key={`p${r}${i}`} cx={Math.cos(a)*r} cy={Math.sin(a)*r} r="3" fill="var(--saffron)" fillOpacity=".4" />
                })
              ))}
            </g>
          </svg>

          <div className="wrap hero-grid">
            {/* ── Left: text ── */}
            <div>
              <nav className="svcs-bc" aria-label="breadcrumb">
                <a href="/">Home</a>
                <span aria-hidden="true">›</span>
                <span>Services</span>
              </nav>

              <span className="namaste">यात्रा के साथी —</span>

              <h1 style={{ fontSize: 'clamp(2.6rem,5.4vw,4.3rem)', margin: '6px 0 16px', lineHeight: 1.08 }}>
                Your Varanasi<br />journey, <em>arranged.</em>
              </h1>

              <p className="lead">
                Tours, cabs, boat rides and hotels — looked after personally by a local team
                from Varanasi. One call. We take care of the rest.
              </p>

              <div className="hero-meta">
                <span className="chip">
                  <i>
                    <svg viewBox="0 0 40 40" style={{ width: 16, height: 16 }}>
                      <path d="M20 4l2.2 6.6H29l-5.6 4 2.1 6.5L20 17l-5.5 4.1 2.1-6.5L11 10.6h6.8z" fill="var(--saffron-deep)" />
                    </svg>
                  </i>
                  5,000+ happy travellers
                </span>
                <span className="chip">
                  <i>
                    <svg viewBox="0 0 40 40" style={{ width: 16, height: 16 }}>
                      <circle cx="20" cy="20" r="14" fill="none" stroke="var(--saffron-deep)" strokeWidth="2.5" />
                      <path d="M14 20l4 4 8-8" fill="none" stroke="var(--saffron-deep)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </i>
                  No hidden charges
                </span>
                <span className="chip">
                  <i>
                    <svg viewBox="0 0 40 40" style={{ width: 16, height: 16 }}>
                      <circle cx="20" cy="20" r="14" fill="none" stroke="var(--saffron-deep)" strokeWidth="2.5" />
                      <path d="M20 12v8l5 3" fill="none" stroke="var(--saffron-deep)" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </i>
                  24×7 available
                </span>
              </div>

              {/* 4 service quick-links */}
              <div className="services" style={{ marginTop: '8px' }}>
                {SVC_CARDS.map(s => (
                  <a key={s.key} href={s.page} className="svcs-svc-link">
                    <span className="svcs-svc-ic">{s.icon}</span>
                    <b style={{ fontWeight: 600, fontSize: '.98rem', lineHeight: 1.2 }}>{s.title}</b>
                    <small style={{ fontSize: '.8rem', color: 'var(--ink-soft)', lineHeight: 1.3 }}>{s.tagline}</small>
                  </a>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '28px' }}>
                <a
                  href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to plan my yatra. Please help.')}`}
                  target="_blank" rel="noopener"
                  className="btn"
                >
                  <WaIcon size={18} color="#fff" /> Plan My Yatra
                </a>
                <a href="tel:+919277472279" className="btn line">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.9a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c.9.3 1.9.6 2.9.7A2 2 0 0122 16.9z"/>
                  </svg>
                  Call Now
                </a>
              </div>
            </div>

            {/* ── Right: visual ── */}
            <div className="visual">
              <div className="dots-bg" />
              <div className="arch">
                <svg className="outline" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 125V42C0 30 8 22 18 17 30 11 42 8 50 0c8 8 20 11 32 17 10 5 18 13 18 25v83"
                    fill="none" stroke="#e8701a" vectorEffect="non-scaling-stroke" style={{ strokeWidth: '1.5px' }} />
                </svg>
                <div className="frame ph">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={U('1571536802807-30451e3955d8', 1100)}
                    alt="Boats tied at the ghats along the Ganga in Varanasi"
                  />
                </div>
              </div>

              {/* Rotating stamp */}
              <svg className="stamp" viewBox="0 0 120 120" aria-hidden="true">
                <defs>
                  <path id="svcs-sc" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" />
                </defs>
                <circle cx="60" cy="60" r="58" fill="#e8701a" />
                <text fontFamily="Mukta" fontSize="10" fontWeight="600" letterSpacing="2" fill="#fdf4de">
                  <textPath href="#svcs-sc">LOCAL · VARANASI · TRUSTED · 24×7 ·</textPath>
                </text>
                <text x="60" y="67" textAnchor="middle" fontFamily="'Tiro Devanagari Hindi',serif" fontSize="17" fill="#fdf4de">वाराणसी</text>
              </svg>

              {/* Round inset photo */}
              <div className="round">
                <div className="in ph">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={U('1599831069477-b2acdc0bcb91', 500)}
                    alt="Evening Ganga Aarti ceremony"
                  />
                </div>
              </div>

              {/* Floating chips */}
              <div className="float f1">
                <span className="ic" style={{ background: 'var(--saffron)', fontSize: '1.05rem', display: 'grid', placeItems: 'center' }}>🛕</span>
                <div><b>Temple Darshan</b><small>All major temples</small></div>
              </div>
              <div className="float f2">
                <span className="ic" style={{ background: 'var(--saffron)', fontSize: '1.05rem', display: 'grid', placeItems: 'center' }}>⛵</span>
                <div><b>Sunrise boat</b><small>From 5:30 AM</small></div>
              </div>
              <div className="float f3">
                <span className="ic" style={{ background: 'var(--saffron)', fontSize: '1.05rem', display: 'grid', placeItems: 'center' }}>🚗</span>
                <div><b>Station pickup</b><small>Varanasi Jn &amp; Airport</small></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats strip ─────────────────────────────────── */}
        <div style={{ background: 'var(--saffron-deep)' }}>
          <div className="wrap">
            <div className="svcs-stats">
              {[
                ['5,000+', 'Happy Travellers'],
                ['4', 'Services, One Team'],
                ['24×7', 'Available'],
                ['₹0', 'Hidden Charges'],
              ].map(([n, l]) => (
                <div key={l} style={{ padding: '22px 20px', textAlign: 'center', background: 'var(--saffron-deep)' }}>
                  <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: '2rem', color: '#fff', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.75)', marginTop: '4px' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Booking Panel ────────────────────────────────── */}
        <div className="wrap booking" id="book">
          <div className="panel">
            <div className="panel-top">
              <h2>
                <svg viewBox="0 0 40 40"><use href="#i-plan" /></svg>
                <span>{cfg.title}</span>
              </h2>
              <div className="tabs">
                {Object.keys(BOOKING_SVCS).map(key => (
                  <button key={key} className={current === key ? 'active' : ''} onClick={() => { setCurrent(key); setShowSuccess(false) }}>
                    <svg viewBox="0 0 40 40"><use href={TAB_ICONS[key]} /></svg>
                    {TAB_LABELS[key]}
                  </button>
                ))}
              </div>
            </div>

            {!showSuccess && (
              <form ref={formRef} noValidate onSubmit={handleSubmit}>
                <div className="dyn">
                  {cfg.fields.map((f, i) => {
                    const id = `d${i}`
                    return (
                      <div key={`${current}-${i}`} className={f.w === 2 ? 'w2' : ''}>
                        <label htmlFor={id}>{f.id}{f.req && <span className="r"> *</span>}</label>
                        {f.type === 'select' ? (
                          <select id={id} name={f.id} required={!!f.req}>
                            {f.options.map(opt => <option key={opt}>{opt}</option>)}
                          </select>
                        ) : (
                          <input id={id} name={f.id} type={f.type} required={!!f.req} min={f.min} defaultValue={f.value}
                            {...(f.type === 'date' ? { min: today } : {})} placeholder={f.ph} />
                        )}
                      </div>
                    )
                  })}
                </div>
                <div>
                  <label htmlFor="f_name">Your name <span className="r">*</span></label>
                  <input id="f_name" name="Name" required autoComplete="name" placeholder="Full name" />
                </div>
                <div>
                  <label htmlFor="f_phone">Phone / WhatsApp <span className="r">*</span></label>
                  <input id="f_phone" name="Phone" type="tel" required pattern="[0-9+\s\-]{10,15}" autoComplete="tel" placeholder="+91" />
                </div>
                <div className="w2">
                  <label htmlFor="f_msg">Anything else?</label>
                  <textarea id="f_msg" name="Message" placeholder="Elders travelling, special puja, food preferences…" />
                </div>
                <div className="w4 form-foot">
                  <button type="submit" className="btn">Send enquiry</button>
                  <small>Free. No payment now. We reply within a few hours.</small>
                </div>
              </form>
            )}

            {showSuccess && (
              <div className="success show" role="status">
                <div>
                  <h3><span className="hand">Dhanyavaad!</span> Your enquiry is ready.</h3>
                  <p style={{ color: 'var(--ink-soft)' }}>Send it to us on WhatsApp and we&apos;ll reply with a plan and price.</p>
                  <pre>{summary}</pre>
                </div>
                <div className="acts">
                  <a className="btn wa" href={waLink} target="_blank" rel="noopener">Send on WhatsApp</a>
                  <button className="btn line" onClick={handleNewEnq} type="button">New enquiry</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Service Cards ────────────────────────────────── */}
        <section style={{ padding: '96px 0' }}>
          <div className="wrap">
            <div className="center" style={{ marginBottom: '52px' }}>
              <span className="eyebrow">What we arrange</span>
              <h2 className="sec-title">Four services, <em>one sathi</em></h2>
              <p className="sec-lead">
                Book one service or all four. Either way, one person from our team looks after your trip.
              </p>
              <div className="lotus-div" style={{ marginTop: '18px' }}>
                <svg viewBox="0 0 60 36" style={{ width: 42, height: 26 }}>
                  <path d="M30 30C30 20 18 12 6 14c4 4 10 8 10 16M30 30C30 20 42 12 54 14c-4 4-10 8-10 16M30 30C24 20 24 8 30 2c6-6 6 18 0 28"
                    fill="none" stroke="var(--saffron)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <div className="svc-grid">
              {SVC_CARDS.map((s, idx) => (
                <article key={s.key} className={`scard${idx % 2 === 1 ? ' d1' : ''}`}>
                  <div className="ph">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={U(s.img, 700)} alt={s.alt} loading="lazy" />
                    <span className="num" style={{ fontSize: '1.3rem', lineHeight: 1, display: 'grid', placeItems: 'center' }}>
                      {s.icon}
                    </span>
                  </div>
                  <div className="body">
                    <h3>{s.title}</h3>
                    <span className="hi">{s.hi}</span>
                    <p>{s.desc}</p>
                    <div className="tags">
                      {s.tags.map(t => <span key={t}>{t}</span>)}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap', marginTop: 'auto' }}>
                      <a href={s.page} className="go">{s.cta}</a>
                      <span style={{ fontSize: '.88rem', color: 'var(--saffron-deep)', fontWeight: 700, background: 'var(--paper-2)', borderRadius: '999px', padding: '2px 12px', border: '1px solid var(--line)' }}>{s.price}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ────────────────────────────────── */}
        <section style={{ padding: '90px 0', background: 'var(--paper-2)' }}>
          <div className="wrap">
            <div className="center" style={{ marginBottom: '52px' }}>
              <span className="eyebrow">Why Choose Us</span>
              <h2 className="sec-title">Travel with <em>confidence</em></h2>
              <p className="sec-lead">Local knowledge, honest pricing, and genuine care — the Yatra Ke Sathi promise.</p>
            </div>
            <div className="svcs-trust">
              {TRUST.map(t => (
                <div key={t.title} style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '16px', padding: '32px 26px' }}>
                  <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: '2.2rem', color: 'var(--saffron)', lineHeight: 1, marginBottom: '16px' }}>{t.n}</div>
                  <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px' }}>{t.title}</div>
                  <p style={{ fontSize: '.9rem', color: 'var(--ink-soft)', lineHeight: 1.65, margin: 0 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WhatsApp enquiry strip ───────────────────────── */}
        <section style={{ padding: '60px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
          <div className="wrap" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
            <div>
              <div className="hi" style={{ color: 'var(--saffron-deep)', fontSize: '1.05rem', marginBottom: '4px' }}>हर हर महादेव</div>
              <h2 style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: 'clamp(1.5rem,3vw,2.1rem)', margin: 0 }}>
                Not sure which service you need?
              </h2>
              <p style={{ color: 'var(--ink-soft)', marginTop: '6px', fontSize: '.97rem' }}>
                WhatsApp us your trip dates and group size — we suggest the best plan for you.
              </p>
            </div>
            <a
              href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I need help planning my trip to Varanasi. Please suggest services.')}`}
              target="_blank" rel="noopener"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#1f8f4e', color: '#fff', padding: '14px 30px', borderRadius: '6px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', flexShrink: 0, boxShadow: '0 4px 18px rgba(31,143,78,.3)' }}
            >
              <WaIcon size={22} color="#fff" /> Chat on WhatsApp
            </a>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────── */}
        <section className="pkg-cta-sec">
          <div className="wrap">
            <div className="hi deva">हर हर महादेव · जय गंगा मैया</div>
            <h2>Ready to Plan Your Yatra?</h2>
            <p>Tell us what you need — tours, cabs, boats or a hotel. We arrange everything, personally.</p>
            <a
              href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to plan my yatra to Varanasi. Please help.')}`}
              target="_blank" rel="noopener"
              className="pkg-wa-btn"
            >
              <WaIcon size={22} color="#fff" /> Start Planning on WhatsApp
            </a>
            <div className="pkg-cta-links">
              <a href="tel:+919277472279">+91 92774 72279</a>
              <a href="/about">About Yatra Ke Sathi</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <a
        href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to plan my yatra to Varanasi.')}`}
        target="_blank" rel="noopener"
        className="fab"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 32 32" fill="#fff">
          <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 15.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
        </svg>
      </a>
    </div>
  )
}

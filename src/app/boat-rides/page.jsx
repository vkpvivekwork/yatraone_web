'use client'
import { useState, useRef } from 'react'
import './page.css'
import { U } from '@/lib/constants'

const WA = '919277472279'
const WA_BASE = `https://wa.me/${WA}`
const TORAN = 55

const PACKAGES = [
  {
    id: 'basic',
    name: 'Boat Ride',
    hindi: 'नाव की सवारी',
    price: '₹399',
    per: '/ person',
    img: U('1571536802807-30451e3955d8', 700),
    imgSm: U('1571536802807-30451e3955d8', 100),
    tags: ['Budget', 'Solo', 'Quick darshan'],
  },
  {
    id: 'morning',
    name: 'Morning Boat',
    hindi: 'सुबह की नाव',
    price: '₹1,499',
    per: '/ boat',
    img: U('1596097825168-c9b773f404ff', 700),
    imgSm: U('1596097825168-c9b773f404ff', 100),
    tags: ['Sunrise', 'Family', 'Peaceful'],
  },
  {
    id: 'aarti',
    name: 'Aarti Boat Ride',
    hindi: 'गंगा आरती नाव',
    price: '₹1,999',
    per: '/ boat',
    img: U('1627894483216-2138af692e32', 700),
    imgSm: U('1627894483216-2138af692e32', 100),
    tags: ['Evening', 'Ganga Aarti', 'Spiritual'],
    badge: 'Most popular',
  },
  {
    id: 'reel',
    name: 'Ghat Ride + Reel',
    hindi: 'घाट राइड · फोटो और रील',
    price: '₹3,499',
    per: '/ booking',
    img: U('1608412525537-662195e817c5', 700),
    imgSm: U('1608412525537-662195e817c5', 100),
    tags: ['Photos', 'Reels', 'All ghats'],
    badge: 'Photos & Reel',
  },
]

const REVIEWS = [
  { text: 'Booked the morning boat for our family of 5. The guide knew every ghat — it felt like watching Kashi breathe. Truly unforgettable.', name: 'Priya M., Mumbai', stars: '★★★★★', pkg: 'Morning Boat' },
  { text: 'The Ganga Aarti from a boat is something no words can describe. Yatra Ke Saathi arranged everything smoothly on short notice.', name: 'Rohit K., Delhi', stars: '★★★★★', pkg: 'Aarti Boat Ride' },
  { text: 'Got the Ghat Ride + Reel package for our honeymoon. The photos they delivered same evening were beautiful. Worth every rupee.', name: 'Anjali & Vivek, Pune', stars: '★★★★★', pkg: 'Ghat Ride + Reel' },
]

function Nav({ navOpen, setNavOpen }) {
  const wa = `${WA_BASE}?text=${encodeURIComponent('Namaste! I want to plan a yatra.')}`
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href="/" className="logo">
          <img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Saathi" style={{ height: '60px', width: 'auto', display: 'block' }} />
        </a>
        <nav className={`nav-links${navOpen ? ' open' : ''}`}>
          <a href="/tour-packages" onClick={() => setNavOpen(false)}>Packages</a>
          <a href="/cab" onClick={() => setNavOpen(false)}>Cab</a>
          <a href="/boat-rides" onClick={() => setNavOpen(false)}>Boating</a>
          <a href="/sightseeing" onClick={() => setNavOpen(false)}>Sightseeing</a>
          <a href="/about" onClick={() => setNavOpen(false)}>About</a>
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
      <div className="big-hi" aria-hidden="true">गंगा</div>
      <div className="wrap">
        <div className="foot">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <a href="/" className="logo" style={{ marginBottom: '14px' }}>
              <img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Saathi" style={{ height: '56px', width: 'auto', display: 'block' }} />
            </a>
            <p style={{ fontSize: '.93rem', maxWidth: '22rem', color: '#cdb892' }}>Tours, cabs, boats and hotels in Kashi, arranged by people who live here.</p>
          </div>
          <div><h4>Services</h4><ul>
            <li><a href="/tour-packages">Tour Packages</a></li>
            <li><a href="/cab">Cab Booking</a></li>
            <li><a href="/boat-rides">Boating</a></li>
            <li><a href="/boat-rides">Boat Rides</a></li>
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
          <span>Photos: Pexels</span>
        </div>
      </div>
    </footer>
  )
}

export default function BoatRidesPage() {
  const [navOpen, setNavOpen] = useState(false)
  const [chosen, setChosen] = useState(null)
  const [form, setForm] = useState({ pkg: '', date: '', pax: '2', name: '', phone: '', msg: '' })
  const formRef = useRef(null)

  const pkg = PACKAGES.find(p => p.id === chosen) ?? null
  const formPkg = PACKAGES.find(p => p.id === form.pkg) ?? null

  function pick(id) {
    const next = chosen === id ? null : id
    setChosen(next)
    setForm(f => ({ ...f, pkg: next ?? '' }))
  }

  function setF(k, v) { setForm(f => ({ ...f, [k]: v })) }

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function buildWaMsg() {
    const p = PACKAGES.find(x => x.id === form.pkg)
    const lines = ['Namaste! Ganga Boat Ride Enquiry 🙏']
    if (p) lines.push(`Package: ${p.name} (${p.price} ${p.per})`)
    if (form.date) lines.push(`Date: ${new Date(form.date + 'T00:00').toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}`)
    if (form.pax) lines.push(`Yatris: ${form.pax}`)
    if (form.name) lines.push(`Name: ${form.name}`)
    if (form.phone) lines.push(`Phone: ${form.phone}`)
    if (form.msg) lines.push(`Note: ${form.msg}`)
    return lines.join('\n')
  }

  const today = new Date().toISOString().slice(0, 10)

  return (
    <div style={{ paddingBottom: pkg ? '80px' : 0 }}>
      <div className="topbar">
        <div className="wrap">
          <span className="hi">जय माँ गंगे · हर हर महादेव</span>
          <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
        </div>
      </div>
      <div className="toran" aria-hidden="true">
        {Array.from({ length: TORAN }, (_, i) => <i key={i} />)}
      </div>

      <Nav navOpen={navOpen} setNavOpen={setNavOpen} />

      <main>
        {/* ── Hero ── */}
        <section className="br-hero">
          <div className="wrap">
            <nav className="pkg-breadcrumb" style={{ marginBottom: '16px' }}>
              <a href="/">Home</a><span className="sep">›</span>
              <a href="/boat-rides">Boating</a><span className="sep">›</span>
              <span>Boat Ride Packages</span>
            </nav>
            <div className="br-eyebrow">
              <svg width="18" height="18" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 23h34c-2.5 6-8 8.5-17 8.5S5.5 29 3 23z"/><path d="M20 23V8M20 8l7 13M20 8l-7 13"/>
                <path d="M6 35q3-1.6 6 0t6 0 6 0 6 0 6 0"/>
              </svg>
              गंगा में नौका विहार · Kashi
            </div>
            <h1>Ganga Boat Rides — <em>clear prices,</em> instant booking</h1>
            <p>Four packages, starting at ₹399. Tap a card to choose your ride, fill the short form below, and we confirm on WhatsApp.</p>
            <div className="br-hero-acts">
              <a href="#packages" className="btn">See packages</a>
              <a href="tel:+919277472279" className="btn line">Call us</a>
            </div>
            <div className="br-chips">
              {[['🕐','Sunrise to Aarti'],['💬','Book in 1 min'],['👥','Solo to groups'],['📸','Photos optional']].map(([icon, label]) => (
                <span key={label} className="br-chip"><i>{icon}</i>{label}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Package cards ── */}
        <section id="packages" className="br-pkgs-wrap">
          <div className="wrap">
            <div className="br-section-label">
              <svg width="16" height="16" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 23h34c-2.5 6-8 8.5-17 8.5S5.5 29 3 23z"/><path d="M20 23V8M20 8l7 13M20 8l-7 13"/>
              </svg>
              Choose your ride
            </div>
            <p className="br-subtitle">Tap a package to select it — it auto-fills the booking form below.</p>

            <div className="br-grid">
              {PACKAGES.map(p => (
                <div
                  key={p.id}
                  className={`br-card${chosen === p.id ? ' chosen' : ''}`}
                  onClick={() => pick(p.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && pick(p.id)}
                  aria-pressed={chosen === p.id}
                >
                  <div className="img-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={p.name} loading="lazy" />
                    <div className="br-img-overlay"></div>
                    {p.badge && <span className="br-badge">{p.badge}</span>}
                    <span className="br-check">✓ Selected</span>
                  </div>
                  <div className="br-card-body">
                    <div className="br-card-top">
                      <h3>{p.name}</h3>
                      <div className="hindi">{p.hindi}</div>
                    </div>
                    <div className="br-tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
                    <div className="br-price-row">
                      <div>
                        <span className="br-price">{p.price}</span>
                        <span className="br-per">{p.per}</span>
                      </div>
                      <span className={`br-tap-hint${chosen === p.id ? ' gone' : ''}`}>Select →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* empty state */}
            {!chosen && (
              <div className="br-empty">
                <span className="br-empty-arrow">↑</span>
                <p>Tap any package above — it will fill in the booking form automatically.</p>
                <button className="btn line" style={{ padding:'8px 18px', fontSize:'.88rem' }} onClick={scrollToForm}>
                  Or fill form manually
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── Booking form + Testimonials ── */}
        <section className="br-lower" ref={formRef} id="book">
          <div className="wrap">
            <div className="br-lower-grid">

              {/* form */}
              <div className="br-form-card">
                <div className="br-form-head">
                  <h3>Book your boat ride</h3>
                  <p>We reply on WhatsApp within 2 hours · No payment now</p>
                </div>
                <div className="br-form-body">

                  {/* package select */}
                  <label>Package</label>
                  <div className="br-select-wrap">
                    <select
                      value={form.pkg}
                      onChange={e => { setF('pkg', e.target.value); setChosen(e.target.value || null) }}
                    >
                      <option value="">— Select a package —</option>
                      {PACKAGES.map(p => (
                        <option key={p.id} value={p.id}>{p.name} · {p.price} {p.per}</option>
                      ))}
                    </select>
                    {/* image preview when package selected */}
                    {formPkg && (
                      <div className="br-pkg-preview">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={formPkg.imgSm} alt={formPkg.name} />
                        <div>
                          <b>{formPkg.name}</b><br />
                          <span>{formPkg.price} {formPkg.per} · {formPkg.duration}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="row-2">
                    <div>
                      <label>Date</label>
                      <input type="date" min={today} value={form.date} onChange={e => setF('date', e.target.value)} />
                    </div>
                    <div>
                      <label>Yatris</label>
                      <select value={form.pax} onChange={e => setF('pax', e.target.value)}>
                        {['1','2','3','4','5','6','7','8','9','10+'].map(n => <option key={n}>{n}</option>)}
                      </select>
                    </div>
                  </div>

                  <label>Your name <span style={{ color:'var(--saffron-deep)' }}>*</span></label>
                  <input placeholder="Full name" value={form.name} onChange={e => setF('name', e.target.value)} autoComplete="name" />

                  <label>Phone / WhatsApp <span style={{ color:'var(--saffron-deep)' }}>*</span></label>
                  <input type="tel" placeholder="+91" value={form.phone} onChange={e => setF('phone', e.target.value)} autoComplete="tel" />

                  <label>Anything to add? <span style={{ color:'var(--ink-soft)', fontWeight:400 }}>(optional)</span></label>
                  <textarea placeholder="Preferred ghat, group details, special occasion…" value={form.msg} onChange={e => setF('msg', e.target.value)} />

                  <div className="br-form-foot">
                    <a
                      href={`${WA_BASE}?text=${encodeURIComponent(buildWaMsg())}`}
                      target="_blank" rel="noopener"
                      className="btn wa"
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      <svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor">
                        <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 15.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/>
                      </svg>
                      Send on WhatsApp
                    </a>
                    <a href="tel:+919277472279" className="btn line" style={{ padding:'11px 16px' }}>Call</a>
                  </div>
                  <p className="br-form-note">Free to enquire · No advance payment · We confirm within 2 hrs</p>
                </div>
              </div>

              {/* testimonials */}
              <div className="br-testimonials">
                <h3>What yatris say</h3>
                <p className="subhead">Real guests who booked through Yatra Ke Saathi</p>
                {REVIEWS.map((r, i) => (
                  <div key={i} className="br-review">
                    <p>{r.text}</p>
                    <div className="br-review-foot">
                      <div>
                        <div className="br-review-name">{r.name}</div>
                        <div style={{ fontSize:'.78rem', color:'var(--ink-soft)', marginTop:'2px' }}>Booked: {r.pkg}</div>
                      </div>
                      <span className="br-review-stars">{r.stars}</span>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop:'22px', padding:'16px 20px', background:'var(--cream)', border:'1px solid var(--line)', borderRadius:'12px' }}>
                  <div style={{ fontFamily:"'Fraunces',serif", fontWeight:700, marginBottom:'4px' }}>600+ yatras planned</div>
                  <div style={{ fontSize:'.88rem', color:'var(--ink-soft)' }}>4.9 ★ average · No planning fees · Reply in &lt; 2 hrs</div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ── Sticky booking bar ── */}
      <div className={`br-bar${pkg ? ' show' : ''}`} role="region" aria-label="Selected package">
        {pkg && (
          <div className="wrap">
            <div className="br-bar-in">
              <div className="br-bar-info">
                <div className="br-bar-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pkg.imgSm} alt={pkg.name} />
                </div>
                <div>
                  <div className="br-bar-name">{pkg.name}</div>
                  <div className="br-bar-meta">{pkg.duration} · Kashi Ghats</div>
                </div>
              </div>
              <div>
                <div className="br-bar-price">{pkg.price}</div>
                <span className="br-bar-per">{pkg.per}</span>
              </div>
              <div className="br-bar-acts">
                <button className="br-bar-scroll" onClick={scrollToForm}>Fill details →</button>
                <a
                  href={`${WA_BASE}?text=${encodeURIComponent(`Namaste! I want to book: ${pkg.name} (${pkg.price} ${pkg.per}). Please confirm availability.`)}`}
                  target="_blank" rel="noopener"
                  className="btn wa"
                  style={{ fontSize:'.88rem', padding:'9px 18px' }}
                >
                  <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor">
                    <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 15.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/>
                  </svg>
                  Quick book
                </a>
                <button className="br-bar-clear" onClick={() => pick(chosen)}>✕</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FAB — hidden when booking bar is visible */}
      <a
        href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to book a Ganga boat ride. Please share the packages.')}`}
        target="_blank" rel="noopener"
        className="fab" aria-label="WhatsApp"
        style={{ opacity: pkg ? 0 : 1, pointerEvents: pkg ? 'none' : 'auto', transition: 'opacity .2s' }}
      >
        <svg viewBox="0 0 32 32" fill="#fff" width="28" height="28">
          <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 15.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/>
        </svg>
      </a>
    </div>
  )
}

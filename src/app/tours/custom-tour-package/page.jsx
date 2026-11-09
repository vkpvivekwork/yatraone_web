'use client'
import { useState } from 'react'
import Navbar from '@/app/components/Navbar'

const API_URL  = 'http://yatra.pythonanywhere.com/api/bookings/'
const WA       = '919277472279'
const WA_BASE  = `https://wa.me/${WA}`
const TORAN    = 60
const PKG_NAME = 'Custom Tour Package'
const U = (id, w = 800) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

const CITIES = [
  { value: 'kashi',       label: 'Kashi (Varanasi)' },
  { value: 'ayodhya',     label: 'Ayodhya'          },
  { value: 'prayagraj',   label: 'Prayagraj'        },
  { value: 'chitrakoot',  label: 'Chitrakoot'       },
  { value: 'vindhyachal', label: 'Vindhyachal'      },
]

const WHY = [
  { icon: '🗺️', title: 'Tailored Day-by-day Plan', desc: 'We build your itinerary around your dates, pace and must-see places.' },
  { icon: '👥', title: 'Any Group Size',            desc: 'Solo traveller to 100-person pilgrimage group — we handle all.' },
  { icon: '💰', title: 'Any Budget',                desc: 'Budget guesthouses to premium riverside hotels — you choose.' },
  { icon: '🏙️', title: 'Multi-city Available',     desc: 'Combine Kashi, Ayodhya, Prayagraj, Chitrakoot and more in one trip.' },
  { icon: '⚡', title: 'Reply Within 2 Hours',      desc: 'Share your plan and get a detailed itinerary on WhatsApp fast.' },
  { icon: '🛡️', title: 'No Advance Payment',       desc: 'Confirm your plan first. Payment only when you are satisfied.' },
]

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Yatra Ke Sathi — Custom Tour Packages',
  description: 'Custom tour packages in Varanasi, Ayodhya, Prayagraj and nearby sacred cities. Personalised itinerary, any group size, any budget.',
  url: 'https://yatraksathi.com/tours/custom-tour-package',
  telephone: '+919277472279',
  address: { '@type': 'PostalAddress', addressLocality: 'Varanasi', addressRegion: 'Uttar Pradesh', addressCountry: 'IN' },
  areaServed: ['Varanasi', 'Ayodhya', 'Prayagraj', 'Chitrakoot', 'Vindhyachal'],
}

const NUM_DAYS    = ['1','2','3','4','5','6–7','8–10','10+']
const NUM_PEOPLE  = ['1','2','3','4','5','6','7','8','9','10','11–15','16–20','20+']
const BUDGETS     = [
  { value: '', label: '— Select —' },
  { value: 'Under ₹5,000',  label: 'Under ₹5,000'       },
  { value: '₹5k–15k',       label: '₹5,000 – ₹15,000'   },
  { value: '₹15k–30k',      label: '₹15,000 – ₹30,000'  },
  { value: '₹30k+',         label: '₹30,000+'            },
  { value: 'flexible',      label: 'Flexible / Not sure' },
]

function buildWaMsg(f) {
  const lines = ['Namaste! I want a custom tour package.']
  if (f.cities.length)   lines.push(`Cities: ${f.cities.join(', ')}`)
  if (f.start_date)      lines.push(`Expected Date: ${f.start_date}`)
  if (f.num_days)        lines.push(`Duration: ${f.num_days} days`)
  if (f.num_people)      lines.push(`People: ${f.num_people}`)
  if (f.budget)          lines.push(`Budget: ${f.budget}`)
  if (f.name)            lines.push(`Name: ${f.name}`)
  if (f.phone)           lines.push(`Phone: ${f.phone}`)
  if (f.customer_notes)  lines.push(`Notes: ${f.customer_notes}`)
  return lines.join('\n')
}

function WaIcon({ size = 16 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 15.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
    </svg>
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
            <a href="/" className="logo" style={{ marginBottom: '14px' }}>
              <img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Sathi" style={{ height: '60px', width: 'auto', display: 'block' }} />
            </a>
            <p style={{ fontSize: '.93rem', maxWidth: '22rem', color: '#cdb892' }}>Tours, cabs, boats and hotels in Kashi, arranged by people who live here.</p>
          </div>
          <div><h4>Tours</h4><ul>
            <li><a href="/tours">All Packages</a></li>
            <li><a href="/tours/varanasi-tour-package-3-days-2-nights">Varanasi 3D/2N</a></li>
            <li><a href="/tours/varanasi-complete-tour-package">Complete Tour</a></li>
            <li><a href="/tours/varanasi-ayodhya-prayagraj-tour-package">Tri-city Yatra</a></li>
          </ul></div>
          <div><h4>Services</h4><ul>
            <li><a href="/services/cab">Cab Booking</a></li>
            <li><a href="/services/boat">Boat Rides</a></li>
            <li><a href="/services/hotel">Hotels</a></li>
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

export default function CustomTourPage() {
  const today = new Date().toISOString().slice(0, 10)
  const [form, setForm]     = useState({ name: '', phone: '', cities: [], start_date: '', num_days: '', num_people: '2', budget: '', customer_notes: '' })
  const [status, setStatus] = useState('idle')
  const [errMsg, setErrMsg] = useState('')

  function setF(k, v) { setForm(f => ({ ...f, [k]: v })) }
  function toggleCity(val) {
    setForm(f => ({ ...f, cities: f.cities.includes(val) ? f.cities.filter(c => c !== val) : [...f.cities, val] }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return
    setStatus('submitting')
    setErrMsg('')
    try {
      const payload = {
        name:          form.name.trim(),
        phone:         form.phone.trim(),
        services:      ['tour'],
        cities:        form.cities.length ? form.cities : ['kashi'],
        start_date:    form.start_date || undefined,
        num_days:      form.num_days   || undefined,
        num_people:    parseInt(form.num_people, 10) || 2,
        customer_budget: form.budget   || undefined,
        package_name:  PKG_NAME,
        customer_notes: form.customer_notes.trim() || undefined,
        page_source:   'tours/custom',
      }
      Object.keys(payload).forEach(k => payload[k] === undefined && delete payload[k])
      const res = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (res.ok) { setStatus('success') } else {
        const data = await res.json().catch(() => ({}))
        setErrMsg(typeof data === 'object' ? Object.values(data).flat().join(' ') : 'Something went wrong.')
        setStatus('error')
      }
    } catch { setErrMsg('Could not connect. Please try WhatsApp below.'); setStatus('error') }
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="topbar"><div className="wrap">
        <span className="hi">हर हर महादेव · काशी यात्रा · जय श्री राम</span>
        <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
      </div></div>
      <div className="toran" aria-hidden="true">{Array.from({ length: TORAN }, (_, i) => <i key={i} />)}</div>
      <Navbar ctaLabel="Plan My Tour" ctaHref="#plan" />

      <main>
        <style>{`
          .tp-hero{position:relative;min-height:460px;display:flex;align-items:center;
            background:url('${U('1608412525537-662195e817c5', 1400)}') center/cover no-repeat}
          .tp-overlay{position:absolute;inset:0;background:linear-gradient(160deg,rgba(10,5,0,.78) 0%,rgba(10,5,0,.28) 55%,rgba(10,5,0,.72) 100%)}
          .tp-hinner{position:relative;z-index:2;padding:clamp(55px,8vw,100px) clamp(16px,5vw,52px);max-width:800px}
          .why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px}
          .tp-form-wrap{background:var(--cream);border:1px solid var(--line);border-radius:18px;padding:clamp(24px,5vw,46px);max-width:680px;margin:0 auto}
          .tp-form-grid{display:grid;grid-template-columns:1fr 1fr;column-gap:20px;row-gap:18px}
          @media(max-width:520px){.tp-form-grid{grid-template-columns:1fr}}
          .tp-full{grid-column:1/-1}
          .tp-field label{display:block;font-size:.74rem;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:5px}
          .tp-field input,.tp-field select,.tp-field textarea{width:100%;background:var(--paper);border:1.5px solid var(--line);border-radius:8px;padding:10px 13px;font-size:.96rem;color:var(--ink);outline:none;box-sizing:border-box;font-family:inherit;resize:none;transition:border-color .18s}
          .tp-field input:focus,.tp-field select:focus,.tp-field textarea:focus{border-color:var(--saffron);background:#fff}
          .tp-submit{width:100%;padding:14px;background:var(--saffron-deep);color:#fff;border:none;border-radius:10px;font-weight:700;font-size:1rem;cursor:pointer;transition:background .2s}
          .tp-submit:hover{background:var(--kumkum)}
          .tp-submit:disabled{opacity:.5;cursor:not-allowed}
          .tp-error{background:#fdf2f2;border:1px solid #f5c6c6;border-radius:8px;padding:12px 16px;font-size:.88rem;color:#9b2c2c}
          .tp-success{text-align:center;padding:40px 20px;display:flex;flex-direction:column;align-items:center;gap:14px}
          .tp-form form{display:block;padding:0;gap:0}
          .city-pill-btn{padding:7px 16px;border-radius:20px;border:1.5px solid var(--line);background:var(--paper);font-size:.85rem;cursor:pointer;transition:all .18s;font-family:inherit}
          .city-pill-btn.active{background:var(--saffron);border-color:var(--saffron);color:#fff;font-weight:700}
        `}</style>

        {/* Hero */}
        <section className="tp-hero">
          <div className="tp-overlay" />
          <div className="tp-hinner">
            <nav style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.8)', marginBottom: '18px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <a href="/" style={{ color: '#fff', textDecoration: 'underline' }}>Home</a><span>›</span>
              <a href="/tours" style={{ color: '#fff', textDecoration: 'underline' }}>Tours</a><span>›</span>
              <span>Custom Tour</span>
            </nav>
            <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: 'clamp(.9rem,2vw,1.1rem)', color: '#FF9933', fontWeight: 700, marginBottom: '10px' }}>आपकी यात्रा · आपकी शर्तों पर</div>
            <h1 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(2rem,6vw,3.8rem)', color: '#fff', lineHeight: 1.08, textShadow: '0 3px 28px rgba(0,0,0,.7)', margin: '0 0 14px' }}>
              Custom Tour Package<br />Planned for You
            </h1>
            <p style={{ fontSize: 'clamp(.93rem,1.8vw,1.08rem)', color: 'rgba(255,255,255,.88)', lineHeight: 1.65, maxWidth: '48rem', marginBottom: '26px' }}>
              Tell us your dates, cities and group size — we design a personalised day-by-day itinerary around your schedule, budget and spiritual or cultural priorities.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a href="#plan" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg,#e8701a,#C4520C)', color: '#fff', padding: '13px 26px', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,.5)' }}>
                Plan My Tour
              </a>
              <a href="tel:+919277472279" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '13px 24px', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
                Call Now
              </a>
            </div>
          </div>
        </section>

        {/* Why Custom */}
        <section style={{ padding: '80px 0' }}>
          <div className="wrap">
            <div className="sec-head center" style={{ marginBottom: '46px' }}>
              <div>
                <div className="eyebrow">Why go custom</div>
                <h2 className="sec-title">Your Yatra, Your Way</h2>
                <p className="sec-lead">No fixed itineraries. No compromises. Just a plan built entirely around you.</p>
              </div>
            </div>
            <div className="why-grid">
              {WHY.map(w => (
                <div key={w.title} style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '14px', padding: '24px 20px' }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '12px' }}>{w.icon}</div>
                  <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '1rem', marginBottom: '7px' }}>{w.title}</div>
                  <p style={{ fontSize: '.88rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Planning Form */}
        <section id="plan" style={{ padding: '80px 0', background: 'var(--paper-2)' }}>
          <div className="wrap">
            <div className="sec-head center" style={{ marginBottom: '36px' }}>
              <div>
                <div className="eyebrow">Tell us your plan</div>
                <h2 className="sec-title">Get a Custom Itinerary</h2>
                <p className="sec-lead">Free · No advance payment · Itinerary on WhatsApp within 2 hours.</p>
              </div>
            </div>
            <div className="tp-form-wrap">
              {status === 'success' ? (
                <div className="tp-success">
                  <div style={{ fontSize: '3rem' }}>🙏</div>
                  <h2 style={{ fontFamily: "'Fraunces',serif" }}>Request Received!</h2>
                  <p style={{ color: 'var(--ink-soft)', maxWidth: '340px' }}>Our team will send your personalised itinerary on WhatsApp within 2 hours.</p>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <a href={`${WA_BASE}?text=${encodeURIComponent(buildWaMsg(form))}`} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: '#25D366', color: '#fff', borderRadius: '10px', fontWeight: 700, textDecoration: 'none' }}>
                      <WaIcon /> Chat on WhatsApp
                    </a>
                    <a href="/tours" style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 20px', border: '1.5px solid var(--line)', borderRadius: '10px', fontWeight: 600, textDecoration: 'none', color: 'var(--ink)' }}>
                      View All Tours
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="tp-form-grid">

                    {/* Cities */}
                    <div className="tp-field tp-full">
                      <label>Cities to Visit</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                        {CITIES.map(c => (
                          <button key={c.value} type="button"
                            className={`city-pill-btn${form.cities.includes(c.value) ? ' active' : ''}`}
                            onClick={() => toggleCity(c.value)}
                          >{c.label}</button>
                        ))}
                      </div>
                    </div>

                    <div className="tp-field">
                      <label htmlFor="tp-date">Expected Travel Date</label>
                      <input id="tp-date" type="date" min={today} value={form.start_date} onChange={e => setF('start_date', e.target.value)} />
                    </div>
                    <div className="tp-field">
                      <label htmlFor="tp-days">No. of Days</label>
                      <select id="tp-days" value={form.num_days} onChange={e => setF('num_days', e.target.value)}>
                        <option value="">Not sure</option>
                        {NUM_DAYS.map(d => <option key={d} value={d}>{d} day{d === '1' ? '' : 's'}</option>)}
                      </select>
                    </div>
                    <div className="tp-field">
                      <label htmlFor="tp-pax">No. of Travellers</label>
                      <select id="tp-pax" value={form.num_people} onChange={e => setF('num_people', e.target.value)}>
                        {NUM_PEOPLE.map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div className="tp-field">
                      <label htmlFor="tp-budget">Budget per Person</label>
                      <select id="tp-budget" value={form.budget} onChange={e => setF('budget', e.target.value)}>
                        {BUDGETS.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                      </select>
                    </div>
                    <div className="tp-field">
                      <label htmlFor="tp-name">Your Name *</label>
                      <input id="tp-name" type="text" required placeholder="Ramesh Sharma" value={form.name} onChange={e => setF('name', e.target.value)} autoComplete="name" />
                    </div>
                    <div className="tp-field">
                      <label htmlFor="tp-phone">Phone / WhatsApp *</label>
                      <input id="tp-phone" type="tel" required placeholder="+91 98765 43210" value={form.phone} onChange={e => setF('phone', e.target.value)} autoComplete="tel" />
                    </div>
                    <div className="tp-field tp-full">
                      <label htmlFor="tp-note">Special Requirements <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
                      <textarea id="tp-note" rows={3} placeholder="e.g. Senior citizens, vegetarian food, specific temples, wheelchair access, budget guesthouse or premium hotel…" value={form.customer_notes} onChange={e => setF('customer_notes', e.target.value)} style={{ minHeight: '80px' }} />
                    </div>
                    {status === 'error' && (
                      <div className="tp-full tp-error">{errMsg} · <a href={`${WA_BASE}?text=${encodeURIComponent(buildWaMsg(form))}`} target="_blank" rel="noopener">Message us on WhatsApp</a></div>
                    )}
                    <div className="tp-full" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <button type="submit" className="tp-submit" disabled={status === 'submitting'}>
                        {status === 'submitting' ? 'Sending…' : 'Send My Tour Request'}
                      </button>
                      <a href={`${WA_BASE}?text=${encodeURIComponent(buildWaMsg(form))}`} target="_blank" rel="noopener"
                        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: '#25D366', color: '#fff', borderRadius: '10px', fontWeight: 700, fontSize: '.95rem', textDecoration: 'none' }}>
                        <WaIcon size={18} /> Or plan on WhatsApp
                      </a>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pkg-cta-sec">
          <div className="wrap">
            <div className="hi deva">आपकी यात्रा · हर हर महादेव</div>
            <h2>Prefer a Fixed Package?</h2>
            <p>Browse our pre-planned tour packages for Varanasi and beyond.</p>
            <a href="/tours" className="pkg-wa-btn" style={{ background: 'var(--saffron-deep)' }}>View All Tours</a>
            <div className="pkg-cta-links">
              <a href="tel:+919277472279">+91 92774 72279</a>
              <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to plan a custom tour. Please help.')}`} target="_blank" rel="noopener">WhatsApp Us</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to plan a custom tour package.')}`} target="_blank" rel="noopener" className="fab" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32" fill="#fff"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 15.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
      </a>
    </div>
  )
}

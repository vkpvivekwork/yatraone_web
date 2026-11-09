'use client'
import { useState } from 'react'
import Navbar from '@/app/components/Navbar'

const API_URL  = 'http://yatra.pythonanywhere.com/api/bookings/'
const WA       = '919277472279'
const WA_BASE  = `https://wa.me/${WA}`
const TORAN    = 60
const U = (id, w = 700) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

/* ─── Data ───────────────────────────────────────────────── */

const PACKAGES = [
  {
    id:    'varanasi-3d2n',
    name:  'Varanasi 3D/2N',
    hi:    'वाराणसी 3 दिन / 2 रात',
    days:  '3 Days / 2 Nights',
    badge: 'Most Popular',
    img:   '1705952484283-19c31e37e0e4',
    desc:  'Kashi Vishwanath darshan, sunrise boat ride, Ganga Aarti, Manikarnika ghat and a Sarnath excursion.',
    tags:  ['Boat ride', 'Ganga Aarti', 'Sarnath', 'Guide'],
    href:  '/tours/varanasi-tour-package-3-days-2-nights',
  },
  {
    id:    'varanasi-complete',
    name:  'Varanasi Complete Tour',
    hi:    'वाराणसी संपूर्ण यात्रा',
    days:  '5 Days / 4 Nights',
    badge: 'Best Value',
    img:   '1596097825168-c9b773f404ff',
    desc:  'All major temples, every important ghat, Sarnath, Ramnagar Fort, Chunar excursion and a heritage lane walk.',
    tags:  ['All ghats', 'Ramnagar Fort', 'Chunar', 'Heritage walk'],
    href:  '/tours/varanasi-complete-tour-package',
  },
  {
    id:    'varanasi-ayodhya-prayagraj',
    name:  'Varanasi–Ayodhya–Prayagraj',
    hi:    'त्रिवेणी तीर्थ यात्रा',
    days:  '4 Days / 3 Nights',
    badge: 'Multi-city',
    img:   '1627894483216-2138af692e32',
    desc:  'Three sacred cities — Kashi Vishwanath, Ram Janmabhoomi in Ayodhya, and Triveni Sangam in Prayagraj.',
    tags:  ['Kashi', 'Ayodhya', 'Prayagraj', 'Sangam snan'],
    href:  '/tours/varanasi-ayodhya-prayagraj-tour-package',
  },
  {
    id:    'custom',
    name:  'Custom Tour',
    hi:    'कस्टम यात्रा',
    days:  'Flexible',
    badge: null,
    img:   '1608412525537-662195e817c5',
    desc:  'Tell us your dates, group size and places. We design a personalised itinerary around your schedule and budget.',
    tags:  ['Any group size', 'Flexible dates', 'Multi-city', 'Any budget'],
    href:  '/tours/custom-tour-package',
  },
]

const NUM_PEOPLE = ['1','2','3','4','5','6','7','8','9','10','11–15','16–20','20+']

/* ─── WhatsApp fallback ──────────────────────────────────── */
function buildWaMsg(f) {
  const lines = ['Namaste! I want to book a Varanasi tour package.']
  if (f.package_name) lines.push(`Package: ${f.package_name}`)
  if (f.start_date)   lines.push(`Date: ${f.start_date}`)
  if (f.num_people)   lines.push(`People: ${f.num_people}`)
  if (f.name)         lines.push(`Name: ${f.name}`)
  if (f.phone)        lines.push(`Phone: ${f.phone}`)
  if (f.customer_notes) lines.push(`Notes: ${f.customer_notes}`)
  return lines.join('\n')
}

/* ─── Sub-components ─────────────────────────────────────── */

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
          <div><h4>Services</h4><ul>
            <li><a href="/services/tour">Tour Packages</a></li>
            <li><a href="/services/cab">Cab Booking</a></li>
            <li><a href="/services/boat">Boat Rides</a></li>
            <li><a href="/services/hotel">Hotels &amp; Stays</a></li>
          </ul></div>
          <div><h4>Explore</h4><ul>
            <li><a href="/tours">All Tours</a></li>
            <li><a href="/sightseeing">Sightseeing</a></li>
            <li><a href="/about">About Us</a></li>
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

export default function ToursPage() {
  const today = new Date().toISOString().slice(0, 10)

  const [form, setForm]     = useState({ name: '', phone: '', package_name: '', start_date: '', num_people: '2', customer_notes: '' })
  const [status, setStatus] = useState('idle')   // idle | submitting | success | error
  const [errMsg, setErrMsg] = useState('')

  function setF(k, v) { setForm(f => ({ ...f, [k]: v })) }

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
        cities:        ['kashi'],
        start_date:    form.start_date   || undefined,
        num_people:    parseInt(form.num_people, 10) || 2,
        package_name:  form.package_name || undefined,
        customer_notes: form.customer_notes.trim() || undefined,
        page_source:   'tours',
      }
      Object.keys(payload).forEach(k => payload[k] === undefined && delete payload[k])

      const res = await fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        const data = await res.json().catch(() => ({}))
        setErrMsg(
          typeof data === 'object' && data !== null
            ? Object.values(data).flat().join(' ')
            : 'Something went wrong. Please try WhatsApp.'
        )
        setStatus('error')
      }
    } catch {
      setErrMsg('Could not connect. Please try WhatsApp below.')
      setStatus('error')
    }
  }

  return (
    <div>
      <div className="topbar"><div className="wrap">
        <span className="hi">हर हर महादेव · काशी यात्रा · जय श्री राम</span>
        <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
      </div></div>
      <div className="toran" aria-hidden="true">{Array.from({ length: TORAN }, (_, i) => <i key={i} />)}</div>
      <Navbar ctaLabel="Book a Tour" ctaHref="#book" />

      <main>
        <style>{`
          .tours-hero{position:relative;min-height:480px;display:flex;align-items:center;
            background:url('${U('1705952484283-19c31e37e0e4', 1400)}') center/cover no-repeat}
          .tours-overlay{position:absolute;inset:0;
            background:linear-gradient(160deg,rgba(10,5,0,.78) 0%,rgba(10,5,0,.28) 55%,rgba(10,5,0,.72) 100%)}
          .tours-hinner{position:relative;z-index:2;padding:clamp(55px,8vw,100px) clamp(16px,5vw,52px);max-width:800px;width:100%}

          .tours-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:22px}

          .tcard{background:var(--cream);border:1px solid var(--line);border-radius:14px;overflow:hidden;display:flex;flex-direction:column;position:relative}
          .tcard-img{aspect-ratio:16/9;overflow:hidden}
          .tcard-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s}
          .tcard:hover .tcard-img img{transform:scale(1.04)}
          .tcard-badge{position:absolute;top:12px;left:12px;z-index:2;background:var(--saffron);color:#fff;font-size:.7rem;font-weight:700;padding:3px 10px;border-radius:3px;letter-spacing:.07em;text-transform:uppercase}
          .tcard-body{padding:18px 18px 20px;flex:1;display:flex;flex-direction:column;gap:6px}
          .tcard-days{font-size:.78rem;color:var(--saffron-deep);font-weight:600;letter-spacing:.04em}
          .tcard-name{font-family:'Fraunces',serif;font-weight:700;font-size:1.1rem;line-height:1.2}
          .tcard-hi{font-family:'Tiro Devanagari Hindi',serif;color:var(--saffron-deep);font-size:.82rem}
          .tcard-desc{font-size:.88rem;color:var(--ink-soft);line-height:1.6;margin-top:4px}
          .tcard-tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:6px}
          .tcard-tag{font-size:.75rem;background:var(--paper-2);padding:3px 9px;border-radius:20px;color:var(--ink-soft)}
          .tcard-btn{margin-top:auto;padding-top:14px}

          .tours-form-wrap{background:var(--cream);border:1px solid var(--line);border-radius:18px;padding:clamp(24px,5vw,46px);max-width:680px;margin:0 auto}
          .tform-grid{display:grid;grid-template-columns:1fr 1fr;column-gap:20px;row-gap:18px}
          @media(max-width:540px){.tform-grid{grid-template-columns:1fr}}
          .tform-full{grid-column:1/-1}
          .tform-field label{display:block;font-size:.74rem;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:5px}
          .tform-field input,.tform-field select,.tform-field textarea{width:100%;background:var(--paper);border:1.5px solid var(--line);border-radius:8px;padding:10px 13px;font-size:.96rem;color:var(--ink);outline:none;box-sizing:border-box;font-family:inherit;resize:none;transition:border-color .18s}
          .tform-field input:focus,.tform-field select:focus,.tform-field textarea:focus{border-color:var(--saffron);background:#fff}
          .tform-submit{width:100%;padding:14px;background:var(--saffron-deep);color:#fff;border:none;border-radius:10px;font-weight:700;font-size:1rem;cursor:pointer;transition:background .2s}
          .tform-submit:hover{background:var(--kumkum)}
          .tform-submit:disabled{opacity:.5;cursor:not-allowed}
          .tform-error{background:#fdf2f2;border:1px solid #f5c6c6;border-radius:8px;padding:12px 16px;font-size:.88rem;color:#9b2c2c}
          .tform-success{text-align:center;padding:40px 20px;display:flex;flex-direction:column;align-items:center;gap:14px}
          .tform-success-icon{font-size:3rem}
          .tours-form form{display:block;padding:0;gap:0}
        `}</style>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="tours-hero">
          <div className="tours-overlay" />
          <div className="tours-hinner">
            <nav style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.8)', marginBottom: '20px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <a href="/" style={{ color: '#fff', textDecoration: 'underline' }}>Home</a><span>›</span><span>Tour Packages</span>
            </nav>
            <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: 'clamp(.9rem,2.5vw,1.2rem)', color: '#FF9933', fontWeight: 700, marginBottom: '10px' }}>दर्शन और भ्रमण · काशी यात्रा</div>
            <h1 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(2.2rem,7vw,4.2rem)', color: '#fff', lineHeight: 1.08, textShadow: '0 3px 28px rgba(0,0,0,.7)', margin: '0 0 14px' }}>
              Tours Planned<br />for You
            </h1>
            <p style={{ fontSize: 'clamp(.95rem,2vw,1.1rem)', color: 'rgba(255,255,255,.88)', lineHeight: 1.65, maxWidth: '48rem', marginBottom: '28px' }}>
              Guided darshan, Ganga aarti, multi-city yatras to Ayodhya &amp; Prayagraj — planned around temple timings by people who live here.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="#book" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg,#e8701a,#C4520C)', color: '#fff', padding: '13px 26px', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,.5)' }}>
                Book a Tour
              </a>
              <a href="tel:+919277472279" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '13px 24px', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
                Call Now
              </a>
            </div>
          </div>
        </section>

        {/* ── Package Cards ─────────────────────────────────────── */}
        <section style={{ padding: '80px 0' }}>
          <div className="wrap">
            <div className="sec-head center" style={{ marginBottom: '46px' }}>
              <div>
                <div className="eyebrow">Our Packages</div>
                <h2 className="sec-title">Choose Your Yatra</h2>
                <p className="sec-lead">Pre-designed packages or fully custom — pick one and we handle the rest.</p>
              </div>
            </div>
            <div className="tours-grid">
              {PACKAGES.map(p => (
                <div key={p.id} className="tcard">
                  {p.badge && <div className="tcard-badge">{p.badge}</div>}
                  <div className="tcard-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={U(p.img)} alt={p.name} />
                  </div>
                  <div className="tcard-body">
                    <div className="tcard-days">{p.days}</div>
                    <div className="tcard-name">{p.name}</div>
                    <div className="tcard-hi">{p.hi}</div>
                    <p className="tcard-desc">{p.desc}</p>
                    <div className="tcard-tags">
                      {p.tags.map(t => <span key={t} className="tcard-tag">{t}</span>)}
                    </div>
                    <div className="tcard-btn">
                      <a
                        href={p.href}
                        className="btn"
                        style={{ background: 'var(--saffron-deep)', width: '100%', justifyContent: 'center', fontSize: '.9rem' }}
                      >
                        View Details →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Booking Form ─────────────────────────────────────── */}
        <section id="book" style={{ padding: '80px 0', background: 'var(--paper-2)' }}>
          <div className="wrap">
            <div className="sec-head center" style={{ marginBottom: '40px' }}>
              <div>
                <div className="eyebrow">Plan your tour</div>
                <h2 className="sec-title">Send a Booking Enquiry</h2>
                <p className="sec-lead">Free to enquire · No advance payment · We confirm on WhatsApp within 2 hours.</p>
              </div>
            </div>

            <div className="tours-form-wrap">
              {status === 'success' ? (
                <div className="tform-success">
                  <div className="tform-success-icon">🙏</div>
                  <h2 style={{ fontFamily: "'Fraunces',serif" }}>Enquiry Received!</h2>
                  <p style={{ color: 'var(--ink-soft)', maxWidth: '360px' }}>
                    Our team will confirm your booking on WhatsApp within 2 hours. Looking forward to your Kashi darshan.
                  </p>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <a
                      href={`${WA_BASE}?text=${encodeURIComponent(buildWaMsg(form))}`}
                      target="_blank" rel="noopener"
                      className="btn wa"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      <WaIcon /> Chat on WhatsApp
                    </a>
                    <a href="/" className="btn" style={{ background: 'transparent', border: '1.5px solid var(--line)', color: 'var(--ink)' }}>
                      Back to Home
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="tform-grid">

                    <div className="tform-field">
                      <label htmlFor="tr-name">Your Name *</label>
                      <input id="tr-name" type="text" required placeholder="Ramesh Sharma" value={form.name} onChange={e => setF('name', e.target.value)} autoComplete="name" />
                    </div>

                    <div className="tform-field">
                      <label htmlFor="tr-phone">Phone / WhatsApp *</label>
                      <input id="tr-phone" type="tel" required placeholder="+91 98765 43210" value={form.phone} onChange={e => setF('phone', e.target.value)} autoComplete="tel" />
                    </div>

                    <div className="tform-field tform-full">
                      <label htmlFor="tr-pkg">Package</label>
                      <select id="tr-pkg" value={form.package_name} onChange={e => setF('package_name', e.target.value)}>
                        <option value="">Not sure yet</option>
                        {PACKAGES.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                      </select>
                    </div>

                    <div className="tform-field">
                      <label htmlFor="tr-date">Expected Travel Date</label>
                      <input id="tr-date" type="date" min={today} value={form.start_date} onChange={e => setF('start_date', e.target.value)} />
                    </div>

                    <div className="tform-field">
                      <label htmlFor="tr-pax">No. of Travellers</label>
                      <select id="tr-pax" value={form.num_people} onChange={e => setF('num_people', e.target.value)}>
                        {NUM_PEOPLE.map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>

                    <div className="tform-field tform-full">
                      <label htmlFor="tr-note">Special Requests <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
                      <textarea id="tr-note" rows={3} placeholder="e.g. Senior citizens, vegetarian food, specific temples, wheelchair access…" value={form.customer_notes} onChange={e => setF('customer_notes', e.target.value)} style={{ minHeight: '76px' }} />
                    </div>

                    {status === 'error' && (
                      <div className="tform-full tform-error">
                        {errMsg}{' · '}
                        <a href={`${WA_BASE}?text=${encodeURIComponent(buildWaMsg(form))}`} target="_blank" rel="noopener">
                          Message us on WhatsApp
                        </a>
                      </div>
                    )}

                    <div className="tform-full" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <button type="submit" className="tform-submit" disabled={status === 'submitting'}>
                        {status === 'submitting' ? 'Sending…' : 'Send Booking Enquiry'}
                      </button>
                      <a
                        href={`${WA_BASE}?text=${encodeURIComponent(buildWaMsg(form))}`}
                        target="_blank" rel="noopener"
                        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: '#25D366', color: '#fff', borderRadius: '10px', fontWeight: 700, fontSize: '.95rem', textDecoration: 'none' }}
                      >
                        <WaIcon size={18} /> Or enquire on WhatsApp
                      </a>
                    </div>

                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="pkg-cta-sec">
          <div className="wrap">
            <div className="hi deva">काशी दर्शन · हर हर महादेव</div>
            <h2>Have Questions? Talk to Us</h2>
            <p>Our team is based in Varanasi and responds within 2 hours.</p>
            <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to know more about your Varanasi tour packages.')}`} target="_blank" rel="noopener" className="pkg-wa-btn">
              <WaIcon size={22} /> Chat on WhatsApp
            </a>
            <div className="pkg-cta-links">
              <a href="tel:+919277472279">+91 92774 72279</a>
              <a href="/services/tour">← Tour Services</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to book a Varanasi tour.')}`} target="_blank" rel="noopener" className="fab" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32" fill="#fff"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 15.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
      </a>
    </div>
  )
}

'use client'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/app/components/Navbar'
import './page.css'

const API_URL = 'http://yatra.pythonanywhere.com/api/bookings/'
const WA      = '919277472279'
const WA_BASE = `https://wa.me/${WA}`

/* ── Options matching the Django model ── */

const SERVICE_OPTIONS = [
  { value: 'tour',        label: 'Tour Package'    },
  { value: 'boat',        label: 'Ganga Boat Ride' },
  { value: 'cab',         label: 'Cab'             },
  { value: 'hotel',       label: 'Hotel Stay'      },
  { value: 'sightseeing', label: 'Sightseeing'     },
]

const CITY_OPTIONS = [
  { value: 'kashi',      label: 'Kashi (Varanasi)' },
  { value: 'ayodhya',    label: 'Ayodhya'          },
  { value: 'prayagraj',  label: 'Prayagraj'        },
  { value: 'chitrakoot', label: 'Chitrakoot'       },
  { value: 'vindhyachal',label: 'Vindhyachal'      },
]

const GROUP_TYPES = [
  { value: '',            label: '— Select —'   },
  { value: 'solo',        label: 'Solo'         },
  { value: 'couple',      label: 'Couple'       },
  { value: 'family',      label: 'Family'       },
  { value: 'group',       label: 'Group'        },
  { value: 'pilgrimage',  label: 'Pilgrimage'   },
  { value: 'honeymoon',   label: 'Honeymoon'    },
  { value: 'corporate',   label: 'Corporate'    },
]

const BUDGETS = [
  { value: '',               label: '— Select —'        },
  { value: 'Under ₹5,000',  label: 'Under ₹5,000'      },
  { value: '₹5k–15k',       label: '₹5,000 – ₹15,000'  },
  { value: '₹15k–30k',      label: '₹15,000 – ₹30,000' },
  { value: '₹30k+',         label: '₹30,000+'           },
  { value: 'flexible',       label: 'Flexible / Not sure'},
]

const NUM_DAYS = ['1','2','3','4','5','6–7','8–10','10+']
const NUM_PEOPLE = ['1','2','3','4','5','6','7','8','9','10','11–15','16–20','20+']

const TRUST = [
  { icon: '🙏', stat: '500+', label: 'Yatras planned' },
  { icon: '⭐', stat: '4.9',  label: 'Avg rating'     },
  { icon: '⚡', stat: '< 2h', label: 'Reply time'     },
  { icon: '🆓', stat: '₹0',  label: 'No booking fee' },
]

/* ── WhatsApp fallback message ── */
function buildWaMsg(f) {
  const lines = ['Namaste! I want to plan a Kashi yatra. 🙏']
  if (f.services.length)   lines.push(`Services: ${f.services.join(', ')}`)
  if (f.cities.length)     lines.push(`Cities: ${f.cities.join(', ')}`)
  if (f.start_date)        lines.push(`Start date: ${new Date(f.start_date + 'T00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`)
  if (f.num_days)          lines.push(`Duration: ${f.num_days} days`)
  if (f.num_people)        lines.push(`People: ${f.num_people}`)
  if (f.group_type)        lines.push(`Group: ${f.group_type}`)
  if (f.name)              lines.push(`Name: ${f.name}`)
  if (f.phone)             lines.push(`Phone: ${f.phone}`)
  if (f.arriving_from)     lines.push(`Arriving from: ${f.arriving_from}`)
  if (f.customer_budget)   lines.push(`Budget: ${f.customer_budget}`)
  if (f.customer_notes)    lines.push(`Notes: ${f.customer_notes}`)
  return lines.join('\n')
}

/* ── Component ── */
export default function BookingForm() {
  const today        = new Date().toISOString().slice(0, 10)
  const searchParams = useSearchParams()

  // ── Pre-fill from URL ─────────────────────────────────────────────────────
  // Visible : ?service=boat  ?people=4  ?date=2024-12-25
  // Hidden  : ?utm_source=  ?utm_campaign=  ?ref=  ?from=  ?package=
  const [form, setForm] = useState(() => {
    const sp          = searchParams
    const svcParam    = sp.get('service') ?? ''
    const validSvc    = SERVICE_OPTIONS.some(s => s.value === svcParam)
    const peopleParam = sp.get('people') ?? '2'

    return {
      // visible form fields
      name: '', phone: '',
      services:        validSvc ? [svcParam] : [],
      cities:          [],
      start_date:      sp.get('date')    ?? '',
      num_days:        '',
      num_people:      NUM_PEOPLE.includes(peopleParam) ? peopleParam : '2',
      group_type:      '',
      arriving_from:   '',
      customer_budget: '',
      customer_notes:  '',
      // attribution — hidden, never shown, always sent to backend
      _package_name:  sp.get('package')      ?? '',
      _source:        sp.get('utm_source')   ?? '',
      _utm_campaign:  sp.get('utm_campaign') ?? '',
      _referrer_name: sp.get('ref')          ?? '',
      _page_source:   sp.get('from')         ?? 'plan-yatra',
    }
  })
  const [status, setStatus]     = useState('idle') // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('')

  function setF(k, v) { setForm(f => ({ ...f, [k]: v })) }

  function toggleArr(key, value) {
    setForm(f => {
      const arr = f[key]
      return { ...f, [key]: arr.includes(value) ? arr.filter(x => x !== value) : [...arr, value] }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return
    setStatus('submitting')
    setErrorMsg('')

    try {
      const payload = {
        // contact
        name:  form.name.trim(),
        phone: form.phone.trim(),
        // yatra details
        services:        form.services.length ? form.services : [],
        cities:          form.cities.length   ? form.cities   : ['kashi'],
        start_date:      form.start_date      || undefined,
        num_days:        form.num_days         || undefined,
        num_people:      parseInt(form.num_people, 10) || 2,
        group_type:      form.group_type       || undefined,
        arriving_from:   form.arriving_from.trim() || undefined,
        customer_budget: form.customer_budget  || undefined,
        customer_notes:  form.customer_notes.trim() || undefined,
        // attribution (from URL params — user never sees these)
        package_name:   form._package_name  || undefined,
        source:         form._source        || undefined,
        utm_campaign:   form._utm_campaign  || undefined,
        referrer_name:  form._referrer_name || undefined,
        page_source:    form._page_source,
      }
      // strip undefined keys
      Object.keys(payload).forEach(k => payload[k] === undefined && delete payload[k])

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setStatus('success')
      } else {
        const data = await res.json().catch(() => ({}))
        setErrorMsg(
          typeof data === 'object' && data !== null
            ? Object.values(data).flat().join(' ')
            : 'Something went wrong. Please try WhatsApp.'
        )
        setStatus('error')
      }
    } catch {
      setErrorMsg('Could not connect. Please try WhatsApp below.')
      setStatus('error')
    }
  }

  return (
    <>
      <Navbar ctaLabel="Plan my yatra" ctaHref="/plan-yatra" />

      <main>
        {/* ── Hero ── */}
        <section className="py-hero">
          <div className="wrap">
            <p className="py-namaste">नमस्ते 🙏</p>
            <h1 className="py-h1">Plan Your <em>Kashi Yatra</em></h1>
            <p className="py-lead">
              Fill the short form below. A local Yatra Ke Saathi representative will confirm your booking on WhatsApp within 2&nbsp;hours — no advance payment needed.
            </p>
            <div className="py-chips">
              {TRUST.map(t => (
                <div key={t.stat} className="chip">
                  <span>{t.icon}</span>
                  <strong>{t.stat}</strong>
                  <span>{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Form / Success ── */}
        <section className="py-section">
          <div className="wrap">

            {status === 'success' ? (
              <div className="py-success">
                <div className="py-success-icon">🙏</div>
                <h2>Yatra request received!</h2>
                <p>
                  Our team will confirm your booking on WhatsApp within 2 hours.
                  Looking forward to your Kashi darshan.
                </p>
                <div className="py-success-acts">
                  <a
                    href={`${WA_BASE}?text=${encodeURIComponent(buildWaMsg(form))}`}
                    target="_blank" rel="noopener"
                    className="btn wa"
                  >
                    <WaIcon /> Chat on WhatsApp
                  </a>
                  <a href="/" className="btn line">Back to Home</a>
                </div>
              </div>
            ) : (
              <form className="py-form" onSubmit={handleSubmit} noValidate>

                <div>
                  <h2 className="py-form-title">Booking Enquiry</h2>
                  <p className="py-form-sub">Free to enquire · No advance payment · Confirmed on WhatsApp</p>
                </div>

                {/* ── Services (pill multi-select) ── */}
                <div className="py-field">
                  <label className="py-label">What do you need?</label>
                  <div className="py-pills">
                    {SERVICE_OPTIONS.map(s => (
                      <button
                        key={s.value}
                        type="button"
                        className={`py-pill${form.services.includes(s.value) ? ' active' : ''}`}
                        onClick={() => toggleArr('services', s.value)}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── Cities (pill multi-select) ── */}
                <div className="py-field">
                  <label className="py-label">Which cities?</label>
                  <div className="py-pills">
                    {CITY_OPTIONS.map(c => (
                      <button
                        key={c.value}
                        type="button"
                        className={`py-pill${form.cities.includes(c.value) ? ' active' : ''}`}
                        onClick={() => toggleArr('cities', c.value)}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── When & Duration ── */}
                <div className="py-row-2">
                  <div className="py-field">
                    <label className="py-label">Start date</label>
                    <input
                      className="py-input"
                      type="date"
                      min={today}
                      value={form.start_date}
                      onChange={e => setF('start_date', e.target.value)}
                    />
                  </div>
                  <div className="py-field">
                    <label className="py-label">No. of days</label>
                    <select className="py-select" value={form.num_days} onChange={e => setF('num_days', e.target.value)}>
                      <option value="">— Select —</option>
                      {NUM_DAYS.map(d => <option key={d} value={d}>{d} day{d === '1' ? '' : 's'}</option>)}
                    </select>
                  </div>
                </div>

                {/* ── People & Group ── */}
                <div className="py-row-2">
                  <div className="py-field">
                    <label className="py-label">No. of people</label>
                    <select className="py-select" value={form.num_people} onChange={e => setF('num_people', e.target.value)}>
                      {NUM_PEOPLE.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div className="py-field">
                    <label className="py-label">Group type</label>
                    <select className="py-select" value={form.group_type} onChange={e => setF('group_type', e.target.value)}>
                      {GROUP_TYPES.map(g => <option key={g.value} value={g.value}>{g.label}</option>)}
                    </select>
                  </div>
                </div>

                {/* ── Contact ── */}
                <div className="py-row-2">
                  <div className="py-field">
                    <label className="py-label">Your name <span className="py-req">*</span></label>
                    <input
                      className="py-input"
                      type="text" placeholder="Full name"
                      value={form.name} onChange={e => setF('name', e.target.value)}
                      required autoComplete="name"
                    />
                  </div>
                  <div className="py-field">
                    <label className="py-label">Phone / WhatsApp <span className="py-req">*</span></label>
                    <input
                      className="py-input"
                      type="tel" placeholder="+91 XXXXX XXXXX"
                      value={form.phone} onChange={e => setF('phone', e.target.value)}
                      required autoComplete="tel"
                    />
                  </div>
                </div>

                {/* ── Arriving from ── */}
                <div className="py-field">
                  <label className="py-label">
                    Arriving from <span className="py-opt">(optional)</span>
                  </label>
                  <input
                    className="py-input"
                    type="text" placeholder="e.g. Delhi, Mumbai, Already in Varanasi…"
                    value={form.arriving_from} onChange={e => setF('arriving_from', e.target.value)}
                    autoComplete="off"
                  />
                </div>

                {/* ── Budget ── */}
                <div className="py-field">
                  <label className="py-label">
                    Budget <span className="py-opt">(optional)</span>
                  </label>
                  <select className="py-select" value={form.customer_budget} onChange={e => setF('customer_budget', e.target.value)}>
                    {BUDGETS.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                  </select>
                </div>

                {/* ── Notes ── */}
                <div className="py-field">
                  <label className="py-label">
                    Special requests <span className="py-opt">(optional)</span>
                  </label>
                  <textarea
                    className="py-textarea"
                    rows={3}
                    placeholder="Elders / kids, special puja, food preferences, accessibility needs…"
                    value={form.customer_notes}
                    onChange={e => setF('customer_notes', e.target.value)}
                  />
                </div>

                {/* Error */}
                {status === 'error' && (
                  <div className="py-error">
                    {errorMsg}
                    {' · '}
                    <a href={`${WA_BASE}?text=${encodeURIComponent(buildWaMsg(form))}`} target="_blank" rel="noopener">
                      Message us on WhatsApp
                    </a>
                  </div>
                )}

                {/* Actions */}
                <div className="py-actions">
                  <button type="submit" className="btn" disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Sending…' : 'Send Booking Enquiry'}
                  </button>
                  <a
                    href={`${WA_BASE}?text=${encodeURIComponent(buildWaMsg(form))}`}
                    target="_blank" rel="noopener"
                    className="btn wa"
                  >
                    <WaIcon /> WhatsApp
                  </a>
                </div>

                <p className="py-privacy">
                  By submitting you agree to our{' '}
                  <a href="/legal/privacy-policy">Privacy Policy</a>
                </p>

              </form>
            )}

          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

/* ── helpers ── */

function WaIcon() {
  return (
    <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 15.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/>
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
              <img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Saathi" style={{ height: '56px', width: 'auto', display: 'block' }} />
            </a>
            <p style={{ fontSize: '.93rem', maxWidth: '22rem', color: '#cdb892' }}>
              Tours, cabs, boats and hotels in Kashi, arranged by people who live here.
            </p>
          </div>
          <div><h4>Services</h4><ul>
            <li><a href="/tour-packages">Tour Packages</a></li>
            <li><a href="/cab">Cab Booking</a></li>
            <li><a href="/boat-rides">Boat Rides</a></li>
            <li><a href="/sightseeing">Sightseeing</a></li>
          </ul></div>
          <div><h4>Explore</h4><ul>
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

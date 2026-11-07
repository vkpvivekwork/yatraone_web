'use client'
import { useState } from 'react'
import Navbar from '@/app/components/Navbar'
import './page.css'

const API_URL = 'http://yatra.pythonanywhere.com/api/bookings/'
const WA      = '919277472279'
const WA_BASE = `https://wa.me/${WA}`

const SERVICES = [
  { value: 'tour',        label: 'Tour Package'     },
  { value: 'boat',        label: 'Ganga Boat Ride'  },
  { value: 'cab',         label: 'Cab Booking'      },
  { value: 'hotel',       label: 'Hotel Stay'       },
  { value: 'sightseeing', label: 'Sightseeing'      },
  { value: 'other',       label: 'Other / Not sure' },
]

const PERSONS = ['1','2','3','4','5','6','7','8','9','10','11–15','16–20','20+']

const TRUST = [
  { icon: '🙏', stat: '500+', label: 'Yatras planned' },
  { icon: '⭐', stat: '4.9',  label: 'Avg rating'     },
  { icon: '⚡', stat: '< 2h', label: 'Reply time'     },
  { icon: '🆓', stat: '₹0',  label: 'No booking fee' },
]

function buildWaMsg(f) {
  const svc = SERVICES.find(s => s.value === f.service)
  const lines = ['Namaste! I want to plan a Kashi yatra. 🙏']
  if (svc)      lines.push(`Service: ${svc.label}`)
  if (f.date)   lines.push(`Travel date: ${new Date(f.date + 'T00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`)
  if (f.persons) lines.push(`Yatris: ${f.persons}`)
  if (f.name)   lines.push(`Name: ${f.name}`)
  if (f.phone)  lines.push(`Phone: ${f.phone}`)
  if (f.message) lines.push(`Note: ${f.message}`)
  return lines.join('\n')
}

export default function BookingForm() {
  const today = new Date().toISOString().slice(0, 10)

  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    service: '', date: '', persons: '2', message: '',
  })
  const [status, setStatus]     = useState('idle') // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('')

  function setF(k, v) { setForm(f => ({ ...f, [k]: v })) }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return
    setStatus('submitting')
    setErrorMsg('')

    try {
      const payload = {
        name:         form.name.trim(),
        phone:        form.phone.trim(),
        email:        form.email.trim() || undefined,
        service_type: form.service || 'other',
        travel_date:  form.date || undefined,
        num_persons:  form.persons,
        message:      form.message.trim() || undefined,
      }
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
            <h1 className="py-h1">
              Plan Your <em>Kashi Yatra</em>
            </h1>
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

                {/* Service */}
                <div className="py-field">
                  <label className="py-label">
                    Service <span className="py-req">*</span>
                  </label>
                  <select
                    className="py-select"
                    value={form.service}
                    onChange={e => setF('service', e.target.value)}
                    required
                  >
                    <option value="">— What are you looking for? —</option>
                    {SERVICES.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>

                {/* Date + Persons (2-col → 1-col on mobile via CSS) */}
                <div className="py-row-2">
                  <div className="py-field">
                    <label className="py-label">Travel date</label>
                    <input
                      className="py-input"
                      type="date"
                      min={today}
                      value={form.date}
                      onChange={e => setF('date', e.target.value)}
                    />
                  </div>
                  <div className="py-field">
                    <label className="py-label">Yatris</label>
                    <select
                      className="py-select"
                      value={form.persons}
                      onChange={e => setF('persons', e.target.value)}
                    >
                      {PERSONS.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>

                {/* Name */}
                <div className="py-field">
                  <label className="py-label">
                    Your name <span className="py-req">*</span>
                  </label>
                  <input
                    className="py-input"
                    type="text"
                    placeholder="Full name"
                    value={form.name}
                    onChange={e => setF('name', e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>

                {/* Phone */}
                <div className="py-field">
                  <label className="py-label">
                    Phone / WhatsApp <span className="py-req">*</span>
                  </label>
                  <input
                    className="py-input"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={e => setF('phone', e.target.value)}
                    required
                    autoComplete="tel"
                  />
                </div>

                {/* Email */}
                <div className="py-field">
                  <label className="py-label">
                    Email <span className="py-opt">(optional)</span>
                  </label>
                  <input
                    className="py-input"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => setF('email', e.target.value)}
                    autoComplete="email"
                  />
                </div>

                {/* Message */}
                <div className="py-field">
                  <label className="py-label">
                    Anything to add? <span className="py-opt">(optional)</span>
                  </label>
                  <textarea
                    className="py-textarea"
                    rows={3}
                    placeholder="Specific temples, group details, budget, special occasion…"
                    value={form.message}
                    onChange={e => setF('message', e.target.value)}
                  />
                </div>

                {/* Error */}
                {status === 'error' && (
                  <div className="py-error">
                    {errorMsg}
                    {' · '}
                    <a
                      href={`${WA_BASE}?text=${encodeURIComponent(buildWaMsg(form))}`}
                      target="_blank" rel="noopener"
                    >
                      Message us on WhatsApp
                    </a>
                  </div>
                )}

                {/* Actions */}
                <div className="py-actions">
                  <button
                    type="submit"
                    className="btn"
                    disabled={status === 'submitting'}
                  >
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

/* ── small helpers ── */

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

'use client'
import { useState } from 'react'
import Navbar from '@/app/components/Navbar'

const WA      = '919277472279'
const WA_BASE = `https://wa.me/${WA}`
const TORAN   = 60
const U = (id, w = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

/* ─── Data ───────────────────────────────────────────────── */

const VEHICLES = [
  { name: 'Swift Dzire / Etios', type: 'Sedan',    seats: 4,  img: '1443479788958-11faa35a5578', tags: ['City tour', 'Airport drop', 'One-way'],              best: 'Best for couples & small families',            msg: 'Namaste! I want to book a Sedan (Dzire/Etios) cab in Varanasi. Please share availability and rates.' },
  { name: 'Ertiga',              type: 'MUV',      seats: 6,  img: '1461784180009-21121b2f204c', tags: ['Family trip', 'Intercity', 'Full day'],               best: 'Best for small families & friend groups',       msg: 'Namaste! I want to book an Ertiga cab. Please share availability and rates.' },
  { name: 'Innova / Innova Crysta', type: 'SUV',   seats: 7,  img: '1549317661-bd32c8ce0729',   tags: ['Premium ride', 'Long routes', 'Groups'],              best: 'Best for comfort on longer yatras',             msg: 'Namaste! I want to book an Innova Crysta. Please share availability and rates.' },
  { name: 'Tempo Traveller',     type: 'Mini Bus', seats: 12, img: '1544620347-c4fd4a3d5957',   tags: ['Pilgrim groups', 'Society trips', '12+ pax'],         best: 'Best for large pilgrim groups',                 msg: 'Namaste! I want to book a Tempo Traveller for a group. Please share availability and rates.' },
  { name: 'Force Cruiser',       type: 'Van',      seats: 13, img: '1506905925346-21bda4d32df4', tags: ['Rugged terrain', 'Hill routes', 'Groups'],            best: 'Best for hilly terrain and adventure routes',   msg: 'Namaste! I want to book a Force Cruiser. Please share availability and rates.' },
  { name: 'Volvo / Mini Bus',    type: 'Coach',    seats: 35, img: '1558979158-65a1eaa08691',   tags: ['Large groups', 'Outstation', '35+ pax'],              best: 'Best for large societies and pilgrim tours',    msg: 'Namaste! I want to book a Volvo/Mini Bus for a large group. Please share availability and rates.' },
]

const ROUTES = [
  { from: 'Varanasi', to: 'Ayodhya',               dist: '~200 km', sedan: '₹3,500', innova: '₹4,500', tempo: '₹8,000' },
  { from: 'Varanasi', to: 'Prayagraj',             dist: '~120 km', sedan: '₹2,500', innova: '₹3,200', tempo: '₹6,000' },
  { from: 'Varanasi', to: 'Bodh Gaya',             dist: '~240 km', sedan: '₹4,000', innova: '₹5,200', tempo: '₹9,500' },
  { from: 'Varanasi', to: 'Chitrakoot',            dist: '~280 km', sedan: '₹4,500', innova: '₹6,000', tempo: '₹11,000' },
  { from: 'Varanasi', to: 'Lucknow',               dist: '~310 km', sedan: '₹5,000', innova: '₹6,500', tempo: '₹12,000' },
  { from: 'Varanasi Airport (VNS)', to: 'City / Hotel', dist: '~25 km', sedan: '₹800', innova: '₹1,200', tempo: '₹2,500' },
]

const STEPS = [
  { n: '1', title: 'Fill the Form', desc: 'Share your pickup point, destination, date and group size using the form below.' },
  { n: '2', title: 'Get a Quote',   desc: 'We confirm availability and send a transparent price on WhatsApp — no hidden charges.' },
  { n: '3', title: 'Ride in Comfort', desc: 'Your clean AC cab arrives on time. Payment on arrival. No advance needed for most bookings.' },
]

const TESTIMONIALS = [
  { name: 'Rajesh T., Jaipur',   stars: 5, text: 'Booked an Innova for Varanasi to Ayodhya. Driver was on time, knew the route perfectly, and was very helpful with temple timings. Will book again.' },
  { name: 'Sunita & Family, Delhi', stars: 5, text: 'Our group of 6 used the Ertiga for a full-day city tour. Comfortable, clean car and a driver who gave us great suggestions on which ghats to visit.' },
  { name: 'Pradeep K., Patna',   stars: 5, text: 'Airport pickup at 4 AM, the driver was already waiting. Smooth ride, no haggling on price. Exactly what you need when you arrive in an unfamiliar city.' },
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
      <div className="big-hi" aria-hidden="true">काशी</div>
      <div className="wrap">
        <div className="foot">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <a href="/" className="logo" style={{ marginBottom: '14px' }}><img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Sathi" style={{ height: '60px', width: 'auto', display: 'block' }} /></a>
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
          <span>© {new Date().getFullYear()} Yatra Ke Sathi</span>
          <span>Photos: Unsplash</span>
        </div>
      </div>
    </footer>
  )
}

/* ─── Page ───────────────────────────────────────────────── */

export default function CabPage() {
  const [form, setForm]       = useState({ name: '', mobile: '', date: '', pickup: '', destination: '', vehicle: '', pax: '', note: '' })
  const [sent, setSent]       = useState(false)

  function handleChange(e) { setForm(p => ({ ...p, [e.target.name]: e.target.value })) }

  function handleSubmit(e) {
    e.preventDefault()
    const lines = [
      'Namaste! I want to book a cab.',
      '',
      `Name: ${form.name}`,
      `Mobile: ${form.mobile}`,
      `Date: ${form.date || 'Flexible'}`,
      `Pickup: ${form.pickup}`,
      `Destination: ${form.destination}`,
      form.vehicle ? `Vehicle: ${form.vehicle}` : '',
      form.pax     ? `Passengers: ${form.pax}`  : '',
      form.note    ? `Note: ${form.note}`        : '',
    ].filter(Boolean).join('\n')
    window.open(`${WA_BASE}?text=${encodeURIComponent(lines)}`, '_blank', 'noopener')
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <div>
      {/* Topbar */}
      <div className="topbar"><div className="wrap">
        <span className="hi">हर हर महादेव · सुरक्षित यात्रा · जय श्री राम</span>
        <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
      </div></div>
      <div className="toran" aria-hidden="true">{Array.from({ length: TORAN }, (_, i) => <i key={i} />)}</div>
      <Navbar ctaLabel="Book a Cab" ctaHref={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to book a cab in Varanasi.')}`} />

      <main>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <style>{`
          .cab-hero{position:relative;min-height:460px;display:flex;align-items:center;background:url('${U('1449965408869-eaa3f722e40d', 1400)}') center/cover no-repeat}
          .cab-overlay{position:absolute;inset:0;background:linear-gradient(160deg,rgba(10,5,0,.68) 0%,rgba(10,5,0,.28) 55%,rgba(10,5,0,.62) 100%)}
          .cab-hinner{position:relative;z-index:2;padding:clamp(50px,7vw,90px) clamp(16px,5vw,52px);max-width:780px;width:100%}
          .cab-tag{display:inline-block;background:rgba(10,3,0,.5);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border:1px solid rgba(244,168,29,.35);border-radius:20px;padding:4px 14px;font-size:.8rem;color:#FAF5E0;margin:0 6px 6px 0}
        `}</style>

        <section className="cab-hero">
          <div className="cab-overlay" />
          <div className="cab-hinner">
            <nav style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.8)', marginBottom: '20px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <a href="/" style={{ color: '#fff', textDecoration: 'underline' }}>Home</a><span>›</span><span>Cab Service</span>
            </nav>
            <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: 'clamp(.95rem,2.5vw,1.3rem)', color: '#FF9933', fontWeight: 700, marginBottom: '10px', textShadow: '0 1px 8px rgba(0,0,0,.6)' }}>कैब सेवा · सुरक्षित यात्रा</div>
            <h1 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(2.4rem,7vw,4.4rem)', color: '#fff', lineHeight: 1.05, textShadow: '0 3px 28px rgba(0,0,0,.7)', margin: '0 0 12px' }}>
              Cab &amp; Taxi Service<br />in Varanasi
            </h1>
            <p style={{ fontSize: 'clamp(.97rem,2vw,1.15rem)', color: 'rgba(255,255,255,.88)', lineHeight: 1.65, maxWidth: '44rem', marginBottom: '22px' }}>
              Clean AC vehicles, punctual drivers, transparent pricing. City tours, airport transfers, outstation routes to Ayodhya, Prayagraj, Bodh Gaya and beyond.
            </p>
            <div style={{ marginBottom: '28px', display: 'flex', flexWrap: 'wrap' }}>
              {['No hidden charges', 'Payment on arrival', 'Available 24×7', 'City & outstation'].map(t => (
                <span key={t} className="cab-tag">{t}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="#book" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg,#e8701a,#C4520C)', color: '#fff', padding: '13px 26px', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,.5)' }}>
                Book a Cab
              </a>
              <a href="tel:+919277472279" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '13px 24px', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
                📞 Call Now
              </a>
            </div>
          </div>
        </section>

        {/* ── Fleet ────────────────────────────────────────────── */}
        <section style={{ padding: '80px 0' }}>
          <div className="wrap">
            <div className="sec-head center" style={{ marginBottom: '44px' }}>
              <div>
                <div className="eyebrow">Our Fleet</div>
                <h2 className="sec-title">Vehicles for Every Group Size</h2>
                <p className="sec-lead">From a solo pilgrim to a group of 50 — we have the right vehicle.</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '22px' }}>
              {VEHICLES.map(v => (
                <div key={v.name} style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={U(v.img)} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--saffron)', color: '#fff', fontWeight: 700, fontSize: '.78rem', padding: '3px 10px', borderRadius: '4px' }}>{v.seats} seats · AC</div>
                  </div>
                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '1.18rem', marginBottom: '2px' }}>{v.name}</div>
                    <div style={{ color: 'var(--ink-soft)', fontSize: '.82rem', marginBottom: '10px' }}>{v.type} · {v.seats} seater</div>
                    <div className="tags" style={{ marginBottom: '10px' }}>{v.tags.map(t => <span key={t}>{t}</span>)}</div>
                    <div style={{ color: 'var(--ink-soft)', fontSize: '.88rem', marginBottom: '14px', flex: 1 }}>{v.best}</div>
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

        {/* ── Route prices ─────────────────────────────────────── */}
        <section className="price-section">
          <div className="wrap">
            <h2>Popular Route Prices</h2>
            <p className="lead">One-way fares. Return trips and full-day rates available — ask on WhatsApp.</p>
            <div style={{ overflowX: 'auto' }}>
              <table className="ptable" style={{ minWidth: '600px' }}>
                <thead>
                  <tr>
                    <th>Route</th><th>Distance</th>
                    <th>Sedan (4 pax)</th><th>Innova (7 pax)</th><th>Tempo (12+ pax)</th>
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
              * Indicative fares. Final quote on WhatsApp based on date &amp; availability. Toll &amp; parking extra.
            </p>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────── */}
        <section style={{ padding: '80px 0' }}>
          <div className="wrap">
            <div className="sec-head center" style={{ marginBottom: '44px' }}>
              <div>
                <div className="eyebrow">What guests say</div>
                <h2 className="sec-title">Trusted by Thousands of Travellers</h2>
              </div>
            </div>
            <style>{`.cab-test-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}@media(max-width:820px){.cab-test-grid{grid-template-columns:1fr 1fr}}@media(max-width:540px){.cab-test-grid{grid-template-columns:1fr}}`}</style>
            <div className="cab-test-grid">
              {TESTIMONIALS.map(({ name, stars, text }) => (
                <div key={name} style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px 22px' }}>
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

        {/* ── Booking Form ─────────────────────────────────────── */}
        <section id="book" style={{ padding: '80px 0', background: 'var(--paper-2)' }}>
          <div className="wrap" style={{ maxWidth: '720px' }}>
            <div className="sec-head center" style={{ marginBottom: '40px' }}>
              <div>
                <div className="eyebrow">Book your cab</div>
                <h2 className="sec-title">Tell Us Your Plan</h2>
                <p className="sec-lead">Fill in the details and we will confirm your cab on WhatsApp, usually within minutes.</p>
              </div>
            </div>
            <style>{`
              .cab-form{background:var(--cream);border:1px solid var(--line);border-radius:16px;padding:clamp(24px,5vw,48px)}
              .cab-form-grid{display:grid;grid-template-columns:1fr 1fr;column-gap:22px;row-gap:20px}
              @media(max-width:560px){.cab-form-grid{grid-template-columns:1fr}}
              .cab-field label{display:block;font-size:.75rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:5px}
              .cab-field input,.cab-field select,.cab-field textarea{width:100%;background:var(--paper);border:1px solid var(--line);border-radius:8px;padding:10px 12px;font-size:.97rem;color:var(--ink);outline:none;box-sizing:border-box;font-family:inherit;resize:none;transition:border-color .18s}
              .cab-field input:focus,.cab-field select:focus,.cab-field textarea:focus{border-color:var(--saffron)}
              .cab-full{grid-column:1/-1}
              .cab-submit{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:14px;background:var(--saffron-deep);color:#fff;border:none;border-radius:10px;font-weight:700;font-size:1.05rem;cursor:pointer;transition:background .2s}
              .cab-submit:hover{background:var(--kumkum)}
              .cab-submit:disabled{opacity:.5;cursor:not-allowed}
            `}</style>
            <div className="cab-form">
              <form onSubmit={handleSubmit}>
                <div className="cab-form-grid">
                  <div className="cab-field">
                    <label htmlFor="cb-name">Full Name *</label>
                    <input id="cb-name" name="name" type="text" required placeholder="Ramesh Sharma" value={form.name} onChange={handleChange} />
                  </div>
                  <div className="cab-field">
                    <label htmlFor="cb-mobile">Mobile Number *</label>
                    <input id="cb-mobile" name="mobile" type="tel" required placeholder="+91 98765 43210" value={form.mobile} onChange={handleChange} />
                  </div>
                  <div className="cab-field">
                    <label htmlFor="cb-date">Travel Date</label>
                    <input id="cb-date" name="date" type="date" value={form.date} onChange={handleChange} />
                  </div>
                  <div className="cab-field">
                    <label htmlFor="cb-pax">Passengers *</label>
                    <select id="cb-pax" name="pax" required value={form.pax} onChange={handleChange}>
                      <option value="">Select</option>
                      {['1','2','3','4','5','6','7','8–12','13–20','20+'].map(n => <option key={n} value={n}>{n} {n === '1' ? 'person' : 'people'}</option>)}
                    </select>
                  </div>
                  <div className="cab-field">
                    <label htmlFor="cb-pickup">Pickup Location *</label>
                    <input id="cb-pickup" name="pickup" type="text" required placeholder="e.g. Varanasi Junction / Hotel name" value={form.pickup} onChange={handleChange} />
                  </div>
                  <div className="cab-field">
                    <label htmlFor="cb-dest">Destination *</label>
                    <input id="cb-dest" name="destination" type="text" required placeholder="e.g. Ayodhya / Airport / City tour" value={form.destination} onChange={handleChange} />
                  </div>
                  <div className="cab-field">
                    <label htmlFor="cb-vehicle">Vehicle Preference</label>
                    <select id="cb-vehicle" name="vehicle" value={form.vehicle} onChange={handleChange}>
                      <option value="">No preference</option>
                      <option value="Sedan (Swift Dzire / Etios)">Sedan — 4 seater</option>
                      <option value="Ertiga MUV">Ertiga — 6 seater</option>
                      <option value="Innova / Innova Crysta">Innova — 7 seater</option>
                      <option value="Tempo Traveller">Tempo Traveller — 12 seater</option>
                      <option value="Force Cruiser">Force Cruiser — 13 seater</option>
                      <option value="Volvo / Mini Bus">Volvo / Mini Bus — 35+ seater</option>
                    </select>
                  </div>
                  <div className="cab-field">
                    <label htmlFor="cb-note">Anything else?</label>
                    <input id="cb-note" name="note" type="text" placeholder="e.g. Need child seat, return trip, full-day hire" value={form.note} onChange={handleChange} />
                  </div>
                  <div className="cab-full">
                    <button type="submit" className="cab-submit" disabled={sent}>
                      <WaIcon size={20} color="#fff" />
                      {sent ? 'Opening WhatsApp...' : 'Send Booking Request on WhatsApp'}
                    </button>
                  </div>
                </div>
              </form>
              <p style={{ textAlign: 'center', fontSize: '.82rem', color: 'var(--ink-soft)', marginTop: '14px' }}>
                We confirm within minutes. Payment on arrival — no advance needed for most routes.
              </p>
            </div>
          </div>
        </section>

        {/* ── How it works ─────────────────────────────────────── */}
        <section style={{ padding: '80px 0' }}>
          <div className="wrap">
            <div className="sec-head center" style={{ marginBottom: '44px' }}>
              <div>
                <div className="eyebrow">Booking process</div>
                <h2 className="sec-title">3 Simple Steps</h2>
              </div>
            </div>
            <div className="steps">
              {STEPS.map(s => (
                <div key={s.n} className="step">
                  <div className="circ">
                    <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: '1.4rem', color: 'var(--saffron)' }}>{s.n}</span>
                    <span>{s.n}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="pkg-cta-sec">
          <div className="wrap">
            <div className="hi deva">सुरक्षित और आरामदायक यात्रा</div>
            <h2>Need a cab in Varanasi?</h2>
            <p>WhatsApp us your pickup point, destination and time — we confirm within minutes.</p>
            <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I need a cab in Varanasi. Please share details.')}`} target="_blank" rel="noopener" className="pkg-wa-btn">
              <WaIcon size={22} color="#fff" /> Book a Cab on WhatsApp
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

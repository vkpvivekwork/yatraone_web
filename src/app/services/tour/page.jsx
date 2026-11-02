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
    id:    'kashi-darshan',
    name:  'Kashi Darshan',
    hi:    'काशी दर्शन',
    days:  '1 day',
    price: '₹1,499',
    per:   '/ person',
    img:   '1705952484283-19c31e37e0e4',
    badge: 'Most Popular',
    desc:  'Kashi Vishwanath temple, Ganga aarti at Dashashwamedh, Manikarnika ghat and old city walk.',
    includes: ['Temple darshan', 'Ganga Aarti', 'Guide', 'Cab', 'Breakfast'],
    msg:   'Namaste! I am interested in the Kashi Darshan 1-day tour. Please share details and availability.',
  },
  {
    id:    'varanasi-sarnath',
    name:  'Varanasi + Sarnath',
    hi:    'वाराणसी + सारनाथ',
    days:  '2 days / 1 night',
    price: '₹3,499',
    per:   '/ person',
    img:   '1596097825168-c9b773f404ff',
    desc:  'Full Kashi darshan on day one, Sarnath Buddha stupa visit on day two. Hotel included.',
    includes: ['2-day guided tour', 'Hotel stay', 'Ganga Aarti', 'Sarnath excursion', 'Breakfast'],
    msg:   'Namaste! I am interested in the 2-day Varanasi + Sarnath tour package. Please share details.',
  },
  {
    id:    'kashi-ayodhya',
    name:  'Kashi + Ayodhya',
    hi:    'काशी + अयोध्या',
    days:  '3 days / 2 nights',
    price: '₹5,999',
    per:   '/ person',
    img:   '1571536802807-30451e3955d8',
    badge: 'Best Value',
    desc:  'Combine Kashi Vishwanath with Ram Janmabhoomi in Ayodhya. Covers both sacred cities.',
    includes: ['Kashi + Ayodhya darshan', 'Cab both ways', '2 hotel nights', 'Guide', 'Breakfast'],
    msg:   'Namaste! I am interested in the 3-day Kashi + Ayodhya tour package. Please share details.',
  },
  {
    id:    'prayagraj-kashi',
    name:  'Prayagraj + Kashi',
    hi:    'प्रयागराज + काशी',
    days:  '4 days / 3 nights',
    price: '₹8,499',
    per:   '/ person',
    img:   '1627894483216-2138af692e32',
    desc:  'Triveni Sangam at Prayagraj, Anand Bhavan, then Varanasi for complete Kashi darshan.',
    includes: ['Sangam snan', 'Kashi darshan', 'Cab throughout', '3 nights hotel', 'Guide', 'Breakfast'],
    msg:   'Namaste! I am interested in the 4-day Prayagraj + Kashi tour. Please share details.',
  },
  {
    id:    'custom',
    name:  'Custom Tour',
    hi:    'कस्टम यात्रा',
    days:  'Flexible',
    price: 'Quote on request',
    per:   '',
    img:   '1608412525537-662195e817c5',
    desc:  'Tell us your dates, group size, cities and interests. We plan a personalised itinerary.',
    includes: ['Tailored itinerary', 'Flexible dates', 'Any group size', 'Any budget', 'Multi-city available'],
    msg:   'Namaste! I want a custom tour package. Please help me plan.',
  },
]

const INCLUDES = [
  { icon: '🚗', title: 'Cab & Transport',   desc: 'AC cabs for all inter-city and intra-city travel included.' },
  { icon: '🏨', title: 'Hotel Stay',         desc: 'Clean guesthouses or hotels near ghats — vetted by us.' },
  { icon: '🎙️', title: 'Expert Guide',       desc: 'Local guides who know every temple, ghat and legend.' },
  { icon: '🌅', title: 'Ganga Aarti',        desc: 'Evening Ganga aarti at Dashashwamedh from the best view.' },
  { icon: '🍽️', title: 'Breakfast',          desc: 'Daily breakfast at your hotel or a local restaurant.' },
  { icon: '📸', title: 'Photo Spots',        desc: 'Guided to the best sunrise, aarti and ghat photo points.' },
]

const STEPS = [
  { n: '1', title: 'Share Your Plan',  desc: 'Tell us your dates, group size and cities you want to visit using the form below.' },
  { n: '2', title: 'Get Itinerary',    desc: 'We send a custom day-by-day plan with clear pricing on WhatsApp.' },
  { n: '3', title: 'Confirm & Travel', desc: 'Approve the plan, we handle all bookings. You just arrive and enjoy.' },
]

const TESTIMONIALS = [
  { name: 'Priya S., Mumbai',         stars: 5, text: 'The Kashi Darshan tour was perfectly timed around temple opening hours. Our guide knew things no guidebook mentions. Absolutely magical day.' },
  { name: 'Suresh Family, Chennai',   stars: 5, text: 'Booked the 3-day Kashi + Ayodhya package for a group of 12. Smooth logistics, great hotels, and a guide who truly understood pilgrimage sentiments.' },
  { name: 'Kavita R., Hyderabad',     stars: 5, text: 'Watching Ganga Aarti from a boat arranged by Yatra Ke Saathi was the highlight of our trip. Everything was arranged without any hassle.' },
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
            <a href="/" className="logo" style={{ marginBottom: '14px' }}><img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Saathi" style={{ height: '60px', width: 'auto', display: 'block' }} /></a>
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
          <span>© {new Date().getFullYear()} Yatra Ke Saathi</span>
          <span>Photos: Unsplash</span>
        </div>
      </div>
    </footer>
  )
}

/* ─── Page ───────────────────────────────────────────────── */

export default function ServicesTourPage() {
  const [form, setForm]       = useState({ name: '', mobile: '', date: '', days: '', pax: '', cities: '', budget: '', note: '' })
  const [sent, setSent]       = useState(false)

  function handleChange(e) { setForm(p => ({ ...p, [e.target.name]: e.target.value })) }

  function handleSubmit(e) {
    e.preventDefault()
    const lines = [
      'Namaste! I want to book a tour package.',
      '',
      `Name: ${form.name}`,
      `Mobile: ${form.mobile}`,
      `Travel Date: ${form.date || 'Flexible'}`,
      form.days   ? `Duration: ${form.days}`          : '',
      form.pax    ? `Travellers: ${form.pax}`          : '',
      form.cities ? `Cities: ${form.cities}`           : '',
      form.budget ? `Budget: ${form.budget}`           : '',
      form.note   ? `Requirements: ${form.note}`       : '',
    ].filter(Boolean).join('\n')
    window.open(`${WA_BASE}?text=${encodeURIComponent(lines)}`, '_blank', 'noopener')
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <div>
      <div className="topbar"><div className="wrap">
        <span className="hi">हर हर महादेव · काशी यात्रा · जय श्री राम</span>
        <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
      </div></div>
      <div className="toran" aria-hidden="true">{Array.from({ length: TORAN }, (_, i) => <i key={i} />)}</div>
      <Navbar ctaLabel="Book a Tour" ctaHref={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to book a tour package in Varanasi.')}`} />

      <main>
        <style>{`
          .stour-hero{position:relative;min-height:500px;display:flex;align-items:center;
            background:url('${U('1705952484283-19c31e37e0e4', 1400)}') center/cover no-repeat}
          .stour-overlay{position:absolute;inset:0;
            background:linear-gradient(160deg,rgba(10,5,0,.74) 0%,rgba(10,5,0,.26) 55%,rgba(10,5,0,.68) 100%)}
          .stour-hinner{position:relative;z-index:2;padding:clamp(55px,8vw,100px) clamp(16px,5vw,52px);max-width:820px;width:100%}
          .stour-tag{display:inline-block;background:rgba(10,3,0,.5);backdrop-filter:blur(6px);
            border:1px solid rgba(244,168,29,.35);border-radius:20px;padding:4px 14px;font-size:.8rem;color:#FAF5E0;margin:0 6px 6px 0}
          .stour-pkg-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px}
          .stour-incl-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
          @media(max-width:800px){.stour-incl-grid{grid-template-columns:repeat(2,1fr)}}
          @media(max-width:500px){.stour-incl-grid{grid-template-columns:1fr}}
          .stour-test-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
          @media(max-width:820px){.stour-test-grid{grid-template-columns:1fr 1fr}}
          @media(max-width:540px){.stour-test-grid{grid-template-columns:1fr}}
          .stour-form{background:var(--cream);border:1px solid var(--line);border-radius:18px;padding:clamp(24px,5vw,50px)}
          .stour-form-grid{display:grid;grid-template-columns:1fr 1fr;column-gap:22px;row-gap:20px}
          @media(max-width:560px){.stour-form-grid{grid-template-columns:1fr}}
          .stour-field label{display:block;font-size:.75rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:5px}
          .stour-field input,.stour-field select,.stour-field textarea{width:100%;background:var(--paper);border:1.5px solid var(--line);border-radius:8px;padding:11px 13px;font-size:.97rem;color:var(--ink);outline:none;box-sizing:border-box;font-family:inherit;resize:none;transition:border-color .18s}
          .stour-field input:focus,.stour-field select:focus,.stour-field textarea:focus{border-color:var(--saffron);background:#fff}
          .stour-full{grid-column:1/-1}
          .stour-submit{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:15px;background:var(--saffron-deep);color:#fff;border:none;border-radius:10px;font-weight:700;font-size:1.06rem;cursor:pointer;transition:background .2s}
          .stour-submit:hover{background:var(--kumkum)}
          .stour-submit:disabled{opacity:.5;cursor:not-allowed}
          .stour-form form{display:block;padding:0;gap:0}
        `}</style>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="stour-hero">
          <div className="stour-overlay" />
          <div className="stour-hinner">
            <nav style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.8)', marginBottom: '20px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <a href="/" style={{ color: '#fff', textDecoration: 'underline' }}>Home</a><span>›</span>
              <a href="/services" style={{ color: '#fff', textDecoration: 'underline' }}>Services</a><span>›</span><span>Tour Packages</span>
            </nav>
            <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: 'clamp(.95rem,2.5vw,1.3rem)', color: '#FF9933', fontWeight: 700, marginBottom: '10px', textShadow: '0 1px 8px rgba(0,0,0,.6)' }}>दर्शन और भ्रमण · काशी यात्रा</div>
            <h1 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(2.4rem,7vw,4.5rem)', color: '#fff', lineHeight: 1.05, textShadow: '0 3px 28px rgba(0,0,0,.7)', margin: '0 0 14px' }}>
              Tour Packages<br />for Kashi Darshan
            </h1>
            <p style={{ fontSize: 'clamp(.97rem,2vw,1.18rem)', color: 'rgba(255,255,255,.88)', lineHeight: 1.65, maxWidth: '48rem', marginBottom: '24px' }}>
              Guided darshan, Ganga aarti, Sarnath excursions and multi-city yatras to Ayodhya, Prayagraj and beyond — all planned around temple timings.
            </p>
            <div style={{ marginBottom: '28px', display: 'flex', flexWrap: 'wrap' }}>
              {['Expert Guides', 'Temple Timings', 'Cab Included', 'Custom Itinerary'].map(t => (
                <span key={t} className="stour-tag">{t}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="#book" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg,#e8701a,#C4520C)', color: '#fff', padding: '13px 26px', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,.5)' }}>
                Book a Tour
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
                <div className="eyebrow">Tour Options</div>
                <h2 className="sec-title">Choose Your Yatra</h2>
                <p className="sec-lead">Pre-designed packages or fully custom — we plan around your schedule and group size.</p>
              </div>
            </div>
            <div className="stour-pkg-grid">
              {PACKAGES.map(p => (
                <div key={p.id} style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  {p.badge && (
                    <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 2, background: 'var(--saffron)', color: '#fff', fontSize: '.72rem', fontWeight: 700, padding: '3px 12px', borderRadius: '3px', letterSpacing: '.07em' }}>{p.badge.toUpperCase()}</div>
                  )}
                  <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={U(p.img)} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '24px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <div>
                        <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '1.25rem', lineHeight: 1.2 }}>{p.name}</div>
                        <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", color: 'var(--saffron-deep)', fontSize: '.88rem', marginTop: '2px' }}>{p.hi}</div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '12px' }}>
                        <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '1.3rem', color: 'var(--saffron-deep)' }}>{p.price}</div>
                        {p.per && <div style={{ fontSize: '.75rem', color: 'var(--ink-soft)' }}>{p.per}</div>}
                      </div>
                    </div>
                    <div style={{ fontSize: '.82rem', color: 'var(--saffron-deep)', fontWeight: 600, marginBottom: '10px' }}>{p.days}</div>
                    <p style={{ fontSize: '.93rem', lineHeight: 1.6, color: 'var(--ink-soft)', marginBottom: '14px' }}>{p.desc}</p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px', flex: 1, alignContent: 'flex-start' }}>
                      {p.includes.map(item => (
                        <li key={item} style={{ fontSize: '.8rem', background: 'var(--paper-2)', padding: '3px 10px', borderRadius: '20px', color: 'var(--ink-soft)' }}>
                          ✓ {item}
                        </li>
                      ))}
                    </ul>
                    <a href={`${WA_BASE}?text=${encodeURIComponent(p.msg)}`} target="_blank" rel="noopener" className="btn"
                      style={{ background: 'var(--saffron-deep)', width: '100%', justifyContent: 'center', fontSize: '.92rem' }}>
                      Enquire about this Tour
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What's Included ──────────────────────────────────── */}
        <section style={{ padding: '90px 0', background: 'var(--paper-2)' }}>
          <div className="wrap">
            <div className="sec-head center" style={{ marginBottom: '52px' }}>
              <div>
                <div className="eyebrow">What you get</div>
                <h2 className="sec-title">Everything Arranged for You</h2>
                <p className="sec-lead">Our packages are all-inclusive — no surprise extras during the trip.</p>
              </div>
            </div>
            <div className="stour-incl-grid">
              {INCLUDES.map(item => (
                <div key={item.title} style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '14px', padding: '26px 22px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{item.icon}</div>
                  <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '1.05rem', marginBottom: '7px' }}>{item.title}</div>
                  <p style={{ fontSize: '.9rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Booking Form ─────────────────────────────────────── */}
        <section id="book" style={{ padding: '90px 0' }}>
          <div className="wrap">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '56px', alignItems: 'start' }}>

              {/* ── Left ── */}
              <div>
                <span className="eyebrow">Plan your tour</span>
                <h2 className="sec-title" style={{ marginBottom: '14px' }}>Tell Us<br /><em>Your Plan</em></h2>
                <p style={{ color: 'var(--ink-soft)', fontSize: '.97rem', lineHeight: 1.7, marginBottom: '28px' }}>
                  Share your dates and group size — we send a full day-by-day itinerary on WhatsApp within a few hours.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                  {[
                    'Custom itinerary sent on WhatsApp',
                    'Cab, guide & hotel all included',
                    'Flexible dates, any group size',
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
                  <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to book a tour package. Please help.')}`} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#1f8f4e', fontWeight: 600, fontSize: '.92rem' }}>
                    <WaIcon size={16} color="#1f8f4e" /> WhatsApp directly
                  </a>
                </div>
              </div>

              {/* ── Right: form ── */}
              <div className="stour-form">
                <form onSubmit={handleSubmit}>
                  <div className="stour-form-grid">
                    <div className="stour-field">
                      <label htmlFor="st-name">Full Name *</label>
                      <input id="st-name" name="name" type="text" required placeholder="Ramesh Sharma" value={form.name} onChange={handleChange} />
                    </div>
                    <div className="stour-field">
                      <label htmlFor="st-mobile">Mobile / WhatsApp *</label>
                      <input id="st-mobile" name="mobile" type="tel" required placeholder="+91 98765 43210" value={form.mobile} onChange={handleChange} />
                    </div>
                    <div className="stour-field">
                      <label htmlFor="st-date">Travel Date *</label>
                      <input id="st-date" name="date" type="date" required value={form.date} onChange={handleChange} />
                    </div>
                    <div className="stour-field">
                      <label htmlFor="st-pax">Number of Travellers *</label>
                      <select id="st-pax" name="pax" required value={form.pax} onChange={handleChange}>
                        <option value="">Select</option>
                        {['1 person','2 people','3–4 people','5–8 people','9–15 people','16–25 people','25+ people'].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div className="stour-field">
                      <label htmlFor="st-days">Duration</label>
                      <select id="st-days" name="days" value={form.days} onChange={handleChange}>
                        <option value="">Not sure yet</option>
                        <option value="1 day">1 day</option>
                        <option value="2 days / 1 night">2 days / 1 night</option>
                        <option value="3 days / 2 nights">3 days / 2 nights</option>
                        <option value="4 days / 3 nights">4 days / 3 nights</option>
                        <option value="5+ days">5+ days</option>
                      </select>
                    </div>
                    <div className="stour-field">
                      <label htmlFor="st-budget">Budget per Person</label>
                      <select id="st-budget" name="budget" value={form.budget} onChange={handleChange}>
                        <option value="">No preference</option>
                        <option value="Budget (up to ₹2,000)">Budget — up to ₹2,000</option>
                        <option value="Mid-range (₹2,000–6,000)">Mid-range — ₹2,000–6,000</option>
                        <option value="Premium (₹6,000+)">Premium — ₹6,000+</option>
                      </select>
                    </div>
                    <div className="stour-field stour-full">
                      <label htmlFor="st-cities">Cities / Places to Visit</label>
                      <input id="st-cities" name="cities" type="text" placeholder="e.g. Varanasi, Ayodhya, Prayagraj, Sarnath" value={form.cities} onChange={handleChange} />
                    </div>
                    <div className="stour-field stour-full">
                      <label htmlFor="st-note">Special Requirements</label>
                      <textarea id="st-note" name="note" rows={3} placeholder="e.g. Senior citizens, temple timings, vegetarian food, wheelchair access…" value={form.note} onChange={handleChange} style={{ minHeight: '80px' }} />
                    </div>
                    <div className="stour-full">
                      <button type="submit" className="stour-submit" disabled={sent}>
                        <WaIcon size={20} color="#fff" />
                        {sent ? 'Opening WhatsApp...' : 'Send Tour Enquiry on WhatsApp'}
                      </button>
                      <p style={{ textAlign: 'center', fontSize: '.82rem', color: 'var(--ink-soft)', marginTop: '12px' }}>
                        Free. No payment now. Itinerary sent within a few hours.
                      </p>
                    </div>
                  </div>
                </form>
              </div>

            </div>
          </div>
          <style>{`@media(max-width:860px){#book .wrap>div{grid-template-columns:1fr!important}}`}</style>
        </section>

        {/* ── Testimonials ─────────────────────────────────────── */}
        <section style={{ padding: '90px 0' }}>
          <div className="wrap">
            <div className="sec-head center" style={{ marginBottom: '48px' }}>
              <div>
                <div className="eyebrow">What guests say</div>
                <h2 className="sec-title">Tours Our Guests Loved</h2>
              </div>
            </div>
            <div className="stour-test-grid">
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
            <div className="hi deva">काशी दर्शन · हर हर महादेव</div>
            <h2>Ready to Plan Your Kashi Darshan?</h2>
            <p>Share your dates and group size — we create a personalised itinerary and handle everything.</p>
            <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to plan a Kashi tour package. Please help.')}`} target="_blank" rel="noopener" className="pkg-wa-btn">
              <WaIcon size={22} color="#fff" /> Plan Your Tour on WhatsApp
            </a>
            <div className="pkg-cta-links">
              <a href="tel:+919277472279">📞 +91 92774 72279</a>
              <a href="/services">← All Services</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to book a tour package in Varanasi.')}`} target="_blank" rel="noopener" className="fab" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32" fill="#fff"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 15.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
      </a>
    </div>
  )
}

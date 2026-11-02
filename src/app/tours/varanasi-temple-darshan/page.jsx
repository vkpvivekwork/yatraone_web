'use client'
import { useState } from 'react'

const WA_NUMBER = '919277472279'
const WA_BASE   = `https://wa.me/${WA_NUMBER}`
const U = (id, w = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .28 0 0 0 0 .16 0 0 0 0 .04 0 0 0 .1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

const WA_ENQUIRE = `${WA_BASE}?text=${encodeURIComponent('Namaste! I am interested in the Kashi Darshan (1 Day Temple Circuit). Please share details and pricing.')}`
const WA_STD     = `${WA_BASE}?text=${encodeURIComponent('Namaste! I want to book the Standard Kashi Darshan package (₹1,999/person). Please confirm availability.')}`
const WA_PRE     = `${WA_BASE}?text=${encodeURIComponent('Namaste! I want to book the Premium Kashi Darshan package (₹3,499/person) with VIP darshan. Please confirm.')}`

const ITINERARY = [
  { time: 'Morning', title: 'Sunrise Boat Ride & Ghats', items: ['Pickup from hotel / station', 'Sunrise boat ride — see all 84 ghats from the Ganga', 'Assi Ghat morning aarti', 'Walk along the ghats with local guide'] },
  { time: 'Late Morning', title: 'Temple Circuit', items: ['Kashi Vishwanath Temple darshan', 'Maa Annapurna Devi Temple', 'Kal Bhairav Temple darshan', 'Vishwanath Gali — banarasi chai & kachori'] },
  { time: 'Afternoon', title: 'Old City Walk', items: ['Sankat Mochan Hanuman Temple', 'Durga Mata Mandir (Durgakund)', 'Old city lanes — silk & spice markets', 'Resto stop & lunch (own cost)'] },
  { time: 'Evening', title: 'Ganga Aarti', items: ['Reach Dashashwamedh Ghat before sunset', 'Ganga Aarti from the ghat steps (or private boat)', 'Flower diya floating on the Ganga', 'Drop-off at hotel / station'] },
]

const SERVICES = [
  { hi: 'मंदिर दर्शन', en: 'Temple Darshan',   photo: '1665413791167-6718dcf36773' },
  { hi: 'नौका विहार',  en: 'Boat Ride',         photo: '1571536802807-30451e3955d8' },
  { hi: 'गंगा आरती',  en: 'Ganga Aarti',        photo: '1627894483216-2138af692e32' },
  { hi: 'कैब सेवा',   en: 'AC Cab',             photo: '1449965408869-eaa3f722e40d' },
  { hi: 'स्थानीय गाइड', en: 'Local Guide',      photo: '1634920540678-df0e179c5243' },
  { hi: 'पिकअप-ड्रॉप', en: 'Pickup & Drop',     photo: '1561359313-0639aad49ca6' },
]

const FAQS = [
  { q: 'What temples are covered?', a: 'Kashi Vishwanath, Maa Annapurna, Kal Bhairav, Sankat Mochan Hanuman, and Durga Mata (Durgakund) are all included in a single day circuit.' },
  { q: 'Is the Ganga Aarti boat ride included?', a: 'Standard includes ghat-side Ganga Aarti viewing. Premium includes a private boat during the aarti for a closer, more immersive experience.' },
  { q: 'What is not included?', a: 'Train / flight tickets to Varanasi, lunch & dinner, monument entry fees, personal expenses, and 5% GST are excluded.' },
  { q: 'Do I need to book a VIP pass separately?', a: 'No. Premium package includes a VIP darshan arrangement at Kashi Vishwanath. Standard includes guided darshan assistance.' },
  { q: 'Can I start early in the morning?', a: 'Yes. We recommend a 5:00–5:30 AM start for the sunrise boat ride. Pickup from your hotel or Varanasi Junction is arranged accordingly.' },
  { q: 'Is this suitable for senior travellers?', a: 'Yes. Our local guide manages pacing, queue navigation, and rest stops throughout the day. Let us know if you need extra support.' },
]

const STD = {
  label: 'Standard', price: '₹1,999', note: 'per person · Min 2 Pax',
  inclusions: ['AC Cab — all-day Varanasi sightseeing', 'Sunrise boat ride on the Ganga', 'Full temple circuit with darshan guide', 'Evening Ganga Aarti (ghat-side)', 'Flower diya floating', 'Pickup & drop at hotel / station'],
  exclusions: ['Train / flight tickets to Varanasi', 'Meals (breakfast, lunch, dinner)', 'VIP darshan pass', 'Personal expenses', '5% GST'],
}

const PRE = {
  label: 'Premium', price: '₹3,499', note: 'per person · Min 2 Pax',
  inclusions: ['AC Cab — all-day Varanasi sightseeing', 'Sunrise boat ride + private Aarti boat', 'VIP Kashi Vishwanath darshan pass', 'Full temple circuit with expert guide', 'Pickup & drop at hotel / station', 'Morning chai & kachori included'],
  exclusions: ['Train / flight tickets to Varanasi', 'Lunch & dinner', 'Personal expenses', '5% GST'],
}

/* ── Sub-components ── */

function WaIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 32 32" fill={color} style={{ width: size, height: size, flexShrink: 0 }}>
      <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm0 23c-2 0-3.9-.6-5.5-1.6l-.4-.2-4.1 1.3 1.3-4-.3-.4c-1.1-1.7-1.7-3.6-1.7-5.6C5.3 9.8 10.1 5 16 5s10.7 4.8 10.7 10.6S21.9 26 16 26zm5.9-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
    </svg>
  )
}

function GoldRule({ margin = '20px 0' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin }}>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,transparent,#C49225 40%,#C49225 60%,transparent)' }} />
      <svg viewBox="0 0 24 24" width="16" height="16" fill="#C49225"><path d="M12 2l1.8 5.4H20l-4.9 3.6 1.8 5.4L12 13l-4.9 3.4 1.8-5.4L4 7.4h6.2z" /></svg>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,transparent,#C49225 40%,#C49225 60%,transparent)' }} />
    </div>
  )
}

function PkgCard({ data, waLink }) {
  const isPremium = data.label === 'Premium'
  return (
    <div style={{ flex: 1, minWidth: '280px', background: '#FAF0CC', backgroundImage: GRAIN, border: isPremium ? '2px solid #B5421A' : '1.5px solid rgba(196,146,37,.45)', borderRadius: '5px', padding: '32px 26px 26px', position: 'relative', boxShadow: isPremium ? '0 10px 36px rgba(181,66,26,.22)' : '0 6px 24px rgba(43,26,14,.14)' }}>
      <div style={{ position: 'absolute', top: '-14px', left: '24px', background: isPremium ? '#B5421A' : '#7A5018', color: '#FAF5E0', borderRadius: '3px', padding: '3px 16px', fontSize: '.76rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>{isPremium ? 'BEST VALUE' : 'STANDARD'}</div>
      <div style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 700, fontSize: '1.3rem', color: '#2B1A0E', marginBottom: '4px' }}>{data.label} Package</div>
      <GoldRule margin="10px 0 12px" />
      <div style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: '2.4rem', fontWeight: 900, color: '#B5421A', lineHeight: 1, marginBottom: '4px' }}>{data.price}/-</div>
      <div style={{ fontSize: '.85rem', color: '#8B5E1A', marginBottom: '22px' }}>{data.note}</div>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontWeight: 700, color: '#3A6B2E', fontSize: '.88rem', marginBottom: '8px' }}>What&apos;s Included</div>
        {data.inclusions.map(item => <div key={item} style={{ display: 'flex', gap: '8px', padding: '5px 0', borderBottom: '1px dashed rgba(58,107,46,.2)', fontSize: '.9rem' }}><span style={{ color: '#3A6B2E', flexShrink: 0, marginTop: '2px' }}>✔</span><span>{item}</span></div>)}
      </div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontWeight: 700, color: '#8B2020', fontSize: '.88rem', marginBottom: '8px' }}>Not Included</div>
        {data.exclusions.map(item => <div key={item} style={{ display: 'flex', gap: '8px', padding: '5px 0', borderBottom: '1px dashed rgba(139,32,32,.18)', fontSize: '.9rem' }}><span style={{ color: '#8B2020', flexShrink: 0, marginTop: '2px' }}>✖</span><span>{item}</span></div>)}
      </div>
      <a href={waLink} target="_blank" rel="noopener" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: isPremium ? 'linear-gradient(135deg,#B5421A,#7A2E0E)' : 'linear-gradient(135deg,#7A5018,#4A3010)', color: '#FAF5E0', borderRadius: '4px', padding: '13px 20px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
        <WaIcon color="#FAF5E0" /> Book {data.label} on WhatsApp
      </a>
    </div>
  )
}

function FaqItem({ faq, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ background: '#FAF0CC', backgroundImage: GRAIN, border: '1.5px solid rgba(196,146,37,.4)', borderRadius: '4px', overflow: 'hidden' }}>
      <button onClick={() => setOpen(v => !v)} style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', padding: '16px 20px', cursor: 'pointer', border: 'none', background: 'transparent', fontFamily: "'Mukta',sans-serif", fontWeight: 700, fontSize: 'clamp(.95rem,1.8vw,1.05rem)', color: '#2B1A0E', lineHeight: 1.4 }} aria-expanded={open}>
        <span>{faq.q}</span>
        <span style={{ flexShrink: 0, width: '22px', height: '22px', borderRadius: '50%', background: open ? '#B5421A' : '#C49225', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FAF5E0', fontSize: '.8rem', fontWeight: 900 }}>{open ? '−' : '+'}</span>
      </button>
      {open && <div style={{ padding: '0 20px 18px', paddingTop: '14px', fontFamily: "'Mukta',sans-serif", fontSize: '.97rem', color: '#4A2E12', lineHeight: 1.65, borderTop: '1px solid rgba(196,146,37,.3)' }}>{faq.a}</div>}
    </div>
  )
}

/* ── Page ── */

export default function KashiDarshanPage() {
  const [navOpen, setNavOpen] = useState(false)
  const [form, setForm] = useState({ name: '', mobile: '', people: '', pkg: '' })
  const [sent, setSent] = useState(false)

  function handleChange(e) { setForm(prev => ({ ...prev, [e.target.name]: e.target.value })) }

  function handleEnquire(e) {
    e.preventDefault()
    const lines = [
      `Namaste! I'd like to enquire about the Kashi Darshan (1 Day) tour.`,
      ``, `Name: ${form.name}`, `Mobile: ${form.mobile}`,
      `No. of Travellers: ${form.people}`,
      form.pkg ? `Package Preference: ${form.pkg}` : '',
    ].filter(Boolean).join('\n')
    window.open(`${WA_BASE}?text=${encodeURIComponent(lines)}`, '_blank', 'noopener')
    setSent(true); setTimeout(() => setSent(false), 4000)
  }

  return (
    <div style={{ background: '#F5E8AE', backgroundImage: GRAIN, minHeight: '100vh', color: '#2B1A0E', fontFamily: "'Mukta',system-ui,sans-serif" }}>

      {/* Topbar */}
      <div className="topbar" style={{ background: '#6B2509' }}>
        <div className="wrap">
          <span className="hi">हर हर महादेव · ॐ नमः शिवाय</span>
          <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
        </div>
      </div>

      {/* Nav */}
      <header className="nav" style={{ background: 'rgba(245,232,174,.97)', borderBottom: '1px solid rgba(196,146,37,.3)' }}>
        <div className="wrap nav-inner" style={{ padding: '6px 0' }}>
          <a href="/" className="logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Saathi" style={{ height: '64px', width: 'auto', display: 'block' }} />
          </a>
          <nav className={`nav-links${navOpen ? ' open' : ''}`}>
            <a href="/tour-packages" onClick={() => setNavOpen(false)}>Packages</a>
            <a href="/cab" onClick={() => setNavOpen(false)}>Cab</a>
            <a href="/boat-rides" onClick={() => setNavOpen(false)}>Boating</a>
            <a href="/about" onClick={() => setNavOpen(false)}>About</a>
          </nav>
          <a href={WA_ENQUIRE} target="_blank" rel="noopener" className="btn" style={{ background: '#B5421A' }}>Plan my yatra</a>
          <button className="menu-btn" aria-label="Menu" onClick={() => setNavOpen(v => !v)}>☰</button>
        </div>
      </header>

      {/* Toran */}
      <div className="toran" aria-hidden="true">
        {Array.from({ length: 55 }, (_, i) => <i key={i} />)}
      </div>

      <main>

        {/* Hero */}
        <style>{`
          .kd-hero{position:relative;overflow:hidden;min-height:420px;display:flex;align-items:center;background:url('https://images.unsplash.com/photo-1627894483216-2138af692e32?w=1400&q=80&auto=format&fit=crop') center/cover no-repeat}
          .kd-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(18,5,1,.5) 0%,rgba(18,5,1,.2) 50%,rgba(18,5,1,.55) 100%)}
          .kd-hinner{position:relative;z-index:2;padding:clamp(40px,6vw,80px) clamp(16px,5vw,48px);max-width:740px;margin:0 auto;text-align:center;width:100%}
        `}</style>

        <section className="kd-hero">
          <div className="kd-overlay" />
          <div className="kd-hinner">
            <nav style={{ fontSize: '.76rem', color: 'rgba(255,255,255,.9)', marginBottom: '18px', display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="/" style={{ color: '#fff', textDecoration: 'underline' }}>Home</a>
              <span>›</span>
              <a href="/tour-packages" style={{ color: '#fff', textDecoration: 'underline' }}>Packages</a>
              <span>›</span>
              <span>Kashi Darshan</span>
            </nav>
            <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: 'clamp(1.1rem,3vw,1.5rem)', color: '#FF9933', fontWeight: 700, marginBottom: '10px', textShadow: '0 1px 6px rgba(0,0,0,.5)' }}>ॐ नमः शिवाय · काशी विश्वनाथ</div>
            <GoldRule margin="0 0 14px" />
            <h1 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(2.4rem,7vw,4.2rem)', color: '#fff', lineHeight: 1.05, textShadow: '0 2px 24px rgba(0,0,0,.7)', marginBottom: '8px' }}>Kashi Darshan</h1>
            <p style={{ fontSize: 'clamp(1rem,2.5vw,1.25rem)', color: '#F4C87A', fontWeight: 600, marginBottom: '20px' }}>1 Day · Full Temple Circuit · Ganga Aarti</p>
            <div style={{ display: 'inline-flex', gap: '18px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '24px' }}>
              {['Kashi Vishwanath', 'Boat Ride', 'Ganga Aarti', 'Old City Walk'].map(tag => (
                <span key={tag} style={{ background: 'rgba(10,3,0,.45)', backdropFilter: 'blur(6px)', border: '1px solid rgba(244,168,29,.35)', borderRadius: '20px', padding: '4px 14px', fontSize: '.8rem', color: '#FAF5E0' }}>{tag}</span>
              ))}
            </div>
            <div>
              <a href={WA_ENQUIRE} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', background: 'linear-gradient(135deg,#e8701a,#C4520C)', color: '#FAF5E0', padding: '13px 26px', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,.5)' }}>
                <WaIcon size={20} color="#FAF5E0" /> Enquire on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Itinerary */}
        <section style={{ padding: '60px 0 20px' }}>
          <div className="wrap" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '6px' }}>एक दिन की पवित्र यात्रा</div>
            <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(2rem,4vw,2.8rem)', color: '#6B2509', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '8px' }}>Day Itinerary</h2>
            <p style={{ color: '#5A3F28', maxWidth: '44rem', margin: '0 auto', fontSize: '1rem' }}>Sunrise to aarti — every moment of your Kashi day, mapped out.</p>
            <GoldRule margin="18px auto 0" />
          </div>
          <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {ITINERARY.map(({ time, title, items }) => (
              <div key={time} style={{ background: '#FAF0CC', backgroundImage: GRAIN, border: '1.5px solid rgba(196,146,37,.4)', borderRadius: '5px', overflow: 'hidden', boxShadow: '0 6px 28px rgba(43,26,14,.16)' }}>
                <div style={{ background: 'linear-gradient(105deg,#FAF0CC,#EDD690 60%,#FAF0CC)', borderBottom: '2px solid rgba(196,146,37,.45)', padding: '16px 24px', display: 'flex', gap: '18px', alignItems: 'center' }}>
                  <div style={{ background: 'linear-gradient(135deg,#B5421A,#6B2509)', color: '#FAF5E0', borderRadius: '3px', padding: '4px 14px', fontSize: '.74rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', flexShrink: 0 }}>{time}</div>
                  <div style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 700, fontSize: 'clamp(.95rem,2vw,1.2rem)', color: '#5A3F28' }}>{title}</div>
                </div>
                <ul style={{ listStyle: 'none', padding: '20px 24px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {items.map(item => (
                    <li key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: 'clamp(.92rem,1.8vw,1rem)', color: '#2B1A0E', fontWeight: 600, lineHeight: 1.45 }}>
                      <span style={{ color: '#B5421A', fontSize: '.8rem', marginTop: '4px', flexShrink: 0 }}>◆</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section style={{ padding: '60px 0 70px' }}>
          <div className="wrap">
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '6px' }}>हमारी सेवाएं</div>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.6rem)', color: '#6B2509', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '8px' }}>What&apos;s Covered</h2>
              <GoldRule margin="14px auto 0" />
            </div>
            <style>{`.kd-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}@media(min-width:720px){.kd-svc-grid{grid-template-columns:repeat(6,1fr)}}`}</style>
            <div className="kd-svc-grid">
              {SERVICES.map(svc => (
                <div key={svc.en} style={{ background: '#FAF5E0', padding: '4px 4px 22px', boxShadow: '0 6px 20px rgba(43,26,14,.3),inset 0 0 0 1px rgba(196,146,37,.35)', borderRadius: '2px', position: 'relative' }}>
                  <div style={{ overflow: 'hidden', aspectRatio: '1', background: '#E8D8A0' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={U(svc.photo, 400)} alt={svc.en} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ position: 'absolute', bottom: '4px', left: '6px', right: '6px', textAlign: 'center', fontSize: '.7rem', color: '#8B5E1A', fontFamily: "'Kalam',cursive", overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{svc.en}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section style={{ padding: '60px 0 80px', background: 'linear-gradient(180deg,#EDD690,#F5E8AE)', backgroundImage: GRAIN }}>
          <div className="wrap">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '6px' }}>Choose your plan</div>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.6rem)', color: '#6B2509', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '8px' }}>Packages &amp; Pricing</h2>
              <GoldRule margin="14px auto 0" />
            </div>
            <div style={{ background: '#FAF0CC', backgroundImage: GRAIN, border: '1.5px dashed #C49225', borderRadius: '4px', padding: '15px 22px', display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '.93rem', marginBottom: '34px' }}>
              <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>💡</span>
              <span><strong>Payment Terms:</strong> 50% advance to confirm booking. Remaining 50% on the day of the tour.</span>
            </div>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <PkgCard data={STD} waLink={WA_STD} />
              <PkgCard data={PRE} waLink={WA_PRE} />
            </div>
          </div>
        </section>

        {/* Enquiry Form */}
        <section style={{ padding: '60px 0 80px' }}>
          <div className="wrap" style={{ maxWidth: '680px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.4rem)', color: '#6B2509', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '8px' }}>Send an Enquiry</h2>
              <p style={{ color: '#5A3F28', fontSize: '.97rem' }}>Fill in your details and we will get back to you on WhatsApp.</p>
              <GoldRule margin="16px auto 0" />
            </div>
            <style>{`.kd-form-grid{display:grid;grid-template-columns:1fr 1fr;column-gap:24px;row-gap:20px}@media(max-width:560px){.kd-form-grid{grid-template-columns:1fr}}.kd-field label{display:block;font-size:.76rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#7A4A1A;margin-bottom:4px}.kd-field input,.kd-field select{width:100%;background:transparent;border:none;border-bottom:1.5px solid rgba(139,94,26,.5);padding:7px 2px;font-size:1rem;color:#2B1A0E;outline:none;box-sizing:border-box;font-family:inherit}.kd-field input:focus,.kd-field select:focus{border-bottom-color:#B5421A}.kd-full{grid-column:1/-1}.kd-submit{display:flex;align-items:center;justify-content:center;gap:9px;width:100%;padding:13px;background:linear-gradient(135deg,#8B3A10,#5A2008);color:#FAF5E0;border:none;border-radius:3px;font-weight:700;font-size:1rem;cursor:pointer;transition:opacity .18s}.kd-submit:hover{opacity:.88}.kd-submit:disabled{opacity:.5;cursor:not-allowed}`}</style>
            <div style={{ background: '#FAF0CC', backgroundImage: GRAIN, border: '1.5px solid rgba(196,146,37,.4)', borderRadius: '5px', padding: 'clamp(24px,5vw,48px)' }}>
              <form onSubmit={handleEnquire}>
                <div className="kd-form-grid">
                  <div className="kd-field"><label htmlFor="kd-name">Full Name *</label><input id="kd-name" name="name" type="text" required placeholder="Ramesh Sharma" value={form.name} onChange={handleChange} /></div>
                  <div className="kd-field"><label htmlFor="kd-mobile">Mobile Number *</label><input id="kd-mobile" name="mobile" type="tel" required placeholder="+91 98765 43210" value={form.mobile} onChange={handleChange} /></div>
                  <div className="kd-field"><label htmlFor="kd-people">No. of Travellers *</label>
                    <select id="kd-people" name="people" required value={form.people} onChange={handleChange}>
                      <option value="">Select</option>
                      {['1','2','3','4','5','6','7','8','9','10+'].map(n => <option key={n} value={n}>{n} {n === '1' ? 'person' : 'people'}</option>)}
                    </select>
                  </div>
                  <div className="kd-field"><label htmlFor="kd-pkg">Package</label>
                    <select id="kd-pkg" name="pkg" value={form.pkg} onChange={handleChange}>
                      <option value="">Not decided</option>
                      <option value="Standard (₹1,999/person)">Standard — ₹1,999/person</option>
                      <option value="Premium (₹3,499/person)">Premium — ₹3,499/person</option>
                    </select>
                  </div>
                  <div className="kd-full"><button type="submit" className="kd-submit" disabled={sent}><WaIcon size={20} color="#FAF5E0" />{sent ? 'Opening WhatsApp...' : 'Send Enquiry on WhatsApp'}</button></div>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '0 0 80px' }}>
          <div className="wrap">
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '6px' }}>सामान्य प्रश्न</div>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.6rem)', color: '#6B2509', textTransform: 'uppercase', letterSpacing: '-1px' }}>FAQs</h2>
              <GoldRule margin="14px auto 0" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '780px', margin: '0 auto' }}>
              {FAQS.map((faq, i) => <FaqItem key={i} faq={faq} defaultOpen={i === 0} />)}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '60px 0 80px', background: 'linear-gradient(180deg,#EDD690,#F5E8AE)', backgroundImage: GRAIN }}>
          <div className="wrap" style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '8px' }}>हर यात्रा का भरोसेमंद साथी</div>
            <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.6rem)', color: '#6B2509', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '18px' }}>Book Your Kashi Darshan</h2>
            <GoldRule margin="0 auto 24px" />
            <a href={WA_ENQUIRE} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#B5421A', color: '#FAF5E0', padding: '14px 32px', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
              <WaIcon size={20} color="#FAF5E0" /> Plan Your Yatra Now
            </a>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer>
        <div className="big-hi" aria-hidden="true">काशी</div>
        <div className="wrap">
          <div className="foot">
            <div>
              <a href="/" className="logo" style={{ marginBottom: '14px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Saathi" style={{ height: '60px', width: 'auto', display: 'block' }} />
              </a>
              <p style={{ fontSize: '.93rem', maxWidth: '22rem', color: '#cdb892' }}>Tours, cabs, boats and hotels in Kashi, arranged by people who live here.</p>
            </div>
            <div><h4>Services</h4><ul>
              <li><a href="/tour-packages">Tour Packages</a></li>
              <li><a href="/cab">Cab Booking</a></li>
              <li><a href="/boat-rides">Boat Rides</a></li>
            </ul></div>
            <div><h4>Popular Packages</h4><ul>
              <li><a href="/tours/varanasi-temple-darshan">Kashi Darshan (1 Day)</a></li>
              <li><a href="/golden-triangle">Triveni Yatra (5 Days)</a></li>
              <li><a href="/tours/heritage-walk">Subah-e-Banaras Walk</a></li>
              <li><a href="/boat-rides">Ganga Boat Rides</a></li>
            </ul></div>
            <div><h4>Contact</h4><ul>
              <li>Varanasi, Uttar Pradesh</li>
              <li><a href="tel:+919277472279">+91 92774 72279</a></li>
              <li><a href="mailto:info@yatraksathi.com">info@yatraksathi.com</a></li>
            </ul></div>
          </div>
        </div>
      </footer>
    </div>
  )
}

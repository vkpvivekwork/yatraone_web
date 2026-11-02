'use client'
import { useState } from 'react'
import Navbar from '@/app/components/Navbar'

const WA      = '919277472279'
const WA_BASE = `https://wa.me/${WA}`
const TORAN   = 60
const U = (id, w = 700) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

/* ─── Data ───────────────────────────────────────────────── */

const CATEGORIES = [
  {
    tier:        'Budget',
    hi:          'सस्ती और सुविधाजनक',
    range:       '₹500 – ₹1,500 / night',
    icon:        '🏠',
    desc:        'Clean guesthouses and dharamshalas run by trusted hosts near the ghats. Basic amenities, good food, central location.',
    features:    ['Walking distance to ghats', 'Clean rooms', 'Hot water', 'Vegetarian meals', 'Luggage storage'],
    locations:   ['Near Assi Ghat', 'Godowlia area', 'Near Dashashwamedh'],
    msg:         'Namaste! I am looking for a budget hotel (₹500–1500/night) near the ghats in Varanasi. Please help.',
    accent:      'var(--saffron-deep)',
  },
  {
    tier:        'Mid-Range',
    hi:          'सुविधा और सुकून',
    range:       '₹1,500 – ₹4,000 / night',
    icon:        '🏨',
    desc:        'Comfortable hotels and boutique guesthouses with AC rooms, attached baths, and good breakfast. Our most recommended tier.',
    features:    ['AC rooms', 'Attached bathroom', 'Breakfast included', 'Hot water 24×7', 'Rooftop / Ganga view', 'Free WiFi'],
    locations:   ['Assi Ghat area', 'Near Kashi Vishwanath', 'Cantt area'],
    msg:         'Namaste! I am looking for a mid-range hotel (₹1500–4000/night) in Varanasi. Please share options.',
    accent:      'var(--saffron-deep)',
    recommended: true,
  },
  {
    tier:        'Premium',
    hi:          'विशेष अनुभव',
    range:       '₹4,000 – ₹12,000+ / night',
    icon:        '🏛️',
    desc:        'Heritage havelis, Ganga-view suites and luxury hotels with curated experiences, spa and personalised service.',
    features:    ['Ganga view rooms', 'Heritage property', 'Spa & wellness', 'Guided darshan', 'Airport transfers', 'Fine dining'],
    locations:   ['On the ghats', 'Old city haveli', 'Near Assi / Tulsi Ghat'],
    msg:         'Namaste! I am looking for a premium hotel with Ganga view in Varanasi. Please share options.',
    accent:      'var(--kumkum)',
  },
]

const AREAS = [
  { name: 'Assi Ghat Area',                hi: 'अस्सी घाट',       desc: 'Quiet and cultural. Best for yoga, long stays, and Subah-e-Banaras mornings. Many cafes and foreign-friendly guesthouses.',        best: 'Best for: Long stays, culture seekers, yoga travellers' },
  { name: 'Godowlia / Dashashwamedh',      hi: 'गोदौलिया',         desc: 'Heart of the city. Walk to Kashi Vishwanath, the main aarti ghat, and the busiest markets. Most hotels here have rooftop views.',   best: 'Best for: Pilgrims, first-time visitors, convenience' },
  { name: 'Near Kashi Vishwanath Corridor', hi: 'काशी विश्वनाथ',  desc: 'Very close to the temple. Ideal for early morning darshan without the rush. Narrow lanes but central and devotion-focused.',        best: 'Best for: Devotees, temple-focused trips' },
  { name: 'Cantt / Station Area',          hi: 'कैंट',              desc: 'Modern area near the railway station. Good for those arriving late or leaving early. More standard hotel options at good prices.',    best: 'Best for: Transit stays, late arrivals, city access' },
]

const TIPS = [
  'Book in advance during Dev Deepawali (Nov), Mahashivratri (Feb/Mar) and Prayagraj Mela season — rooms fill up fast.',
  'Ask us for rooms with Ganga view — not all hotels advertise them but many have them on upper floors.',
  'Check-in is typically noon. We can arrange early check-in on request with advance notice.',
  'Most mid-range hotels include a simple breakfast. Premium hotels offer full buffet.',
  'Location near the ghats matters more than star rating in Varanasi. A well-placed guesthouse beats a distant 4-star.',
]

const STEPS = [
  { n: '1', title: 'Share Your Dates',    desc: 'Tell us your check-in, check-out, group size and budget using the form below.' },
  { n: '2', title: 'We Find Options',     desc: 'We send 2–3 personally vetted hotels that match your needs on WhatsApp, with clear pricing.' },
  { n: '3', title: 'Confirm & Check In',  desc: 'Approve a hotel and we arrange the booking. You arrive, check in, and settle in comfortably.' },
]

const TESTIMONIALS = [
  { name: 'Meena S., Bangalore',   stars: 5, text: 'They found us a beautiful Ganga-view room at mid-range prices that I couldn\'t find on any booking site. The personal recommendation made all the difference.' },
  { name: 'Amit & Family, Delhi',  stars: 5, text: 'Arrived at midnight, room was ready and clean. The guesthouse near Assi Ghat was walking distance to everything. Will definitely use Yatra Ke Saathi again.' },
  { name: 'Kavita R., Hyderabad',  stars: 5, text: 'They booked a heritage haveli for our group of 10. Rooftop Ganga view, great service, and it was within our budget. Couldn\'t have found this on our own.' },
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

export default function ServicesHotelPage() {
  const [form, setForm]       = useState({ name: '', mobile: '', checkin: '', checkout: '', rooms: '', budget: '', area: '', pax: '', note: '' })
  const [sent, setSent]       = useState(false)

  function handleChange(e) { setForm(p => ({ ...p, [e.target.name]: e.target.value })) }

  function handleSubmit(e) {
    e.preventDefault()
    const lines = [
      'Namaste! I am looking for a hotel in Varanasi.',
      '',
      `Name: ${form.name}`,
      `Mobile: ${form.mobile}`,
      `Check-in: ${form.checkin || 'Flexible'}`,
      `Check-out: ${form.checkout || 'Flexible'}`,
      form.pax    ? `Guests: ${form.pax}`               : '',
      form.rooms  ? `Rooms: ${form.rooms}`               : '',
      form.budget ? `Budget: ${form.budget}`             : '',
      form.area   ? `Preferred Area: ${form.area}`       : '',
      form.note   ? `Requirements: ${form.note}`         : '',
    ].filter(Boolean).join('\n')
    window.open(`${WA_BASE}?text=${encodeURIComponent(lines)}`, '_blank', 'noopener')
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <div>
      <div className="topbar"><div className="wrap">
        <span className="hi">हर हर महादेव · अतिथि देवो भव · ठहरने की व्यवस्था</span>
        <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
      </div></div>
      <div className="toran" aria-hidden="true">{Array.from({ length: TORAN }, (_, i) => <i key={i} />)}</div>
      <Navbar ctaLabel="Find a Hotel" ctaHref={`${WA_BASE}?text=${encodeURIComponent('Namaste! I need a hotel in Varanasi near the ghats. Please help.')}`} />

      <main>
        <style>{`
          .shtl-hero{position:relative;min-height:500px;display:flex;align-items:center;
            background:url('${U('1565354785692-9e7523e5a87b', 1400)}') center/cover no-repeat}
          .shtl-overlay{position:absolute;inset:0;
            background:linear-gradient(160deg,rgba(10,5,0,.74) 0%,rgba(10,5,0,.26) 55%,rgba(10,5,0,.68) 100%)}
          .shtl-hinner{position:relative;z-index:2;padding:clamp(55px,8vw,100px) clamp(16px,5vw,52px);max-width:820px;width:100%}
          .shtl-tag{display:inline-block;background:rgba(10,3,0,.5);backdrop-filter:blur(6px);
            border:1px solid rgba(244,168,29,.35);border-radius:20px;padding:4px 14px;font-size:.8rem;color:#FAF5E0;margin:0 6px 6px 0}
          .shtl-cat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
          @media(max-width:860px){.shtl-cat-grid{grid-template-columns:1fr 1fr}}
          @media(max-width:560px){.shtl-cat-grid{grid-template-columns:1fr}}
          .shtl-area-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
          @media(max-width:640px){.shtl-area-grid{grid-template-columns:1fr}}
          .shtl-test-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
          @media(max-width:820px){.shtl-test-grid{grid-template-columns:1fr 1fr}}
          @media(max-width:540px){.shtl-test-grid{grid-template-columns:1fr}}
          .shtl-form{background:var(--cream);border:1px solid var(--line);border-radius:18px;padding:clamp(24px,5vw,50px)}
          .shtl-form-grid{display:grid;grid-template-columns:1fr 1fr;column-gap:22px;row-gap:20px}
          @media(max-width:560px){.shtl-form-grid{grid-template-columns:1fr}}
          .shtl-field label{display:block;font-size:.75rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:5px}
          .shtl-field input,.shtl-field select,.shtl-field textarea{width:100%;background:var(--paper);border:1.5px solid var(--line);border-radius:8px;padding:11px 13px;font-size:.97rem;color:var(--ink);outline:none;box-sizing:border-box;font-family:inherit;resize:none;transition:border-color .18s}
          .shtl-field input:focus,.shtl-field select:focus,.shtl-field textarea:focus{border-color:var(--saffron);background:#fff}
          .shtl-full{grid-column:1/-1}
          .shtl-submit{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:15px;background:var(--saffron-deep);color:#fff;border:none;border-radius:10px;font-weight:700;font-size:1.06rem;cursor:pointer;transition:background .2s}
          .shtl-submit:hover{background:var(--kumkum)}
          .shtl-submit:disabled{opacity:.5;cursor:not-allowed}
          .shtl-form form{display:block;padding:0;gap:0}
        `}</style>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="shtl-hero">
          <div className="shtl-overlay" />
          <div className="shtl-hinner">
            <nav style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.8)', marginBottom: '20px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <a href="/" style={{ color: '#fff', textDecoration: 'underline' }}>Home</a><span>›</span>
              <a href="/services" style={{ color: '#fff', textDecoration: 'underline' }}>Services</a><span>›</span><span>Hotels &amp; Stays</span>
            </nav>
            <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: 'clamp(.95rem,2.5vw,1.3rem)', color: '#FF9933', fontWeight: 700, marginBottom: '10px', textShadow: '0 1px 8px rgba(0,0,0,.6)' }}>ठहरने की व्यवस्था · अतिथि देवो भव</div>
            <h1 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(2.4rem,7vw,4.5rem)', color: '#fff', lineHeight: 1.05, textShadow: '0 3px 28px rgba(0,0,0,.7)', margin: '0 0 14px' }}>
              Hotels &amp; Stays<br />in Varanasi
            </h1>
            <p style={{ fontSize: 'clamp(.97rem,2vw,1.18rem)', color: 'rgba(255,255,255,.88)', lineHeight: 1.65, maxWidth: '48rem', marginBottom: '24px' }}>
              We handpick stays near the ghats — from budget guesthouses to Ganga-view heritage havelis. Tell us your budget and dates, we find the right place.
            </p>
            <div style={{ marginBottom: '28px', display: 'flex', flexWrap: 'wrap' }}>
              {['Personally Vetted', 'Near the Ghats', 'All Budgets', 'Ganga View Available'].map(t => (
                <span key={t} className="shtl-tag">{t}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="#book" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg,#e8701a,#C4520C)', color: '#fff', padding: '13px 26px', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,.5)' }}>
                Find a Hotel
              </a>
              <a href="tel:+919277472279" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.3)', color: '#fff', padding: '13px 24px', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
                📞 Call Now
              </a>
            </div>
          </div>
        </section>

        {/* ── Budget Categories ─────────────────────────────────── */}
        <section style={{ padding: '90px 0' }}>
          <div className="wrap">
            <div className="sec-head center" style={{ marginBottom: '52px' }}>
              <div>
                <div className="eyebrow">Budget Range</div>
                <h2 className="sec-title">Choose Your Stay</h2>
                <p className="sec-lead">We work with properties across all budgets — all personally vetted, no booking fees charged to you.</p>
              </div>
            </div>
            <div className="shtl-cat-grid">
              {CATEGORIES.map(c => (
                <div key={c.tier} style={{ background: 'var(--cream)', border: `2px solid ${c.recommended ? 'var(--saffron)' : 'var(--line)'}`, borderRadius: '16px', padding: '30px 26px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  {c.recommended && (
                    <div style={{ position: 'absolute', top: '-13px', left: '22px', background: 'var(--saffron)', color: '#fff', fontSize: '.7rem', fontWeight: 700, padding: '2px 14px', borderRadius: '3px', letterSpacing: '.08em' }}>RECOMMENDED</div>
                  )}
                  <div style={{ fontSize: '2.2rem', marginBottom: '12px' }}>{c.icon}</div>
                  <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '1.38rem', marginBottom: '2px' }}>{c.tier}</div>
                  <div style={{ fontSize: '.84rem', color: 'var(--saffron-deep)', marginBottom: '6px' }}>{c.hi}</div>
                  <div style={{ fontWeight: 700, fontSize: '.98rem', color: 'var(--ink)', marginBottom: '14px' }}>{c.range}</div>
                  <p style={{ fontSize: '.93rem', lineHeight: 1.62, color: 'var(--ink-soft)', marginBottom: '16px' }}>{c.desc}</p>
                  <ul style={{ listStyle: 'none', display: 'grid', gap: '6px', marginBottom: '16px', flex: 1 }}>
                    {c.features.map(f => (
                      <li key={f} style={{ fontSize: '.89rem', paddingLeft: '18px', position: 'relative', color: 'var(--ink-soft)' }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--saffron)', fontWeight: 700 }}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <div style={{ fontSize: '.78rem', color: 'var(--ink-soft)', marginBottom: '18px' }}>
                    <strong>Popular areas:</strong> {c.locations.join(' · ')}
                  </div>
                  <a href={`${WA_BASE}?text=${encodeURIComponent(c.msg)}`} target="_blank" rel="noopener" className="btn"
                    style={{ background: 'var(--saffron-deep)', width: '100%', justifyContent: 'center' }}>
                    Ask for {c.tier} Hotels
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Hotel Enquiry Form ────────────────────────────────── */}
        <section id="book" style={{ padding: '90px 0', background: 'var(--paper-2)' }}>
          <div className="wrap">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '56px', alignItems: 'start' }}>

              {/* ── Left ── */}
              <div>
                <span className="eyebrow">Find your stay</span>
                <h2 className="sec-title" style={{ marginBottom: '14px' }}>Tell Us<br /><em>What You Need</em></h2>
                <p style={{ color: 'var(--ink-soft)', fontSize: '.97rem', lineHeight: 1.7, marginBottom: '28px' }}>
                  Share your dates and budget — we reply with 2–3 personally vetted options on WhatsApp within a few hours.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                  {[
                    'Personally vetted, no booking fees',
                    '2–3 options sent on WhatsApp',
                    'All budgets, near the ghats',
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
                  <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I need a hotel in Varanasi near the ghats. Please help.')}`} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#1f8f4e', fontWeight: 600, fontSize: '.92rem' }}>
                    <WaIcon size={16} color="#1f8f4e" /> WhatsApp directly
                  </a>
                </div>
              </div>

              {/* ── Right: form ── */}
              <div className="shtl-form">
                <form onSubmit={handleSubmit}>
                  <div className="shtl-form-grid">
                    <div className="shtl-field">
                      <label htmlFor="sh-name">Full Name *</label>
                      <input id="sh-name" name="name" type="text" required placeholder="Ramesh Sharma" value={form.name} onChange={handleChange} />
                    </div>
                    <div className="shtl-field">
                      <label htmlFor="sh-mobile">Mobile / WhatsApp *</label>
                      <input id="sh-mobile" name="mobile" type="tel" required placeholder="+91 98765 43210" value={form.mobile} onChange={handleChange} />
                    </div>
                    <div className="shtl-field">
                      <label htmlFor="sh-checkin">Check-in Date *</label>
                      <input id="sh-checkin" name="checkin" type="date" required value={form.checkin} onChange={handleChange} />
                    </div>
                    <div className="shtl-field">
                      <label htmlFor="sh-checkout">Check-out Date *</label>
                      <input id="sh-checkout" name="checkout" type="date" required value={form.checkout} onChange={handleChange} />
                    </div>
                    <div className="shtl-field">
                      <label htmlFor="sh-pax">Total Guests *</label>
                      <select id="sh-pax" name="pax" required value={form.pax} onChange={handleChange}>
                        <option value="">Select</option>
                        {['1 guest','2 guests','3 guests','4 guests','5–6 guests','7–10 guests','10+ guests'].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div className="shtl-field">
                      <label htmlFor="sh-rooms">Rooms Needed</label>
                      <select id="sh-rooms" name="rooms" value={form.rooms} onChange={handleChange}>
                        <option value="">Select</option>
                        {['1 room','2 rooms','3 rooms','4 rooms','5 rooms','6+ rooms'].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div className="shtl-field">
                      <label htmlFor="sh-budget">Budget per Night</label>
                      <select id="sh-budget" name="budget" value={form.budget} onChange={handleChange}>
                        <option value="">No preference</option>
                        <option value="Budget (₹500–1,500/night)">Budget — ₹500–1,500 / night</option>
                        <option value="Mid-Range (₹1,500–4,000/night)">Mid-Range — ₹1,500–4,000 / night</option>
                        <option value="Premium (₹4,000+/night)">Premium — ₹4,000+ / night</option>
                      </select>
                    </div>
                    <div className="shtl-field">
                      <label htmlFor="sh-area">Preferred Area</label>
                      <select id="sh-area" name="area" value={form.area} onChange={handleChange}>
                        <option value="">No preference</option>
                        <option value="Assi Ghat area">Assi Ghat area</option>
                        <option value="Godowlia / Dashashwamedh">Godowlia / Dashashwamedh</option>
                        <option value="Near Vishwanath Corridor">Near Vishwanath Corridor</option>
                        <option value="Cantt / Station area">Cantt / Station area</option>
                      </select>
                    </div>
                    <div className="shtl-field shtl-full">
                      <label htmlFor="sh-note">Special Requirements</label>
                      <input id="sh-note" name="note" type="text" placeholder="e.g. Ganga view, vegetarian meals, ground floor, early check-in" value={form.note} onChange={handleChange} />
                    </div>
                    <div className="shtl-full">
                      <button type="submit" className="shtl-submit" disabled={sent}>
                        <WaIcon size={20} color="#fff" />
                        {sent ? 'Opening WhatsApp...' : 'Send Hotel Enquiry on WhatsApp'}
                      </button>
                      <p style={{ textAlign: 'center', fontSize: '.82rem', color: 'var(--ink-soft)', marginTop: '12px' }}>
                        Free. No fees. We reply within a few hours.
                      </p>
                    </div>
                  </div>
                </form>
              </div>

            </div>
          </div>
          <style>{`@media(max-width:860px){#book .wrap>div{grid-template-columns:1fr!important}}`}</style>
        </section>

        {/* ── Where to Stay ─────────────────────────────────────── */}
        <section style={{ padding: '90px 0' }}>
          <div className="wrap">
            <div className="sec-head center" style={{ marginBottom: '52px' }}>
              <div>
                <div className="eyebrow">Location Guide</div>
                <h2 className="sec-title">Where to Stay in Varanasi</h2>
                <p className="sec-lead">Location matters more than star rating here. Each area has a different character.</p>
              </div>
            </div>
            <div className="shtl-area-grid">
              {AREAS.map(a => (
                <div key={a.name} style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '14px', padding: '26px 24px' }}>
                  <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '1.14rem', marginBottom: '3px' }}>{a.name}</div>
                  <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", color: 'var(--saffron-deep)', fontSize: '.87rem', marginBottom: '10px' }}>{a.hi}</div>
                  <p style={{ color: 'var(--ink-soft)', fontSize: '.92rem', lineHeight: 1.62, marginBottom: '10px' }}>{a.desc}</p>
                  <div style={{ fontSize: '.84rem', fontWeight: 600, color: 'var(--saffron-deep)' }}>{a.best}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Booking Tips ─────────────────────────────────────── */}
        <section style={{ padding: '90px 0', background: 'var(--paper-2)' }}>
          <div className="wrap" style={{ maxWidth: '780px', margin: '0 auto' }}>
            <div className="eyebrow" style={{ textAlign: 'center' }}>Before you book</div>
            <h2 className="sec-title" style={{ textAlign: 'center', marginBottom: '36px' }}>Booking Tips</h2>
            <div style={{ display: 'grid', gap: '14px' }}>
              {TIPS.map((tip, i) => (
                <div key={i} style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '12px', padding: '18px 22px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'var(--saffron)', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: '.85rem', flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ fontSize: '.94rem', color: 'var(--ink-soft)', lineHeight: 1.62 }}>{tip}</div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ── Testimonials ─────────────────────────────────────── */}
        <section style={{ padding: '90px 0', background: 'var(--paper-2)' }}>
          <div className="wrap">
            <div className="sec-head center" style={{ marginBottom: '48px' }}>
              <div>
                <div className="eyebrow">What guests say</div>
                <h2 className="sec-title">Stays Our Guests Loved</h2>
              </div>
            </div>
            <div className="shtl-test-grid">
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
            <div className="hi deva">अतिथि देवो भव</div>
            <h2>Need help finding the right hotel?</h2>
            <p>Tell us your check-in date, group size and budget — we find and book for you.</p>
            <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I need help finding a hotel in Varanasi near the ghats. Please assist.')}`} target="_blank" rel="noopener" className="pkg-wa-btn">
              <WaIcon size={22} color="#fff" /> Find a Hotel on WhatsApp
            </a>
            <div className="pkg-cta-links">
              <a href="/tour-packages">Tour Packages (hotels included)</a>
              <a href="/services">← All Services</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I need a hotel in Varanasi.')}`} target="_blank" rel="noopener" className="fab" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32" fill="#fff"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 15.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
      </a>
    </div>
  )
}

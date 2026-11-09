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
    tier: 'Budget',
    hi: 'सस्ती और सुविधाजनक',
    range: '₹500 – ₹1,500 / night',
    icon: '🏠',
    desc: 'Clean guesthouses and dharamshalas run by trusted hosts near the ghats. Basic amenities, good food, central location.',
    features: ['Walking distance to ghats', 'Clean rooms', 'Hot water', 'Vegetarian meals', 'Luggage storage'],
    locations: ['Near Assi Ghat', 'Godowlia area', 'Near Dashashwamedh'],
    msg: 'Namaste! I am looking for a budget hotel (₹500–1500/night) near the ghats in Varanasi. Please help.',
    accent: 'var(--saffron-deep)',
  },
  {
    tier: 'Mid-Range',
    hi: 'सुविधा और सुकून',
    range: '₹1,500 – ₹4,000 / night',
    icon: '🏨',
    desc: 'Comfortable hotels and boutique guesthouses with AC rooms, attached baths, and good breakfast. Our most recommended tier.',
    features: ['AC rooms', 'Attached bathroom', 'Breakfast included', 'Hot water 24×7', 'Rooftop / Ganga view', 'Free WiFi'],
    locations: ['Assi Ghat area', 'Near Kashi Vishwanath', 'Cantt area'],
    msg: 'Namaste! I am looking for a mid-range hotel (₹1500–4000/night) in Varanasi. Please share options.',
    accent: 'var(--saffron-deep)',
    recommended: true,
  },
  {
    tier: 'Premium',
    hi: 'विशेष अनुभव',
    range: '₹4,000 – ₹12,000+ / night',
    icon: '🏛️',
    desc: 'Heritage havelis, Ganga-view suites and luxury hotels with curated experiences, spa, and personalised service.',
    features: ['Ganga view rooms', 'Heritage property', 'Spa & wellness', 'Guided darshan', 'Airport transfers', 'Fine dining'],
    locations: ['On the ghats', 'Old city haveli', 'Near Assi / Tulsi Ghat'],
    msg: 'Namaste! I am looking for a premium hotel with Ganga view in Varanasi. Please share options.',
    accent: 'var(--kumkum)',
  },
]

const AREAS = [
  { name: 'Assi Ghat Area',                 hi: 'अस्सी घाट',        desc: 'Quiet and cultural. Best for yoga, long stays, and Subah-e-Banaras mornings. Many cafes and foreign-friendly guesthouses.',          best: 'Best for: Long stays, culture seekers, yoga travellers' },
  { name: 'Godowlia / Dashashwamedh',       hi: 'गोदौलिया',          desc: 'Heart of the city. Walk to Kashi Vishwanath, the main aarti ghat, and the busiest markets. Most hotels here have rooftop views.',     best: 'Best for: Pilgrims, first-time visitors, convenience' },
  { name: 'Near Kashi Vishwanath Corridor', hi: 'काशी विश्वनाथ',    desc: 'Very close to the temple. Ideal for early morning darshan without the rush. Narrow lanes but central and devotion-focused.',          best: 'Best for: Devotees, temple-focused trips' },
  { name: 'Cantt / Station Area',           hi: 'कैंट',              desc: 'Modern area near the railway station. Good for those arriving late or leaving early. More standard hotel options at good prices.',      best: 'Best for: Transit stays, late arrivals, city access' },
]

const TIPS = [
  'Book in advance during Dev Deepawali (Nov), Mahashivratri (Feb/Mar) and Prayagraj Mela season — rooms fill up fast.',
  'Ask us for rooms with Ganga view — not all hotels advertise them but many have them on upper floors.',
  'Check-in is typically noon. We can arrange early check-in on request with advance notice.',
  'Most mid-range hotels include a simple breakfast. Premium hotels offer full buffet.',
  'Location near the ghats matters more than star rating in Varanasi. A well-placed guesthouse beats a distant 4-star.',
]

const TESTIMONIALS = [
  { name: 'Meena S., Bangalore',   stars: 5, text: 'They found us a beautiful Ganga-view room at mid-range prices that I couldn\'t find on any booking site. The personal recommendation made all the difference.' },
  { name: 'Amit & Family, Delhi',  stars: 5, text: 'Arrived at midnight, room was ready and clean. The guesthouse near Assi Ghat was walking distance to everything. Will definitely use Yatra Ke Sathi again.' },
  { name: 'Kavita R., Hyderabad',  stars: 5, text: 'They booked a heritage haveli for our group of 10. Rooftop Ganga view, great service, and it was within our budget. Couldn\'t have found this on our own.' },
]

// TODO: replace with API / CMS data when listings go live
const HOTELS = [
  {
    id: 'h1',
    name: 'Assi Ghat Guest House',
    tier: 'Budget',
    area: 'Assi Ghat',
    priceFrom: '₹650',
    img: '1608412525537-662195e817c5',
    features: ['5 min walk to ghats', 'Vegetarian meals', 'Hot water 24×7'],
    badge: null,
    msg: 'Namaste! I am interested in a budget stay near Assi Ghat. Please share availability and rates.',
  },
  {
    id: 'h2',
    name: 'Ram Niwas Lodge',
    tier: 'Budget',
    area: 'Godowlia',
    priceFrom: '₹800',
    img: '1561359313-0639aad49ca6',
    features: ['Central location', 'Rooftop sitting area', 'Luggage storage'],
    badge: null,
    msg: 'Namaste! I am looking for a budget stay near Godowlia in Varanasi. Please share options.',
  },
  {
    id: 'h3',
    name: 'Hotel Kashi View',
    tier: 'Mid-Range',
    area: 'Assi Ghat Area',
    priceFrom: '₹1,800',
    img: '1596097825168-c9b773f404ff',
    features: ['AC rooms', 'Ganga view available', 'Breakfast included', 'Free WiFi'],
    badge: 'Popular',
    msg: 'Namaste! I am interested in a mid-range hotel near Assi Ghat with Ganga view. Please assist.',
  },
  {
    id: 'h4',
    name: 'The Ghat Inn',
    tier: 'Mid-Range',
    area: 'Near Dashashwamedh',
    priceFrom: '₹2,200',
    img: '1565354785692-9e7523e5a87b',
    features: ['Rooftop restaurant', 'River view rooms', 'AC rooms', 'Free WiFi'],
    badge: null,
    msg: 'Namaste! I am looking for a mid-range hotel near Dashashwamedh Ghat. Please share details.',
  },
  {
    id: 'h5',
    name: 'Haveli on the Ganga',
    tier: 'Premium',
    area: 'On the Ghats',
    priceFrom: '₹8,500',
    img: '1599831069477-b2acdc0bcb91',
    features: ['Heritage haveli on the ghats', 'Ganga-view suites', 'Fine dining', 'Spa & wellness'],
    badge: 'Top Pick',
    msg: 'Namaste! I am interested in a premium heritage haveli on the ghats in Varanasi. Please share options.',
  },
  {
    id: 'h6',
    name: 'The Heritage Retreat',
    tier: 'Premium',
    area: 'Near Assi / Tulsi Ghat',
    priceFrom: '₹12,000',
    img: '1627894483216-2138af692e32',
    features: ['Heritage palace property', 'Pool & spa', 'Fine dining', 'Airport transfers'],
    badge: null,
    msg: 'Namaste! I am looking for a premium hotel stay in Varanasi. Please share your best options.',
  },
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

export default function HotelsPage() {
  const [form, setForm]       = useState({ name: '', mobile: '', checkin: '', checkout: '', rooms: '', budget: '', area: '', note: '' })
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
      form.rooms  ? `Rooms: ${form.rooms}`           : '',
      form.budget ? `Budget: ${form.budget}`          : '',
      form.area   ? `Preferred Area: ${form.area}`    : '',
      form.note   ? `Requirements: ${form.note}`      : '',
    ].filter(Boolean).join('\n')
    window.open(`${WA_BASE}?text=${encodeURIComponent(lines)}`, '_blank', 'noopener')
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <div>
      {/* Topbar */}
      <div className="topbar"><div className="wrap">
        <span className="hi">हर हर महादेव · अतिथि देवो भव · ठहरने की व्यवस्था</span>
        <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
      </div></div>
      <div className="toran" aria-hidden="true">{Array.from({ length: TORAN }, (_, i) => <i key={i} />)}</div>
      <Navbar ctaLabel="Find a Hotel" ctaHref={`${WA_BASE}?text=${encodeURIComponent('Namaste! I need a hotel in Varanasi near the ghats. Please help.')}`} />

      <main>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <style>{`
          .htl-hero{position:relative;min-height:460px;display:flex;align-items:center;background:url('${U('1565354785692-9e7523e5a87b', 1400)}') center/cover no-repeat}
          .htl-overlay{position:absolute;inset:0;background:linear-gradient(160deg,rgba(10,5,0,.7) 0%,rgba(10,5,0,.25) 55%,rgba(10,5,0,.65) 100%)}
          .htl-hinner{position:relative;z-index:2;padding:clamp(50px,7vw,90px) clamp(16px,5vw,52px);max-width:780px;width:100%}
          .htl-tag{display:inline-block;background:rgba(10,3,0,.5);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border:1px solid rgba(244,168,29,.35);border-radius:20px;padding:4px 14px;font-size:.8rem;color:#FAF5E0;margin:0 6px 6px 0}
        `}</style>

        <section className="htl-hero">
          <div className="htl-overlay" />
          <div className="htl-hinner">
            <nav style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.8)', marginBottom: '20px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <a href="/" style={{ color: '#fff', textDecoration: 'underline' }}>Home</a><span>›</span><span>Hotels &amp; Stays</span>
            </nav>
            <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: 'clamp(.95rem,2.5vw,1.3rem)', color: '#FF9933', fontWeight: 700, marginBottom: '10px', textShadow: '0 1px 8px rgba(0,0,0,.6)' }}>ठहरने की व्यवस्था · अतिथि देवो भव</div>
            <h1 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(2.4rem,7vw,4.4rem)', color: '#fff', lineHeight: 1.05, textShadow: '0 3px 28px rgba(0,0,0,.7)', margin: '0 0 12px' }}>
              Hotels &amp; Stays<br />in Varanasi
            </h1>
            <p style={{ fontSize: 'clamp(.97rem,2vw,1.15rem)', color: 'rgba(255,255,255,.88)', lineHeight: 1.65, maxWidth: '44rem', marginBottom: '22px' }}>
              We handpick stays near the ghats — from budget guesthouses to Ganga-view heritage havelis. Tell us your budget and dates, we find the right place.
            </p>
            <div style={{ marginBottom: '28px', display: 'flex', flexWrap: 'wrap' }}>
              {['Personally vetted', 'Near the ghats', 'All budgets', 'Ganga view available'].map(t => (
                <span key={t} className="htl-tag">{t}</span>
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
        <section style={{ padding: '80px 0' }}>
          <div className="wrap">
            <div className="sec-head center" style={{ marginBottom: '44px' }}>
              <div>
                <div className="eyebrow">Budget Range</div>
                <h2 className="sec-title">Choose Your Stay</h2>
                <p className="sec-lead">We work with properties across all budgets — all personally vetted.</p>
              </div>
            </div>
            <style>{`.htl-cat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}@media(max-width:860px){.htl-cat-grid{grid-template-columns:1fr 1fr}}@media(max-width:560px){.htl-cat-grid{grid-template-columns:1fr}}`}</style>
            <div className="htl-cat-grid">
              {CATEGORIES.map(c => (
                <div key={c.tier} style={{ background: 'var(--cream)', border: `2px solid ${c.recommended ? 'var(--saffron)' : 'var(--line)'}`, borderRadius: '14px', padding: '28px 24px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                  {c.recommended && (
                    <div style={{ position: 'absolute', top: '-13px', left: '20px', background: 'var(--saffron)', color: '#fff', fontSize: '.7rem', fontWeight: 700, padding: '2px 12px', borderRadius: '3px', letterSpacing: '.08em' }}>RECOMMENDED</div>
                  )}
                  <div style={{ fontSize: '2.2rem', marginBottom: '10px' }}>{c.icon}</div>
                  <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '1.35rem', marginBottom: '2px' }}>{c.tier}</div>
                  <div style={{ fontSize: '.82rem', color: 'var(--saffron-deep)', marginBottom: '6px' }}>{c.hi}</div>
                  <div style={{ fontWeight: 700, fontSize: '.95rem', color: 'var(--ink)', marginBottom: '12px' }}>{c.range}</div>
                  <p style={{ fontSize: '.92rem', lineHeight: 1.6, color: 'var(--ink-soft)', marginBottom: '14px' }}>{c.desc}</p>
                  <ul style={{ listStyle: 'none', display: 'grid', gap: '5px', marginBottom: '14px', flex: 1 }}>
                    {c.features.map(f => (
                      <li key={f} style={{ fontSize: '.88rem', paddingLeft: '16px', position: 'relative', color: 'var(--ink-soft)' }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--saffron)' }}>✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <div style={{ fontSize: '.78rem', color: 'var(--ink-soft)', marginBottom: '16px' }}>
                    <strong>Areas:</strong> {c.locations.join(' · ')}
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

        {/* ── Featured Stays ───────────────────────────────────── */}
        <section style={{ padding: '80px 0' }}>
          <div className="wrap">
            <div className="sec-head center" style={{ marginBottom: '44px' }}>
              <div>
                <div className="eyebrow">Featured Properties</div>
                <h2 className="sec-title">Stays We Recommend</h2>
                <p className="sec-lead">Handpicked across all budgets — personally vetted, near the ghats.</p>
              </div>
            </div>
            <style>{`.htl-hotel-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}@media(max-width:900px){.htl-hotel-grid{grid-template-columns:1fr 1fr}}@media(max-width:560px){.htl-hotel-grid{grid-template-columns:1fr}}`}</style>
            <div className="htl-hotel-grid">
              {HOTELS.map(h => (
                <div key={h.id} style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '14px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 16px rgba(43,26,14,.08)' }}>
                  {/* Image */}
                  <div style={{ position: 'relative', height: '180px', overflow: 'hidden', flexShrink: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={U(h.img)} alt={h.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(43,26,14,.55) 100%)', pointerEvents: 'none' }} />
                    <span style={{
                      position: 'absolute', top: '10px', left: '10px',
                      background: h.tier === 'Premium' ? 'var(--kumkum)' : h.tier === 'Mid-Range' ? 'var(--saffron)' : 'var(--saffron-deep)',
                      color: '#fff', fontSize: '.68rem', fontWeight: 700,
                      padding: '3px 10px', borderRadius: '3px', letterSpacing: '.08em', textTransform: 'uppercase',
                    }}>{h.tier}</span>
                    {h.badge && (
                      <span style={{
                        position: 'absolute', top: '10px', right: '10px',
                        background: 'rgba(10,5,0,.72)', backdropFilter: 'blur(4px)',
                        color: '#FAF5E0', fontSize: '.68rem', fontWeight: 700,
                        padding: '3px 10px', borderRadius: '3px', letterSpacing: '.06em',
                      }}>★ {h.badge}</span>
                    )}
                  </div>
                  {/* Body */}
                  <div style={{ padding: '18px 18px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '1.05rem', color: 'var(--ink)', marginBottom: '4px', lineHeight: 1.2 }}>{h.name}</div>
                    <div style={{ fontSize: '.8rem', color: 'var(--saffron-deep)', fontWeight: 600, marginBottom: '10px' }}>📍 {h.area}</div>
                    <div style={{ marginBottom: '12px' }}>
                      <span style={{ fontSize: '.76rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 600 }}>From </span>
                      <span style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '1.15rem', color: 'var(--saffron-deep)' }}>{h.priceFrom}</span>
                      <span style={{ fontSize: '.75rem', color: 'var(--ink-soft)' }}> /night</span>
                    </div>
                    <ul style={{ listStyle: 'none', display: 'grid', gap: '5px', marginBottom: '16px', flex: 1 }}>
                      {h.features.map(f => (
                        <li key={f} style={{ fontSize: '.84rem', color: 'var(--ink-soft)', paddingLeft: '16px', position: 'relative', lineHeight: 1.4 }}>
                          <span style={{ position: 'absolute', left: 0, color: 'var(--saffron)', fontWeight: 700 }}>✓</span> {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={`${WA_BASE}?text=${encodeURIComponent(h.msg)}`}
                      target="_blank" rel="noopener"
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                        background: 'var(--saffron-deep)', color: '#fff',
                        borderRadius: '8px', padding: '10px 14px',
                        fontSize: '.88rem', fontWeight: 700, textDecoration: 'none',
                      }}
                    >
                      <WaIcon size={16} color="#fff" /> Ask About This Stay
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Areas guide ──────────────────────────────────────── */}
        <section style={{ padding: '80px 0', background: 'var(--paper-2)' }}>
          <div className="wrap">
            <div className="sec-head center" style={{ marginBottom: '44px' }}>
              <div>
                <div className="eyebrow">Location Guide</div>
                <h2 className="sec-title">Where to Stay in Varanasi</h2>
                <p className="sec-lead">Location here matters more than in most cities. Each area has a different character.</p>
              </div>
            </div>
            <style>{`.htl-area-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}@media(max-width:640px){.htl-area-grid{grid-template-columns:1fr}}`}</style>
            <div className="htl-area-grid">
              {AREAS.map(a => (
                <div key={a.name} style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px 22px' }}>
                  <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '1.12rem', marginBottom: '3px' }}>{a.name}</div>
                  <div style={{ color: 'var(--saffron-deep)', fontSize: '.85rem', marginBottom: '10px' }}>{a.hi}</div>
                  <p style={{ color: 'var(--ink-soft)', fontSize: '.91rem', lineHeight: 1.6, marginBottom: '10px' }}>{a.desc}</p>
                  <div style={{ fontSize: '.83rem', fontWeight: 600, color: 'var(--saffron-deep)' }}>{a.best}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────── */}
        <section style={{ padding: '80px 0' }}>
          <div className="wrap">
            <div className="sec-head center" style={{ marginBottom: '44px' }}>
              <div>
                <div className="eyebrow">What guests say</div>
                <h2 className="sec-title">Stays Our Guests Loved</h2>
              </div>
            </div>
            <style>{`.htl-test-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}@media(max-width:820px){.htl-test-grid{grid-template-columns:1fr 1fr}}@media(max-width:540px){.htl-test-grid{grid-template-columns:1fr}}`}</style>
            <div className="htl-test-grid">
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

        {/* ── Enquiry Form ─────────────────────────────────────── */}
        <section id="book" style={{ padding: '80px 0', background: 'var(--paper-2)' }}>
          <div className="wrap" style={{ maxWidth: '720px' }}>
            <div className="sec-head center" style={{ marginBottom: '40px' }}>
              <div>
                <div className="eyebrow">Find your stay</div>
                <h2 className="sec-title">Tell Us What You Need</h2>
                <p className="sec-lead">Share your dates and requirements — we recommend the right property and arrange the booking.</p>
              </div>
            </div>
            <style>{`
              .htl-form{background:var(--cream);border:1px solid var(--line);border-radius:16px;padding:clamp(24px,5vw,48px)}
              .htl-form-grid{display:grid;grid-template-columns:1fr 1fr;column-gap:22px;row-gap:20px}
              @media(max-width:560px){.htl-form-grid{grid-template-columns:1fr}}
              .htl-field label{display:block;font-size:.75rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:5px}
              .htl-field input,.htl-field select,.htl-field textarea{width:100%;background:var(--paper);border:1px solid var(--line);border-radius:8px;padding:10px 12px;font-size:.97rem;color:var(--ink);outline:none;box-sizing:border-box;font-family:inherit;resize:none;transition:border-color .18s}
              .htl-field input:focus,.htl-field select:focus,.htl-field textarea:focus{border-color:var(--saffron)}
              .htl-full{grid-column:1/-1}
              .htl-submit{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:14px;background:var(--saffron-deep);color:#fff;border:none;border-radius:10px;font-weight:700;font-size:1.05rem;cursor:pointer;transition:background .2s}
              .htl-submit:hover{background:var(--kumkum)}
              .htl-submit:disabled{opacity:.5;cursor:not-allowed}
            `}</style>
            <div className="htl-form">
              <form onSubmit={handleSubmit}>
                <div className="htl-form-grid">
                  <div className="htl-field">
                    <label htmlFor="ht-name">Full Name *</label>
                    <input id="ht-name" name="name" type="text" required placeholder="Ramesh Sharma" value={form.name} onChange={handleChange} />
                  </div>
                  <div className="htl-field">
                    <label htmlFor="ht-mobile">Mobile Number *</label>
                    <input id="ht-mobile" name="mobile" type="tel" required placeholder="+91 98765 43210" value={form.mobile} onChange={handleChange} />
                  </div>
                  <div className="htl-field">
                    <label htmlFor="ht-checkin">Check-in Date *</label>
                    <input id="ht-checkin" name="checkin" type="date" required value={form.checkin} onChange={handleChange} />
                  </div>
                  <div className="htl-field">
                    <label htmlFor="ht-checkout">Check-out Date *</label>
                    <input id="ht-checkout" name="checkout" type="date" required value={form.checkout} onChange={handleChange} />
                  </div>
                  <div className="htl-field">
                    <label htmlFor="ht-rooms">Rooms Needed *</label>
                    <select id="ht-rooms" name="rooms" required value={form.rooms} onChange={handleChange}>
                      <option value="">Select</option>
                      {['1 room','2 rooms','3 rooms','4 rooms','5 rooms','6+ rooms'].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div className="htl-field">
                    <label htmlFor="ht-budget">Budget per Night</label>
                    <select id="ht-budget" name="budget" value={form.budget} onChange={handleChange}>
                      <option value="">No preference</option>
                      <option value="Budget (₹500–1,500/night)">Budget — ₹500–1,500 / night</option>
                      <option value="Mid-Range (₹1,500–4,000/night)">Mid-Range — ₹1,500–4,000 / night</option>
                      <option value="Premium (₹4,000+/night)">Premium — ₹4,000+ / night</option>
                    </select>
                  </div>
                  <div className="htl-field">
                    <label htmlFor="ht-area">Preferred Area</label>
                    <select id="ht-area" name="area" value={form.area} onChange={handleChange}>
                      <option value="">No preference</option>
                      <option value="Assi Ghat area">Assi Ghat area</option>
                      <option value="Godowlia / Dashashwamedh">Godowlia / Dashashwamedh</option>
                      <option value="Near Kashi Vishwanath">Near Kashi Vishwanath</option>
                      <option value="Cantt / Station area">Cantt / Station area</option>
                    </select>
                  </div>
                  <div className="htl-field">
                    <label htmlFor="ht-note">Special Requirements</label>
                    <input id="ht-note" name="note" type="text" placeholder="e.g. Ganga view, vegetarian meals, ground floor for elderly" value={form.note} onChange={handleChange} />
                  </div>
                  <div className="htl-full">
                    <button type="submit" className="htl-submit" disabled={sent}>
                      <WaIcon size={20} color="#fff" />
                      {sent ? 'Opening WhatsApp...' : 'Send Hotel Enquiry on WhatsApp'}
                    </button>
                  </div>
                </div>
              </form>
              <p style={{ textAlign: 'center', fontSize: '.82rem', color: 'var(--ink-soft)', marginTop: '14px' }}>
                We respond within a few hours with 2–3 hotel options matching your needs.
              </p>
            </div>
          </div>
        </section>

        {/* ── Booking Tips ─────────────────────────────────────── */}
        <section style={{ padding: '80px 0' }}>
          <div className="wrap" style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div className="eyebrow" style={{ textAlign: 'center' }}>Before you book</div>
            <h2 className="sec-title" style={{ textAlign: 'center', marginBottom: '32px' }}>Booking Tips</h2>
            <div style={{ display: 'grid', gap: '14px' }}>
              {TIPS.map((tip, i) => (
                <div key={i} style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px 20px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ background: 'var(--saffron)', color: '#fff', width: '26px', height: '26px', borderRadius: '50%', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: '.85rem', flexShrink: 0 }}>{i + 1}</div>
                  <div style={{ fontSize: '.93rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>{tip}</div>
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
              <a href="/contact">Contact Us</a>
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

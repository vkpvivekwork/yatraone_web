'use client'
import { useState } from 'react'

const WA = '919277472279'
const WA_BASE = `https://wa.me/${WA}`
const TORAN = 60
const U = (id, w = 700) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

const BOATS = [
  {
    name: 'Shared Rowing Boat',
    hindi: 'साझा नाव',
    capacity: '4–8 people',
    price: '₹100–200 / person',
    img: '1571536802807-30451e3955d8',
    tags: ['Budget', 'Solo traveller', 'Short ride'],
    desc: 'Join other travellers on a leisurely row along the ghats. Perfect for solo pilgrims and backpackers.',
    msg: 'Namaste! I want to book a shared rowing boat ride on the Ganga. Please share details.',
  },
  {
    name: 'Private Rowing Boat',
    hindi: 'निजी नाव',
    capacity: 'Up to 8 people',
    price: '₹600–1,200 / boat',
    img: '1596097825168-c9b773f404ff',
    tags: ['Couples', 'Family', 'Flexible timing'],
    desc: 'Your own boat, your own pace. Stop at whichever ghat you like, stay as long as you want.',
    msg: 'Namaste! I want to book a private rowing boat ride on the Ganga. Please share details and pricing.',
  },
  {
    name: 'Motor Boat',
    hindi: 'मोटर बोट',
    capacity: 'Up to 10 people',
    price: '₹1,500–2,500 / boat',
    img: '1608412525537-662195e817c5',
    tags: ['Speed', 'Full-ghat tour', 'Groups'],
    desc: 'Cover all 84 ghats quickly, great for those with limited time who want the full river experience.',
    msg: 'Namaste! I want to book a motor boat on the Ganga in Varanasi. Please share details.',
  },
  {
    name: 'Bajra (Large Boat)',
    hindi: 'बजरा',
    capacity: '20–50 people',
    price: 'Custom quote',
    img: '1627894483216-2138af692e32',
    tags: ['Large groups', 'Pilgrim parties', 'Aarti view'],
    desc: 'Traditional large wooden boat — perfect for families, pilgrim groups and societies watching Ganga Aarti.',
    msg: 'Namaste! I want to book a Bajra for a group on the Ganga. Please share details and pricing.',
  },
]

const SLOTS = [
  {
    time: 'Sunrise (5:00–7:00 AM)',
    hindi: 'सुबह की नाव',
    icon: '🌅',
    desc: 'The most magical time on the Ganga. Watch priests performing Subah-e-Banaras, witness pilgrims bathing, and see the city wake up to birdsong and temple bells.',
    best: 'Best for: Photography, spiritual experience, peace',
    msg: 'Namaste! I want to book a sunrise boat ride on the Ganga. Please share availability.',
  },
  {
    time: 'Morning (8:00–11:00 AM)',
    hindi: 'प्रातःकाल की नाव',
    icon: '☀️',
    desc: 'Relaxed ride with the ghats full of life — morning bathers, yoga practitioners on Assi Ghat, flower sellers and laundry wallahs. Comfortable weather.',
    best: 'Best for: Families, ghat tour, photography',
    msg: 'Namaste! I want to book a morning boat ride on the Ganga. Please share availability.',
  },
  {
    time: 'Evening Aarti (6:30–8:30 PM)',
    hindi: 'गंगा आरती',
    icon: '🪔',
    desc: 'Watch the grand Ganga Aarti from the water — 11 priests, giant diyas, conch shells and devotional chants. One of the most breathtaking rituals on Earth.',
    best: 'Best for: Ganga Aarti, spiritual seekers, evening tour',
    msg: 'Namaste! I want to book an evening Ganga Aarti boat ride. Please share availability and pricing.',
  },
]

const GHATS = [
  { name: 'Assi Ghat',          hi: 'अस्सी घाट',         note: 'Start point · Subah-e-Banaras' },
  { name: 'Tulsi Ghat',         hi: 'तुलसी घाट',          note: 'Tulsidas connection' },
  { name: 'Kedar Ghat',         hi: 'केदार घाट',          note: 'Shiva temple on stairs' },
  { name: 'Harischandra Ghat',  hi: 'हरिश्चंद्र घाट',    note: 'Ancient cremation ghat' },
  { name: 'Dashashwamedh Ghat', hi: 'दशाश्वमेध घाट',     note: 'Main aarti ghat' },
  { name: 'Man Mandir Ghat',    hi: 'मान मंदिर घाट',     note: 'Maharaja Man Singh palace' },
  { name: 'Manikarnika Ghat',   hi: 'मणिकर्णिका घाट',    note: 'Sacred cremation ghat' },
  { name: 'Scindia Ghat',       hi: 'सिंधिया घाट',       note: 'Partially submerged temple' },
]

function Nav({ navOpen, setNavOpen }) {
  const wa = `${WA_BASE}?text=${encodeURIComponent('Namaste! I want to plan a yatra.')}`
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <a href="/" className="logo"><img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Saathi" style={{ height: '64px', width: 'auto', display: 'block' }} /></a>
        <nav className={`nav-links${navOpen ? ' open' : ''}`}>
          <a href="/tour-packages" onClick={() => setNavOpen(false)}>Packages</a>
          <a href="/cab" onClick={() => setNavOpen(false)}>Cab</a>
          <a href="/boat-rides" onClick={() => setNavOpen(false)} style={{ borderBottom: '2px solid var(--saffron)' }}>Boating</a>
          <a href="/sightseeing" onClick={() => setNavOpen(false)}>Sightseeing</a>
          <a href="/about" onClick={() => setNavOpen(false)}>About</a>
          <a href="/contact" onClick={() => setNavOpen(false)}>Contact</a>
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
            <a href="/" className="logo" style={{ marginBottom: '14px' }}><img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Saathi" style={{ height: '60px', width: 'auto', display: 'block' }} /></a>
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
          <span>© {new Date().getFullYear()} Yatra Ke Saathi</span>
          <span>Photos: Unsplash</span>
        </div>
      </div>
    </footer>
  )
}

export default function BoatingPage() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div>
      <div className="topbar"><div className="wrap">
        <span className="hi">जय माँ गंगे · हर हर महादेव · गंगा आरती</span>
        <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
      </div></div>
      <div className="toran" aria-hidden="true">{Array.from({ length: TORAN }, (_, i) => <i key={i} />)}</div>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} />

      <main>
        {/* ── Hero ── */}
        <section className="pkg-hero" style={{ position: 'relative', overflow: 'hidden' }}>
          <div className="wrap">
            <nav className="pkg-breadcrumb"><a href="/">Home</a><span className="sep">›</span><span>Boating</span></nav>
            <div className="hi" style={{ fontSize: '1rem', color: 'var(--saffron-deep)', marginBottom: '6px' }}>गंगा में नौका विहार</div>
            <h1 style={{ fontSize: 'clamp(2.4rem,5vw,3.6rem)', marginBottom: '14px' }}>Ganga Boat Rides in Varanasi</h1>
            <p style={{ color: 'var(--ink-soft)', fontSize: '1.08rem', maxWidth: '44rem', lineHeight: 1.65, marginBottom: '24px' }}>
              Row past ancient ghats at sunrise. Float silently during the evening Ganga Aarti.
              Watch the city of Kashi from the water — there is no better way to experience Varanasi.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="/boat-rides" className="btn">See packages &amp; book</a>
              <a href="tel:+919277472279" className="btn line">📞 Call Now</a>
            </div>
          </div>
        </section>

        {/* ── Boat types ── */}
        <section style={{ padding: '80px 0' }}>
          <div className="wrap">
            <div className="sec-head center"><div>
              <div className="eyebrow">Our Boats</div>
              <h2 className="sec-title">Choose Your Ride</h2>
              <p className="sec-lead">From a shared row boat at dawn to a private Bajra for your whole group.</p>
            </div></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '22px' }}>
              {BOATS.map(b => (
                <div key={b.name} style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden' }}>
                  <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={U(b.img)} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .6s' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '1.18rem', marginBottom: '2px' }}>{b.name}</div>
                    <div className="hi" style={{ color: 'var(--saffron-deep)', fontSize: '.88rem', marginBottom: '8px' }}>{b.hindi}</div>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', fontSize: '.85rem', color: 'var(--ink-soft)' }}>
                      <span>👥 {b.capacity}</span>
                      <span>💰 {b.price}</span>
                    </div>
                    <p style={{ fontSize: '.9rem', color: 'var(--ink-soft)', marginBottom: '12px', lineHeight: 1.5 }}>{b.desc}</p>
                    <div className="tags" style={{ marginBottom: '14px' }}>{b.tags.map(t => <span key={t}>{t}</span>)}</div>
                    <a href="/boat-rides" className="btn"
                      style={{ background: 'var(--saffron-deep)', fontSize: '.88rem', padding: '9px 18px', width: '100%', justifyContent: 'center' }}>
                      See packages &amp; book
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Time slots ── */}
        <section style={{ padding: '80px 0', background: 'var(--paper-2)' }}>
          <div className="wrap">
            <div className="sec-head center"><div>
              <div className="eyebrow">Timings</div>
              <h2 className="sec-title">When to Sail</h2>
              <p className="sec-lead">Each time of day on the Ganga has its own mood and magic.</p>
            </div></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '22px' }}>
              {SLOTS.map(s => (
                <div key={s.time} style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '12px', padding: '28px 24px' }}>
                  <div style={{ fontSize: '2.4rem', marginBottom: '12px' }}>{s.icon}</div>
                  <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '1.15rem', marginBottom: '2px' }}>{s.time}</div>
                  <div className="hi" style={{ color: 'var(--saffron-deep)', fontSize: '.88rem', marginBottom: '12px' }}>{s.hindi}</div>
                  <p style={{ color: 'var(--ink-soft)', fontSize: '.93rem', lineHeight: 1.6, marginBottom: '10px' }}>{s.desc}</p>
                  <div style={{ fontSize: '.83rem', fontWeight: 600, color: 'var(--saffron-deep)', marginBottom: '16px' }}>{s.best}</div>
                  <a href={`${WA_BASE}?text=${encodeURIComponent(s.msg)}`} target="_blank" rel="noopener" className="btn"
                    style={{ fontSize: '.88rem', padding: '9px 18px' }}>
                    Book this slot →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Ghats covered ── */}
        <section style={{ padding: '80px 0' }}>
          <div className="wrap">
            <div className="sec-head center"><div>
              <div className="eyebrow">The Route</div>
              <h2 className="sec-title">Ghats We Cover</h2>
              <p className="sec-lead">A typical boat ride runs from Assi Ghat to Manikarnika — past the most sacred banks of Kashi.</p>
            </div></div>
            <div className="ghats" style={{ marginTop: '10px' }}>
              {GHATS.map((g, i) => (
                <div key={g.name} className="ghat">
                  <div className="n">{String(i + 1).padStart(2, '0')}</div>
                  <h3>{g.name}</h3>
                  <div className="hi">{g.hi}</div>
                  <p>{g.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="pkg-cta-sec">
          <div className="wrap">
            <div className="hi deva">जय माँ गंगे</div>
            <h2>Ready to sail on the Ganga?</h2>
            <p>Tell us your preferred time, group size and boat type — we'll handle the rest.</p>
            <a href="/boat-rides" className="pkg-wa-btn">
              View packages &amp; book →
            </a>
          </div>
        </section>
      </main>

      <Footer />

      <a href="/boat-rides" className="fab" aria-label="Book a boat ride">
        <svg viewBox="0 0 32 32" fill="#fff"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 15.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
      </a>
    </div>
  )
}

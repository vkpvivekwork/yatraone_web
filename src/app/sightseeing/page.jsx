'use client'
import { useState } from 'react'

const WA = '919277472279'
const WA_BASE = `https://wa.me/${WA}`
const TORAN = 60
const U = (id, w = 700) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

const TEMPLES = [
  { name: 'Kashi Vishwanath Temple', hi: 'काशी विश्वनाथ', note: 'One of the 12 Jyotirlingas. The most sacred Shiva temple in Varanasi, rebuilt by Ahilya Bai Holkar.', highlight: true },
  { name: 'Sankat Mochan Hanuman Temple', hi: 'संकट मोचन', note: 'Sacred Hanuman temple founded by Goswami Tulsidas. Beloved by Banarasis for centuries.' },
  { name: 'Kal Bhairav Temple', hi: 'काल भैरव', note: 'The Kotwal of Kashi — worshipped before leaving the city. Known for its unique prasad offering.' },
  { name: 'Durga Kund Mandir', hi: 'दुर्गा कुंड मंदिर', note: 'Red-hued temple of Goddess Durga beside the ancient Durga Kund tank.' },
  { name: 'Tulsi Manas Temple', hi: 'तुलसी मानस मंदिर', note: 'White marble temple built where Goswami Tulsidas composed the Ramcharitmanas.' },
  { name: 'Annapurna Temple', hi: 'अन्नपूर्णा देवी', note: 'Goddess of food and nourishment. Visited by pilgrims before Kashi Vishwanath darshan.' },
  { name: 'Bharat Mata Temple', hi: 'भारत माता मंदिर', note: 'Unique temple with a marble map of undivided India. Inaugurated by Mahatma Gandhi.' },
  { name: 'New Vishwanath Temple (BHU)', hi: 'बी.एच.यू. विश्वनाथ', note: 'Gleaming white Birla-built temple inside the BHU campus. Open to all, no restrictions.' },
]

const GHATS = [
  { name: 'Dashashwamedh Ghat', hi: 'दशाश्वमेध घाट', note: 'The main ghat and site of the grand evening Ganga Aarti performed daily.' },
  { name: 'Assi Ghat',          hi: 'अस्सी घाट',     note: 'Southern end of the ghats. Home to Subah-e-Banaras morning programme.' },
  { name: 'Manikarnika Ghat',   hi: 'मणिकर्णिका',   note: 'The great cremation ghat. Sacred ground where Moksha is granted.' },
  { name: 'Harischandra Ghat',  hi: 'हरिश्चंद्र घाट', note: 'Ancient burning ghat, named after the legendarily truthful King Harischandra.' },
  { name: 'Tulsi Ghat',         hi: 'तुलसी घाट',    note: 'Where saint-poet Tulsidas lived and composed. Serene and lesser visited.' },
  { name: 'Scindia Ghat',       hi: 'सिंधिया घाट',  note: 'A partially submerged Shiva temple built by Maharani Baija Bai Scindia.' },
  { name: 'Panchganga Ghat',    hi: 'पंचगंगा घाट',  note: 'Believed to be the confluence of five sacred rivers. Beautiful at sunrise.' },
  { name: 'Kedar Ghat',         hi: 'केदार घाट',    note: 'South Indian pilgrims gather here. Red and white striped Kedareshwar temple.' },
]

const BEYOND = [
  {
    name: 'Sarnath',
    dist: '10 km from Varanasi',
    img: '1649876674933-a5b3b39b4da1',
    desc: 'Where Buddha gave his first sermon after attaining enlightenment. The Dhamek Stupa, deer park and Sarnath Museum are unmissable.',
    tags: ['Buddhism', 'Dhamek Stupa', 'Museum', 'Deer Park'],
    msg: 'Namaste! I want to visit Sarnath from Varanasi. Can you arrange a cab and guided tour?',
  },
  {
    name: 'Ramnagar Fort',
    dist: '14 km from Varanasi',
    img: '1613445607898-f46e51645acf',
    desc: 'Across the Ganga, this 18th-century fort of the Maharaja of Kashi houses an eccentric museum with vintage cars, clocks and armoury.',
    tags: ['Heritage', 'Museum', 'River crossing', 'Royal history'],
    msg: 'Namaste! I want to visit Ramnagar Fort from Varanasi. Please arrange a cab.',
  },
  {
    name: 'Vindhyachal',
    dist: '70 km from Varanasi',
    img: '1608412525537-662195e817c5',
    desc: 'Sacred temple of Goddess Vindhyavasini — a major Shakti Peeth. Combine with Varanasi for a powerful pilgrimage day trip.',
    tags: ['Shakti Peeth', 'Day trip', 'Mirzapur'],
    msg: 'Namaste! I want to visit Vindhyachal from Varanasi. Please arrange a cab and guide.',
  },
]

const ACTIVITIES = [
  'Ganga Aarti at Dashashwamedh',
  'Subah-e-Banaras sunrise walk',
  'Kashi Vishwanath corridor tour',
  'Banarasi silk weaving visit',
  'Heritage walk through the galis',
  'Classical music at Benares Ghat',
  'Yoga by the Ganga at Assi',
  'Puja and ritual at the ghats',
  'Street food trail — chaat, lassi',
  'Tonga (horse cart) old city ride',
  'Ghats boat ride at sunset',
  'Cycle rickshaw through old lanes',
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
          <a href="/boat-rides" onClick={() => setNavOpen(false)}>Boating</a>
          <a href="/sightseeing" onClick={() => setNavOpen(false)} style={{ borderBottom: '2px solid var(--saffron)' }}>Sightseeing</a>
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
      <div className="big-hi" aria-hidden="true">दर्शन</div>
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

export default function SightseeingPage() {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div>
      <div className="topbar"><div className="wrap">
        <span className="hi">हर हर महादेव · काशी विश्वनाथ की जय · जय माँ गंगे</span>
        <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
      </div></div>
      <div className="toran" aria-hidden="true">{Array.from({ length: TORAN }, (_, i) => <i key={i} />)}</div>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} />

      <main>
        {/* ── Hero ── */}
        <section className="pkg-hero">
          <div className="wrap">
            <nav className="pkg-breadcrumb"><a href="/">Home</a><span className="sep">›</span><span>Sightseeing</span></nav>
            <div className="hi" style={{ fontSize: '1rem', color: 'var(--saffron-deep)', marginBottom: '6px' }}>दर्शन और भ्रमण</div>
            <h1 style={{ fontSize: 'clamp(2.4rem,5vw,3.6rem)', marginBottom: '14px' }}>Sightseeing &amp; Darshan in Kashi</h1>
            <p style={{ color: 'var(--ink-soft)', fontSize: '1.08rem', maxWidth: '44rem', lineHeight: 1.65, marginBottom: '24px' }}>
              Temples, ghats, Sarnath, heritage walks and sacred rituals — Kashi is one of the world's
              oldest living cities and every lane holds a story. Let us guide you through it all.
            </p>
            <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to book a sightseeing tour in Varanasi. Please share itinerary options.')}`} target="_blank" rel="noopener" className="btn">
              Plan a Sightseeing Tour
            </a>
          </div>
        </section>

        {/* ── Temples ── */}
        <section style={{ padding: '80px 0' }}>
          <div className="wrap">
            <div className="sec-head"><div>
              <div className="eyebrow">Sacred Temples</div>
              <h2 className="sec-title">Temples of Kashi</h2>
              <p className="sec-lead">Kashi has over 2,000 temples. Here are the ones every pilgrim should visit.</p>
            </div></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '16px' }}>
              {TEMPLES.map(t => (
                <div key={t.name} style={{
                  background: t.highlight ? 'var(--saffron)' : 'var(--cream)',
                  color: t.highlight ? '#fff' : 'var(--ink)',
                  border: `1px solid ${t.highlight ? 'transparent' : 'var(--line)'}`,
                  borderRadius: '10px', padding: '20px 18px',
                }}>
                  <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '1.05rem', marginBottom: '3px' }}>{t.name}</div>
                  <div className="hi" style={{ fontSize: '.88rem', marginBottom: '8px', opacity: t.highlight ? .85 : 1, color: t.highlight ? '#ffe0a0' : 'var(--saffron-deep)' }}>{t.hi}</div>
                  <div style={{ fontSize: '.9rem', lineHeight: 1.5, opacity: t.highlight ? .92 : 1, color: t.highlight ? '#fff' : 'var(--ink-soft)' }}>{t.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Ghats ── */}
        <section style={{ padding: '0 0 80px' }}>
          <div className="wrap">
            <div className="sec-head"><div>
              <div className="eyebrow">Sacred Ghats</div>
              <h2 className="sec-title">The Ghats of Varanasi</h2>
              <p className="sec-lead">Varanasi has 88 ghats. These are the most significant ones for pilgrims and travellers.</p>
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

        {/* ── Beyond Varanasi ── */}
        <section style={{ padding: '80px 0', background: 'var(--paper-2)' }}>
          <div className="wrap">
            <div className="sec-head center"><div>
              <div className="eyebrow">Day Trips</div>
              <h2 className="sec-title">Beyond the City</h2>
              <p className="sec-lead">Sacred and historic destinations within easy reach of Varanasi.</p>
            </div></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '22px' }}>
              {BEYOND.map(b => (
                <div key={b.name} style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden' }}>
                  <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={U(b.img)} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 700, fontSize: '1.2rem', marginBottom: '3px' }}>{b.name}</div>
                    <div style={{ fontSize: '.82rem', color: 'var(--saffron-deep)', fontWeight: 600, marginBottom: '10px' }}>📍 {b.dist}</div>
                    <p style={{ color: 'var(--ink-soft)', fontSize: '.91rem', lineHeight: 1.55, marginBottom: '12px' }}>{b.desc}</p>
                    <div className="tags" style={{ marginBottom: '14px' }}>{b.tags.map(t => <span key={t}>{t}</span>)}</div>
                    <a href={`${WA_BASE}?text=${encodeURIComponent(b.msg)}`} target="_blank" rel="noopener" className="btn"
                      style={{ fontSize: '.88rem', padding: '9px 18px', width: '100%', justifyContent: 'center' }}>
                      Arrange a visit →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Activities ── */}
        <section style={{ padding: '80px 0' }}>
          <div className="wrap">
            <div className="sec-head center"><div>
              <div className="eyebrow">Experiences</div>
              <h2 className="sec-title">Things to Do in Kashi</h2>
              <p className="sec-lead">Beyond temples and ghats — a living city full of culture, flavour and spirit.</p>
            </div></div>
            <div className="tag-cloud" style={{ justifyContent: 'center', maxWidth: '800px', margin: '0 auto' }}>
              {ACTIVITIES.map(a => (
                <span key={a} className="tc-item">{a}</span>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to plan sightseeing in Varanasi. Please help with an itinerary.')}`} target="_blank" rel="noopener" className="btn">
                Plan a custom sightseeing tour →
              </a>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="pkg-cta-sec">
          <div className="wrap">
            <div className="hi deva">काशी — अनंत नगरी</div>
            <h2>Let us show you the real Kashi</h2>
            <p>Tell us your dates and interests — we'll craft a darshan itinerary around temple timings, avoiding crowds.</p>
            <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to plan sightseeing and darshan in Varanasi. Please guide me.')}`} target="_blank" rel="noopener" className="pkg-wa-btn">
              <svg viewBox="0 0 32 32"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 15.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
              Plan Sightseeing on WhatsApp
            </a>
            <div className="pkg-cta-links">
              <a href="/tour-packages">View Full Tour Packages</a>
              <a href="/boat-rides">Book a Boat Ride</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <a href={`${WA_BASE}?text=${encodeURIComponent('Namaste! I want to plan sightseeing in Varanasi.')}`} target="_blank" rel="noopener" className="fab" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32" fill="#fff"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 15.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
      </a>
    </div>
  )
}

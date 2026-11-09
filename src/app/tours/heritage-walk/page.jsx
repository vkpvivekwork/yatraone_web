'use client'
import { useState } from 'react'

const WA_NUMBER  = '919277472279'
const WA_BASE    = `https://wa.me/${WA_NUMBER}`
const U = (id, w = 600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .28 0 0 0 0 .16 0 0 0 0 .04 0 0 0 .1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
const WA_ENQUIRE = `${WA_BASE}?text=${encodeURIComponent('Namaste! I am interested in the Subah-e-Banaras Heritage Walk. Please share details and availability.')}`

/* ─── Data ───────────────────────────────────────────────── */

const ROUTE_STOPS = [
  {
    time: '5:30 AM',
    name: 'Assi Ghat',
    hindi: 'अस्सी घाट',
    desc: 'The walk begins here in the dark. Priests chant the Subah-e-Banaras aarti on the steps as the first light touches the Ganga. You will see wrestlers returning from the akhada, pandas setting up their morning rituals, and boatmen pushing out onto the still water.',
    photo: '1596097825168-c9b773f404ff',
  },
  {
    time: '6:00 AM',
    name: 'Tulsi Ghat & Akhada',
    hindi: 'तुलसी घाट',
    desc: 'Where Goswami Tulsidas composed verses of the Ramcharitmanas. The akhada beside it has been active for over 300 years — wrestlers train here every morning, the way they have for generations. Your guide tells you how Banaras kept both saints and warriors.',
    photo: '1561359313-0639aad49ca6',
  },
  {
    time: '6:20 AM',
    name: 'Harishchandra Ghat',
    hindi: 'हरिश्चन्द्र घाट',
    desc: 'One of Kashi\'s two cremation ghats, and the older of them. The fires here have not gone out in recorded history. Your guide explains the Mahashamshana — the theology of moksha that makes Kashi unlike any other city in the world. Observed respectfully from a distance.',
    photo: '1627894483216-2138af692e32',
  },
  {
    time: '6:45 AM',
    name: 'Kedar Ghat',
    hindi: 'केदार घाट',
    desc: 'Built by the Marathas, painted in bold red and white stripes. The Kedareshwar temple here dates to the 14th century. Fishermen\'s boats line the steps, drying nets catching the early light. One of the most photogenic stretches of the entire riverfront.',
    photo: '1571536802807-30451e3955d8',
  },
  {
    time: '7:00 AM',
    name: 'Chai & Kachori Stop',
    hindi: 'चाय और कचौड़ी',
    desc: 'A narrow lane behind the ghats, a chai stall that has been feeding the neighbourhood since before anyone can remember. Earthen cups, kachori with spiced sabzi, hot jalebi. No rush. This is how Banaras takes its morning.',
    photo: '1513475382585-d06e58bcb0e0',
  },
  {
    time: '7:30 AM',
    name: 'The Old City Galis',
    hindi: 'पुरानी गलियां',
    desc: 'Into the medieval lanes — some so narrow that two people cannot walk side by side. Here are the silk weavers at their handlooms, the spice traders, century-old temples hidden behind unmarked wooden doors, and the sound of shehnai drifting from somewhere above.',
    photo: '1634920540678-df0e179c5243',
  },
  {
    time: '8:15 AM',
    name: 'Vishwanath Gali',
    hindi: 'विश्वनाथ गली',
    desc: 'The lane that leads to Kashi Vishwanath, lined with shops selling rudraksha, brass diyas, Banarasi silk, and paan. Your guide shows you the architecture of the old havelis — carved wooden balconies, hidden courtyards, doorways that predate the British Raj.',
    photo: '1608412525537-662195e817c5',
  },
  {
    time: '8:30 AM',
    name: 'Dashashwamedh Ghat',
    hindi: 'दशाश्वमेध घाट',
    desc: 'The walk ends where the city\'s great aarti is held each evening. In the morning it is quiet — a few priests, a few pigeons, the sound of bells from upstream. Your guide closes here with the story of why Brahma performed the Dashashwamedh yagna, and what it made this ghat.',
    photo: '1649876674933-a5b3b39b4da1',
  },
]

const INCLUSIONS = [
  'Expert local guide — born and raised in Kashi',
  'Private walk (your group only — not mixed with strangers)',
  'Chai & kachori at a neighbourhood stall',
  'Cultural and historical commentary at every stop',
  'Flexible start time (5:00–6:00 AM, your choice)',
  'Hotel pickup on request (within Varanasi)',
]

const EXCLUSIONS = [
  'Train / flight tickets to Varanasi',
  'Any additional food beyond the chai stop',
  'Shopping',
  '5% GST',
]

const PRACTICAL = [
  { icon: '⏱', label: 'Duration', value: '3 hours · 5 to 8 km on foot' },
  { icon: '🕔', label: 'Start Time', value: '5:00–5:30 AM (recommended for best light)' },
  { icon: '👟', label: 'What to Wear', value: 'Sturdy, slip-resistant shoes. Modest clothing — covered shoulders and knees for temples.' },
  { icon: '👥', label: 'Group Size', value: 'Private walk. Your group only, no mixing with others.' },
  { icon: '🏃', label: 'Physical Level', value: 'Moderate. Uneven cobblestones and ghat staircases. Comfortable for most fitness levels.' },
  { icon: '🌡', label: 'Best Season', value: 'Oct – Mar (cool mornings). Fleece recommended Nov – Feb.' },
]

const TESTIMONIALS = [
  { name: 'Priya V., Mumbai', stars: 5, text: 'The walk felt personal, not touristy. Hidden temples, wrestlers at dawn, the chai stop in the lanes — three hours that changed how I see Kashi.' },
  { name: 'Rahul & Anita, Delhi', stars: 5, text: 'Our guide grew up in these lanes. He told us stories about families, traditions, and ghats that you won\'t find in any guidebook. Absolutely worth the early morning.' },
  { name: 'Kaveri S., Bengaluru', stars: 5, text: 'I\'ve been to Varanasi twice before but this walk showed me a city I hadn\'t seen. The Harishchandra Ghat explanation was quietly profound.' },
]

const FAQS = [
  { q: 'What time should we start?', a: '5:00–5:30 AM is ideal. The morning aarti at Assi Ghat starts around 5:30 AM, the light is golden, the ghats are quiet, and the lanes are not yet crowded. We can adjust for your comfort.' },
  { q: 'Is it safe to walk so early?', a: 'Yes. The ghats and lanes are active well before dawn — priests, boat workers, vendors and morning walkers are all out. Your guide walks with you throughout.' },
  { q: 'Can elderly or children join?', a: 'Yes. We pace the walk to suit your group. The route does include some uneven steps, so let us know in advance if anyone needs a slower pace or rest stops.' },
  { q: 'Is this a private walk or shared?', a: 'Completely private. Your group only. We do not mix you with other travellers.' },
  { q: 'Can I combine this with a boat ride?', a: 'Yes — many guests do a sunrise boat ride from 5:00–5:30 AM and then join the walk at Assi Ghat. We can arrange both. Ask us when you enquire.' },
  { q: 'What is not covered?', a: 'Train or flight tickets to Varanasi, additional food beyond the chai stop, shopping, and 5% GST are not included in the walk price.' },
  { q: 'How do I confirm a booking?', a: 'Send us a WhatsApp message with your date, group size, and preferred start time. We confirm within a few hours and ask for a small advance to lock the slot.' },
]

/* ─── Sub-components ─────────────────────────────────────── */

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
      <svg viewBox="0 0 24 24" width="14" height="14" fill="#C49225"><path d="M12 2l1.8 5.4H20l-4.9 3.6 1.8 5.4L12 13l-4.9 3.4 1.8-5.4L4 7.4h6.2z" /></svg>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,transparent,#C49225 40%,#C49225 60%,transparent)' }} />
    </div>
  )
}

function FaqItem({ faq, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ background: '#FAF0CC', backgroundImage: GRAIN, border: '1.5px solid rgba(196,146,37,.4)', borderRadius: '4px', overflow: 'hidden' }}>
      <button onClick={() => setOpen(v => !v)} style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', padding: '16px 20px', cursor: 'pointer', border: 'none', background: 'transparent', fontFamily: "'Mukta',sans-serif", fontWeight: 700, fontSize: 'clamp(.93rem,1.8vw,1.02rem)', color: '#2B1A0E', lineHeight: 1.4 }} aria-expanded={open}>
        <span>{faq.q}</span>
        <span style={{ flexShrink: 0, width: '22px', height: '22px', borderRadius: '50%', background: open ? '#B5421A' : '#C49225', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FAF5E0', fontSize: '.8rem', fontWeight: 900 }}>{open ? '−' : '+'}</span>
      </button>
      {open && <div style={{ padding: '14px 20px 18px', fontFamily: "'Mukta',sans-serif", fontSize: '.95rem', color: '#4A2E12', lineHeight: 1.7, borderTop: '1px solid rgba(196,146,37,.3)' }}>{faq.a}</div>}
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────── */

export default function HeritageWalkPage() {
  const [navOpen, setNavOpen] = useState(false)
  const [form, setForm] = useState({ name: '', mobile: '', date: '', people: '', note: '' })
  const [sent, setSent] = useState(false)

  function handleChange(e) { setForm(prev => ({ ...prev, [e.target.name]: e.target.value })) }

  function handleSubmit(e) {
    e.preventDefault()
    const lines = [
      `Namaste! I'd like to book the Subah-e-Banaras Heritage Walk.`,
      ``,
      `Name: ${form.name}`,
      `Mobile: ${form.mobile}`,
      `Preferred Date: ${form.date || 'Flexible'}`,
      `Group Size: ${form.people}`,
      form.note ? `Note: ${form.note}` : '',
    ].filter(Boolean).join('\n')
    window.open(`${WA_BASE}?text=${encodeURIComponent(lines)}`, '_blank', 'noopener')
    setSent(true)
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <div style={{ background: '#F5E8AE', backgroundImage: GRAIN, minHeight: '100vh', color: '#2B1A0E', fontFamily: "'Mukta',system-ui,sans-serif" }}>

      {/* Topbar */}
      <div className="topbar" style={{ background: '#6B2509' }}>
        <div className="wrap">
          <span className="hi">सुबह-ए-बनारस · हर हर महादेव</span>
          <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
        </div>
      </div>

      {/* Nav */}
      <header className="nav" style={{ background: 'rgba(245,232,174,.97)', borderBottom: '1px solid rgba(196,146,37,.3)' }}>
        <div className="wrap nav-inner" style={{ padding: '6px 0' }}>
          <a href="/" className="logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Sathi" style={{ height: '64px', width: 'auto', display: 'block' }} />
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
      <div className="toran" aria-hidden="true">{Array.from({ length: 55 }, (_, i) => <i key={i} />)}</div>

      <main>

        {/* ── Hero ────────────────────────────────────────────── */}
        <style>{`
          .hw-hero{position:relative;min-height:480px;display:flex;align-items:center;background:url('${U('1634920540678-df0e179c5243', 1400)}') center/cover no-repeat}
          .hw-overlay{position:absolute;inset:0;background:linear-gradient(170deg,rgba(18,5,1,.62) 0%,rgba(18,5,1,.22) 55%,rgba(18,5,1,.6) 100%)}
          .hw-hinner{position:relative;z-index:2;padding:clamp(50px,7vw,90px) clamp(16px,5vw,52px);max-width:800px;margin:0 auto;text-align:center;width:100%}
          .hw-tag{background:rgba(10,3,0,.5);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border:1px solid rgba(244,168,29,.35);border-radius:20px;padding:4px 14px;font-size:.8rem;color:#FAF5E0;white-space:nowrap}
        `}</style>

        <section className="hw-hero">
          <div className="hw-overlay" />
          <div className="hw-hinner">
            {/* Breadcrumb */}
            <nav style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.85)', marginBottom: '20px', display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="/" style={{ color: '#fff', textDecoration: 'underline' }}>Home</a><span>›</span>
              <a href="/tour-packages" style={{ color: '#fff', textDecoration: 'underline' }}>Packages</a><span>›</span>
              <span>Subah-e-Banaras</span>
            </nav>

            <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: 'clamp(1rem,2.8vw,1.4rem)', color: '#FF9933', fontWeight: 700, marginBottom: '10px', textShadow: '0 1px 8px rgba(0,0,0,.6)' }}>सुबह-ए-बनारस · भोर की काशी</div>
            <GoldRule margin="0 0 14px" />
            <h1 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(2.6rem,8vw,4.8rem)', color: '#fff', lineHeight: 1, textShadow: '0 3px 28px rgba(0,0,0,.75)', margin: '0 0 10px' }}>Subah-e-Banaras</h1>
            <p style={{ fontSize: 'clamp(1rem,2.4vw,1.3rem)', color: '#F4C87A', fontWeight: 600, margin: '0 0 22px' }}>Morning Heritage Walk · Kashi Ghats</p>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '28px' }}>
              {['3 Hours', 'Private Walk', 'Local Guide', 'Chai & Kachori Included', 'Starts 5:30 AM'].map(t => (
                <span key={t} className="hw-tag">{t}</span>
              ))}
            </div>

            <a href="#book" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'linear-gradient(135deg,#e8701a,#C4520C)', color: '#FAF5E0', padding: '14px 30px', borderRadius: '4px', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none', boxShadow: '0 4px 24px rgba(0,0,0,.55)' }}>
              Book This Walk
            </a>
          </div>
        </section>

        {/* ── What This Walk Is ────────────────────────────────── */}
        <section style={{ padding: '70px 0 50px' }}>
          <div className="wrap" style={{ maxWidth: '800px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '6px' }}>काशी की असली सुबह</div>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.9rem,4vw,2.8rem)', color: '#6B2509', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '10px' }}>The Walk</h2>
              <GoldRule margin="0 auto 28px" />
            </div>

            <p style={{ fontSize: 'clamp(.97rem,1.8vw,1.1rem)', lineHeight: 1.8, color: '#3A2510', marginBottom: '18px' }}>
              Banaras at dawn is a different city. Before the tourist boats arrive, before the crowds fill the ghats, there is a quiet hour when the city belongs entirely to its own rhythm — priests at the water&apos;s edge, wrestlers returning from the akhada, smoke rising from Manikarnika, the first bells from a temple somewhere in the lanes.
            </p>
            <p style={{ fontSize: 'clamp(.97rem,1.8vw,1.1rem)', lineHeight: 1.8, color: '#3A2510', marginBottom: '18px' }}>
              Subah-e-Banaras is a 3-hour guided walk that begins at Assi Ghat while the morning aarti is still being performed, moves north along the riverfront through wrestling grounds, cremation ghats, and Maratha pavilions, then turns into the old city — the narrow medieval galis where silk weavers work at handlooms and century-old temples hide behind unmarked wooden doors.
            </p>
            <p style={{ fontSize: 'clamp(.97rem,1.8vw,1.1rem)', lineHeight: 1.8, color: '#3A2510' }}>
              Your guide is a local — born in these lanes, educated in this city&apos;s history. Not a script. Not a tour group. Just stories told the way they are told here, over earthen cups of chai and kachori at a stall the tourists never find.
            </p>
          </div>
        </section>

        {/* ── Route Stops ─────────────────────────────────────── */}
        <section style={{ padding: '0 0 70px' }}>
          <div className="wrap">
            <div style={{ textAlign: 'center', marginBottom: '44px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '6px' }}>पड़ाव दर पड़ाव</div>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.9rem,4vw,2.8rem)', color: '#6B2509', textTransform: 'uppercase', letterSpacing: '-1px' }}>Walk Route</h2>
              <GoldRule margin="14px auto 0" />
            </div>

            <style>{`
              .hw-spine{display:flex;flex-direction:column;align-items:center;width:44px;flex-shrink:0}
              .hw-spine-dot{width:18px;height:18px;border-radius:50%;background:linear-gradient(135deg,#B5421A,#6B2509);border:3px solid #C49225;flex-shrink:0;margin-top:22px;z-index:1}
              .hw-spine-line{flex:1;width:2px;background:linear-gradient(180deg,#B5421A,#C49225);margin-top:4px;min-height:50px}
              .hw-card{flex:1;background:#FAF0CC;border:1.5px solid rgba(196,146,37,.38);border-radius:5px;padding:20px 22px;box-shadow:0 5px 20px rgba(43,26,14,.14);overflow:hidden}
              .hw-card-head{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:12px}
              .hw-time-badge{background:#B5421A;color:#FAF5E0;border-radius:3px;padding:3px 12px;font-size:.72rem;font-weight:700;letter-spacing:.08em;flex-shrink:0}
              .hw-stop-body{display:grid;grid-template-columns:1fr 180px;gap:18px;align-items:start}
              .hw-stop-img{aspect-ratio:4/3;overflow:hidden;border-radius:3px;border:1.5px solid rgba(196,146,37,.35);box-shadow:0 4px 14px rgba(43,26,14,.22)}
              .hw-stop-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s}
              .hw-card:hover .hw-stop-img img{transform:scale(1.05)}

              @media(max-width:600px){
                .hw-spine{width:28px}
                .hw-spine-dot{width:14px;height:14px;margin-top:18px}
                .hw-card{padding:0 0 16px}
                .hw-card-head{padding:14px 14px 0}
                .hw-stop-body{display:flex;flex-direction:column;gap:0}
                .hw-stop-img{order:-1;aspect-ratio:16/9;border-radius:0;border:none;border-bottom:1.5px solid rgba(196,146,37,.3);box-shadow:none;margin-bottom:12px}
                .hw-stop-body p{padding:0 14px}
              }
            `}</style>

            {ROUTE_STOPS.map(({ time, name, hindi, desc, photo }, i) => (
              <div key={name} style={{ display: 'flex', gap: 0, position: 'relative' }}>
                {/* timeline spine */}
                <div className="hw-spine">
                  <div className="hw-spine-dot" />
                  {i < ROUTE_STOPS.length - 1 && <div className="hw-spine-line" />}
                </div>

                {/* card */}
                <div className="hw-card" style={{ backgroundImage: GRAIN, marginBottom: i < ROUTE_STOPS.length - 1 ? '16px' : 0 }}>
                  <div className="hw-card-head">
                    <span className="hw-time-badge">{time}</span>
                    <div>
                      <span style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800, fontSize: 'clamp(1rem,2vw,1.2rem)', color: '#5A3F28' }}>{name}</span>
                      <span style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '.9rem', color: '#B5421A', marginLeft: '8px' }}>{hindi}</span>
                    </div>
                  </div>
                  <div className="hw-stop-body">
                    <p style={{ color: '#4A2E12', fontSize: 'clamp(.9rem,1.7vw,1rem)', lineHeight: 1.72, margin: 0 }}>{desc}</p>
                    <div className="hw-stop-img">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={U(photo, 400)} alt={name} loading="lazy" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Inclusions & Practical ───────────────────────────── */}
        <section style={{ padding: '60px 0 70px', background: 'linear-gradient(180deg,#EDD690 0%,#F5E8AE 100%)', backgroundImage: GRAIN }}>
          <div className="wrap">
            <div style={{ textAlign: 'center', marginBottom: '44px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '6px' }}>क्या शामिल है</div>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.9rem,4vw,2.8rem)', color: '#6B2509', textTransform: 'uppercase', letterSpacing: '-1px' }}>What&apos;s Included</h2>
              <GoldRule margin="14px auto 0" />
            </div>

            <style>{`.hw-inc-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px}@media(max-width:700px){.hw-inc-grid{grid-template-columns:1fr}}`}</style>
            <div className="hw-inc-grid" style={{ marginBottom: '40px' }}>
              <div style={{ background: '#FAF0CC', backgroundImage: GRAIN, border: '1.5px solid rgba(196,146,37,.4)', borderRadius: '5px', padding: '28px 26px' }}>
                <div style={{ fontWeight: 700, color: '#3A6B2E', fontSize: '.9rem', marginBottom: '14px', letterSpacing: '.04em' }}>INCLUDED</div>
                {INCLUSIONS.map(item => (
                  <div key={item} style={{ display: 'flex', gap: '10px', padding: '7px 0', borderBottom: '1px dashed rgba(58,107,46,.2)', fontSize: '.95rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#3A6B2E', flexShrink: 0, marginTop: '2px' }}>✔</span><span>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: '#FAF0CC', backgroundImage: GRAIN, border: '1.5px solid rgba(196,146,37,.4)', borderRadius: '5px', padding: '28px 26px' }}>
                <div style={{ fontWeight: 700, color: '#8B2020', fontSize: '.9rem', marginBottom: '14px', letterSpacing: '.04em' }}>NOT INCLUDED</div>
                {EXCLUSIONS.map(item => (
                  <div key={item} style={{ display: 'flex', gap: '10px', padding: '7px 0', borderBottom: '1px dashed rgba(139,32,32,.18)', fontSize: '.95rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#8B2020', flexShrink: 0, marginTop: '2px' }}>✖</span><span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical info tiles */}
            <style>{`.hw-prac-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}@media(max-width:860px){.hw-prac-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:500px){.hw-prac-grid{grid-template-columns:1fr}}`}</style>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '6px' }}>यात्रा की तैयारी</div>
              <h3 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800, fontSize: 'clamp(1.4rem,3vw,2rem)', color: '#6B2509', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>Good to Know</h3>
              <GoldRule margin="10px auto 0" />
            </div>
            <div className="hw-prac-grid">
              {PRACTICAL.map(({ icon, label, value }) => (
                <div key={label} style={{ background: '#FAF0CC', backgroundImage: GRAIN, border: '1.5px solid rgba(196,146,37,.35)', borderRadius: '5px', padding: '18px 20px' }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '6px' }}>{icon}</div>
                  <div style={{ fontWeight: 700, fontSize: '.78rem', letterSpacing: '.1em', textTransform: 'uppercase', color: '#B5421A', marginBottom: '4px' }}>{label}</div>
                  <div style={{ fontSize: '.92rem', color: '#4A2E12', lineHeight: 1.55 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────── */}
        <section style={{ padding: '60px 0 70px' }}>
          <div className="wrap">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '6px' }}>यात्रियों के अनुभव</div>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.9rem,4vw,2.8rem)', color: '#6B2509', textTransform: 'uppercase', letterSpacing: '-1px' }}>What Guests Say</h2>
              <GoldRule margin="14px auto 0" />
            </div>
            <style>{`.hw-test-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}@media(max-width:820px){.hw-test-grid{grid-template-columns:1fr 1fr}}@media(max-width:540px){.hw-test-grid{grid-template-columns:1fr}}`}</style>
            <div className="hw-test-grid">
              {TESTIMONIALS.map(({ name, stars, text }) => (
                <div key={name} style={{ background: '#FAF0CC', backgroundImage: GRAIN, border: '1.5px solid rgba(196,146,37,.4)', borderRadius: '5px', padding: '24px 22px', boxShadow: '0 4px 18px rgba(43,26,14,.12)' }}>
                  <div style={{ display: 'flex', gap: '2px', marginBottom: '12px' }}>
                    {Array.from({ length: stars }).map((_, i) => <span key={i} style={{ color: '#C49225', fontSize: '.9rem' }}>★</span>)}
                  </div>
                  <p style={{ fontSize: '.95rem', color: '#3A2510', lineHeight: 1.7, margin: '0 0 14px', fontStyle: 'italic' }}>&ldquo;{text}&rdquo;</p>
                  <div style={{ fontWeight: 700, fontSize: '.82rem', color: '#8B5E1A' }}>{name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Booking Form ─────────────────────────────────────── */}
        <section id="book" style={{ padding: '60px 0 80px', background: 'linear-gradient(180deg,#EDD690 0%,#F5E8AE 100%)', backgroundImage: GRAIN }}>
          <div className="wrap" style={{ maxWidth: '720px' }}>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '6px' }}>अपनी यात्रा बुक करें</div>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.9rem,4vw,2.6rem)', color: '#6B2509', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '10px' }}>Book the Walk</h2>
              <p style={{ color: '#5A3F28', fontSize: '1rem', maxWidth: '38rem', margin: '0 auto' }}>
                Fill in your details and we will confirm your slot on WhatsApp, usually within a few hours.
              </p>
              <GoldRule margin="18px auto 0" />
            </div>

            <style>{`
              .hw-form{background:#FAF0CC;background-image:${GRAIN};border:1.5px solid rgba(196,146,37,.45);border-radius:6px;padding:clamp(24px,5vw,52px)}
              .hw-form-grid{display:grid;grid-template-columns:1fr 1fr;column-gap:26px;row-gap:22px}
              @media(max-width:560px){.hw-form-grid{grid-template-columns:1fr}}
              .hw-field label{display:block;font-size:.74rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:#7A4A1A;margin-bottom:5px}
              .hw-field input,.hw-field select,.hw-field textarea{width:100%;background:transparent;border:none;border-bottom:1.5px solid rgba(139,94,26,.45);padding:7px 2px;font-size:.97rem;color:#2B1A0E;outline:none;box-sizing:border-box;font-family:inherit;resize:none}
              .hw-field input:focus,.hw-field select:focus,.hw-field textarea:focus{border-bottom-color:#B5421A}
              .hw-field input::placeholder,.hw-field textarea::placeholder{color:rgba(139,94,26,.42);font-style:italic}
              .hw-full{grid-column:1/-1}
              .hw-submit{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:14px;background:linear-gradient(135deg,#B5421A,#7A2E0E);color:#FAF5E0;border:none;border-radius:4px;font-weight:700;font-size:1.05rem;cursor:pointer;letter-spacing:.04em;box-shadow:0 3px 16px rgba(181,66,26,.35);transition:opacity .18s}
              .hw-submit:hover{opacity:.88}
              .hw-submit:disabled{opacity:.5;cursor:not-allowed}
            `}</style>

            <div className="hw-form">
              <form onSubmit={handleSubmit}>
                <div className="hw-form-grid">
                  <div className="hw-field">
                    <label htmlFor="hw-name">Full Name *</label>
                    <input id="hw-name" name="name" type="text" required placeholder="Ramesh Sharma" value={form.name} onChange={handleChange} />
                  </div>
                  <div className="hw-field">
                    <label htmlFor="hw-mobile">Mobile Number *</label>
                    <input id="hw-mobile" name="mobile" type="tel" required placeholder="+91 98765 43210" value={form.mobile} onChange={handleChange} />
                  </div>
                  <div className="hw-field">
                    <label htmlFor="hw-date">Preferred Date</label>
                    <input id="hw-date" name="date" type="date" value={form.date} onChange={handleChange} />
                  </div>
                  <div className="hw-field">
                    <label htmlFor="hw-people">Group Size *</label>
                    <select id="hw-people" name="people" required value={form.people} onChange={handleChange}>
                      <option value="">Select</option>
                      {['1 person', '2 people', '3 people', '4 people', '5 people', '6 people', '7–10 people', '10+ people'].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div className="hw-field hw-full">
                    <label htmlFor="hw-note">Anything we should know?</label>
                    <textarea id="hw-note" name="note" rows={3} placeholder="e.g. elderly traveller, need slower pace, combining with boat ride, specific start time..." value={form.note} onChange={handleChange} />
                  </div>
                  <div className="hw-full">
                    <button type="submit" className="hw-submit" disabled={sent}>
                      <WaIcon size={20} color="#FAF5E0" />
                      {sent ? 'Opening WhatsApp...' : 'Send Booking Request on WhatsApp'}
                    </button>
                  </div>
                </div>
              </form>
              <p style={{ textAlign: 'center', fontSize: '.82rem', color: '#8B5E1A', marginTop: '16px' }}>
                We confirm within a few hours. A small advance secures your slot.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────── */}
        <section style={{ padding: '60px 0 80px' }}>
          <div className="wrap">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#8B5E1A', marginBottom: '6px' }}>सामान्य प्रश्न</div>
              <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.9rem,4vw,2.8rem)', color: '#6B2509', textTransform: 'uppercase', letterSpacing: '-1px' }}>Frequently Asked</h2>
              <GoldRule margin="14px auto 0" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '800px', margin: '0 auto' }}>
              {FAQS.map((faq, i) => <FaqItem key={i} faq={faq} defaultOpen={i === 0} />)}
            </div>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────── */}
        <section style={{ padding: '60px 0 80px', background: 'linear-gradient(180deg,#EDD690 0%,#F5E8AE 100%)', backgroundImage: GRAIN }}>
          <div className="wrap" style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1.1rem', color: '#8B5E1A', marginBottom: '6px' }}>हर यात्रा का भरोसेमंद साथी</div>
            <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#6B2509', textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: '8px' }}>Walk with Us at Dawn</h2>
            <p style={{ color: '#5A3F28', fontSize: '1rem', marginBottom: '28px', maxWidth: '36rem', margin: '0 auto 28px' }}>Kashi before the world wakes up. Three hours you will not forget.</p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#book" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#B5421A', color: '#FAF5E0', padding: '13px 28px', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
                Book the Walk
              </a>
              <a href={WA_ENQUIRE} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1f8f4e', color: '#fff', padding: '13px 28px', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
                <WaIcon size={18} color="#fff" /> WhatsApp Us
              </a>
            </div>
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
                <img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Sathi" style={{ height: '60px', width: 'auto', display: 'block' }} />
              </a>
              <p style={{ fontSize: '.93rem', maxWidth: '22rem', color: '#cdb892' }}>Tours, cabs, boats and hotels in Kashi, arranged by people who live here.</p>
            </div>
            <div><h4>Services</h4><ul>
              <li><a href="/tour-packages">Tour Packages</a></li>
              <li><a href="/cab">Cab Booking</a></li>
              <li><a href="/boat-rides">Boat Rides</a></li>
            </ul></div>
            <div><h4>Popular</h4><ul>
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

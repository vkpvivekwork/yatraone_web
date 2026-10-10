'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import './page.css'

/* ── data ── */
const DHAMS = [
  { id:'kashi',   name:'Kashi',    icon:'🕉️',  city:'Varanasi',  desc:'The eternal city of Lord Shiva — oldest living city, 84 ghats, and the Kashi Vishwanath corridor.' },
  { id:'prayag',  name:'Prayagraj',icon:'🌊',  city:'Prayagraj', desc:'Sangam of Ganga, Yamuna & Saraswati — site of Maha Kumbh, Ardh Kumbh and daily triveni puja.' },
  { id:'ayodhya', name:'Ayodhya',  icon:'🏹',  city:'Ayodhya',   desc:'Birthplace of Lord Ram, home of the new Ram Mandir, Ram Katha celebrations and Saryu aarti.' },
  { id:'vrindavan',name:'Vrindavan',icon:'🦚', city:'Mathura',   desc:'Divine playground of Shri Krishna — Banke Bihari, Prem Mandir, ISKCON and 4000+ temples.' },
  { id:'haridwar', name:'Haridwar',icon:'🔱',  city:'Haridwar',  desc:'Gateway of the gods — Har Ki Pauri, Ganga aarti, Mansa Devi and the Rajaji tiger reserve.' },
  { id:'tirupati', name:'Tirupati',icon:'⛰️',  city:'Tirupati',  desc:'Richest temple in the world — Lord Venkateswara darshan atop Tirumala hills with laddu prasad.' },
]

const CIRCUITS = [
  { name:'Char Dham Yatra',stops:'Badrinath · Kedarnath · Gangotri · Yamunotri',days:'14–18 days',group:'8–12',icon:'🏔️',desc:'The holiest Hindu pilgrimage circuit through the Himalayas, covering all four sacred dhams.',bg1:'#1a3a5c',bg2:'#0f1f35' },
  { name:'Panch Kedar',stops:'Kedarnath · Tungnath · Rudranath · Madhyamaheshwar · Kalpeshwar',days:'10–12 days',group:'6–10',icon:'🔱',desc:'Five Shiva temples in the Garhwal Himalayas, each enshrining a different body part of Lord Shiva.',bg1:'#2e1a10',bg2:'#1a0e08' },
  { name:'Kashi–Gaya–Prayag',stops:'Varanasi · Gaya · Prayagraj · Chitrakoot',days:'7–9 days',group:'10–20',icon:'🕉️',desc:'The moksha triangle — perform last rites, pind daan, and seek liberation at the sacred Sangam.',bg1:'#1a2a10',bg2:'#0f1a08' },
  { name:'Krishna Circuit',stops:'Vrindavan · Mathura · Dwarka · Nathdwara',days:'8–10 days',group:'8–15',icon:'🦚',desc:'Walk in the footsteps of Lord Krishna from his birthplace to his final abode in Dwarka.',bg1:'#1a1540',bg2:'#0f0d28' },
  { name:'Ram Vanagaman',stops:'Ayodhya · Chitrakoot · Nashik · Kishkindha · Rameswaram',days:'12–16 days',group:'8–12',icon:'🏹',desc:'Follow the exile path of Lord Ram across India — from Ayodhya to the sacred island of Rameswaram.',bg1:'#2a1010',bg2:'#1a0808' },
  { name:'Nav Durga Shakti',stops:'Vaishno Devi · Jwala Devi · Chamunda · Naina Devi · Vindhyavasini',days:'9–11 days',group:'10–16',icon:'🪔',desc:'Seek the blessings of Nav Durga across nine sacred Shakti peethas spread through North India.',bg1:'#2e1a10',bg2:'#200f06' },
]

const GHATS = [
  { name:'Dashashwamedh', type:'Aarti Ghat',    icon:'🔥', desc:'Most sacred ghat — venue of the grand Ganga aarti every evening with 11 priests and fire lamps.' },
  { name:'Manikarnika',   type:'Moksha Ghat',   icon:'🪔', desc:'Ancient cremation ghat — fires that have burned continuously for thousands of years.' },
  { name:'Assi Ghat',     type:'Sunrise Ghat',  icon:'🌅', desc:'Southernmost ghat with a Shivling at the confluence — perfect for sunrise yoga and meditation.' },
  { name:'Har Ki Pauri',  type:'Holy Ghat',     icon:'🔱', desc:'Sacred steps in Haridwar where the Ganga flows east — the traditional site of Kumbh Mela.' },
  { name:'Ram Ghat',      type:'Puja Ghat',     icon:'🏹', desc:'Sacred ghat in Ujjain on the Shipra river — important bathing site during Simhastha Kumbh.' },
  { name:'Triveni Sangam',type:'Confluence',    icon:'🌊', desc:'Where Ganga, Yamuna and invisible Saraswati meet — sacred for pind daan and holy dips.' },
  { name:'Panchganga',    type:'Five Rivers',   icon:'🪷', desc:'Mythical meeting point of five rivers — Dhoop Dev temple overlooks this serene ghat.' },
  { name:'Kedar Ghat',    type:'Shiva Ghat',    icon:'🕉️', desc:'Ancient ghat with a Kedareshwar Shiva temple — popular for evening prayer and ritual bathing.' },
]

const FESTS = [
  { name:'Dev Deepawali',   date:'November 2025', icon:'🪔', desc:'Kashi lights 10 lakh diyas along 84 ghats on Kartik Purnima — a divine spectacle on the Ganga.' },
  { name:'Maha Shivratri',  date:'February 2026', icon:'🔱', desc:'All-night vigil at Kashi Vishwanath — priests perform 16 rounds of abhishek and lakhs take darshan.' },
  { name:'Ganga Dussehra',  date:'June 2025',     icon:'🌊', desc:'Birthday of Mother Ganga — special snan at dawn and a grand mahotsav procession on the river.' },
  { name:'Karthik Mela',    date:'October 2025',  icon:'🏮', desc:'Month-long fair on the banks — thousands of sadhus and pilgrims camp at Kashi through Karthik.' },
  { name:'Ram Navami',      date:'April 2026',    icon:'🏹', desc:'Lord Ram\'s birthday — grand shobha yatras in Ayodhya, Kashi and Vrindavan with all-day kirtan.' },
  { name:'Holi at Vrindavan',date:'March 2026',   icon:'🌸', desc:'The most famous Holi in the world — Lathmar Holi, flower Holi and traditional phagwa at Banke Bihari.' },
]

const TESTIMONIALS = [
  { name:'Kavya Iyer',       city:'Bengaluru',    stars:5, text:'The Char Dham yatra was planned flawlessly. Our guide Rameshji made sure every puja was perfect. The helicopter to Kedarnath saved our elderly parents — truly a blessed experience.' },
  { name:'Sundar Krishnan',  city:'Chennai',      stars:5, text:'Dev Deepawali package was otherworldly. Boat on the Ganga, 10 lakh diyas, and the aarti from the water — no words can describe it. Highly recommend the platinum package.' },
  { name:'Priya Agarwal',    city:'Lucknow',      stars:5, text:'Booked the Krishna Circuit for our family of 12. Every hotel was well chosen, darshan queues pre-managed, and the guide was deeply knowledgeable. Will definitely book again.' },
  { name:'Aman & Seema Bose',city:'Kolkata',      stars:5, text:'Our honeymoon on the Ganga was magical. Private boat at sunrise, flower puja at Dashashwamedh, and a stay at the Heritage haveli — everything was perfect.' },
]

const GALLERY = [
  { icon:'🔥', label:'Ganga Aarti, Kashi',       c1:'#1a3a5c', c2:'#c4520c' },
  { icon:'🏔️', label:'Kedarnath Temple',         c1:'#1a3a5c', c2:'#2e4a6c' },
  { icon:'🦚', label:'Vrindavan Temples',         c1:'#1a2a10', c2:'#2e4020' },
  { icon:'🌅', label:'Sunrise at Assi Ghat',      c1:'#e8701a', c2:'#f4a81d' },
  { icon:'🪔', label:'Dev Deepawali',              c1:'#c4520c', c2:'#e8a020' },
  { icon:'🏹', label:'Ram Mandir, Ayodhya',        c1:'#5c1a1a', c2:'#8a2e2e' },
  { icon:'🌊', label:'Triveni Sangam',             c1:'#0f3a5c', c2:'#1a5a8a' },
]

const SERVICES = [
  {
    id:'darshan',  icon:'🛕', name:'Temple Darshan',    tag:'Skip the queue',
    desc:'Pre-booked VIP darshan at major temples including Kashi Vishwanath, Banke Bihari, Somnath, Tirupati and more — no waiting for 2–6 hours in general queues.',
    features:['VIP darshan slots pre-booked','Dedicated pujari for abhishek','Pooja samagri included','Photography permitted zones','Post-darshan prasad thal'],
  },
  {
    id:'boat',     icon:'🚣', name:'Sacred River Cruises', tag:'Most popular',
    desc:'Private and group boat rides on the Ganga at Kashi and Prayagraj — sunrise, sunset and full-moon night rides with optional aarti darshan from the water.',
    features:['Private wooden boat option','Guided aarti viewing from river','Dev Deepawali special cruises','Sangam snan & pind daan','Life jackets & safety equipment'],
  },
  {
    id:'puja',     icon:'🪔', name:'Puja & Ritual Services', tag:'Personalized',
    desc:'Vedic puja ceremonies performed by qualified priests in correct tradition — Rudrabhishek, Satyanarayan Katha, Pitru Shraadh, Navagraha and custom yagnas.',
    features:['Qualified vedic priests','Correct ritual tradition','All samagri arranged','Recorded ceremony video','Digital prasad dispatch'],
  },
  {
    id:'hotel',    icon:'🏨', name:'Spiritual Stay',     tag:'Curated stays',
    desc:'Curated accommodations near temples and ghats — from dharamshalas and ashrams to 5-star heritage hotels, all vetted for cleanliness and proximity to sacred sites.',
    features:['Ghat-facing rooms available','Ashram and haveli options','Early check-in for 4 AM puja','Sattvic vegetarian meals','Temple-view rooftop dining'],
  },
  {
    id:'heli',     icon:'🚁', name:'Helicopter Packages',  tag:'For elderly & VIP',
    desc:'Helicopter service to Kedarnath, Vaishno Devi and other high-altitude shrines — perfect for senior pilgrims, those with mobility challenges or those seeking comfort.',
    features:['Kedarnath & Vaishno Devi','Group and private options','Ground logistics included','Altitude acclimatization tips','Badrinath heli tours available'],
  },
]

const WHATSAPP = '919876543210'

/* ── helpers ── */
function Stars({ n }) {
  return <div className="testi-stars">{'★'.repeat(n)}{'☆'.repeat(5-n)}</div>
}

function Barcode() {
  const heights = [20,30,18,35,22,28,15,32,25,20,30,18,35,22,28,15,32,25,20]
  return (
    <div className="pass-barcode">
      {heights.map((h,i) => <span key={i} style={{height:h+'px'}} />)}
    </div>
  )
}

/* ── component ── */
export default function TeerdhYatraSample2() {
  const [navOpen, setNavOpen]       = useState(false)
  const [activeDham, setActiveDham] = useState(0)
  const [timerKey, setTimerKey]     = useState(0)
  const [cities, setCities]         = useState(new Set())
  const [services, setServices]     = useState(new Set())
  const [step, setStep]             = useState(1)
  const [ticket, setTicket]         = useState({ name:'', phone:'', startDate:'', days:'', pax:'' })
  const [openAcc, setOpenAcc]       = useState('darshan')
  const [testiIdx, setTestiIdx]     = useState(0)
  const [lightbox, setLightbox]     = useState(null)
  const [submitted, setSubmitted]   = useState(false)
  const formRef = useRef(null)
  const revealRef = useRef(null)

  /* ── dham auto-rotate ── */
  useEffect(() => {
    const id = setInterval(() => setActiveDham(p => (p + 1) % DHAMS.length), 4000)
    return () => clearInterval(id)
  }, [timerKey])

  const pickDham = (i) => { setActiveDham(i); setTimerKey(k => k + 1) }

  /* ── testimonial auto-play ── */
  useEffect(() => {
    const id = setInterval(() => setTestiIdx(p => (p + 1) % TESTIMONIALS.length), 4500)
    return () => clearInterval(id)
  }, [])

  /* ── reveal observer ── */
  useEffect(() => {
    const els = document.querySelectorAll('.ky2 .reveal')
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          /* data-count animation */
          const n = e.target.dataset.count
          if (n) {
            const target = parseInt(n, 10)
            let cur = 0
            const step = Math.ceil(target / 50)
            const t = setInterval(() => {
              cur = Math.min(cur + step, target)
              e.target.textContent = cur.toLocaleString('en-IN') + (e.target.dataset.suffix || '')
              if (cur >= target) clearInterval(t)
            }, 30)
          }
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.15 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  /* ── chip toggles ── */
  const toggleCity    = (c) => setCities(p    => { const s = new Set(p); s.has(c) ? s.delete(c) : s.add(c); return s })
  const toggleService = (s) => setServices(p  => { const n = new Set(p); n.has(s) ? n.delete(s) : n.add(s); return n })

  /* ── wizard validation ── */
  const canNext1 = cities.size > 0
  const canNext2 = services.size > 0
  const canSubmit = ticket.name && ticket.phone && ticket.startDate && ticket.days && ticket.pax

  /* ── whatsapp link ── */
  const waLink = () => {
    const msg = [
      `*Teerth Yatra Enquiry*`,
      `Name: ${ticket.name || '-'}`,
      `Phone: ${ticket.phone || '-'}`,
      `Destinations: ${[...cities].join(', ') || DHAMS[activeDham].city}`,
      `Services: ${[...services].join(', ')}`,
      `Start Date: ${ticket.startDate || '-'}`,
      `Days: ${ticket.days || '-'}`,
      `Pilgrims: ${ticket.pax || '-'}`,
    ].join('\n')
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  /* ── scroll to wizard ── */
  const scrollToWizard = () => {
    document.getElementById('book')?.scrollIntoView({ behavior:'smooth' })
  }

  const dham = DHAMS[activeDham]
  const CITY_LIST = DHAMS.map(d => d.city)
  const SVC_LIST  = ['Temple Darshan','River Cruise','Puja Ceremony','Hotel Stay','Helicopter','Guide & Transfer']

  return (
    <div className="ky2">

      {/* SVG defs (global scope intentional for icon use) */}
      <svg width="0" height="0" style={{position:'absolute'}}>
        <defs>
          <symbol id="ky2-wa" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </symbol>
        </defs>
      </svg>

      {/* ticker */}
      <div className="ticker">
        <div className="ticker-track">
          {[
            'Dev Deepawali 2025 — Limited Boats Available',
            'Char Dham Yatra 2026 Bookings Open',
            'New Package: Ram Vanagaman Circuit',
            'Maha Kumbh Special Packages — Book Now',
            'Helicopter to Kedarnath — All Dates Open',
            'Dev Deepawali 2025 — Limited Boats Available',
            'Char Dham Yatra 2026 Bookings Open',
            'New Package: Ram Vanagaman Circuit',
          ].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>

      {/* nav */}
      <nav>
        <div className="nav-logo">
          Teerth Yatra<span>Sacred Circuits of India</span>
        </div>
        <div className="nav-links">
          <a href="#dhams">Dhams</a>
          <a href="#circuits">Circuits</a>
          <a href="#ghats">Ghats</a>
          <a href="#festivals">Festivals</a>
          <a href="#book" className="nav-cta">Book Yatra</a>
        </div>
        <button className="nav-hamburger" onClick={() => setNavOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
        <div className={`nav-mobile${navOpen ? ' open' : ''}`}>
          <a href="#dhams" onClick={() => setNavOpen(false)}>Dhams</a>
          <a href="#circuits" onClick={() => setNavOpen(false)}>Circuits</a>
          <a href="#ghats" onClick={() => setNavOpen(false)}>Ghats</a>
          <a href="#festivals" onClick={() => setNavOpen(false)}>Festivals</a>
          <a href="#book" onClick={() => setNavOpen(false)}>Book Yatra</a>
        </div>
      </nav>

      {/* hero */}
      <section className="hero" id="dhams">
        <div className="hero-bg" />
        <svg className="hero-mandala" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" stroke="white" strokeWidth="1" />
          <circle cx="100" cy="100" r="70" stroke="white" strokeWidth="1" />
          <circle cx="100" cy="100" r="50" stroke="white" strokeWidth="1" />
          {Array.from({length:12},(_,i)=>{
            const a = i*30*Math.PI/180
            const x1=100+50*Math.cos(a), y1=100+50*Math.sin(a)
            const x2=100+90*Math.cos(a), y2=100+90*Math.sin(a)
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="1"/>
          })}
          {Array.from({length:8},(_,i)=>{
            const a = i*45*Math.PI/180
            const x=100+70*Math.cos(a), y=100+70*Math.sin(a)
            return <circle key={i} cx={x} cy={y} r="4" fill="white" opacity=".5"/>
          })}
        </svg>
        <div className="hero-content">
          <div className="hero-text">
            <h1>Embark on Your<br /><em>Sacred Yatra</em></h1>
            <p className="hero-sub font-hand">जय माँ गंगे • हर हर महादेव • जय श्री राम</p>
            <div className="hero-stats">
              <div className="hero-stat"><strong className="reveal" data-count="12000" data-suffix="+">0+</strong><span>Pilgrims Served</span></div>
              <div className="hero-stat"><strong className="reveal" data-count="84" data-suffix="+">0+</strong><span>Sacred Stops</span></div>
              <div className="hero-stat"><strong className="reveal" data-count="15" data-suffix="+ yrs">0+ yrs</strong><span>Of Service</span></div>
            </div>
          </div>
          <div className="dham-panel">
            <h3>Select Your Dham</h3>
            <div className="dham-grid">
              {DHAMS.map((d, i) => (
                <button key={d.id} className={`dham-btn${activeDham===i?' active':''}`} onClick={() => pickDham(i)}>
                  <span className="dham-icon">{d.icon}</span>
                  <span>{d.name}</span>
                </button>
              ))}
            </div>
            <p className="dham-desc">{dham.desc}</p>
            <div className="dham-actions">
              <button className="btn-primary" onClick={scrollToWizard}>Plan Yatra →</button>
              <button className="btn-outline" onClick={scrollToWizard}>Get Quote</button>
            </div>
          </div>
        </div>
      </section>

      {/* bells strip */}
      <div className="bells-strip" aria-hidden="true">
        {Array.from({length:16},(_,i) => <span key={i} className="bell-item">🔔</span>)}
      </div>

      {/* trust strip */}
      <div className="trust-strip">
        <div className="wrap">
          <div className="trust-grid">
            {[
              { n:'12,000+', l:'Happy Pilgrims' },
              { n:'84+',     l:'Sacred Stops' },
              { n:'6',       l:'Major Dhams' },
              { n:'15+',     l:'Years Experience' },
              { n:'4.9★',    l:'Average Rating' },
            ].map((s,i) => (
              <div key={i}>
                <div className="trust-num">{s.n}</div>
                <div className="trust-label">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* booking wizard */}
      <section className="wizard-section" id="book">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="label">Plan Your Journey</div>
            <h2>Get Your Yatra Pass</h2>
            <p>Fill in your preferences in 3 simple steps and receive a personalised yatra itinerary on WhatsApp within 2 hours.</p>
          </div>
          <div className="wizard-wrap">
            <div className="wizard-box reveal">
              {/* step tabs */}
              <div className="steps-bar">
                {['Destinations','Services','Details'].map((s,i) => (
                  <div key={s} className={`step-tab${step===i+1?' active':step>i+1?' done':''}`}>
                    <div className="step-num">{step>i+1?'✓':i+1}</div>
                    <div>{s}</div>
                  </div>
                ))}
              </div>

              {!submitted ? (
                <>
                  {step===1 && (
                    <div className="step-content">
                      <div className="step-title">Where do you want to go?</div>
                      <div className="chip-group">
                        {CITY_LIST.map(c => (
                          <button key={c} className={`chip${cities.has(c)?' sel':''}`} onClick={() => toggleCity(c)}>{c}</button>
                        ))}
                      </div>
                      <p style={{fontSize:'.82rem',color:'var(--ink2)',marginBottom:'1rem'}}>Select one or more pilgrimage destinations. {cities.size>0 && <strong style={{color:'var(--kumkum)'}}>{cities.size} selected</strong>}</p>
                      <div className="wizard-nav">
                        <button className="btn-next" disabled={!canNext1} style={{opacity:canNext1?1:.4}} onClick={() => canNext1 && setStep(2)}>Next →</button>
                      </div>
                    </div>
                  )}

                  {step===2 && (
                    <div className="step-content">
                      <div className="step-title">What services do you need?</div>
                      <div className="chip-group">
                        {SVC_LIST.map(s => (
                          <button key={s} className={`chip${services.has(s)?' sel':''}`} onClick={() => toggleService(s)}>{s}</button>
                        ))}
                      </div>
                      <p style={{fontSize:'.82rem',color:'var(--ink2)',marginBottom:'1rem'}}>Select all that apply. {services.size>0 && <strong style={{color:'var(--kumkum)'}}>{services.size} selected</strong>}</p>
                      <div className="wizard-nav">
                        <button className="btn-back" onClick={() => setStep(1)}>← Back</button>
                        <button className="btn-next" disabled={!canNext2} style={{opacity:canNext2?1:.4}} onClick={() => canNext2 && setStep(3)}>Next →</button>
                      </div>
                    </div>
                  )}

                  {step===3 && (
                    <div className="step-content">
                      <div className="step-title">Your Details</div>
                      <form ref={formRef} onSubmit={handleSubmit}>
                        <div className="field-row">
                          <div className="field">
                            <label htmlFor="ky2-name">Full Name *</label>
                            <input id="ky2-name" type="text" placeholder="e.g. Ramesh Kumar" value={ticket.name} onChange={e => setTicket(p => ({...p,name:e.target.value}))} required />
                          </div>
                          <div className="field">
                            <label htmlFor="ky2-phone">WhatsApp Number *</label>
                            <input id="ky2-phone" type="tel" placeholder="+91 98765 43210" value={ticket.phone} onChange={e => setTicket(p => ({...p,phone:e.target.value}))} required />
                          </div>
                        </div>
                        <div className="field-row">
                          <div className="field">
                            <label htmlFor="ky2-date">Start Date *</label>
                            <input id="ky2-date" type="date" value={ticket.startDate} onChange={e => setTicket(p => ({...p,startDate:e.target.value}))} required />
                          </div>
                          <div className="field">
                            <label htmlFor="ky2-days">Duration (days) *</label>
                            <select id="ky2-days" value={ticket.days} onChange={e => setTicket(p => ({...p,days:e.target.value}))} required>
                              <option value="">Select days</option>
                              {['3–4','5–7','8–10','11–14','15–18','19+'].map(d => <option key={d} value={d}>{d} days</option>)}
                            </select>
                          </div>
                        </div>
                        <div className="field">
                          <label htmlFor="ky2-pax">Number of Pilgrims *</label>
                          <select id="ky2-pax" value={ticket.pax} onChange={e => setTicket(p => ({...p,pax:e.target.value}))} required>
                            <option value="">Select count</option>
                            {['1','2','3–4','5–8','9–15','16–30','30+'].map(n => <option key={n} value={n}>{n} {parseInt(n)===1?'pilgrim':'pilgrims'}</option>)}
                          </select>
                        </div>
                        <div className="wizard-nav">
                          <button type="button" className="btn-back" onClick={() => setStep(2)}>← Back</button>
                          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-wa">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><use href="#ky2-wa"/></svg>
                            WhatsApp
                          </a>
                          <button type="submit" className="btn-next" disabled={!canSubmit} style={{opacity:canSubmit?1:.4}}>Confirm →</button>
                        </div>
                      </form>
                    </div>
                  )}
                </>
              ) : (
                <div className="success-box">
                  <div className="success-icon">🙏</div>
                  <h3>Jai Shri Ram! Enquiry Received</h3>
                  <p>Our yatra specialist will contact you on <strong>{ticket.phone}</strong> within 2 hours. Please check your WhatsApp for the itinerary.</p>
                  <button className="btn-next" style={{marginTop:'1.25rem'}} onClick={() => { setSubmitted(false); setStep(1); setCities(new Set()); setServices(new Set()); setTicket({name:'',phone:'',startDate:'',days:'',pax:''}) }}>Plan Another Yatra</button>
                </div>
              )}
            </div>

            {/* yatra pass */}
            <div className="yatra-pass reveal">
              <div className="pass-header">
                <div className="pass-title">Yatra Pass</div>
                <div className="pass-logo">Teerth Yatra™</div>
              </div>
              <div className="pass-body">
                {(cities.size > 0 || ticket.name) ? (
                  <>
                    <div className="pass-dham">{cities.size > 0 ? [...cities].join(' · ') : dham.city}</div>
                    <div className="pass-desc font-hand">Sacred Pilgrimage Journey</div>
                    <div className="pass-rows">
                      <div className="pass-row">
                        <span className="lbl">Pilgrim</span>
                        <span className="val">{ticket.name || '— Enter Name —'}</span>
                      </div>
                      <div className="pass-row">
                        <span className="lbl">Contact</span>
                        <span className="val">{ticket.phone || '—'}</span>
                      </div>
                      <div className="pass-row">
                        <span className="lbl">Departure</span>
                        <span className="val hi">{ticket.startDate || '—'}</span>
                      </div>
                      <div className="pass-row">
                        <span className="lbl">Duration</span>
                        <span className="val">{ticket.days ? ticket.days+' days' : '—'}</span>
                      </div>
                      <div className="pass-row">
                        <span className="lbl">Pilgrims</span>
                        <span className="val">{ticket.pax || '—'}</span>
                      </div>
                      {services.size > 0 && (
                        <div className="pass-row" style={{flexDirection:'column',alignItems:'flex-start',gap:'.4rem'}}>
                          <span className="lbl">Services</span>
                          <div className="pass-services">
                            {[...services].map(s => <span key={s} className="pass-tag">{s}</span>)}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="pass-footer">
                      <Barcode />
                      <div className="pass-id">TY-{Date.now().toString(36).toUpperCase().slice(-6)}</div>
                    </div>
                  </>
                ) : (
                  <div className="pass-empty">
                    <span className="pass-empty-icon">🛕</span>
                    Fill in your destinations and details above to generate your personalised Yatra Pass.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* services accordion */}
      <section className="services-section" id="services">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="label">What We Offer</div>
            <h2>Yatra Services</h2>
            <p>Every service designed to make your pilgrimage smooth, meaningful and deeply spiritual.</p>
          </div>
          <div className="accordion reveal">
            {SERVICES.map(svc => (
              <div key={svc.id} className={`acc-item${openAcc===svc.id?' open':''}`}>
                <button className="acc-head" onClick={() => setOpenAcc(p => p===svc.id ? null : svc.id)}>
                  <span className="acc-icon">{svc.icon}</span>
                  <span className="acc-info">
                    <span className="acc-name">{svc.name}</span>
                    <span className="acc-tag">{svc.tag}</span>
                  </span>
                  <span className="acc-arrow">▼</span>
                </button>
                <div className="acc-body">
                  <p>{svc.desc}</p>
                  <div className="acc-features">
                    {svc.features.map(f => <div key={f} className="acc-feat">{f}</div>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* circuits */}
      <section className="circuits-section" id="circuits">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="label">Sacred Routes</div>
            <h2>Yatra Circuits</h2>
            <p>Time-tested pilgrimage circuits curated by our expert yatra guides, covering all major dhams and tirthas.</p>
          </div>
          <div className="circuits-grid">
            {CIRCUITS.map((c,i) => (
              <div key={i} className="circuit-card reveal">
                <div className="circuit-thumb" style={{'--bg1':c.bg1,'--bg2':c.bg2}}>
                  <span style={{fontSize:'4rem',zIndex:1}}>{c.icon}</span>
                  <div className="circuit-route">
                    <svg viewBox="0 0 300 40" preserveAspectRatio="none">
                      <path d="M10,20 Q75,5 150,20 Q225,35 290,20" />
                      {[10,75,150,225,290].map(x => <circle key={x} cx={x} cy={x===75||x===225?5:20} r="4" fill="rgba(255,255,255,.6)" />)}
                    </svg>
                  </div>
                </div>
                <div className="circuit-body">
                  <div className="circuit-name">{c.name}</div>
                  <div className="circuit-stops">{c.stops}</div>
                  <p className="circuit-desc">{c.desc}</p>
                  <div className="circuit-meta">
                    <span data-icon="📅">{c.days}</span>
                    <span data-icon="👥">{c.group} people</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ghats */}
      <section className="ghats-section" id="ghats">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="label">Sacred Waterfronts</div>
            <h2>Holy Ghats</h2>
            <p>Steps leading to the gods — each ghat carries centuries of devotion, ritual, and spiritual power.</p>
          </div>
        </div>
        <div className="ghats-scroll-wrap">
          <div className="ghats-track">
            {GHATS.map((g,i) => (
              <div key={i} className="ghat-card">
                <div className="ghat-img">{g.icon}</div>
                <div className="ghat-info">
                  <div className="ghat-name">{g.name}</div>
                  <div className="ghat-type">{g.type}</div>
                  <p className="ghat-desc">{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* festivals */}
      <section className="fests-section" id="festivals">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="label">Divine Calendar</div>
            <h2>Sacred Festivals</h2>
            <p>Plan your yatra around India's greatest spiritual celebrations — when the divine energy is at its peak.</p>
          </div>
          <div className="fests-grid">
            {FESTS.map((f,i) => (
              <div key={i} className="fest-card reveal">
                <div className="fest-icon-wrap">{f.icon}</div>
                <div className="fest-info">
                  <div className="fest-name">{f.name}</div>
                  <div className="fest-date">📅 {f.date}</div>
                  <p className="fest-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section className="testimonials-section">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="label">Pilgrim Stories</div>
            <h2>What Devotees Say</h2>
          </div>
          <div className="testi-slider reveal">
            <div className="testi-track" style={{transform:`translateX(-${testiIdx*100}%)`}}>
              {TESTIMONIALS.map((t,i) => (
                <div key={i} className="testi-card">
                  <Stars n={t.stars} />
                  <p className="testi-quote">{t.text}</p>
                  <div className="testi-name font-serif">{t.name}</div>
                  <div className="testi-city">{t.city}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="testi-controls">
            <button className="testi-btn" onClick={() => setTestiIdx(p => (p-1+TESTIMONIALS.length)%TESTIMONIALS.length)}>‹</button>
            <div className="testi-dots">
              {TESTIMONIALS.map((_,i) => (
                <button key={i} className={`testi-dot${testiIdx===i?' active':''}`} onClick={() => setTestiIdx(i)} />
              ))}
            </div>
            <button className="testi-btn" onClick={() => setTestiIdx(p => (p+1)%TESTIMONIALS.length)}>›</button>
          </div>
        </div>
      </section>

      {/* gallery */}
      <section className="gallery-section">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="label">Sacred Moments</div>
            <h2>Photo Gallery</h2>
          </div>
          <div className="gallery-grid reveal">
            {GALLERY.map((g,i) => (
              <div key={i} className="g-item" onClick={() => setLightbox(g)} style={{'--c1':g.c1,'--c2':g.c2}}>
                <div className="g-thumb">{g.icon}</div>
                <div className="g-caption">{g.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
            <div className="lb-display" style={{background:`linear-gradient(135deg,${lightbox.c1},${lightbox.c2})`}}>
              {lightbox.icon}
            </div>
            <div className="lb-caption">{lightbox.label}</div>
            <button className="lb-close" onClick={() => setLightbox(null)}>✕</button>
          </div>
        </div>
      )}

      {/* footer */}
      <footer>
        <div className="footer-grid">
          <div>
            <div className="footer-brand">Teerth Yatra</div>
            <div className="footer-tagline font-hand">हर हर महादेव • जय श्री राम</div>
            <p className="footer-desc">India's most trusted pilgrimage planning service — 15 years, 12,000+ pilgrims, 84+ sacred stops. Your journey to the divine, made effortless.</p>
          </div>
          <div className="footer-col">
            <h4>Circuits</h4>
            <a href="#circuits">Char Dham Yatra</a>
            <a href="#circuits">Panch Kedar</a>
            <a href="#circuits">Krishna Circuit</a>
            <a href="#circuits">Ram Vanagaman</a>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <a href="#services">Temple Darshan</a>
            <a href="#services">River Cruises</a>
            <a href="#services">Puja Ceremonies</a>
            <a href="#services">Helicopter Tours</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href={`https://wa.me/${WHATSAPP}`}>WhatsApp Us</a>
            <a href="tel:+919876543210">+91 98765 43210</a>
            <a href="mailto:info@teerthyatra.in">info@teerthyatra.in</a>
            <a href="#book">Plan My Yatra</a>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2025 Teerth Yatra. All rights reserved. &nbsp;|&nbsp; Designed with devotion 🙏
        </div>
      </footer>

    </div>
  )
}

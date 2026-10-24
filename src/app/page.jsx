'use client'
import { useState, useEffect, useRef, useCallback, cloneElement } from 'react'
import { WHATSAPP_NUMBER, AARTI_TIMES, U } from '@/lib/constants'
import { SERVICES, GHATS, PHOTOS, TESTIMONIALS, PACKAGES, FESTIVALS } from '@/lib/data'

// ─── inline data ───────────────────────────────────────────────────────────────

const SVCS = [
  { key: 'tour',  icon: '#i-temple', label: 'Tour Package', sub: 'Darshan & sightseeing' },
  { key: 'cab',   icon: '#i-car',    label: 'Cab',          sub: 'City & outstation' },
  { key: 'boat',  icon: '#i-boat',   label: 'Boat',         sub: 'Sunrise & aarti' },
  { key: 'hotel', icon: '#i-stay',   label: 'Hotel',        sub: 'Near the ghats' },
]

const TAB_ICONS  = { tour: '#i-temple', cab: '#i-car', boat: '#i-boat', hotel: '#i-stay' }
const TAB_LABELS = { tour: 'Tour', cab: 'Cab', boat: 'Boat', hotel: 'Hotel' }

const RIBBON_WORDS = ['काशी', 'गंगा', 'घाट', 'आरती']

const SVC_CARDS = [
  { svc: 'tour',  page: '/tour-packages', img: '1705952484283-19c31e37e0e4', alt: 'Ritual with oil lamps on the banks of the Ganga',  icon: '#i-temple', title: 'Tour Packages',  hi: 'दर्शन और भ्रमण',       desc: 'Guided darshan, aarti, heritage walks and day trips, planned around temple timings.',      tags: ['Kashi Darshan', 'Sarnath', 'Temple trail', 'Food & silk walk', 'Custom'],                  cta: 'Plan a tour →' },
  { svc: 'cab',   page: '/cab',           img: '1443479788958-11faa35a5578', alt: 'Driver at the wheel of a car',                     icon: '#i-car',    title: 'Cab Service',    hi: 'कैब सेवा',              desc: 'Clean cars with drivers who know the city, for a quick drop or a multi-city yatra.',         tags: ['City tour', 'Intercity', 'Full day', 'One-way drop', 'Airport / Railway', 'Round trip'],    cta: 'Book a cab →' },
  { svc: 'boat',  page: '/boating',       img: '1596097825168-c9b773f404ff', alt: 'Boat on the Ganga at sunset',                      icon: '#i-boat',   title: 'Boat Rides',     hi: 'गंगा में नौका विहार',   desc: 'Row past the ghats at sunrise, or watch the evening aarti from the water.',                  tags: ['Sunrise ride', 'Aarti boat', 'Private rowing', 'Motor boat', 'Bajra for groups'],           cta: 'Book a boat →' },
  { svc: 'hotel', page: '/hotels',        img: '1565354785692-9e7523e5a87b', alt: 'Riverside building beside ghat steps',             icon: '#i-stay',   title: 'Hotels & Stays', hi: 'ठहरने की व्यवस्था',    desc: 'Stays we have checked ourselves, from simple guesthouses to Ganga-view rooms.',              tags: ['Ganga view', 'Bed & Breakfast', 'Near Vishwanath', 'Budget to premium'],                    cta: 'Find a hotel →' },
]

const COLLAGE = [
  { id: '1599831069477-b2acdc0bcb91', cap: 'Evening aarti',       alt: 'Priests performing the aarti with tiered lamps' },
  { id: '1571536802807-30451e3955d8', cap: 'Morning boats',       alt: 'Rowing boats tied at a ghat' },
  { id: '1608412525537-662195e817c5', cap: 'Along the ghats',     alt: 'People walking along the ghats' },
  { id: '1634920540678-df0e179c5243', cap: 'Colours of the galis', alt: 'Woman in red in front of a colourful wall' },
]

const GALLERY_PHOTOS = PHOTOS.slice(2, 10)
const STRIP_PHOTOS   = PHOTOS.slice(6, 12)

// ─── helpers ───────────────────────────────────────────────────────────────────

function getAartiTime() {
  const n = new Date()
  const ist = new Date(n.getTime() + n.getTimezoneOffset() * 60000 + 330 * 60000)
  return '~' + AARTI_TIMES[ist.getMonth()]
}

function dispatchPick(svc, pkg) {
  window.dispatchEvent(new CustomEvent('pick-service', { detail: { svc, pkg } }))
  document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

function getPer() {
  if (typeof window === 'undefined') return 3
  return window.innerWidth <= 720 ? 1 : window.innerWidth <= 1060 ? 2 : 3
}

// ─── page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  // Nav
  const [navOpen, setNavOpen] = useState(false)
  // Hero
  const [activeSvc, setActiveSvc] = useState('tour')
  const [aartiTime, setAartiTime] = useState('')
  // Toran
  const [toranCount, setToranCount] = useState(60)
  // BookingPanel
  const [current, setCurrent] = useState('tour')
  const [showSuccess, setShowSuccess] = useState(false)
  const [waLink, setWaLink] = useState('')
  const [summary, setSummary] = useState('')
  const formRef = useRef(null)
  const presetPkgRef = useRef(null)
  // Gallery
  const [lightboxSrc, setLightboxSrc] = useState(null)
  // Testimonials
  const trackRef = useRef(null)
  const tIdxRef = useRef(0)
  const timerRef = useRef(null)

  // Toran bead count
  useEffect(() => {
    const update = () => setToranCount(Math.ceil(window.innerWidth / 22))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Hero: aarti time + sync active button from pick-service
  useEffect(() => {
    setAartiTime(getAartiTime())
    const handler = (e) => { if (e.detail?.svc) setActiveSvc(e.detail.svc) }
    window.addEventListener('pick-service', handler)
    return () => window.removeEventListener('pick-service', handler)
  }, [])

  // BookingPanel: listen for pick-service
  useEffect(() => {
    const handler = (e) => {
      const { svc, pkg } = e.detail || {}
      if (svc) { setCurrent(svc); presetPkgRef.current = pkg || null; setShowSuccess(false) }
    }
    window.addEventListener('pick-service', handler)
    return () => window.removeEventListener('pick-service', handler)
  }, [])

  // BookingPanel: apply preset package after form renders
  useEffect(() => {
    if (presetPkgRef.current && formRef.current) {
      const sel = formRef.current.querySelector('[name="Package"]')
      if (sel) { sel.value = presetPkgRef.current; presetPkgRef.current = null }
    }
  })

  // Testimonials slide
  const goT = useCallback((n) => {
    const max = Math.max(0, TESTIMONIALS.length - getPer())
    const next = n < 0 ? max : n > max ? 0 : n
    tIdxRef.current = next
    if (trackRef.current?.children[0]) {
      const w = trackRef.current.children[0].offsetWidth
      trackRef.current.style.transform = `translateX(-${next * (w + 22)}px)`
    }
  }, [])

  const startAuto = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => goT(tIdxRef.current + 1), 6000)
  }, [goT])

  useEffect(() => {
    startAuto()
    const onResize = () => goT(tIdxRef.current)
    window.addEventListener('resize', onResize)
    return () => { clearInterval(timerRef.current); window.removeEventListener('resize', onResize) }
  }, [goT, startAuto])

  const tSxRef = useRef(null)
  const handleTTouchStart = (e) => { tSxRef.current = e.touches[0].clientX }
  const handleTTouchEnd = (e) => {
    if (tSxRef.current == null) return
    const dx = e.changedTouches[0].clientX - tSxRef.current
    if (Math.abs(dx) > 40) { goT(tIdxRef.current + (dx < 0 ? 1 : -1)); startAuto() }
    tSxRef.current = null
  }

  // RevealObserver + data-count animation
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('in')
        entry.target.querySelectorAll('[data-count]').forEach((el) => {
          const end = +el.dataset.count
          let start
          const step = (ts) => {
            start = start || ts
            const p = Math.min((ts - start) / 1400, 1)
            el.textContent = Math.round(end * p)
            if (p < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        })
        io.unobserve(entry.target)
      })
    }, { threshold: 0.12 })
    elements.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // BookingPanel submit
  const cfg = SERVICES[current]
  const today = new Date().toISOString().slice(0, 10)

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    if (!form.checkValidity()) { form.reportValidity(); return }
    const svcLabel = cfg.title.replace(/^(Plan a|Book a|Find a) /, '')
    const lines = ['Namaste Yatra Ke Saathi 🙏', `Service: ${svcLabel}`]
    for (const [k, v] of new FormData(form).entries()) {
      if (String(v).trim()) lines.push(`${k}: ${v}`)
    }
    const text = lines.join('\n')
    setSummary(text)
    setWaLink(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`)
    setShowSuccess(true)
  }

  const handleNewEnq = () => { formRef.current?.reset(); setShowSuccess(false) }

  // Ribbon items
  const ribbonPhotos = PHOTOS.slice(0, 8)
  const ribbonItems = ribbonPhotos.flatMap((p, i) => {
    const nodes = [
      <figure key={`img-${i}`} className="ph">
        <img src={U(p[0], 520)} alt={p[1]} loading="lazy" />
        <figcaption>{p[1]}</figcaption>
      </figure>,
    ]
    if (i % 2 === 1) nodes.push(<div key={`word-${i}`} className="word">{RIBBON_WORDS[(i >> 1) % 4]}</div>)
    return nodes
  })

  return (
    <>
      {/* ── SVG symbol defs ── */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <symbol id="i-temple" viewBox="0 0 40 40"><path d="M20 3v4M20 7l5 2-5 2M10 36V22c0-6 4-10 10-15 6 5 10 9 10 15v14M6 36h28M17 36v-6a3 3 0 0 1 6 0v6M14 22h12"/></symbol>
          <symbol id="i-car" viewBox="0 0 40 40"><path d="M6 27v-6c0-2 1.5-4 4-4h20c2.5 0 4 2 4 4v6zM10 17l3-6h14l3 6M16 8h8"/><circle cx="12" cy="28" r="3.2"/><circle cx="28" cy="28" r="3.2"/></symbol>
          <symbol id="i-boat" viewBox="0 0 40 40"><path d="M3 23h34c-2.5 6-8 8.5-17 8.5S5.5 29 3 23zM20 23V8M20 8l7 13M20 8l-7 13M6 35q3-1.6 6 0t6 0 6 0 6 0 6 0"/></symbol>
          <symbol id="i-stay" viewBox="0 0 40 40"><path d="M7 35V16h26v19M4 16h32M20 5l9 7H11zM16.5 35v-6a3.5 3.5 0 0 1 7 0v6M11 21h4v4h-4zM25 21h4v4h-4z"/></symbol>
          <symbol id="i-guide" viewBox="0 0 40 40"><circle cx="20" cy="12" r="6"/><path d="M8 36c0-7 5-12 12-12s12 5 12 12M20 24v6"/></symbol>
          <symbol id="i-shield" viewBox="0 0 40 40"><path d="M20 4l13 5v9c0 9-6 15-13 18C13 33 7 27 7 18V9z"/><path d="M14 20l4 4 8-8"/></symbol>
          <symbol id="i-rupee" viewBox="0 0 40 40"><circle cx="20" cy="20" r="16"/><path d="M14 12h12M14 17h12M14 12h3a5 5 0 0 1 0 10h-3l9 8"/></symbol>
          <symbol id="i-phone" viewBox="0 0 40 40"><path d="M10 5h6l3 8-4 3c2 4 5 7 9 9l3-4 8 3v6c0 2-2 4-4 4C18 34 6 22 6 9c0-2 2-4 4-4z"/></symbol>
          <symbol id="i-lang" viewBox="0 0 40 40"><path d="M5 9h16M13 5v4M9 9c1 6 5 11 10 13M17 9c-1 6-5 11-10 14M22 34l6-16 6 16M24 29h8"/></symbol>
          <symbol id="i-chat" viewBox="0 0 40 40"><path d="M6 8h28v18H18l-8 7v-7H6z"/><path d="M12 15h16M12 20h10"/></symbol>
          <symbol id="i-plan" viewBox="0 0 40 40"><rect x="7" y="6" width="26" height="30" rx="3"/><path d="M13 14h14M13 20h14M13 26h8"/><path d="M15 3v6M25 3v6"/></symbol>
          <symbol id="i-sun" viewBox="0 0 40 40"><circle cx="20" cy="22" r="7"/><path d="M20 6v5M8 12l3 3M32 12l-3 3M4 24h5M31 24h5M6 32h28"/></symbol>
          <symbol id="i-train" viewBox="0 0 40 40"><rect x="9" y="5" width="22" height="24" rx="5"/><path d="M9 17h22M14 35l3-6M26 35l-3-6"/><circle cx="14" cy="23" r="1.5"/><circle cx="26" cy="23" r="1.5"/></symbol>
          <symbol id="i-pin" viewBox="0 0 40 40"><path d="M20 36s-11-10-11-19a11 11 0 0 1 22 0c0 9-11 19-11 19z"/><circle cx="20" cy="17" r="4"/></symbol>
          <symbol id="i-mail" viewBox="0 0 40 40"><rect x="5" y="9" width="30" height="22" rx="3"/><path d="M6 11l14 11 14-11"/></symbol>
          <symbol id="i-clock" viewBox="0 0 40 40"><circle cx="20" cy="20" r="15"/><path d="M20 11v9l6 4"/></symbol>
          <symbol id="i-doc" viewBox="0 0 40 40"><path d="M10 4h14l7 7v25H10z"/><path d="M24 4v7h7M15 20h11M15 26h11"/></symbol>
          <symbol id="mark" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="22" fill="#e8701a"/>
            <path d="M24 9c5 6 5 12 0 17-5-5-5-11 0-17z" fill="#fdf4de"/>
            <path d="M11 30h26c-2 6-7 9-13 9s-11-3-13-9z" fill="#fdf4de"/>
            <path d="M16 34h16" stroke="#e8701a" strokeWidth="1.6"/>
          </symbol>
          <symbol id="lotus" viewBox="0 0 60 36">
            <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
              <path d="M30 4c5 6 5 16 0 24-5-8-5-18 0-24z"/>
              <path d="M30 28c-4-7-10-12-18-13 2 8 9 13 18 13z"/>
              <path d="M30 28c4-7 10-12 18-13-2 8-9 13-18 13z"/>
              <path d="M30 28c-8-2-17-1-24 4 8 2 17 1 24-4z"/>
              <path d="M30 28c8-2 17-1 24 4-8 2-17 1-24-4z"/>
            </g>
          </symbol>
          <symbol id="mandala" viewBox="-100 -100 200 200">
            <g fill="none" stroke="#c4520c" strokeWidth=".8">
              <circle r="98"/><circle r="92"/><circle r="70"/><circle r="46"/><circle r="22"/><circle r="8"/>
              <g id="mp">
                <path d="M0-92C10-82 10-74 0-70-10-74-10-82 0-92z"/>
                <path d="M0-70C14-60 14-50 0-46-14-50-14-60 0-70z"/>
                <path d="M0-46C7-38 7-30 0-22-7-30-7-38 0-46z"/>
                <circle cy="-81" r="2"/>
              </g>
              {[22.5,45,67.5,90,112.5,135,157.5,180,202.5,225,247.5,270,292.5,315,337.5].map(deg => (
                <use key={deg} href="#mp" transform={`rotate(${deg})`}/>
              ))}
            </g>
          </symbol>
        </defs>
      </svg>

      {/* ── Topbar ── */}
      <div className="topbar">
        <div className="wrap">
          <span className="hi">हर हर महादेव · अतिथि देवो भव</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span className="hide-sm">Call / WhatsApp: </span>
            <a href={`tel:+${WHATSAPP_NUMBER}`}>+91 92774 72279</a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Namaste! I want to plan a Kashi yatra.')}`}
              target="_blank" rel="noopener" aria-label="WhatsApp"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 15.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/>
              </svg>
            </a>
          </span>
        </div>
      </div>

      {/* ── Nav ── */}
      <header className="nav">
        <div className="wrap nav-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <a href="#top" className="logo">
            <img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Saathi" style={{ height: '64px', width: 'auto', display: 'block' }} />
          </a>
          <nav className={`nav-links${navOpen ? ' open' : ''}`} id="navLinks">
            <a href="#services" onClick={() => setNavOpen(false)}>Services</a>
            <a href="/tour-packages" onClick={() => setNavOpen(false)}>Packages</a>
            <a href="/cab" onClick={() => setNavOpen(false)}>Cab</a>
            <a href="/boat-rides" onClick={() => setNavOpen(false)}>Boating</a>
            <a href="/sightseeing" onClick={() => setNavOpen(false)}>Sightseeing</a>
            <a href="/about" onClick={() => setNavOpen(false)}>About</a>
            <a href="/travel-itinerary" className="nav-itin" onClick={() => setNavOpen(false)}>
              Download Custom Itinerary
            </a>
          </nav>
          <a href="/travel-itinerary" className="btn line dl-itin">
            <span>Download Custom<br />Itinerary</span>
          </a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Namaste! I want to plan a Kashi yatra.')}`} target="_blank" rel="noopener" className="btn">Plan my yatra</a>
          <button className="menu-btn" aria-label="Menu" onClick={() => setNavOpen(v => !v)}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18"/>
            </svg>
          </button>
        </div>
      </header>

      {/* ── Toran ── */}
      <div className="toran" aria-hidden="true">
        {Array.from({ length: toranCount }, (_, i) => <i key={i} />)}
      </div>

      <main id="top">

        {/* ── Hero ── */}
        <section className="hero">
          <svg className="mandala" viewBox="-100 -100 200 200" aria-hidden="true"><use href="#mandala" /></svg>
          <div className="wrap hero-grid">
            <div>
              <span className="namaste">नमस्ते, यात्री —</span>
              <h1>Kashi, with someone who <em>knows the way</em>.</h1>
              <p className="lead">
                We&apos;re a local team from Varanasi. We arrange your{' '}
                <span className="brush">tour, cab, boat and stay</span> so your time here
                goes to darshan, the ghats and the Ganga.
              </p>
              <div className="hero-meta">
                <span className="chip">
                  <i><svg viewBox="0 0 40 40"><use href="#i-sun" /></svg></i>
                  Ganga Aarti today: <b>{aartiTime}</b>
                </span>
                <span className="chip">
                  <i><svg viewBox="0 0 40 40"><use href="#i-lang" /></svg></i>
                  Hindi &amp; English guides
                </span>
              </div>
              <div className="services">
                {SVCS.map(({ key, icon, label, sub }) => (
                  <button
                    key={key}
                    className={`svc${activeSvc === key ? ' active' : ''}`}
                    onClick={() => { setActiveSvc(key); dispatchPick(key) }}
                  >
                    <span className="ic"><svg viewBox="0 0 40 40"><use href={icon} /></svg></span>
                    <b>{label}</b>
                    <small>{sub}</small>
                  </button>
                ))}
              </div>
            </div>
            <div className="visual">
              <div className="dots-bg" />
              <div className="arch">
                <svg className="outline" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 125V42C0 30 8 22 18 17 30 11 42 8 50 0c8 8 20 11 32 17 10 5 18 13 18 25v83" fill="none" stroke="#e8701a" vectorEffect="non-scaling-stroke" style={{ strokeWidth: '1.5px' }} />
                </svg>
                <div className="frame ph">
                  <img src={U('1561359313-0639aad49ca6', 1100)} alt="Boats on the Ganga before the stone ghats and temples of Varanasi" />
                </div>
              </div>
              <svg className="stamp" viewBox="0 0 120 120" aria-hidden="true">
                <defs><path id="circ1" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" /></defs>
                <circle cx="60" cy="60" r="58" fill="#e8701a" />
                <text fontFamily="Mukta" fontSize="10.5" fontWeight="600" letterSpacing="2.2" fill="#fdf4de">
                  <textPath href="#circ1">LOCAL · TRUSTED · KASHI · VARANASI ·</textPath>
                </text>
                <use href="#mark" x="36" y="36" width="48" height="48" />
              </svg>
              <div className="round">
                <div className="in ph">
                  <img src={U('1627894483216-2138af692e32', 500)} alt="Priests in saffron robes performing the Ganga Aarti" />
                </div>
              </div>
              <div className="float f1">
                <span className="ic"><svg viewBox="0 0 40 40"><use href="#i-train" /></svg></span>
                <div><b>Station pickup</b><small>Varanasi Jn &amp; Airport</small></div>
              </div>
              <div className="float f2">
                <span className="ic"><svg viewBox="0 0 40 40"><use href="#i-boat" /></svg></span>
                <div><b>Sunrise boat</b><small>From 5:30 AM</small></div>
              </div>
              <div className="float f3">
                <span className="ic"><svg viewBox="0 0 40 40"><use href="#i-guide" /></svg></span>
                <div><b>Local guides</b><small>Born in Kashi</small></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Booking Panel ── */}
        <div className="wrap booking" id="book">
          <div className="panel reveal">
            <div className="panel-top">
              <h2>
                <svg viewBox="0 0 40 40"><use href="#i-plan" /></svg>
                <span>{cfg.title}</span>
              </h2>
              <div className="tabs">
                {Object.keys(SERVICES).map((key) => (
                  <button
                    key={key}
                    className={current === key ? 'active' : ''}
                    onClick={() => { setCurrent(key); setShowSuccess(false) }}
                  >
                    <svg viewBox="0 0 40 40"><use href={TAB_ICONS[key]} /></svg>
                    {TAB_LABELS[key]}
                  </button>
                ))}
              </div>
            </div>

            {!showSuccess && (
              <form ref={formRef} noValidate onSubmit={handleSubmit}>
                <div className="dyn">
                  {cfg.fields.map((f, i) => {
                    const id = `d${i}`
                    return (
                      <div key={`${current}-${i}`} className={f.w === 2 ? 'w2' : ''}>
                        <label htmlFor={id}>{f.id}{f.req && <span className="r"> *</span>}</label>
                        {f.type === 'select' ? (
                          <select id={id} name={f.id} required={!!f.req}>
                            {f.options.map((opt) => <option key={opt}>{opt}</option>)}
                          </select>
                        ) : (
                          <input
                            id={id}
                            name={f.id}
                            type={f.type}
                            required={!!f.req}
                            min={f.min}
                            defaultValue={f.value}
                            {...(f.type === 'date' ? { min: today } : {})}
                            placeholder={f.ph}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
                <div>
                  <label htmlFor="f_name">Your name <span className="r">*</span></label>
                  <input id="f_name" name="Name" required autoComplete="name" placeholder="Full name" />
                </div>
                <div>
                  <label htmlFor="f_phone">Phone / WhatsApp <span className="r">*</span></label>
                  <input id="f_phone" name="Phone" type="tel" required pattern="[0-9+\s\-]{10,15}" autoComplete="tel" placeholder="+91" />
                </div>
                <div className="w2">
                  <label htmlFor="f_msg">Anything else?</label>
                  <textarea id="f_msg" name="Message" placeholder="Elders travelling, special puja, food preferences…" />
                </div>
                <div className="w4 form-foot">
                  <button type="submit" className="btn">Send enquiry</button>
                  <small>Free. No payment now. We reply within a few hours.</small>
                </div>
              </form>
            )}

            {showSuccess && (
              <div className="success show" role="status">
                <div>
                  <h3><span className="hand">Dhanyavaad!</span> Your enquiry is ready.</h3>
                  <p style={{ color: 'var(--ink-soft)' }}>Send it to us on WhatsApp and we&apos;ll reply with a plan and price.</p>
                  <pre>{summary}</pre>
                </div>
                <div className="acts">
                  <a className="btn wa" href={waLink} target="_blank" rel="noopener">Send on WhatsApp</a>
                  <button className="btn line" onClick={handleNewEnq} type="button">New enquiry</button>
                </div>
              </div>
            )}
          </div>

          <div className="trust reveal d1">
            <div><svg viewBox="0 0 40 40"><use href="#i-guide" /></svg><span><b>Local guides</b>Born &amp; raised in Kashi</span></div>
            <div><svg viewBox="0 0 40 40"><use href="#i-shield" /></svg><span><b>Verified drivers</b>Clean, well-kept cars</span></div>
            <div><svg viewBox="0 0 40 40"><use href="#i-rupee" /></svg><span><b>Clear pricing</b>No hidden charges</span></div>
            <div><svg viewBox="0 0 40 40"><use href="#i-phone" /></svg><span><b>On-call help</b>Through your whole trip</span></div>
            <div><svg viewBox="0 0 40 40"><use href="#i-lang" /></svg><span><b>Hindi · English</b>Bengali on request</span></div>
          </div>
        </div>

        {/* ── Ribbon ── */}
        <div className="ribbon-wrap">
          <div className="ribbon" aria-hidden="true">
            <div className="row">
              {ribbonItems}
              {ribbonItems.map((item) => cloneElement(item, { key: `dup-${item.key}` }))}
            </div>
          </div>
        </div>

        {/* ── Services ── */}
        <section id="services">
          <svg className="watermark" style={{ left: '-200px', top: '60px' }} viewBox="-100 -100 200 200" aria-hidden="true">
            <use href="#mandala" />
          </svg>
          <div className="wrap">
            <div className="center reveal" style={{ marginBottom: '46px' }}>
              <span className="eyebrow">What we arrange</span>
              <h2 className="sec-title">Four services, <em>one saathi</em></h2>
              <p className="sec-lead">Book one service or all four. Either way, one person from our team looks after your trip.</p>
              <div className="lotus-div" style={{ marginTop: '18px' }}>
                <svg viewBox="0 0 60 36"><use href="#lotus" /></svg>
              </div>
            </div>
            <div className="svc-grid">
              {SVC_CARDS.map(({ svc, page, img, alt, icon, title, hi, desc, tags, cta }, idx) => (
                <article key={svc} className={`scard reveal${idx % 2 === 1 ? ' d1' : ''}`}>
                  <div className="ph">
                    <img src={U(img, 700)} alt={alt} loading="lazy" />
                    <span className="num"><svg viewBox="0 0 40 40"><use href={icon} /></svg></span>
                  </div>
                  <div className="body">
                    <h3>{title}</h3>
                    <span className="hi">{hi}</span>
                    <p>{desc}</p>
                    <div className="tags">{tags.map(t => <span key={t}>{t}</span>)}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                      <button className="go" onClick={() => dispatchPick(svc)}>{cta}</button>
                      <a href={page} style={{ fontSize: '.85rem', color: 'var(--saffron-deep)', textDecoration: 'underline' }}>See details</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" className="alt">
          <div className="wrap about">
            <div className="collage reveal">
              {COLLAGE.map(({ id, cap, alt }) => (
                <figure key={id} className="ph">
                  <img src={U(id, 700)} alt={alt} loading="lazy" />
                  <figcaption>{cap}</figcaption>
                </figure>
              ))}
              <div className="badge">
                <div>
                  <b className="hi">यात्रा के<br />साथी</b>
                  <small>Kashi · Varanasi</small>
                </div>
              </div>
            </div>
            <div className="reveal d1">
              <span className="eyebrow">About Yatra Ke Saathi</span>
              <h2 className="sec-title">Born in these <em>galis</em>.</h2>
              <p>We grew up between the ghats and the temples. For years, friends and relatives visiting Kashi called us to arrange a cab, a good room and a boatman they could trust. Yatra Ke Saathi grew out of those calls.</p>
              <p className="pull">&ldquo;Treat every yatri the way you&apos;d treat family visiting from home.&rdquo;</p>
              <p>From your pickup at the station to the last diya you float on the Ganga, one person looks after your trip from start to finish.</p>
              <div className="stats">
                <div><b data-count="84">84</b><span>ghats we know by heart</span></div>
                <div><b data-count="4">4</b><span>services, one team</span></div>
                <div><b>24×7</b><span>help on call</span></div>
              </div>
              <a href="/about" style={{ display: 'inline-block', marginTop: '20px', fontSize: '.9rem', color: 'var(--saffron-deep)', textDecoration: 'underline' }}>Learn more about us →</a>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta">
          <div className="wrap">
            <div className="txt reveal">
              <div className="hi">एक कॉल, पूरी यात्रा।</div>
              <p>One call and we take care of the station pickup, a room near the ghats, the boat for aarti and a guide for darshan.</p>
              <div className="acts">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Namaste! I want to plan a Kashi yatra.')}`} target="_blank" rel="noopener" className="btn">Plan my yatra</a>
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="btn line">Call us</a>
              </div>
            </div>
            <div className="pic ph">
              <img src={U('1706186839147-0d708602587b', 1000)} alt="Boats on the Ganga" loading="lazy" />
            </div>
          </div>
        </section>

        {/* ── Packages ── */}
        <section id="packages">
          <div className="wrap">
            <div className="sec-head reveal">
              <div>
                <span className="eyebrow">Popular yatras</span>
                <h2 className="sec-title">Tour <em>packages</em></h2>
                <p className="sec-lead">Cab, boat, stay and a local guide are included, and every package can be changed to suit you.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                <button className="btn line" onClick={() => dispatchPick('tour', 'Custom package')}>
                  Build a custom trip
                </button>
                <a href="/tour-packages" style={{ fontSize: '.88rem', color: 'var(--saffron-deep)', textDecoration: 'underline' }}>See all packages →</a>
              </div>
            </div>
            <div className="pkgs">
              {PACKAGES.map(({ days, title, img, imgAlt, price, features, pkg, popular }, idx) => (
                <article key={pkg} className={`pkg reveal${idx > 0 ? ` d${Math.min(idx, 3)}` : ''}`}>
                  <div className="img ph">
                    <img src={U(img, 700)} alt={imgAlt} loading="lazy" />
                    <span className="days">{days}</span>
                    {popular && <span className="pop">Most loved</span>}
                  </div>
                  <div className="body">
                    <h3>{title}</h3>
                    <ul>{features.map(f => <li key={f}>{f}</li>)}</ul>
                    <div className="row">
                      <span className="price">{price} <small>/ person</small></span>
                      <button onClick={() => dispatchPick('tour', pkg)}>Enquire</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="alt">
          <div className="wrap">
            <div className="center reveal" style={{ marginBottom: '50px' }}>
              <span className="eyebrow">Simple as 1, 2, 3</span>
              <h2 className="sec-title">How your <em>yatra</em> comes together</h2>
            </div>
            <div className="steps">
              <div className="step reveal">
                <div className="circ">
                  <svg viewBox="0 0 40 40"><use href="#i-chat" /></svg>
                  <span>1</span>
                </div>
                <h3>Tell us your plan</h3>
                <p>Fill in the form or send a WhatsApp message with your dates, group size and what you&apos;d like to see.</p>
              </div>
              <div className="step reveal d1">
                <div className="circ">
                  <svg viewBox="0 0 40 40"><use href="#i-plan" /></svg>
                  <span>2</span>
                </div>
                <h3>Get a clear quote</h3>
                <p>We send a day-by-day plan with one all-inclusive price. Change anything you like.</p>
              </div>
              <div className="step reveal d2">
                <div className="circ">
                  <svg viewBox="0 0 40 40"><use href="#i-temple" /></svg>
                  <span>3</span>
                </div>
                <h3>Arrive &amp; relax</h3>
                <p>We meet you at the station or airport. From there, just follow your saathi.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Ghats ── */}
        <section id="ghats">
          <div className="wrap">
            <div className="sec-head reveal">
              <div>
                <span className="eyebrow">South to north, along the Ganga</span>
                <h2 className="sec-title">Ghats we&apos;ll <em>walk you through</em></h2>
              </div>
              <p className="sec-lead">There are 84 ghats in all. These are the eight most people ask us about.</p>
            </div>
            <div className="pano ph reveal">
              <img src={U('1561361058-c24cecae35ca', 1600)} alt="Boats moored at the stone steps of the Varanasi riverfront" loading="lazy" />
              <div className="txt">
                <div className="hi">घाट</div>
                <small>84 ghats along the crescent of the Ganga</small>
              </div>
            </div>
            <div className="ghats reveal">
              {GHATS.map(([name, hindi, desc], i) => (
                <div key={name} className="ghat">
                  <span className="n">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{name}</h3>
                  <div className="hi">{hindi}</div>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Festivals ── */}
        <section className="alt">
          <div className="wrap">
            <div className="sec-head reveal">
              <div>
                <span className="eyebrow">Kashi celebrates</span>
                <h2 className="sec-title">Plan around the <em>festivals</em></h2>
              </div>
              <p className="sec-lead">Kashi is at its most alive on these days. Rooms and boats fill up early, so plan ahead.</p>
            </div>
            <div className="fests">
              {FESTIVALS.map(({ month, title, hindi, desc, img, imgAlt }, idx) => (
                <div key={title} className={`fest ph reveal${idx > 0 ? ` d${Math.min(idx, 3)}` : ''}`}>
                  <img src={U(img, 600)} alt={imgAlt} loading="lazy" />
                  <div className="c">
                    <span className="m">{month}</span>
                    <h3>{title}</h3>
                    <div className="hi">{hindi}</div>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="fnote">Festival dates follow the Hindu lunar calendar and change every year. Ask us for this year&apos;s dates.</p>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section id="stories">
          <svg className="watermark" style={{ right: '-220px', top: '40px' }} viewBox="-100 -100 200 200" aria-hidden="true">
            <use href="#mandala" />
          </svg>
          <div className="wrap">
            <div className="sec-head reveal">
              <div>
                <span className="eyebrow">Yatri stories</span>
                <h2 className="sec-title">Words from our <em>yatris</em></h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                <div className="t-nav">
                  <button aria-label="Previous" onClick={() => { goT(tIdxRef.current - 1); startAuto() }}>←</button>
                  <button aria-label="Next" onClick={() => { goT(tIdxRef.current + 1); startAuto() }}>→</button>
                </div>
                <a href="/testimonials" style={{ fontSize: '.88rem', color: 'var(--saffron-deep)', textDecoration: 'underline' }}>See all reviews →</a>
              </div>
            </div>
            <div className="reveal d1" style={{ overflow: 'hidden', padding: '16px 4px 10px' }}>
              <div className="t-track" ref={trackRef} onTouchStart={handleTTouchStart} onTouchEnd={handleTTouchEnd}>
                {TESTIMONIALS.map((t, i) => (
                  <div key={i} className="t-card">
                      <div className="q">&ldquo;</div>
                    <div className="stars">★★★★★</div>
                    <blockquote>{t.text}</blockquote>
                    <div className="who">
                      <div className="av">{t.name[0]}</div>
                      <div><b>{t.name}</b><span>{t.trip}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Gallery ── */}
        <section className="alt" style={{ paddingTop: '80px' }}>
          <div className="wrap">
            <div className="center reveal" style={{ marginBottom: '36px' }}>
              <span className="eyebrow">From the ghats</span>
              <h2 className="sec-title">Moments of <em>Kashi</em></h2>
            </div>
            <div className="gallery reveal">
              {GALLERY_PHOTOS.map(([id, cap]) => (
                <figure key={id} className="ph" data-cap={cap} onClick={() => setLightboxSrc(U(id, 1600))}>
                  <img src={U(id, 700)} alt={cap} loading="lazy" />
                </figure>
              ))}
            </div>
          </div>
          {lightboxSrc && (
            <div
              className="lightbox open"
              onClick={() => setLightboxSrc(null)}
              onKeyDown={(e) => e.key === 'Escape' && setLightboxSrc(null)}
              role="dialog"
              aria-modal="true"
            >
              <img src={lightboxSrc} alt="Enlarged photo" />
            </div>
          )}
        </section>

        {/* ── Company / T&C ── */}
        <section id="company">
          <div className="wrap company">
            <div className="reveal">
              <span className="eyebrow">The company</span>
              <h2 className="sec-title">Yatra Ke Saathi</h2>
              <p style={{ color: 'var(--ink-soft)' }}>A Varanasi-based travel company offering tour packages, cab services, Ganga boat rides and hotel bookings.</p>
              <ul className="info">
                <li>
                  <svg viewBox="0 0 40 40"><use href="#i-pin" /></svg>
                  <div><b>Office</b>near Dashashwamedh Ghat, Varanasi, UP</div>
                </li>
                <li>
                  <svg viewBox="0 0 40 40"><use href="#i-phone" /></svg>
                  <div><b>Phone / WhatsApp</b>+91 92774 72279</div>
                </li>
                <li>
                  <svg viewBox="0 0 40 40"><use href="#i-mail" /></svg>
                  <div><b>Email</b>info@yatraksathi.com</div>
                </li>
                <li>
                  <svg viewBox="0 0 40 40"><use href="#i-clock" /></svg>
                  <div><b>Hours</b>Every day, 5:30 AM – 10:00 PM</div>
                </li>
                <li>
                  <svg viewBox="0 0 40 40"><use href="#i-doc" /></svg>
                  <div><b>GSTIN</b>—</div>
                </li>
              </ul>
            </div>
            <div className="reveal d1">
              <span className="eyebrow">Terms &amp; conditions</span>
              <h2 className="sec-title" style={{ fontSize: '2rem' }}>Before you book</h2>
              <details open>
                <summary>Booking &amp; payment</summary>
                <ul>
                  <li>A booking is confirmed after an advance payment (e.g. 25%).</li>
                  <li>The balance is due before the service begins.</li>
                  <li>We accept UPI, bank transfer and cash.</li>
                </ul>
              </details>
              <details>
                <summary>Cancellation &amp; refunds</summary>
                <ul>
                  <li>Full refund for cancellations 72+ hours before the trip.</li>
                  <li>50% refund for 24–72 hours before.</li>
                  <li>No refund within 24 hours or for no-shows.</li>
                </ul>
              </details>
              <details>
                <summary>Cabs, boats &amp; hotels</summary>
                <ul>
                  <li>Tolls and state tax are extra unless stated.</li>
                  <li>Boats may pause during floods or safety orders.</li>
                  <li>Hotel check-in times follow each property&apos;s policy.</li>
                </ul>
              </details>
              <details>
                <summary>Temple &amp; ghat etiquette</summary>
                <ul>
                  <li>Please dress modestly for temple visits.</li>
                  <li>Photography is not allowed inside some temples or at cremation ghats.</li>
                </ul>
              </details>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer strip ── */}
      <div className="foot-strip" aria-hidden="true">
        {STRIP_PHOTOS.map(([id, cap]) => (
          <div key={id} className="ph">
            <img src={U(id, 400)} alt={cap} loading="lazy" />
          </div>
        ))}
      </div>

      {/* ── Footer ── */}
      <footer>
        <div className="big-hi" aria-hidden="true">काशी</div>
        <div className="wrap">
          <div className="foot">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <a href="#top" className="logo" style={{ marginBottom: '14px' }}>
                <img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Saathi" style={{ height: '60px', width: 'auto', display: 'block' }} />
              </a>
              <p style={{ fontSize: '.95rem', maxWidth: '22rem', color: '#cdb892' }}>
                Tours, cabs, boats and hotels in Kashi, arranged by people who live here.
              </p>
            </div>
            <div>
              <h4>Services</h4>
              <ul>
                <li><a href="#book" onClick={(e) => { e.preventDefault(); dispatchPick('tour') }}>Tour packages</a></li>
                <li><a href="#book" onClick={(e) => { e.preventDefault(); dispatchPick('cab') }}>Cab booking</a></li>
                <li><a href="#book" onClick={(e) => { e.preventDefault(); dispatchPick('boat') }}>Boat rides</a></li>
                <li><a href="#book" onClick={(e) => { e.preventDefault(); dispatchPick('hotel') }}>Hotels</a></li>
              </ul>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                <li><a href="/about">About us</a></li>
                <li><a href="/sightseeing">Sightseeing</a></li>
                <li><a href="/testimonials">Yatri stories</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4>Legal</h4>
              <ul>
                <li><a href="/legal/privacy-policy">Privacy Policy</a></li>
                <li><a href="/legal/terms-and-conditions">Terms &amp; Conditions</a></li>
                <li><a href="/legal/cancellation-policy">Cancellation Policy</a></li>
                <li><a href="/legal/disclaimer">Disclaimer</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li>Varanasi, Uttar Pradesh</li>
                <li>+91 92774 72279</li>
                <li>info@yatraksathi.com</li>
              </ul>
            </div>
          </div>
          <div className="copy">
            <span>© {new Date().getFullYear()} Yatra Ke Saathi</span>
            <span>Varanasi, Uttar Pradesh</span>
          </div>
        </div>
      </footer>

      {/* ── FAB ── */}
      <a
        className="fab"
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Namaste! I want to plan a Kashi yatra.')}`}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 32 32" fill="#fff">
          <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm0 23c-2 0-3.9-.6-5.5-1.6l-.4-.2-4.1 1.3 1.3-4-.3-.4c-1.1-1.7-1.7-3.6-1.7-5.6C5.3 9.8 10.1 5 16 5s10.7 4.8 10.7 10.6S21.9 26 16 26zm5.9-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/>
        </svg>
      </a>
    </>
  )
}


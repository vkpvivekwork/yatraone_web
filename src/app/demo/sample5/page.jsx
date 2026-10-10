'use client'
import { useEffect } from 'react'
import './page.css'

const WA = '910000000000'
const U  = (id, w = 800) => `https://images.unsplash.com/photo-${id}?w=${w}&q=78&auto=format&fit=crop`

const DHAMS = [
  { name: 'Kashi',      hi: 'काशी · वाराणसी',   best: 'Oct – Mar', img: '1561359313-0639aad49ca6', text: "The eternal city of Shiva — Kashi Vishwanath, 84 ghats and the grand Ganga Aarti." },
  { name: 'Ayodhya',    hi: 'अयोध्या',           best: 'Oct – Mar', img: '1672398760212-08ce34b88c62', text: "Birthplace of Shri Ram — Ram Janmabhoomi, Hanuman Garhi and the Saryu aarti." },
  { name: 'Prayagraj',  hi: 'प्रयागराज',         best: 'Jan – Feb', img: '1742316963892-2b6fee25dfc5', text: "Triveni Sangam — where the Ganga, Yamuna and Saraswati meet. A holy dip by boat." },
  { name: 'Ujjain',     hi: 'उज्जैन',            best: 'Oct – Mar', img: '1658730487395-dcc99f5d997c', text: "Mahakaleshwar Jyotirlinga — the dawn Bhasma Aarti and the Kshipra ghats." },
  { name: 'Vrindavan',  hi: 'वृन्दावन · मथुरा',  best: 'Feb – Mar', img: '1742022165140-d890e51ae33b', text: "Banke Bihari, Prem Mandir and Govardhan — and a Holi like nowhere else on earth." },
  { name: 'Haridwar',   hi: 'हरिद्वार · ऋषिकेश', best: 'Sep – Apr', img: '1511754863001-18d44abd0a93', text: "Har Ki Pauri Ganga Aarti and the Himalayan gateway — with Rishikesh close by." },
]

const GALLERY = [
  { id: '1705952484283-19c31e37e0e4', cap: 'Ganga Aarti, Kashi' },
  { id: '1674358596018-5b768ca9cfd1', cap: 'Boat on the Ganga' },
  { id: '1571536802807-30451e3955d8', cap: 'Morning at the Ghats' },
  { id: '1635192592106-77a5aacbe1a3', cap: 'Dev Deepawali' },
  { id: '1627894483216-2138af692e32', cap: 'Temple & Diyas' },
]

const PACKAGES = [
  {
    name: 'Kashi Darshan',
    days: '1 Day',
    route: ['Kashi'],
    img: '1665413791167-6718dcf36773',
    text: 'Vishwanath darshan, sunrise boat on the Ganga and the evening aarti at Dashashwamedh Ghat.',
    price: '₹2,499',
    pkg: 'Kashi Darshan (1 Day)',
  },
  {
    name: 'Teerth Circuit',
    days: '5 Days',
    route: ['Kashi', 'Prayagraj', 'Ayodhya'],
    img: '1674358596018-5b768ca9cfd1',
    text: 'Three holy cities — Kashi darshan, a holy dip at the Sangam and Ram Janmabhoomi.',
    price: '₹18,999',
    pkg: 'Kashi–Prayagraj–Ayodhya (5 Days)',
  },
  {
    name: 'Mahakal Yatra',
    days: '3 Days',
    route: ['Ujjain', 'Omkareshwar'],
    img: '1658730458768-8b8cc0c00955',
    text: 'Mahakaleshwar darshan, Bhasma Aarti booking help, Kshipra ghats and Omkareshwar.',
    price: 'On request',
    pkg: 'Ujjain Mahakal & Omkareshwar (3 Days)',
  },
]

const SERVICES = [
  { icon: 'ico-tour',  name: 'Tour Packages',  desc: 'Guided darshan, aarti and heritage walks planned around temple timings.' },
  { icon: 'ico-cab',   name: 'Cab Service',    desc: 'Clean cars with drivers who know every temple road and ghat lane.' },
  { icon: 'ico-boat',  name: 'Boat Rides',     desc: 'Sunrise boats, Ganga aarti rides and Sangam dips on sacred rivers.' },
  { icon: 'ico-hotel', name: 'Hotels & Stays', desc: 'Curated stays near the temples — simple to river-view, budget to premium.' },
]

export default function Sample5() {
  useEffect(() => {
    const $ = s => document.querySelector(s)
    const $$ = s => document.querySelectorAll(s)

    // Hero zoom-in on load
    const hero = $('.hero')
    if (hero) requestAnimationFrame(() => hero.classList.add('loaded'))

    // Year
    const yr = $('#yr')
    if (yr) yr.textContent = new Date().getFullYear()

    // Nav
    $('#menuBtn')?.addEventListener('click', () => $('#navLinks')?.classList.toggle('open'))
    $$('#navLinks a').forEach(a => a.addEventListener('click', () => $('#navLinks')?.classList.remove('open')))

    // WhatsApp FAB
    const fab = $('#waFab')
    if (fab) fab.href = `https://wa.me/${WA}?text=${encodeURIComponent('Namaste! I want to plan a teerth yatra.')}`

    // Enquiry form
    $('#enquiryForm')?.addEventListener('submit', e => {
      e.preventDefault()
      const d = new FormData(e.target)
      const msg = [
        'Namaste Yatra Ke Saathi 🙏',
        '— Yatra Enquiry —',
        `Name: ${d.get('name')}`,
        `Phone: ${d.get('phone')}`,
        `Dham: ${d.get('dham') || '—'}`,
        `Service: ${d.get('service') || '—'}`,
        `Travel date: ${d.get('date') || 'Flexible'}`,
        `Yatris: ${d.get('pax') || '—'}`,
        `Message: ${d.get('msg') || '—'}`,
      ].join('\n')
      window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank')
    })

    // Package enquire
    $$('.pkg-cta').forEach(btn => btn.addEventListener('click', () => {
      const msg = `Namaste Yatra Ke Saathi 🙏\nI am interested in: ${btn.dataset.pkg}`
      window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank')
    }))

    // Scroll reveal
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target) } })
    }, { threshold: 0.1 })
    $$('.fi').forEach(el => io.observe(el))

    return () => io.disconnect()
  }, [])

  return (
    <>
      {/* ── SVG defs ── */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <symbol id="ico-kalash" viewBox="0 0 40 40">
            <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 16h12"/><path d="M13 16c-5 4-6 11-2 15 3 4 15 4 18 0 4-4 3-11-2-15"/>
              <path d="M16 16c0-3 1.5-5 4-6 2.5 1 4 3 4 6"/>
              <path d="M11 9c3 1 6 .5 9-3 3 3.5 6 4 9 3"/>
              <circle cx="20" cy="4" r="1.5"/><path d="M13 24h14"/>
            </g>
          </symbol>
          <symbol id="ico-tour" viewBox="0 0 40 40">
            <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 3v4M20 7l5 2-5 2M10 36V22c0-6 4-10 10-15 6 5 10 9 10 15v14M6 36h28M17 36v-6a3 3 0 0 1 6 0v6M14 22h12"/>
            </g>
          </symbol>
          <symbol id="ico-cab" viewBox="0 0 40 40">
            <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 27v-6c0-2 1.5-4 4-4h20c2.5 0 4 2 4 4v6zM10 17l3-6h14l3 6M16 8h8"/>
              <circle cx="12" cy="28" r="3.2"/><circle cx="28" cy="28" r="3.2"/>
            </g>
          </symbol>
          <symbol id="ico-boat" viewBox="0 0 40 40">
            <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 23h34c-2.5 6-8 8.5-17 8.5S5.5 29 3 23zM20 23V8M20 8l7 13M20 8l-7 13M6 35q3-1.6 6 0t6 0 6 0 6 0 6 0"/>
            </g>
          </symbol>
          <symbol id="ico-hotel" viewBox="0 0 40 40">
            <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 35V16h26v19M4 16h32M20 5l9 7H11zM16.5 35v-6a3.5 3.5 0 0 1 7 0v6M11 21h4v4h-4zM25 21h4v4h-4z"/>
            </g>
          </symbol>
          <symbol id="ico-wa" viewBox="0 0 32 32">
            <path fill="currentColor" d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 16.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/>
          </symbol>
        </defs>
      </svg>

      {/* ── Topbar ── */}
      <div className="topbar">
        <div className="wrap">
          <span className="kalam" style={{ fontSize: '.92rem', opacity: .85 }}>॥ श्री गणेशाय नमः ॥</span>
          <span>
            <a href="tel:+910000000000">☎ +91 00000 00000</a>
            &nbsp;·&nbsp;
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener">WhatsApp</a>
          </span>
        </div>
      </div>

      {/* ── Nav ── */}
      <header className="site-nav">
        <div className="wrap nav-inner">
          <a href="#top" className="logo">
            <span className="logo-icon"><svg viewBox="0 0 40 40"><use href="#ico-kalash" /></svg></span>
            <span className="logo-text"><b>Yatra Ke Saathi</b><small>यात्रा के साथी · तीर्थ यात्रा</small></span>
          </a>
          <nav className="nav-links" id="navLinks">
            <a href="#services">Services</a>
            <a href="#dhams">Dhams</a>
            <a href="#packages">Packages</a>
            <a href="#enquire">Enquire</a>
          </nav>
          <a href="#enquire" className="btn btn-terra">Plan My Yatra</a>
          <button className="menu-btn" id="menuBtn" aria-label="Open menu">☰</button>
        </div>
      </header>

      <main id="top">

        {/* ══════════════ HERO ══════════════ */}
        <section className="hero">
          <img
            className="hero-bg"
            src={U('1561359313-0639aad49ca6', 1800)}
            alt="Varanasi Ghats at dawn"
            loading="eager"
          />
          <div className="hero-overlay" aria-hidden="true" />
          <div className="hero-bottom-fade" aria-hidden="true" />

          <div className="hero-content wrap">
            <p className="hero-mantra">॥ हर हर महादेव ॥ &nbsp; जय श्री राम ॥</p>
            <div className="orn" style={{ margin: '0 auto 14px', borderColor: 'rgba(201,154,61,.4)' }}>
              <span style={{ color: 'var(--gold)' }}>✦ तीर्थ यात्रा ✦</span>
            </div>
            <p className="hero-tagline kalam">यात्रा के साथी</p>
            <h1>Your Saathi for Every<br /><em>Teerth Yatra</em></h1>
            <p className="lead">
              Kashi, Ayodhya, Prayagraj, Ujjain and beyond — we plan the route, the cab, the boat, the stay and the darshan so your journey stays a spiritual one.
            </p>
            <div className="dham-pills">
              {DHAMS.map(d => <span key={d.name}>{d.name}</span>)}
            </div>
            <div className="hero-cta">
              <a href="#enquire" className="btn btn-terra">Plan My Yatra</a>
              <a href="#dhams" className="btn btn-ghost-c">Explore the Dhams</a>
            </div>
          </div>

          <div className="scroll-hint" aria-hidden="true">scroll</div>
        </section>

        {/* ══════════════ SERVICES ══════════════ */}
        <section className="section ivory-bg" id="services">
          <div className="wrap">
            <div className="section-head fi">
              <span className="hi-sub kalam">सेवाएं</span>
              <div className="orn"><span>✦ What We Arrange ✦</span></div>
              <h2>Four Services, <em>One Saathi</em></h2>
              <p>Book one or all four. One person from our team handles your entire yatra from pickup to last darshan.</p>
            </div>
            <div className="services-grid">
              {SERVICES.map((s, i) => (
                <div className={`svc-card fi fd${i}`} key={s.name}>
                  <span className="svc-icon"><svg viewBox="0 0 40 40"><use href={`#${s.icon}`} /></svg></span>
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ GALLERY ══════════════ */}
        <section className="section" style={{ paddingBottom: '0' }}>
          <div className="wrap">
            <div className="section-head fi">
              <span className="hi-sub kalam">दर्शन डायरी</span>
              <div className="orn"><span>✦ Darshan Diary ✦</span></div>
              <h2>Moments from the <em>Sacred Dhams</em></h2>
            </div>
            <div className="gallery fi">
              {GALLERY.map((g, i) => (
                <div className="gal-item" key={g.id}>
                  <img
                    src={U(g.id, i === 0 ? 900 : 500)}
                    alt={g.cap}
                    loading="lazy"
                    onError={e => e.currentTarget.closest('.gal-item')?.remove()}
                  />
                  <div className="overlay" aria-hidden="true" />
                  <span className="cap">{g.cap}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ SIX DHAMS ══════════════ */}
        <section className="section" id="dhams" style={{ paddingTop: '80px' }}>
          <div className="wrap">
            <div className="section-head fi">
              <span className="hi-sub kalam">छह धाम</span>
              <div className="orn"><span>✦ The Six Sacred Dhams ✦</span></div>
              <h2>The Dhams <em>We Know Best</em></h2>
              <p>Born in Kashi and working across all six, we have planned yatras here for over a decade.</p>
            </div>
            <div className="dhams-grid">
              {DHAMS.map((d, i) => (
                <div className={`dham-c fi fd${i % 3}`} key={d.name}>
                  <div className="arch-wrap">
                    <div className="arch-img">
                      <img src={U(d.img, 600)} alt={d.name} loading="lazy" onError={e => e.currentTarget.remove()} />
                      <span className="dham-num-badge">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                  </div>
                  <div className="dham-body">
                    <h3>{d.name}</h3>
                    <span className="hi kalam">{d.hi}</span>
                    <p>{d.text}</p>
                    <p className="best">Best time: <span>{d.best}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ BLESSING STRIP ══════════════ */}
        <div className="blessing" aria-hidden="true">
          <div className="blessing-inner">
            {[1, 2].map(k => (
              <span key={k}>
                <b>॥ हर हर महादेव ॥</b> &nbsp;&nbsp;✦&nbsp;&nbsp;
                जय श्री राम &nbsp;&nbsp;✦&nbsp;&nbsp;
                <b>॥ जय महाकाल ॥</b> &nbsp;&nbsp;✦&nbsp;&nbsp;
                राधे राधे &nbsp;&nbsp;✦&nbsp;&nbsp;
                <b>॥ गंगा मैया की जय ॥</b> &nbsp;&nbsp;✦&nbsp;&nbsp;
                जय बजरंग बली &nbsp;&nbsp;✦&nbsp;&nbsp;
                <b>॥ ओम नमः शिवाय ॥</b> &nbsp;&nbsp;✦&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* ══════════════ WHY US ══════════════ */}
        <section className="section dot-bg">
          <div className="wrap">
            <div className="section-head fi">
              <span className="hi-sub kalam">हमारे साथ क्यों</span>
              <div className="orn"><span>✦ Why Travel With Us ✦</span></div>
              <h2>A Family From <em>Kashi</em>, Not a Call Centre</h2>
            </div>
            <div className="why-grid">
              {[
                { n: '01', title: 'Local Roots in Kashi', text: 'We grew up between the ghats and temples. We know the boatmen, the pujaris and the best dharamshalas by name.' },
                { n: '02', title: 'One Point of Contact', text: 'From your first call to your last darshan, one person manages your entire yatra — no hand-offs, no confusion.' },
                { n: '03', title: '24×7 on WhatsApp', text: 'We are on call every day from 5:30 AM to 10 PM. If anything needs sorting on the road, we sort it.' },
              ].map((w, i) => (
                <div className={`why-card fi fd${i}`} key={w.n}>
                  <div className="why-num-ring">{w.n}</div>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ PACKAGES ══════════════ */}
        <section className="section ivory-bg" id="packages">
          <div className="wrap">
            <div className="section-head fi">
              <span className="hi-sub kalam">यात्रा पैकेज</span>
              <div className="orn"><span>✦ Popular Yatra Circuits ✦</span></div>
              <h2>Ready-Made <em>Teerth Circuits</em></h2>
              <p>Every package includes cab, boat, guided darshan and a stay. We can adjust any route to suit you.</p>
            </div>
            <div className="pkg-grid">
              {PACKAGES.map((p, i) => (
                <div className={`pkg-c fi fd${i}`} key={p.name}>
                  <div className="pkg-img">
                    <img src={U(p.img, 700)} alt={p.name} loading="lazy" onError={e => e.currentTarget.remove()} />
                    <div className="pkg-img-overlay" aria-hidden="true" />
                    <div className="pkg-img-meta">
                      <h3>{p.name}</h3>
                      <span className="pkg-days-badge">{p.days}</span>
                    </div>
                  </div>
                  <div className="pkg-body">
                    <div className="pkg-route">
                      {p.route.map((r, j) => (
                        <span key={r}>{r}{j < p.route.length - 1 && <i> → </i>}</span>
                      ))}
                    </div>
                    <p>{p.text}</p>
                  </div>
                  <div className="pkg-foot">
                    <span className="pkg-price">
                      {p.price}{p.price.startsWith('₹') && <small> / person</small>}
                    </span>
                    <button className="pkg-cta" data-pkg={p.pkg}>Enquire →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ ENQUIRY ══════════════ */}
        <section className="section lattice-bg" id="enquire">
          <div className="wrap enq-wrap">
            <div className="enq-info fi">
              <span className="hi-sub kalam">संपर्क करें</span>
              <div className="orn" style={{ margin: '0 0 18px', maxWidth: 'none', justifyContent: 'flex-start' }}>
                <span>✦ Plan Your Yatra ✦</span>
              </div>
              <h2>Tell Us About<br /><em>Your Yatra</em></h2>
              <p>
                Fill in the form and we will send you a day-by-day plan with one clear price.
                No advance payment to get a quote — we talk first.
              </p>
              <ul className="trust-list">
                <li>Free quote within 24 hours</li>
                <li>Cab, boat, stay and darshan in one plan</li>
                <li>Family team — not a booking platform</li>
                <li>Change dates, cities or services anytime</li>
                <li>We personally verify every hotel and boatman</li>
              </ul>
            </div>

            <div className="enq-form fi fd1">
              <h3>
                <svg viewBox="0 0 40 40" style={{ width: 22, height: 22 }}><use href="#ico-kalash" /></svg>
                Quick Enquiry
              </h3>
              <form id="enquiryForm" noValidate>
                <div className="form-grid">
                  <div>
                    <label htmlFor="eq-name">Your name *</label>
                    <input id="eq-name" name="name" required placeholder="Full name" autoComplete="name" />
                  </div>
                  <div>
                    <label htmlFor="eq-phone">Phone / WhatsApp *</label>
                    <input id="eq-phone" name="phone" type="tel" required placeholder="+91" autoComplete="tel" />
                  </div>
                  <div>
                    <label htmlFor="eq-dham">Dham to visit</label>
                    <select id="eq-dham" name="dham">
                      <option value="">— choose —</option>
                      {DHAMS.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                      <option value="Multiple / custom">Multiple / custom</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="eq-service">Service needed</label>
                    <select id="eq-service" name="service">
                      <option value="">— choose —</option>
                      <option>Full Tour Package</option>
                      <option>Cab only</option>
                      <option>Boat only</option>
                      <option>Hotel only</option>
                      <option>Everything (tour + cab + boat + hotel)</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="eq-date">Travel date</label>
                    <input id="eq-date" name="date" type="date" />
                  </div>
                  <div>
                    <label htmlFor="eq-pax">Number of yatris</label>
                    <select id="eq-pax" name="pax">
                      {['1', '2', '3–4', '5–6', '7–10', '10+'].map(v => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>
                  <div className="full">
                    <label htmlFor="eq-msg">Anything we should know?</label>
                    <textarea id="eq-msg" name="msg" placeholder="Special darshan, elders travelling, puja requests, wheelchair help…" />
                  </div>
                </div>
                <div className="form-submit">
                  <button type="submit" className="btn btn-wa" style={{ width: '100%', justifyContent: 'center' }}>
                    <svg viewBox="0 0 32 32" style={{ width: 20, height: 20 }}><use href="#ico-wa" /></svg>
                    Send Enquiry on WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <b>Yatra Ke Saathi</b>
              <small>यात्रा के साथी · तीर्थ यात्रा</small>
              <p>Teerth yatras with cabs, boats, stays and darshan — arranged by a family from the ghats of Kashi.</p>
              <div className="dhams-tags">
                {DHAMS.map(d => <span key={d.name}>{d.name}</span>)}
              </div>
            </div>
            <div>
              <h4>Services</h4>
              <ul>
                <li><a href="#services">Tour Packages</a></li>
                <li><a href="#services">Cab Booking</a></li>
                <li><a href="#services">Boat Rides</a></li>
                <li><a href="#services">Hotels &amp; Stays</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li>Near Dashashwamedh Ghat, Varanasi</li>
                <li><a href="tel:+910000000000">+91 00000 00000</a></li>
                <li><a href="mailto:hello@yatrakesaathi.com">hello@yatrakesaathi.com</a></li>
                <li>Every day · 5:30 AM – 10 PM</li>
              </ul>
            </div>
          </div>
          <div className="foot-copy">
            <span>© <span id="yr"></span> Yatra Ke Saathi · Varanasi</span>
            <span className="kalam" style={{ opacity: .5 }}>॥ शुभ यात्रा ॥</span>
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a id="waFab" href="#" target="_blank" rel="noopener" aria-label="Chat on WhatsApp" className="wa-fab">
        <svg viewBox="0 0 32 32"><use href="#ico-wa" /></svg>
      </a>
    </>
  )
}

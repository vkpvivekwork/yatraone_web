'use client'
import { useState } from 'react'
import { WHATSAPP_NUMBER } from '@/lib/constants'
import { ALL_PACKAGES_LIST } from '@/lib/packageData'

const TORAN_COUNT = 60

export default function PackagesIndexPage() {
  const [navOpen, setNavOpen] = useState(false)
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Namaste! I would like to know about your tour packages.')}`

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <symbol id="pi-mark" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="22" fill="#e8701a"/>
            <path d="M24 9c5 6 5 12 0 17-5-5-5-11 0-17z" fill="#fdf4de"/>
            <path d="M11 30h26c-2 6-7 9-13 9s-11-3-13-9z" fill="#fdf4de"/>
            <path d="M16 34h16" stroke="#e8701a" strokeWidth="1.6"/>
          </symbol>
          <symbol id="pi-lotus" viewBox="0 0 60 36">
            <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
              <path d="M30 4c5 6 5 16 0 24-5-8-5-18 0-24z"/>
              <path d="M30 28c-4-7-10-12-18-13 2 8 9 13 18 13z"/>
              <path d="M30 28c4-7 10-12 18-13-2 8-9 13-18 13z"/>
            </g>
          </symbol>
          <symbol id="pi-mandala" viewBox="-100 -100 200 200">
            <g fill="none" stroke="#c4520c" strokeWidth=".8">
              <circle r="98"/><circle r="70"/><circle r="46"/><circle r="22"/>
              <g id="pimp">
                <path d="M0-70C14-60 14-50 0-46-14-50-14-60 0-70z"/>
                <path d="M0-46C7-38 7-30 0-22-7-30-7-38 0-46z"/>
              </g>
              {[45,90,135,180,225,270,315].map(deg => (
                <use key={deg} href="#pimp" transform={`rotate(${deg})`}/>
              ))}
            </g>
          </symbol>
        </defs>
      </svg>

      {/* Topbar */}
      <div className="topbar">
        <div className="wrap">
          <span className="hi">हर हर महादेव · अतिथि देवो भव</span>
          <span><span className="hide-sm">Call or WhatsApp: </span><a href={`tel:+${WHATSAPP_NUMBER}`}>+91 00000 00000</a></span>
        </div>
      </div>

      {/* Nav */}
      <header className="nav">
        <div className="wrap nav-inner">
          <a href="/" className="logo">
            <svg className="mark" viewBox="0 0 48 48"><use href="#pi-mark" /></svg>
            <span><b>Yatra Ke Saathi</b><small>यात्रा के साथी</small></span>
          </a>
          <nav className={`nav-links${navOpen ? ' open' : ''}`}>
            <a href="/#services" onClick={() => setNavOpen(false)}>Services</a>
            <a href="/packages" onClick={() => setNavOpen(false)}>Packages</a>
            <a href="/#about" onClick={() => setNavOpen(false)}>About</a>
            <a href="/#ghats" onClick={() => setNavOpen(false)}>Ghats</a>
            <a href="/#stories" onClick={() => setNavOpen(false)}>Stories</a>
          </nav>
          <a href="/#book" className="btn">Plan my yatra</a>
          <button className="menu-btn" aria-label="Menu" onClick={() => setNavOpen(v => !v)}>☰</button>
        </div>
      </header>

      {/* Toran */}
      <div className="toran" aria-hidden="true">
        {Array.from({ length: TORAN_COUNT }, (_, i) => <i key={i} />)}
      </div>

      <main>
        {/* Hero */}
        <section style={{ padding: '64px 0 50px', background: 'linear-gradient(160deg,var(--paper-2) 55%,var(--paper-3))', position: 'relative', overflow: 'hidden' }}>
          <svg className="mandala" viewBox="-100 -100 200 200" aria-hidden="true" style={{ position: 'absolute', right: '-140px', top: '-100px', width: '500px', height: '500px', opacity: '.1', animation: 'turn 120s linear infinite', pointerEvents: 'none' }}>
            <use href="#pi-mandala" />
          </svg>
          <div className="wrap" style={{ position: 'relative', textAlign: 'center' }}>
            <span className="eyebrow">Yatra Ke Saathi</span>
            <h1 className="sec-title" style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', marginBottom: '14px' }}>
              All Tour <em>Packages</em>
            </h1>
            <p className="sec-lead" style={{ marginInline: 'auto', marginBottom: '10px' }}>
              8 handcrafted yatras covering Varanasi, Ayodhya, Prayagraj and Bodh Gaya. Each package includes private transport and local guide support.
            </p>
            <div className="lotus-div" style={{ marginTop: '20px', color: 'var(--saffron)' }}>
              <svg viewBox="0 0 60 36"><use href="#pi-lotus" /></svg>
            </div>
          </div>
        </section>

        {/* Packages grid */}
        <section style={{ padding: '70px 0 90px' }}>
          <div className="wrap">
            <div className="pkgs-idx-grid">
              {ALL_PACKAGES_LIST.map((p) => (
                <article key={p.id} className="pidx-card">
                  <div className="pib">
                    <span className="pkg-badge saf">{p.duration}</span>
                    {p.minGroup && <span className="pkg-badge ink">Group {p.minGroup}</span>}
                  </div>
                  <div className="body">
                    <h3>{p.title}</h3>
                    <div className="cities">{p.cities}</div>
                    <div className="sp">
                      {p.startingPrice
                        ? <>{p.startingPrice} <small>/ person starting</small></>
                        : <small style={{ fontFamily: 'Mukta', fontWeight: 400, fontSize: '.9rem', color: 'var(--ink-soft)' }}>Contact for pricing</small>
                      }
                    </div>
                    <a href={p.route} className="go-btn">View full itinerary →</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pkg-cta-sec">
          <div className="wrap">
            <div className="deva">यात्रा के साथी</div>
            <h2>Can&apos;t find the right package?</h2>
            <p>Tell us your dates, group size and the places you wish to visit. We will build a custom itinerary just for you — at no extra cost.</p>
            <a href={waLink} target="_blank" rel="noopener" className="pkg-wa-btn">
              <svg viewBox="0 0 32 32" fill="#fff" style={{ width: '22px', height: '22px' }}>
                <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm0 23c-2 0-3.9-.6-5.5-1.6l-.4-.2-4.1 1.3 1.3-4-.3-.4c-1.1-1.7-1.7-3.6-1.7-5.6C5.3 9.8 10.1 5 16 5s10.7 4.8 10.7 10.6S21.9 26 16 26zm5.9-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/>
              </svg>
              Plan a custom yatra
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
                <svg className="mark" viewBox="0 0 48 48" style={{ width: '42px', height: '42px' }}><use href="#pi-mark" /></svg>
                <span><b>Yatra Ke Saathi</b><small style={{ color: 'var(--marigold)' }}>यात्रा के साथी</small></span>
              </a>
              <p style={{ fontSize: '.95rem', maxWidth: '22rem', color: '#cdb892' }}>Tours, cabs, boats and hotels in Kashi, arranged by people who live here.</p>
            </div>
            <div>
              <h4>Services</h4>
              <ul>
                <li><a href="/#book">Tour packages</a></li>
                <li><a href="/#book">Cab booking</a></li>
                <li><a href="/#book">Boat rides</a></li>
                <li><a href="/#book">Hotels</a></li>
              </ul>
            </div>
            <div>
              <h4>Popular Packages</h4>
              <ul>
                <li><a href="/golden-triangle">Golden Triangle (5D)</a></li>
                <li><a href="/packages/divya-dham-yatra">Divya Dham Yatra (5D)</a></li>
                <li><a href="/packages/varanasi-ayodhya-3-day">Varanasi Ayodhya (3D)</a></li>
                <li><a href="/packages/varanasi-group-tour-itinerary">Group Tour</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li>Varanasi, Uttar Pradesh</li>
                <li>+91 00000 00000</li>
                <li>hello@yatrakesaathi.com</li>
              </ul>
            </div>
          </div>
          <div className="copy">
            <span>© {new Date().getFullYear()} Yatra Ke Saathi</span>
            <span>Photos: Unsplash</span>
          </div>
        </div>
      </footer>

      {/* FAB */}
      <a className="fab" href={waLink} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 32 32" fill="#fff">
          <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm0 23c-2 0-3.9-.6-5.5-1.6l-.4-.2-4.1 1.3 1.3-4-.3-.4c-1.1-1.7-1.7-3.6-1.7-5.6C5.3 9.8 10.1 5 16 5s10.7 4.8 10.7 10.6S21.9 26 16 26zm5.9-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/>
        </svg>
      </a>
    </>
  )
}

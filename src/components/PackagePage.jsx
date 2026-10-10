'use client'
import { useState } from 'react'
import { WHATSAPP_NUMBER, U } from '@/lib/constants'

const TORAN_COUNT = 60

function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <symbol id="pk-mark" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="22" fill="#e8701a"/>
          <path d="M24 9c5 6 5 12 0 17-5-5-5-11 0-17z" fill="#fdf4de"/>
          <path d="M11 30h26c-2 6-7 9-13 9s-11-3-13-9z" fill="#fdf4de"/>
          <path d="M16 34h16" stroke="#e8701a" strokeWidth="1.6"/>
        </symbol>
        <symbol id="pk-lotus" viewBox="0 0 60 36">
          <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
            <path d="M30 4c5 6 5 16 0 24-5-8-5-18 0-24z"/>
            <path d="M30 28c-4-7-10-12-18-13 2 8 9 13 18 13z"/>
            <path d="M30 28c4-7 10-12 18-13-2 8-9 13-18 13z"/>
            <path d="M30 28c-8-2-17-1-24 4 8 2 17 1 24-4z"/>
            <path d="M30 28c8-2 17-1 24 4-8 2-17 1-24-4z"/>
          </g>
        </symbol>
        <symbol id="pk-mandala" viewBox="-100 -100 200 200">
          <g fill="none" stroke="#c4520c" strokeWidth=".8">
            <circle r="98"/><circle r="92"/><circle r="70"/><circle r="46"/><circle r="22"/><circle r="8"/>
            <g id="pkmp">
              <path d="M0-92C10-82 10-74 0-70-10-74-10-82 0-92z"/>
              <path d="M0-70C14-60 14-50 0-46-14-50-14-60 0-70z"/>
              <path d="M0-46C7-38 7-30 0-22-7-30-7-38 0-46z"/>
              <circle cy="-81" r="2"/>
            </g>
            {[22.5,45,67.5,90,112.5,135,157.5,180,202.5,225,247.5,270,292.5,315,337.5].map(deg => (
              <use key={deg} href="#pkmp" transform={`rotate(${deg})`}/>
            ))}
          </g>
        </symbol>
        <symbol id="pk-wa" viewBox="0 0 32 32">
          <path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm0 23c-2 0-3.9-.6-5.5-1.6l-.4-.2-4.1 1.3 1.3-4-.3-.4c-1.1-1.7-1.7-3.6-1.7-5.6C5.3 9.8 10.1 5 16 5s10.7 4.8 10.7 10.6S21.9 26 16 26zm5.9-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/>
        </symbol>
      </defs>
    </svg>
  )
}

export default function PackagePage({ pkg }) {
  const [navOpen, setNavOpen] = useState(false)

  const waText = `Namaste! I am interested in the "${pkg.title}" package (${pkg.duration}). Please share the full itinerary and cost.`
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`

  return (
    <>
      <SvgDefs />

      {/* ── Topbar ── */}
      <div className="topbar">
        <div className="wrap">
          <span className="hi">हर हर महादेव · अतिथि देवो भव</span>
          <span>
            <span className="hide-sm">Call or WhatsApp: </span>
            <a href={`tel:+${WHATSAPP_NUMBER}`}>+91 00000 00000</a>
          </span>
        </div>
      </div>

      {/* ── Nav ── */}
      <header className="nav">
        <div className="wrap nav-inner">
          <a href="/" className="logo">
            <svg className="mark" viewBox="0 0 48 48"><use href="#pk-mark" /></svg>
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

      {/* ── Toran ── */}
      <div className="toran" aria-hidden="true">
        {Array.from({ length: TORAN_COUNT }, (_, i) => <i key={i} />)}
      </div>

      <main>

        {/* ── Hero ── */}
        <section className="pkg-hero">
          <svg className="mandala" viewBox="-100 -100 200 200" aria-hidden="true"><use href="#pk-mandala" /></svg>
          <div className="wrap">
            <nav className="pkg-breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span className="sep">›</span>
              <a href="/packages">Packages</a>
              <span className="sep">›</span>
              <span>{pkg.title}</span>
            </nav>
            <div className="pkg-hero-grid">
              <div>
                <div className="pkg-badges">
                  <span className="pkg-badge saf">{pkg.duration}</span>
                  {pkg.cities.map(c => <span key={c} className="pkg-badge out">{c}</span>)}
                  {pkg.minGroup && <span className="pkg-badge ink">Min {pkg.minGroup}</span>}
                </div>
                <h1>{pkg.title}</h1>
                <p className="tagline">{pkg.subtitle}</p>
                <div className="pkg-city-row">
                  {pkg.cities.map(c => (
                    <span key={c} className="pkg-city">{c}</span>
                  ))}
                </div>
              </div>
              {pkg.startingPrice ? (
                <div className="pkg-price-box">
                  <div className="from">Starting from</div>
                  <div className="amount">{pkg.startingPrice}</div>
                  <div className="per">per person</div>
                  <a href={waLink} target="_blank" rel="noopener" className="wa-cta">Enquire on WhatsApp</a>
                  <div className="note">Free · No payment now<br/>We reply within a few hours</div>
                </div>
              ) : (
                <div className="pkg-price-box">
                  <div className="from">Custom pricing</div>
                  <div className="amount" style={{ fontSize: '1.4rem', margin: '10px 0' }}>Contact us</div>
                  <div className="per">for group rates</div>
                  <a href={waLink} target="_blank" rel="noopener" className="wa-cta">WhatsApp us</a>
                  <div className="note">Free · No obligation<br/>Quick response guaranteed</div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Day-wise Itinerary ── */}
        <section className="itin-section">
          <div className="wrap">
            <div className="itin-section sec-eyebrow">Day-wise Itinerary</div>
            <h2 className="sec-title">Your <em>{pkg.days.length}-Day</em> Journey</h2>
            <p className="lead">{pkg.subtitle} — a carefully planned itinerary covering the most significant temples, ghats and sacred sites.</p>
            <div className="days-list">
              {pkg.days.map((d) => (
                <div key={d.day} className="day-row">
                  <div className="day-num">
                    <span className="n">{d.day.replace('Day ', '')}</span>
                    <span className="d">Day</span>
                  </div>
                  <div className="day-body">
                    {d.city && <div className="day-city-lbl">{d.city}</div>}
                    {d.title && <h3>{d.title}</h3>}
                    <ul className="day-acts">
                      {d.activities.map((a, i) => <li key={i}>{a}</li>)}
                    </ul>
                    {(d.stay || d.meals) && (
                      <div className="day-metas">
                        {d.stay && <span className="day-meta-tag"><b>Stay:</b> {d.stay}</span>}
                        {d.meals && <span className="day-meta-tag"><b>Meals:</b> {d.meals}</span>}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Day-wise temple breakdown for Package 3 */}
            {pkg.day1Temples && (
              <div style={{ marginTop: '40px' }}>
                <div className="tag-section">
                  <h2>Day 1 Temples</h2>
                  <div className="tag-cloud">
                    {pkg.day1Temples.map(t => <span key={t} className="tc-item hi">{t}</span>)}
                  </div>
                </div>
                <div className="tag-section">
                  <h2>Day 2 Temples</h2>
                  <div className="tag-cloud">
                    {pkg.day2Temples.map(t => <span key={t} className="tc-item hi">{t}</span>)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Temples Covered ── */}
        {pkg.temples && (
          <section style={{ paddingBottom: '0' }}>
            <div className="wrap">
              <div className="tag-section">
                <h2>Temples &amp; Sacred Sites Covered</h2>
                <div className="tag-cloud">
                  {pkg.temples.map(t => <span key={t} className="tc-item hi">{t}</span>)}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Activities ── */}
        {pkg.activities && (
          <section style={{ paddingTop: '0', paddingBottom: '56px' }}>
            <div className="wrap">
              <div className="tag-section">
                <h2>Experiences &amp; Activities</h2>
                <div className="tag-cloud">
                  {pkg.activities.map(a => <span key={a} className="tc-item">{a}</span>)}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Historical Sites (Package 3) ── */}
        {pkg.historicalSites && (
          <section className="alt" style={{ padding: '60px 0' }}>
            <div className="wrap">
              <div className="hist-section">
                <h2>Historical Sites — Day 3</h2>
                <table className="htable">
                  <thead>
                    <tr>
                      <th>Site</th>
                      <th>Significance</th>
                      <th>Distance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pkg.historicalSites.map(s => (
                      <tr key={s.site}>
                        <td className="site">{s.site}</td>
                        <td>{s.significance}</td>
                        <td className="dist">{s.distance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ── Pricing ── */}
        {pkg.pricing && (
          <section className="price-section">
            <div className="wrap">
              <span className="eyebrow">Transparent pricing</span>
              <h2 className="sec-title">Package <em>Pricing</em></h2>
              <p className="lead">Rates per person based on group size. All-inclusive of vehicle, driver & basic services.</p>
              <table className="ptable">
                <thead>
                  <tr>
                    <th>Group Size</th>
                    <th>Rate / Person</th>
                    {pkg.pricing[0].vehicle && <th>Vehicle</th>}
                  </tr>
                </thead>
                <tbody>
                  {pkg.pricing.map(r => (
                    <tr key={r.group}>
                      <td>{r.group}</td>
                      <td className="rate">{r.rate}</td>
                      {r.vehicle && <td className="veh">{r.vehicle}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ── Hotel Options (Package 4) ── */}
        {pkg.hotelOptions && (
          <section className="price-section">
            <div className="wrap">
              <span className="eyebrow">Where you stay</span>
              <h2 className="sec-title">Hotel <em>Options</em></h2>
              <p className="lead">Per person / per night. Choose what suits your comfort and budget.</p>
              <table className="ptable">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Rate / Night</th>
                    <th>Amenities</th>
                  </tr>
                </thead>
                <tbody>
                  {pkg.hotelOptions.map(h => (
                    <tr key={h.type}>
                      <td className="veh">{h.type}</td>
                      <td className="rate">{h.rate}</td>
                      <td>{h.amenities}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ── Vehicles by Group (Package 8) ── */}
        {pkg.vehicles && (
          <section className="price-section">
            <div className="wrap">
              <span className="eyebrow">Group transport</span>
              <h2 className="sec-title">Vehicles by <em>Group Size</em></h2>
              <p className="lead">We arrange the right vehicle for your group — all fully air-conditioned.</p>
              <table className="ptable">
                <thead>
                  <tr>
                    <th>Group Size</th>
                    <th>Vehicle</th>
                  </tr>
                </thead>
                <tbody>
                  {pkg.vehicles.map(v => (
                    <tr key={v.size}>
                      <td>{v.size}</td>
                      <td className="veh">{v.vehicle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ── Things To Do ── */}
        {pkg.thingsToDo && (
          <section className="todo-section">
            <div className="wrap">
              <span className="eyebrow">Experiences</span>
              <h2 className="sec-title">Things <em>To Do</em></h2>
              <div className="todo-grid">
                {pkg.thingsToDo.map(t => (
                  <div key={t} className="todo-item">{t}</div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Inclusions & Exclusions ── */}
        {(pkg.inclusions || pkg.exclusions) && (
          <section className="inc-exc-section">
            <div className="wrap">
              <span className="eyebrow">What&apos;s covered</span>
              <h2 className="sec-title">Inclusions &amp; <em>Exclusions</em></h2>
              <div className="inc-exc-grid">
                {pkg.inclusions && (
                  <div className="ie-card inc">
                    <h3>✓ &nbsp;What&apos;s Included</h3>
                    <ul>
                      {pkg.inclusions.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                )}
                {pkg.exclusions && (
                  <div className="ie-card exc">
                    <h3>✕ &nbsp;What&apos;s Not Included</h3>
                    <ul>
                      {pkg.exclusions.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="pkg-cta-sec">
          <div className="wrap">
            <div className="deva">यात्रा के साथी</div>
            <h2>Ready to plan your <em style={{ color: '#ffe0a0', fontStyle: 'italic' }}>{pkg.title}</em>?</h2>
            <p>Send us a WhatsApp message and our team will share a personalised itinerary and pricing within a few hours. No payment required now.</p>
            <a href={waLink} target="_blank" rel="noopener" className="pkg-wa-btn">
              <svg viewBox="0 0 32 32"><use href="#pk-wa" /></svg>
              Enquire on WhatsApp
            </a>
            <div className="pkg-cta-links">
              <a href="/#book">Use booking form</a>
              <a href={`tel:+${WHATSAPP_NUMBER}`}>Call us directly</a>
              <a href="/packages">View all packages</a>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer>
        <div className="big-hi" aria-hidden="true">काशी</div>
        <div className="wrap">
          <div className="foot">
            <div>
              <a href="/" className="logo" style={{ marginBottom: '14px' }}>
                <svg className="mark" viewBox="0 0 48 48" style={{ width: '42px', height: '42px' }}>
                  <use href="#pk-mark" />
                </svg>
                <span>
                  <b>Yatra Ke Saathi</b>
                  <small style={{ color: 'var(--marigold)' }}>यात्रा के साथी</small>
                </span>
              </a>
              <p style={{ fontSize: '.95rem', maxWidth: '22rem', color: '#cdb892' }}>
                Tours, cabs, boats and hotels in Kashi, arranged by people who live here.
              </p>
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
              <h4>Packages</h4>
              <ul>
                <li><a href="/packages">All packages</a></li>
                <li><a href="/golden-triangle">Golden Triangle</a></li>
                <li><a href="/packages/divya-dham-yatra">Divya Dham Yatra</a></li>
                <li><a href="/packages/varanasi-ayodhya-3-day">Varanasi Ayodhya</a></li>
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

      {/* ── FAB ── */}
      <a
        className="fab"
        href={waLink}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 32 32" fill="#fff">
          <use href="#pk-wa" />
        </svg>
      </a>
    </>
  )
}

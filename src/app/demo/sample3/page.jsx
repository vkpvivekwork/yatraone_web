'use client'
import { useState, useEffect } from 'react'
import './page.css'

/* ── data ── */
const EXPERIENCES = [
  { icon:'🛕', name:'Private Temple Darshan',      price:'From ₹4,500 / person', desc:'Skip-the-queue VIP access at Kashi Vishwanath, Banke Bihari and 40+ major temples with a dedicated priest.' },
  { icon:'🚣', name:'Dawn River Cruise',            price:'From ₹6,000 / boat',   desc:'Private wooden boat at the break of dawn — mist over the Ganga, chants drifting from the ghats, pure silence.' },
  { icon:'🔥', name:'Ganga Aarti Experience',       price:'From ₹3,500 / person', desc:'Front-row seats for the Dashashwamedh Ganga Aarti with a VIP pontoon boat and complimentary flowers.' },
  { icon:'🏛️', name:'Heritage Haveli Stay',          price:'From ₹12,000 / night', desc:'Handpicked heritage havelis and boutique guesthouses with ghat views, courtyard dining and curator service.' },
  { icon:'🪔', name:'Dev Deepawali Package',         price:'From ₹18,000 / person',desc:'The ultimate experience — 10 lakh diyas along 84 ghats on Kartik Purnima, viewed from a private boat.' },
  { icon:'🚁', name:'Kedarnath Helicopter Darshan', price:'From ₹28,000 / person',desc:'Comfortable helicopter to the high-altitude Kedarnath shrine — ideal for senior pilgrims and VIP groups.' },
]

const PACKAGES = [
  {
    tier:'Essence',
    name:'Kashi Darshan',
    icon:'🕉️',
    desc:'A focused 3-night introduction to Varanasi — aarti, ghats, Vishwanath temple and the old city lanes.',
    price:'₹28,000',
    unit:'per person',
    includes:['VIP Kashi Vishwanath darshan','Ganga aarti pontoon experience','Heritage guesthouse stay','Old city heritage walk','Daily sattvic breakfast'],
    featured:false,
    bg1:'#1a1a28',bg2:'#0a0a18',
  },
  {
    tier:'Signature',
    name:'Divya Yatra',
    icon:'🔱',
    desc:'7 nights across Kashi, Prayagraj and Ayodhya — the complete sacred triangle of Uttar Pradesh.',
    price:'₹68,000',
    unit:'per person',
    includes:['All temples & ghats covered','Private AC vehicle throughout','Boutique hotel in each city','Personal yatra guide','All pujas & samagri included','Airport & station transfers'],
    featured:true,
    bg1:'#1a0f28',bg2:'#0f0a1e',
  },
  {
    tier:'Prestige',
    name:'Char Dham Sanctuary',
    icon:'🏔️',
    desc:'The complete 14-night Char Dham circuit in total luxury — helicopter options, luxury camps, curated.',
    price:'₹1,85,000',
    unit:'per person',
    includes:['Helicopter to Kedarnath','Luxury tented camps','Dedicated spiritual guide','All four dham darshans','Gourmet sattvic cuisine','24×7 concierge support'],
    featured:false,
    bg1:'#0a1a10',bg2:'#060e08',
  },
]

const GHATS = [
  { icon:'🔥', name:'Dashashwamedh Ghat', type:'Aarti Ghat',    desc:'Home of the most spectacular Ganga Aarti — 11 priests, fire lamps and chants every evening at sunset. The spiritual heart of Kashi.' },
  { icon:'🪔', name:'Manikarnika Ghat',    type:'Moksha Ghat',  desc:'The eternal cremation ghat where fires have burned for millennia. A profound meditation on life, death and liberation.' },
  { icon:'🌅', name:'Assi Ghat',           type:'Sunrise Ghat', desc:'Southernmost ghat at the confluence — the ideal spot for morning yoga, meditation and sunrise photography.' },
  { icon:'🕉️', name:'Panchganga Ghat',     type:'Sacred Ghat',  desc:'Mythical confluence of five rivers. The Dhoop Dev temple here dates to the 10th century and commands a river panorama.' },
  { icon:'🙏', name:'Har Ki Pauri',         type:'Holy Ghat',    desc:'Haridwar\'s most sacred ghat — the divine footprint of Vishnu is enshrined here and the evening aarti is transformative.' },
  { icon:'🌊', name:'Triveni Sangam',       type:'Confluence',   desc:'Where three rivers meet in Prayagraj — the sacred site of Kumbh Mela and the most powerful bathing tirth in Hinduism.' },
]

const TESTIMONIALS = [
  { name:'Ananya Sharma',   city:'Delhi',     stars:5, avatar:'🙏', text:'"From the private boat at dawn to the haveli rooftop dinner — every moment of our Kashi trip was curated to perfection. We felt truly taken care of."' },
  { name:'Rohit & Meera',   city:'Mumbai',    stars:5, avatar:'🌸', text:'"The Dev Deepawali experience was once-in-a-lifetime. Watching 10 lakh diyas from our private pontoon, with flowers floating on the Ganga — tears of joy."' },
  { name:'Dr. S. Krishnan', city:'Bengaluru', stars:5, avatar:'⭐', text:'"As a senior pilgrim, the helicopter to Kedarnath made all the difference. Our guide was deeply knowledgeable — a spiritual journey, not just a tour."' },
  { name:'Pallavi Joshi',   city:'Pune',      stars:5, avatar:'🪷', text:'"I have done yatras before, but never with such attention to detail. The personalised puja at Vishwanath with our family\'s gotra chants was deeply moving."' },
]

const GALLERY = [
  { icon:'🔥', label:'Ganga Aarti',           c1:'#1a1a08', c2:'#3a2a08' },
  { icon:'🌅', label:'Sunrise at Assi Ghat',   c1:'#1a0a08', c2:'#2e1808' },
  { icon:'🏔️', label:'Kedarnath Shrine',        c1:'#0a1a28', c2:'#102a3e' },
  { icon:'🦚', label:'Vrindavan Temples',       c1:'#081a0e', c2:'#102e18' },
  { icon:'🪔', label:'Dev Deepawali Diyas',     c1:'#1a0808', c2:'#2e1408' },
  { icon:'🚣', label:'Dawn River Cruise',       c1:'#08101a', c2:'#0e1e2e' },
  { icon:'🏛️', label:'Heritage Haveli',          c1:'#1a1008', c2:'#2a1808' },
  { icon:'🌸', label:'Holi at Vrindavan',       c1:'#1a0818', c2:'#2e1028' },
]

const WHATSAPP = '919876543210'

export default function KashiPraveshSample3() {
  const [navOpen, setNavOpen]       = useState(false)
  const [activeGhat, setActiveGhat] = useState(0)
  const [lightbox, setLightbox]     = useState(null)
  const [submitted, setSubmitted]   = useState(false)
  const [form, setForm]             = useState({ name:'', phone:'', destination:'', duration:'', date:'', note:'' })

  /* ── reveal observer ── */
  useEffect(() => {
    const els = document.querySelectorAll('.kp .reveal')
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          io.unobserve(e.target)
        }
      })
    }, { threshold:0.12 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  /* ── form ── */
  const upd = (k) => (e) => setForm(p => ({...p,[k]:e.target.value}))
  const handleEnquiry = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `*Kashi Pravesh Enquiry*\nName: ${form.name}\nPhone: ${form.phone}\nDestination: ${form.destination}\nDuration: ${form.duration}\nDate: ${form.date}\nNote: ${form.note}`
  )}`

  const ghat = GHATS[activeGhat]

  return (
    <div className="kp">

      {/* announce bar */}
      <div className="announce">
        <div className="announce-track">
          {['Dev Deepawali 2025 — Limited Availability',
            'Char Dham 2026 — Luxury Bookings Open',
            'Complimentary Airport Transfer on Heritage Packages',
            'New: Private Puja at Kashi Vishwanath — Exclusive Access',
            'Dev Deepawali 2025 — Limited Availability',
            'Char Dham 2026 — Luxury Bookings Open',
            'Complimentary Airport Transfer on Heritage Packages',
            'New: Private Puja at Kashi Vishwanath — Exclusive Access',
          ].map((t,i) => <span key={i}>{t}</span>)}
        </div>
      </div>

      {/* nav */}
      <nav>
        <div className="nav-logo">
          Kashi Pravesh
          <small>Luxury Spiritual Journeys</small>
        </div>
        <div className="nav-links">
          <a href="#experiences">Experiences</a>
          <a href="#packages">Packages</a>
          <a href="#ghats">Ghats</a>
          <a href="#gallery">Gallery</a>
          <a href="#enquire" className="nav-book">Enquire Now</a>
        </div>
        <button className="nav-ham" onClick={() => setNavOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
        <div className={`nav-drawer${navOpen ? ' open' : ''}`}>
          <button className="nav-drawer-close" onClick={() => setNavOpen(false)}>✕</button>
          <a href="#experiences" onClick={() => setNavOpen(false)}>Experiences</a>
          <a href="#packages" onClick={() => setNavOpen(false)}>Packages</a>
          <a href="#ghats" onClick={() => setNavOpen(false)}>Ghats</a>
          <a href="#gallery" onClick={() => setNavOpen(false)}>Gallery</a>
          <a href="#enquire" onClick={() => setNavOpen(false)}>Enquire Now</a>
        </div>
      </nav>

      {/* hero */}
      <section className="hero">
        <div className="hero-bg-pattern" />
        <svg className="hero-mandala-bg" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          {[130,110,90,70,50].map((r,i) => (
            <circle key={i} cx="150" cy="150" r={r} stroke="white" strokeWidth=".5" />
          ))}
          {Array.from({length:16},(_,i) => {
            const a = i*22.5*Math.PI/180
            return <line key={i} x1={150+50*Math.cos(a)} y1={150+50*Math.sin(a)} x2={150+130*Math.cos(a)} y2={150+130*Math.sin(a)} stroke="white" strokeWidth=".5" />
          })}
          {Array.from({length:8},(_,i) => {
            const a = i*45*Math.PI/180
            return <polygon key={i} points={`${150+90*Math.cos(a)},${150+90*Math.sin(a)} ${150+80*Math.cos(a+.2)},${150+80*Math.sin(a+.2)} ${150+80*Math.cos(a-.2)},${150+80*Math.sin(a-.2)}`} fill="white" opacity=".3" />
          })}
        </svg>
        <div className="hero-content">
          <div>
            <div className="hero-eyebrow">Sacred India &nbsp;·&nbsp; Curated Experiences</div>
            <h1 className="hero-h1">
              Where the <em>Divine</em><br />
              Meets the<br />
              <em>Extraordinary</em>
            </h1>
            <p className="hero-lead">
              Bespoke spiritual journeys to Kashi, Prayagraj, Char Dham and beyond — crafted for those who seek meaning, beauty and the transformative power of pilgrimage.
            </p>
            <div className="hero-actions">
              <a href="#enquire" className="btn-gold">Begin Your Journey</a>
              <a href="#experiences" className="btn-ghost">Our Experiences</a>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-card-img">🔥</div>
            <div className="hero-card-body">
              <div className="hero-card-label">Featured Experience</div>
              <div className="hero-card-title">Dev Deepawali on the Ganga</div>
              <p className="hero-card-desc">Watch 10 lakh diyas illuminate 84 ghats on Kartik Purnima — India's most breathtaking spiritual spectacle, from a private pontoon boat.</p>
              <div className="hero-card-stat">
                <div><strong>Nov 2025</strong><span>Next date</span></div>
                <div><strong>₹18k</strong><span>per person</span></div>
                <div><strong>4 left</strong><span>spots</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* marquee divider */}
      <div className="marquee-div" aria-hidden="true">
        <div className="marquee-track">
          {['Kashi','·','Prayagraj','·','Ayodhya','·','Vrindavan','·','Haridwar','·','Kedarnath','·','Char Dham','·','Kashi','·','Prayagraj','·','Ayodhya','·','Vrindavan','·','Haridwar','·','Kedarnath','·','Char Dham','·'].map((w,i) => (
            <span key={i} className={w==='·'?'hi':''}>{w}</span>
          ))}
        </div>
      </div>

      {/* experiences */}
      <section className="exp-section" id="experiences">
        <div className="wrap">
          <div className="reveal">
            <div className="sec-eyebrow">What We Offer</div>
            <h2 className="sec-h2">Curated <em>Experiences</em></h2>
            <p className="sec-lead">Each experience is personally curated — not a tour, but a transformation. Led by experts who know the sacred city intimately.</p>
          </div>
          <div className="exp-grid">
            {EXPERIENCES.map((e,i) => (
              <div key={i} className="exp-card reveal">
                <span className="exp-icon">{e.icon}</span>
                <div className="exp-name">{e.name}</div>
                <p className="exp-desc">{e.desc}</p>
                <div className="exp-price">{e.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* bells */}
      <div className="kp-bells" aria-hidden="true">
        {Array.from({length:9},(_,i) => <span key={i} className="kp-bell">🔔</span>)}
      </div>

      {/* packages */}
      <section className="pkg-section" id="packages">
        <div className="wrap">
          <div className="reveal">
            <div className="sec-eyebrow">Curated Programmes</div>
            <h2 className="sec-h2">Sacred <em>Packages</em></h2>
            <p className="sec-lead">Three tiers of immersion — each a complete, thoughtfully designed spiritual journey with everything arranged for you.</p>
          </div>
          <div className="pkg-grid">
            {PACKAGES.map((p,i) => (
              <div key={i} className={`pkg-card reveal${p.featured?' featured':''}`} style={{'--tbg1':p.bg1,'--tbg2':p.bg2}}>
                {p.featured && <div className="pkg-badge">Most Popular</div>}
                <div className="pkg-thumb">{p.icon}</div>
                <div className="pkg-body">
                  <div className="pkg-tier">{p.tier}</div>
                  <div className="pkg-name">{p.name}</div>
                  <p className="pkg-desc">{p.desc}</p>
                  <div className="pkg-includes">
                    {p.includes.map(inc => <div key={inc} className="pkg-inc">{inc}</div>)}
                  </div>
                  <div className="pkg-footer">
                    <div className="pkg-price">
                      {p.price}
                      <small>{p.unit}</small>
                    </div>
                    <a href="#enquire" className="btn-pkg">Enquire</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ghats editorial */}
      <section className="ghats-section" id="ghats">
        <div className="wrap">
          <div className="reveal">
            <div className="sec-eyebrow">Sacred Waterfronts</div>
            <h2 className="sec-h2">The Holy <em>Ghats</em></h2>
            <p className="sec-lead">Each ghat is a world — a stage for ritual, a river of devotion, a place where the veil between human and divine grows thin.</p>
          </div>
          <div className="ghats-editorial">
            <div className="ghat-feature reveal">
              <div className="ghat-feature-img">{ghat.icon}</div>
              <div className="ghat-feature-body">
                <div className="ghat-feature-name">{ghat.name}</div>
                <div className="ghat-feature-type">{ghat.type}</div>
                <p className="ghat-feature-desc">{ghat.desc}</p>
              </div>
            </div>
            <div className="ghats-list reveal">
              {GHATS.map((g,i) => (
                <button key={i} className={`ghat-row${activeGhat===i?' active':''}`} onClick={() => setActiveGhat(i)}>
                  <span className="ghat-row-icon">{g.icon}</span>
                  <span className="ghat-row-info">
                    <span className="ghat-row-name">{g.name}</span>
                    <span className="ghat-row-type">{g.type}</span>
                  </span>
                  <span className="ghat-row-arrow">›</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* enquiry */}
      <section className="enquiry-section" id="enquire">
        <div className="wrap">
          <div className="enquiry-wrap">
            <div className="enquiry-left reveal">
              <div className="sec-eyebrow">Begin Your Journey</div>
              <h2 className="sec-h2">Craft Your <em>Sacred</em> Experience</h2>
              <p>Share your vision and our expert yatra curators will design a bespoke pilgrimage programme — personalised to your spiritual goals, pace and preferences.</p>
              <div className="enquiry-features">
                {[
                  { icon:'⚡', title:'Response within 2 hours', desc:'Our team responds to every enquiry within 2 hours during 7 AM–9 PM, 7 days a week.' },
                  { icon:'🎯', title:'100% personalised', desc:'No fixed group tours — every itinerary is built around your dates, wishes and group.' },
                  { icon:'🔒', title:'Zero advance payment required', desc:'We share the full itinerary and quote before you commit to anything.' },
                ].map(f => (
                  <div key={f.title} className="enq-feat">
                    <span className="enq-feat-icon">{f.icon}</span>
                    <div><strong>{f.title}</strong>{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="enquiry-form reveal">
              {!submitted ? (
                <>
                  <div className="enq-form-title">Plan Your Yatra</div>
                  <p className="enq-form-sub">Fill in the form or&nbsp;
                    <a href={waLink} target="_blank" rel="noopener noreferrer" style={{color:'var(--gold)'}}>message us on WhatsApp →</a>
                  </p>
                  <form onSubmit={handleEnquiry}>
                    <div className="kp-field-row">
                      <div className="kp-field">
                        <label htmlFor="kp-name">Your Name</label>
                        <input id="kp-name" type="text" placeholder="Full name" value={form.name} onChange={upd('name')} required />
                      </div>
                      <div className="kp-field">
                        <label htmlFor="kp-phone">WhatsApp Number</label>
                        <input id="kp-phone" type="tel" placeholder="+91 9876543210" value={form.phone} onChange={upd('phone')} required />
                      </div>
                    </div>
                    <div className="kp-field-row">
                      <div className="kp-field">
                        <label htmlFor="kp-dest">Destination</label>
                        <select id="kp-dest" value={form.destination} onChange={upd('destination')} required>
                          <option value="">Choose destination</option>
                          {['Kashi / Varanasi','Prayagraj','Ayodhya','Vrindavan & Mathura','Haridwar & Rishikesh','Char Dham Circuit','Multiple Destinations'].map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                      <div className="kp-field">
                        <label htmlFor="kp-dur">Duration</label>
                        <select id="kp-dur" value={form.duration} onChange={upd('duration')} required>
                          <option value="">Select duration</option>
                          {['2–3 nights','4–5 nights','6–8 nights','9–12 nights','13+ nights'].map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="kp-field">
                      <label htmlFor="kp-date">Preferred Start Date</label>
                      <input id="kp-date" type="date" value={form.date} onChange={upd('date')} />
                    </div>
                    <div className="kp-field">
                      <label htmlFor="kp-note">Special Requests (optional)</label>
                      <textarea id="kp-note" placeholder="Helicopter, wheelchair access, specific pujas, dietary needs…" value={form.note} onChange={upd('note')} />
                    </div>
                    <button type="submit" className="enq-submit">Send Enquiry</button>
                  </form>
                </>
              ) : (
                <div className="enq-success">
                  <div className="enq-ok-icon">🙏</div>
                  <h3>Namaste, {form.name || 'Pilgrim'}</h3>
                  <p>Your enquiry has been received. Our yatra curator will contact you on <strong style={{color:'var(--gold)'}}>{form.phone}</strong> within 2 hours with a personalised itinerary.</p>
                  <button className="btn-gold" style={{marginTop:'1.5rem',display:'inline-block'}} onClick={() => { setSubmitted(false); setForm({name:'',phone:'',destination:'',duration:'',date:'',note:''}) }}>New Enquiry</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section className="testi-section">
        <div className="wrap">
          <div className="sec-head reveal" style={{textAlign:'center',marginBottom:'3.5rem'}}>
            <div className="sec-eyebrow">Pilgrim Voices</div>
            <h2 className="sec-h2" style={{textAlign:'center'}}>What Our <em>Guests</em> Say</h2>
          </div>
          <div className="testi-grid">
            {TESTIMONIALS.map((t,i) => (
              <div key={i} className="kp-testi reveal">
                <div className="kp-testi-stars">{'★'.repeat(t.stars)}</div>
                <p className="kp-testi-text">{t.text}</p>
                <div className="kp-testi-author">
                  <div className="kp-testi-avatar">{t.avatar}</div>
                  <div>
                    <div className="kp-testi-name">{t.name}</div>
                    <div className="kp-testi-city">{t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* gallery */}
      <section className="gallery-section" id="gallery">
        <div className="wrap">
          <div className="reveal">
            <div className="sec-eyebrow">Sacred Frames</div>
            <h2 className="sec-h2">From Our <em>Journeys</em></h2>
          </div>
          <div className="gallery-masonry">
            {GALLERY.map((g,i) => (
              <div key={i} className="gm-item reveal" style={{'--c1':g.c1,'--c2':g.c2}} onClick={() => setLightbox(g)}>
                <div className="gm-thumb">{g.icon}</div>
                <div className="gm-overlay">
                  <div className="gm-caption">{g.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* lightbox */}
      {lightbox && (
        <div className="kp-lightbox" onClick={() => setLightbox(null)}>
          <div className="kp-lightbox-inner" onClick={e => e.stopPropagation()}>
            <div className="kp-lb-display" style={{background:`linear-gradient(135deg,${lightbox.c1},${lightbox.c2})`}}>
              {lightbox.icon}
            </div>
            <div className="kp-lb-caption">{lightbox.label}</div>
          </div>
          <button className="kp-lb-close" onClick={() => setLightbox(null)}>✕</button>
        </div>
      )}

      {/* footer */}
      <footer>
        <div className="footer-wrap">
          <div className="footer-top">
            <div>
              <div className="footer-brand">Kashi Pravesh</div>
              <div className="footer-tagline">Sacred journeys, crafted with devotion</div>
              <p className="footer-about">India's most trusted luxury pilgrimage curator — 15 years of service, thousands of transformed pilgrims, and an uncompromising commitment to the sacred.</p>
            </div>
            <div className="footer-col">
              <h4>Journeys</h4>
              <a href="#packages">Kashi Darshan</a>
              <a href="#packages">Divya Yatra</a>
              <a href="#packages">Char Dham Sanctuary</a>
              <a href="#experiences">All Experiences</a>
            </div>
            <div className="footer-col">
              <h4>Discover</h4>
              <a href="#ghats">Sacred Ghats</a>
              <a href="#gallery">Gallery</a>
              <a href="#experiences">Temple Darshan</a>
              <a href="#experiences">River Cruises</a>
            </div>
            <div className="footer-col">
              <h4>Connect</h4>
              <a href={`https://wa.me/${WHATSAPP}`}>WhatsApp</a>
              <a href="tel:+919876543210">+91 98765 43210</a>
              <a href="mailto:namaste@kashipravesh.in">namaste@kashipravesh.in</a>
              <a href="#enquire">Send Enquiry</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2025 Kashi Pravesh. All rights reserved.</span>
            <span>
              <a href="#" style={{marginRight:'1.25rem'}}>Privacy</a>
              <a href="#">Terms</a>
            </span>
          </div>
        </div>
      </footer>

    </div>
  )
}

'use client'
import { useState } from 'react'
import './page.css'


export default function KashiYatraSample1() {
  const [navOpen, setNavOpen] = useState(false)
  const [formNote, setFormNote] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormNote('🙏 Dhanyavaad! We will contact you within 24 hours.')
    e.target.reset()
  }

  return (
    <div className="ky">

      {/* ── SVG symbol defs ── */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          {/* Fish (Matsya) */}
          <symbol id="fish" viewBox="0 0 120 56">
            <path d="M8 28 C30 2, 72 2, 94 28 C72 54, 30 54, 8 28 Z" fill="#e3a21a" stroke="#1c130e" strokeWidth="3"/>
            <path d="M94 28 L116 8 L110 28 L116 48 Z" fill="#b8321f" stroke="#1c130e" strokeWidth="3" strokeLinejoin="round"/>
            <path d="M36 12 C44 22,44 34,36 44" fill="none" stroke="#1c130e" strokeWidth="2.5"/>
            <path d="M48 10 C56 22,56 34,48 46 M60 10 C68 22,68 34,60 46 M72 13 C79 22,79 34,72 43" fill="none" stroke="#1c130e" strokeWidth="1.6"/>
            <path d="M50 16 l4 4 M52 26 l4 4 M50 36 l4 4 M62 16 l4 4 M64 26 l4 4 M62 36 l4 4" stroke="#b8321f" strokeWidth="2"/>
            <circle cx="22" cy="26" r="6" fill="#f5e9cf" stroke="#1c130e" strokeWidth="2.5"/>
            <circle cx="22" cy="26" r="2.4" fill="#1c130e"/>
          </symbol>
          {/* Lotus */}
          <symbol id="lotus" viewBox="0 0 100 70">
            <path d="M50 8 C62 24,62 44,50 60 C38 44,38 24,50 8Z" fill="#cf5577" stroke="#1c130e" strokeWidth="2.5"/>
            <path d="M50 60 C36 50,24 36,20 20 C36 26,46 40,50 60Z" fill="#cf5577" stroke="#1c130e" strokeWidth="2.5"/>
            <path d="M50 60 C64 50,76 36,80 20 C64 26,54 40,50 60Z" fill="#cf5577" stroke="#1c130e" strokeWidth="2.5"/>
            <path d="M50 60 C34 58,16 50,6 38 C24 36,40 46,50 60Z" fill="#e3a21a" stroke="#1c130e" strokeWidth="2.5"/>
            <path d="M50 60 C66 58,84 50,94 38 C76 36,60 46,50 60Z" fill="#e3a21a" stroke="#1c130e" strokeWidth="2.5"/>
            <path d="M50 16 V52 M30 28 C38 36,44 46,48 56 M70 28 C62 36,56 46,52 56" stroke="#1c130e" strokeWidth="1.4" fill="none"/>
            <path d="M30 64 H70" stroke="#1c130e" strokeWidth="3"/>
          </symbol>
          {/* Sun face */}
          <symbol id="sun" viewBox="0 0 120 120">
            <g stroke="#1c130e" strokeWidth="2.5" strokeLinejoin="round">
              <g fill="#b8321f">
                <path d="M60 2 L67 22 L53 22Z"/><path d="M60 118 L53 98 L67 98Z"/>
                <path d="M2 60 L22 53 L22 67Z"/><path d="M118 60 L98 67 L98 53Z"/>
                <path d="M19 19 L36 30 L30 36Z"/><path d="M101 101 L84 90 L90 84Z"/>
                <path d="M101 19 L90 36 L84 30Z"/><path d="M19 101 L30 84 L36 90Z"/>
              </g>
              <circle cx="60" cy="60" r="36" fill="#e3a21a"/>
              <circle cx="60" cy="60" r="29" fill="#f5c64a"/>
            </g>
            <g fill="none" stroke="#1c130e" strokeWidth="2.4" strokeLinecap="round">
              <path d="M44 52 q5 -6 10 0 M66 52 q5 -6 10 0"/>
              <path d="M60 56 v10 q-3 2 0 3"/>
              <path d="M50 74 q10 7 20 0"/>
            </g>
            <circle cx="49" cy="55" r="2.2" fill="#1c130e"/><circle cx="71" cy="55" r="2.2" fill="#1c130e"/>
            <circle cx="60" cy="42" r="2.6" fill="#b8321f" stroke="#1c130e" strokeWidth="1.2"/>
          </symbol>
          {/* Peacock */}
          <symbol id="peacock" viewBox="0 0 160 140">
            <g stroke="#1c130e" strokeWidth="2.5" strokeLinejoin="round">
              <path d="M70 92 C90 60,130 40,156 50 C150 80,120 110,78 104Z" fill="#1f3569"/>
              <path d="M78 98 C98 72,126 58,146 60" fill="none" strokeWidth="1.6"/>
              <path d="M80 102 C104 88,128 80,142 78" fill="none" strokeWidth="1.6"/>
              <circle cx="128" cy="56" r="7" fill="#3c7a3a"/><circle cx="128" cy="56" r="3" fill="#e3a21a"/>
              <circle cx="140" cy="72" r="7" fill="#3c7a3a"/><circle cx="140" cy="72" r="3" fill="#e3a21a"/>
              <circle cx="116" cy="84" r="7" fill="#3c7a3a"/><circle cx="116" cy="84" r="3" fill="#e3a21a"/>
              <path d="M30 94 C30 70,52 64,70 76 C84 86,82 108,62 112 C44 116,30 108,30 94Z" fill="#3c7a3a"/>
              <path d="M36 80 C30 60,32 40,40 26 C44 20,52 22,52 30 C52 44,48 60,54 70" fill="#1f3569"/>
              <path d="M40 26 L28 30 L40 32Z" fill="#e3a21a"/>
              <circle cx="45" cy="28" r="2.4" fill="#f5e9cf"/>
              <path d="M44 20 L40 8 M48 20 L50 8 M46 20 L46 6" fill="none" strokeWidth="1.8"/>
              <circle cx="40" cy="8" r="2.5" fill="#b8321f"/><circle cx="50" cy="8" r="2.5" fill="#b8321f"/><circle cx="46" cy="5" r="2.5" fill="#b8321f"/>
              <path d="M48 112 L46 132 M62 112 L64 132 M40 132 H54 M56 132 H70" fill="none" strokeWidth="2.2"/>
            </g>
            <path d="M42 90 q6 -6 12 0 M50 100 q6 -6 12 0 M58 88 q6 -6 12 0" fill="none" stroke="#e3a21a" strokeWidth="2"/>
          </symbol>
          {/* Diya lamp */}
          <symbol id="diya" viewBox="0 0 100 90">
            <path d="M50 8 C62 24,60 38,50 44 C40 38,38 24,50 8Z" fill="#e3a21a" stroke="#1c130e" strokeWidth="2.5"/>
            <path d="M50 20 C55 28,54 35,50 38 C46 35,45 28,50 20Z" fill="#b8321f"/>
            <path d="M8 52 H92 C88 72,70 82,50 82 C30 82,12 72,8 52Z" fill="#b8321f" stroke="#1c130e" strokeWidth="2.5"/>
            <path d="M16 60 H84" stroke="#1c130e" strokeWidth="1.6"/>
            <path d="M22 66 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6 l6 -6 l6 6" fill="none" stroke="#e3a21a" strokeWidth="2"/>
          </symbol>
          {/* Tree of life */}
          <symbol id="tree" viewBox="0 0 160 200">
            <path d="M72 200 C74 160,70 130,80 100 C90 130,86 160,88 200Z" fill="#8e2213" stroke="#1c130e" strokeWidth="2.5"/>
            <g stroke="#1c130e" strokeWidth="2.5" fill="none">
              <path d="M80 110 C60 96,40 90,22 92"/><path d="M80 110 C100 96,120 90,138 92"/>
              <path d="M80 80 C64 64,48 58,34 58"/><path d="M80 80 C96 64,112 58,126 58"/>
              <path d="M80 100 V20"/>
            </g>
            <g stroke="#1c130e" strokeWidth="2" fill="#7fb069">
              <ellipse cx="26" cy="86" rx="12" ry="7" transform="rotate(-20 26 86)"/>
              <ellipse cx="134" cy="86" rx="12" ry="7" transform="rotate(20 134 86)"/>
              <ellipse cx="38" cy="52" rx="12" ry="7" transform="rotate(-25 38 52)"/>
              <ellipse cx="122" cy="52" rx="12" ry="7" transform="rotate(25 122 52)"/>
              <ellipse cx="80" cy="18" rx="8" ry="14"/>
              <ellipse cx="56" cy="34" rx="12" ry="7" transform="rotate(-40 56 34)"/>
              <ellipse cx="104" cy="34" rx="12" ry="7" transform="rotate(40 104 34)"/>
            </g>
            <g fill="#e3a21a" stroke="#1c130e" strokeWidth="1.6">
              <circle cx="52" cy="100" r="5"/><circle cx="108" cy="100" r="5"/><circle cx="58" cy="68" r="5"/><circle cx="102" cy="68" r="5"/>
            </g>
          </symbol>
        </defs>
      </svg>

      {/* ── Nav ── */}
      <header className="nav">
        <div className="wrap nav-inner">
          <a href="#top" className="brand" aria-label="Kashi Yatra home">
            <svg viewBox="0 0 120 120"><use href="#sun"/></svg>
            <span><b>Kashi Yatra</b><small>Journeys of the Spirit</small></span>
          </a>
          <nav className={`nav-links${navOpen ? ' open' : ''}`}>
            <a href="#tours" onClick={() => setNavOpen(false)}>Tours</a>
            <a href="#experience" onClick={() => setNavOpen(false)}>Experience</a>
            <a href="#itinerary" onClick={() => setNavOpen(false)}>Itinerary</a>
            <a href="#enquire" onClick={() => setNavOpen(false)}>Contact</a>
          </nav>
          <a href="#enquire" className="btn nav-cta">Plan Your Yatra</a>
          <button className="menu-btn" aria-label="Open menu" onClick={() => setNavOpen(v => !v)}>☰</button>
        </div>
      </header>
      <div className="border-tri"></div>

      <main id="top">

        {/* ── Hero ── */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <span className="eyebrow">Varanasi · Banaras · Kashi</span>
              <h1>Walk the ghats of the <em>City of Light</em></h1>
              <div className="hindi">काशी — जहाँ आत्मा जागती है</div>
              <p className="lead">Guided spiritual journeys along the sacred Ganga: sunrise boat rides, evening aarti, temple darshan and slow walks through a city older than history.</p>
              <div className="hero-cta">
                <a href="#tours" className="btn">Explore Tours →</a>
                <a href="#itinerary" className="btn alt">3-Day Pilgrimage</a>
              </div>
              <div className="hero-stats">
                <div><b>84</b><span>Sacred ghats</span></div>
                <div><b>3,000+</b><span>Years of living faith</span></div>
                <div><b>Daily</b><span>Ganga Aarti at dusk</span></div>
              </div>
            </div>

            <div className="hero-art frame">
              <svg viewBox="0 0 560 520" role="img" aria-label="Madhubani-style painting of the Varanasi ghats with a temple, the rising sun, boats and fish in the Ganga">
                <rect width="560" height="520" fill="#f5e9cf"/>
                <g stroke="#e3a21a" strokeWidth="1.2" opacity=".55">
                  <path d="M0 40 H560 M0 60 H560 M0 80 H560 M0 100 H560 M0 120 H560 M0 140 H560 M0 160 H560"/>
                </g>
                <use href="#sun" x="380" y="24" width="140" height="140"/>
                <g fill="none" stroke="#1c130e" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M70 70 q10 -10 20 0 q10 -10 20 0"/><path d="M140 44 q8 -8 16 0 q8 -8 16 0"/><path d="M250 80 q7 -7 14 0 q7 -7 14 0"/>
                </g>
                {/* temple shikhara */}
                <g stroke="#1c130e" strokeWidth="3" strokeLinejoin="round">
                  <path d="M150 300 L150 190 C150 150,175 120,195 90 C215 120,240 150,240 190 L240 300Z" fill="#b8321f"/>
                  <path d="M165 290 V195 C165 165,180 142,195 120 C210 142,225 165,225 195 V290" fill="none" strokeWidth="1.8"/>
                  <path d="M180 290 V200 M195 290 V130 M210 290 V200" strokeWidth="1.4"/>
                  <path d="M195 90 V60"/><path d="M195 60 L222 68 L195 76Z" fill="#e3a21a"/>
                  <circle cx="195" cy="88" r="7" fill="#e3a21a"/>
                  <path d="M100 300 V230 C100 210,112 196,125 186 C138 196,150 210,150 230 V300Z" fill="#e3a21a"/>
                  <path d="M240 300 V240 C240 222,252 210,265 202 C278 210,290 222,290 240 V300Z" fill="#e3a21a"/>
                  <path d="M125 186 V170 M265 202 V186"/>
                  <path d="M170 300 V262 a25 25 0 0 1 50 0 V300" fill="#1f3569"/>
                </g>
                {/* houses right */}
                <g stroke="#1c130e" strokeWidth="3">
                  <rect x="310" y="210" width="80" height="90" fill="#cf5577"/>
                  <rect x="390" y="180" width="70" height="120" fill="#1f3569"/>
                  <rect x="460" y="230" width="80" height="70" fill="#e3a21a"/>
                  <path d="M305 210 L350 186 L395 210Z M385 180 L425 156 L465 180Z M455 230 L500 208 L545 230Z" fill="#b8321f"/>
                  <g fill="#f5e9cf" strokeWidth="2">
                    <rect x="325" y="228" width="16" height="22"/><rect x="358" y="228" width="16" height="22"/>
                    <rect x="405" y="198" width="14" height="22"/><rect x="432" y="198" width="14" height="22"/>
                    <rect x="405" y="240" width="14" height="22"/><rect x="432" y="240" width="14" height="22"/>
                    <rect x="480" y="248" width="16" height="22"/><rect x="508" y="248" width="16" height="22"/>
                  </g>
                </g>
                {/* houses left */}
                <g stroke="#1c130e" strokeWidth="3">
                  <rect x="18" y="236" width="70" height="64" fill="#3c7a3a"/>
                  <path d="M12 236 L53 212 L94 236Z" fill="#e3a21a"/>
                  <rect x="40" y="254" width="22" height="46" fill="#f5e9cf" strokeWidth="2"/>
                </g>
                {/* ghat steps */}
                <g stroke="#1c130e" strokeWidth="3">
                  <rect x="0" y="300" width="560" height="18" fill="#efdcb4"/>
                  <rect x="0" y="318" width="560" height="18" fill="#e3a21a"/>
                  <rect x="0" y="336" width="560" height="18" fill="#efdcb4"/>
                </g>
                <g stroke="#1c130e" strokeWidth="1.4">
                  <path d="M40 300 v18 M100 318 v18 M160 300 v18 M220 318 v18 M280 300 v18 M340 318 v18 M400 300 v18 M460 318 v18 M520 300 v18 M70 336 v18 M190 336 v18 M310 336 v18 M430 336 v18 M550 336 v18"/>
                </g>
                <use href="#diya" x="60" y="276" width="34" height="30"/>
                <use href="#diya" x="290" y="276" width="34" height="30"/>
                <use href="#diya" x="470" y="276" width="34" height="30"/>
                {/* chhatris */}
                <g stroke="#1c130e" strokeWidth="2.5">
                  <path d="M110 300 V272"/><path d="M86 276 Q110 250 134 276Z" fill="#b8321f"/>
                  <path d="M430 300 V272"/><path d="M406 276 Q430 250 454 276Z" fill="#3c7a3a"/>
                </g>
                {/* river */}
                <rect x="0" y="354" width="560" height="166" fill="#1f3569" stroke="#1c130e" strokeWidth="3"/>
                <g fill="none" stroke="#f5e9cf" strokeWidth="2" opacity=".85">
                  <path d="M0 380 q20 -10 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0"/>
                  <path d="M-20 460 q20 -10 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0"/>
                  <path d="M0 505 q20 -10 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0"/>
                </g>
                {/* main boat */}
                <g stroke="#1c130e" strokeWidth="3" strokeLinejoin="round">
                  <path d="M60 408 H250 C236 432,210 440,155 440 C100 440,74 432,60 408Z" fill="#b8321f"/>
                  <path d="M80 416 H232" stroke="#e3a21a" strokeWidth="3"/>
                  <path d="M150 408 V372 M150 372 L186 404 M150 372 L120 404" fill="none" strokeWidth="2.4"/>
                  <circle cx="110" cy="392" r="8" fill="#e3a21a"/><path d="M104 408 Q110 396 116 408Z" fill="#f5e9cf"/>
                  <circle cx="196" cy="392" r="8" fill="#e3a21a"/><path d="M190 408 Q196 396 202 408Z" fill="#cf5577"/>
                  <path d="M232 408 L262 456" strokeWidth="2.6"/>
                </g>
                {/* second boat */}
                <g stroke="#1c130e" strokeWidth="3" strokeLinejoin="round">
                  <path d="M350 470 H500 C490 490,470 496,425 496 C380 496,360 490,350 470Z" fill="#e3a21a"/>
                  <path d="M366 478 H486" stroke="#b8321f" strokeWidth="3"/>
                  <circle cx="420" cy="456" r="7" fill="#cf5577"/><path d="M414 470 Q420 460 426 470Z" fill="#3c7a3a"/>
                </g>
                <use href="#fish" x="300" y="392" width="100" height="46"/>
                <use href="#fish" x="40" y="462" width="90" height="42"/>
                <g>
                  <use href="#diya" x="280" y="470" width="26" height="24"/>
                  <use href="#diya" x="200" y="480" width="22" height="20"/>
                  <use href="#diya" x="510" y="420" width="24" height="22"/>
                </g>
                <use href="#lotus" x="470" y="360" width="70" height="48"/>
                <rect x="6" y="6" width="548" height="508" fill="none" stroke="#1c130e" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </section>

        <div className="border-loop"></div>

        {/* ── Tours ── */}
        <section id="tours">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Sacred Journeys</span>
              <h2>Tours along the holy Ganga</h2>
              <p>Small groups, local guides born in Kashi, and time built in to sit still and take it in.</p>
              <div className="fish-divider" aria-hidden="true">
                <svg viewBox="0 0 120 56"><use href="#fish"/></svg>
                <svg viewBox="0 0 100 70" style={{width:'34px',height:'26px'}}><use href="#lotus"/></svg>
                <svg viewBox="0 0 120 56" style={{transform:'scaleX(-1)'}}><use href="#fish"/></svg>
              </div>
            </div>

            <div className="tours">
              {/* Tour 1 – Ganga Aarti */}
              <article className="tour">
                <div className="art">
                  <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
                    <rect width="320" height="200" fill="#1f3569"/>
                    <g stroke="#e3a21a" strokeWidth="1" opacity=".4"><path d="M0 20H320M0 36H320M0 52H320M0 68H320"/></g>
                    <g stroke="#1c130e" strokeWidth="2.5">
                      <rect x="0" y="120" width="320" height="16" fill="#efdcb4"/><rect x="0" y="136" width="320" height="64" fill="#b8321f"/>
                    </g>
                    <g stroke="#1c130e" strokeWidth="2.5" strokeLinejoin="round">
                      <path d="M100 120 V70 H110 V120" fill="#f5e9cf"/><path d="M210 120 V70 H220 V120" fill="#f5e9cf"/>
                      <circle cx="105" cy="60" r="11" fill="#e3a21a"/><circle cx="215" cy="60" r="11" fill="#e3a21a"/>
                    </g>
                    <use href="#diya" x="80" y="16" width="50" height="46"/>
                    <use href="#diya" x="190" y="16" width="50" height="46"/>
                    <use href="#diya" x="136" y="40" width="48" height="44"/>
                    <g fill="none" stroke="#f5e9cf" strokeWidth="2">
                      <path d="M0 160 q16 -8 32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0"/>
                      <path d="M0 184 q16 -8 32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0"/>
                    </g>
                  </svg>
                </div>
                <div className="body">
                  <span className="tag">Evening</span>
                  <h3>Ganga Aarti at Dashashwamedh</h3>
                  <p>Watch the fire ritual from a private boat as priests offer lamps to the river, then float your own diya downstream.</p>
                  <div className="meta"><span>⏱ 3 hours</span><span className="price">₹1,499</span></div>
                </div>
              </article>

              {/* Tour 2 – Sunrise Boat */}
              <article className="tour">
                <div className="art">
                  <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
                    <rect width="320" height="200" fill="#f5c64a"/>
                    <use href="#sun" x="110" y="6" width="100" height="100"/>
                    <rect x="0" y="110" width="320" height="90" fill="#1f3569" stroke="#1c130e" strokeWidth="2.5"/>
                    <g fill="none" stroke="#f5e9cf" strokeWidth="2">
                      <path d="M0 130 q16 -8 32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0"/>
                      <path d="M0 188 q16 -8 32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0 t32 0"/>
                    </g>
                    <g stroke="#1c130e" strokeWidth="2.5" strokeLinejoin="round">
                      <path d="M70 146 H250 C238 168,214 174,160 174 C106 174,82 168,70 146Z" fill="#b8321f"/>
                      <path d="M88 154 H232" stroke="#e3a21a" strokeWidth="2.5"/>
                      <circle cx="130" cy="132" r="7" fill="#e3a21a"/><path d="M124 146 Q130 134 136 146Z" fill="#f5e9cf"/>
                      <circle cx="190" cy="132" r="7" fill="#e3a21a"/><path d="M184 146 Q190 134 196 146Z" fill="#3c7a3a"/>
                    </g>
                    <use href="#fish" x="20" y="164" width="60" height="28"/>
                    <use href="#fish" x="244" y="118" width="56" height="26"/>
                  </svg>
                </div>
                <div className="body">
                  <span className="tag" style={{background:'#f5c64a'}}>Sunrise</span>
                  <h3>Dawn Boat Ride on the Ghats</h3>
                  <p>Row from Assi to Manikarnika as the city wakes: bathers, bells, yoga on the steps and mist lifting off the water.</p>
                  <div className="meta"><span>⏱ 2.5 hours</span><span className="price">₹999</span></div>
                </div>
              </article>

              {/* Tour 3 – Temple Trail */}
              <article className="tour">
                <div className="art">
                  <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
                    <rect width="320" height="200" fill="#efdcb4"/>
                    <g stroke="#b8321f" strokeWidth="1.2" opacity=".5"><path d="M0 12H320M0 26H320M0 40H320M0 54H320"/></g>
                    <g stroke="#1c130e" strokeWidth="2.5" strokeLinejoin="round">
                      <path d="M110 180 V100 C110 72,140 46,160 24 C180 46,210 72,210 100 V180Z" fill="#e3a21a"/>
                      <path d="M125 175 V105 C125 82,145 60,160 44 C175 60,195 82,195 105 V175" fill="none" strokeWidth="1.6"/>
                      <path d="M160 24 V8"/><path d="M160 8 L180 13 L160 18Z" fill="#b8321f"/>
                      <path d="M60 180 V130 C60 116,70 106,80 100 C90 106,100 116,100 130 V180Z" fill="#b8321f"/>
                      <path d="M220 180 V130 C220 116,230 106,240 100 C250 106,260 116,260 130 V180Z" fill="#b8321f"/>
                      <path d="M140 180 V150 a20 20 0 0 1 40 0 V180" fill="#1f3569"/>
                      <rect x="0" y="180" width="320" height="20" fill="#3c7a3a"/>
                    </g>
                    <g fill="#f5e9cf" stroke="#1c130e" strokeWidth="1.6"><path d="M152 160 q8 -14 16 0 v20 h-16z"/></g>
                    <use href="#lotus" x="14" y="130" width="46" height="34"/>
                    <use href="#lotus" x="262" y="130" width="46" height="34"/>
                  </svg>
                </div>
                <div className="body">
                  <span className="tag" style={{background:'#cf5577',color:'#f5e9cf'}}>Darshan</span>
                  <h3>Kashi Vishwanath &amp; Temple Trail</h3>
                  <p>Guided darshan at the Jyotirlinga, then Annapurna, Kaal Bhairav and Sankat Mochan with the stories behind each shrine.</p>
                  <div className="meta"><span>⏱ 5 hours</span><span className="price">₹1,899</span></div>
                </div>
              </article>

              {/* Tour 4 – Sarnath */}
              <article className="tour">
                <div className="art">
                  <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
                    <rect width="320" height="200" fill="#3c7a3a"/>
                    <g stroke="#1c130e" strokeWidth="2.5" strokeLinejoin="round">
                      <path d="M90 180 V120 C90 80,125 56,160 56 C195 56,230 80,230 120 V180Z" fill="#efdcb4"/>
                      <path d="M104 120 H216 M100 140 H220 M98 160 H222" strokeWidth="1.6"/>
                      <path d="M160 56 V36"/><rect x="152" y="26" width="16" height="12" fill="#e3a21a"/>
                      <rect x="70" y="180" width="180" height="20" fill="#b8321f"/>
                    </g>
                    <g fill="#b8321f" stroke="#1c130e" strokeWidth="1.5">
                      <circle cx="120" cy="100" r="5"/><circle cx="160" cy="92" r="5"/><circle cx="200" cy="100" r="5"/>
                    </g>
                    <use href="#tree" x="4" y="60" width="90" height="120"/>
                    <use href="#tree" x="228" y="60" width="90" height="120"/>
                  </svg>
                </div>
                <div className="body">
                  <span className="tag" style={{background:'#7fb069'}}>Day Trip</span>
                  <h3>Sarnath: Where the Buddha Taught</h3>
                  <p>Visit the Dhamek Stupa, the deer park and the museum&apos;s Lion Capital, 10 km from the ghats yet much quieter.</p>
                  <div className="meta"><span>⏱ Half day</span><span className="price">₹2,299</span></div>
                </div>
              </article>

              {/* Tour 5 – Old City Walk */}
              <article className="tour">
                <div className="art">
                  <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
                    <rect width="320" height="200" fill="#cf5577"/>
                    <g stroke="#1c130e" strokeWidth="2.5">
                      <rect x="0" y="0" width="60" height="200" fill="#e3a21a"/>
                      <rect x="260" y="0" width="60" height="200" fill="#1f3569"/>
                      <rect x="60" y="150" width="200" height="50" fill="#efdcb4"/>
                    </g>
                    <g stroke="#1c130e" strokeWidth="2" fill="#f5e9cf">
                      <rect x="14" y="30" width="30" height="40"/><rect x="14" y="100" width="30" height="40"/>
                      <rect x="276" y="30" width="30" height="40"/><rect x="276" y="100" width="30" height="40"/>
                    </g>
                    <g stroke="#1c130e" strokeWidth="1.4">
                      <path d="M29 30 V70 M14 50 H44 M29 100 V140 M14 120 H44 M291 30 V70 M276 50 H306 M291 100 V140 M276 120 H306"/>
                    </g>
                    <use href="#peacock" x="90" y="24" width="140" height="124"/>
                    <g fill="none" stroke="#1c130e" strokeWidth="1.6"><path d="M70 170 h20 M110 176 h24 M160 168 h20 M200 178 h30"/></g>
                  </svg>
                </div>
                <div className="body">
                  <span className="tag" style={{background:'#1f3569',color:'#f5e9cf'}}>Heritage</span>
                  <h3>Galiyon ki Kashi: Old City Walk</h3>
                  <p>Twist through the lanes to hidden shrines, akharas, silk-weaver looms and the ghats where stories of Kabir and Tulsidas live on.</p>
                  <div className="meta"><span>⏱ 3 hours</span><span className="price">₹899</span></div>
                </div>
              </article>

              {/* Tour 6 – Food & Silk */}
              <article className="tour">
                <div className="art">
                  <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
                    <rect width="320" height="200" fill="#f5e9cf"/>
                    <g stroke="#e3a21a" strokeWidth="1.2" opacity=".6"><path d="M0 14H320M0 28H320M0 42H320M0 186H320"/></g>
                    <g stroke="#1c130e" strokeWidth="2.5" strokeLinejoin="round">
                      <ellipse cx="160" cy="130" rx="110" ry="40" fill="#b8321f"/>
                      <ellipse cx="160" cy="124" rx="96" ry="30" fill="#efdcb4"/>
                      <circle cx="120" cy="118" r="16" fill="#e3a21a"/><circle cx="162" cy="112" r="14" fill="#3c7a3a"/><circle cx="202" cy="120" r="15" fill="#cf5577"/>
                      <path d="M140 136 h40" strokeWidth="2"/>
                    </g>
                    <g fill="none" stroke="#1c130e" strokeWidth="1.6"><path d="M114 112 q6 6 12 0 M156 106 q6 6 12 0 M196 114 q6 6 12 0"/></g>
                    <g fill="none" stroke="#b8321f" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M130 80 q-8 -14 0 -26 q8 -12 0 -24"/>
                      <path d="M160 76 q-8 -14 0 -26 q8 -12 0 -24"/>
                      <path d="M190 80 q-8 -14 0 -26 q8 -12 0 -24"/>
                    </g>
                    <use href="#lotus" x="14" y="150" width="50" height="36"/>
                    <use href="#lotus" x="256" y="150" width="50" height="36"/>
                  </svg>
                </div>
                <div className="body">
                  <span className="tag" style={{background:'#b8321f',color:'#f5e9cf'}}>Taste</span>
                  <h3>Banarasi Flavours &amp; Silk Trail</h3>
                  <p>Kachori-sabzi at dawn, malaiyo in winter, the famous paan, and a visit to master weavers at their handlooms.</p>
                  <div className="meta"><span>⏱ 4 hours</span><span className="price">₹1,299</span></div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <div className="border-tri"></div>

        {/* ── Experience band ── */}
        <section id="experience" className="band">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">The Kashi Yatra Way</span>
              <h2>Travel slowly, feel deeply</h2>
              <p>We plan every journey around the river&apos;s rhythm and the city&apos;s rituals, not around a checklist.</p>
            </div>
            <div className="pillars">
              <div className="pillar">
                <svg viewBox="0 0 120 56"><use href="#fish"/></svg>
                <h3>Local Guides</h3>
                <p>Born and raised in the galis: storytellers, scholars and boatmen from old Kashi families.</p>
              </div>
              <div className="pillar">
                <svg viewBox="0 0 100 90"><use href="#diya"/></svg>
                <h3>Rituals, Respectfully</h3>
                <p>Take part in puja, aarti and sankalp with guidance on the meaning and etiquette of each.</p>
              </div>
              <div className="pillar">
                <svg viewBox="0 0 100 70"><use href="#lotus"/></svg>
                <h3>Stillness Built In</h3>
                <p>Meditation on the ghats, quiet mornings and unhurried pacing for every age.</p>
              </div>
              <div className="pillar">
                <svg viewBox="0 0 160 200"><use href="#tree"/></svg>
                <h3>Give Back</h3>
                <p>A share of every booking supports ghat clean-ups and local artisan families.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="border-dots"></div>

        {/* ── Itinerary ── */}
        <section id="itinerary">
          <div className="wrap itin">
            <div className="itin-art frame">
              <svg viewBox="0 0 400 480" role="img" aria-label="Madhubani-style peacock beside a tree of life under the sun">
                <rect width="400" height="480" fill="#f5e9cf"/>
                <g stroke="#e3a21a" strokeWidth="1" opacity=".5">
                  <path d="M0 30H400M0 50H400M0 70H400M0 90H400M0 110H400"/>
                </g>
                <use href="#sun" x="140" y="16" width="120" height="120"/>
                <use href="#tree" x="190" y="150" width="200" height="260"/>
                <use href="#peacock" x="10" y="200" width="230" height="200"/>
                <rect x="0" y="400" width="400" height="80" fill="#1f3569" stroke="#1c130e" strokeWidth="3"/>
                <g fill="none" stroke="#f5e9cf" strokeWidth="2">
                  <path d="M0 425 q20 -10 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0"/>
                  <path d="M-20 460 q20 -10 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0"/>
                </g>
                <use href="#fish" x="40" y="430" width="80" height="38"/>
                <use href="#fish" x="260" y="410" width="80" height="38"/>
                <use href="#lotus" x="160" y="432" width="60" height="42"/>
                <rect x="6" y="6" width="388" height="468" fill="none" stroke="#1c130e" strokeWidth="2"/>
              </svg>
            </div>
            <div>
              <span className="eyebrow">Signature Pilgrimage</span>
              <h2 style={{fontSize:'clamp(2rem,4vw,2.8rem)',margin:'10px 0 14px'}}>Three days in Kashi</h2>
              <p style={{color:'var(--muted)',marginBottom:'30px'}}>Our most loved journey. It covers the essential Kashi, with time left free for the city to surprise you.</p>
              <div className="days">
                <div className="day">
                  <div className="num"><span>Day</span><b>1</b></div>
                  <div>
                    <h3>Arrival &amp; the River at Dusk</h3>
                    <p>Check in near the ghats, take a gentle orientation walk, then watch the Ganga Aarti by boat.</p>
                    <ul><li>Assi Ghat</li><li>Evening boat</li><li>Aarti</li></ul>
                  </div>
                </div>
                <div className="day">
                  <div className="num"><span>Day</span><b>2</b></div>
                  <div>
                    <h3>Dawn, Darshan &amp; the Old City</h3>
                    <p>Sunrise boat ride, Kashi Vishwanath darshan, a Banarasi breakfast trail and an afternoon walk through the lanes.</p>
                    <ul><li>Sunrise ride</li><li>Vishwanath</li><li>Heritage walk</li></ul>
                  </div>
                </div>
                <div className="day">
                  <div className="num"><span>Day</span><b>3</b></div>
                  <div>
                    <h3>Sarnath &amp; Farewell</h3>
                    <p>Spend a peaceful morning at Sarnath, visit a silk-weaving family, then offer a final diya to the Ganga.</p>
                    <ul><li>Dhamek Stupa</li><li>Weavers</li><li>Diya offering</li></ul>
                  </div>
                </div>
              </div>
              <div style={{marginTop:'32px',display:'flex',alignItems:'center',gap:'20px',flexWrap:'wrap'}}>
                <a href="#enquire" className="btn">Book this Yatra</a>
                <span className="serif" style={{fontSize:'1.35rem'}}>from <b style={{color:'var(--red)'}}>₹12,500</b> per person</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Quote ── */}
        <div className="border-tri"></div>
        <section className="quote">
          <div className="wrap">
            <div className="hindi">॥ काशी ॥</div>
            <blockquote>&ldquo;Benares is older than history, older than tradition, older even than legend, and looks twice as old as all of them put together.&rdquo;</blockquote>
            <cite>— Mark Twain, Following the Equator (1897)</cite>
          </div>
        </section>
        <div className="border-tri"></div>

        {/* ── Enquiry ── */}
        <section id="enquire">
          <div className="wrap">
            <div className="enquire frame">
              <div className="left">
                <span className="eyebrow" style={{color:'var(--turmeric)'}}>Begin Your Yatra</span>
                <h2 style={{marginTop:'10px'}}>Plan your journey to Kashi</h2>
                <p>Tell us when you&apos;d like to come and what calls you. We&apos;ll reply within a day with a plan made for you.</p>
                <ul>
                  <li>Custom pilgrimages for families &amp; elders</li>
                  <li>Airport &amp; railway pickups</li>
                  <li>Stays near the ghats</li>
                  <li>Hindi, English &amp; Bengali guides</li>
                </ul>
                <svg className="tree" viewBox="0 0 160 200" aria-hidden="true"><use href="#tree"/></svg>
              </div>
              <form noValidate onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name">Your name</label>
                  <input id="name" required placeholder="Full name" />
                </div>
                <div>
                  <label htmlFor="phone">Phone / WhatsApp</label>
                  <input id="phone" type="tel" required placeholder="+91" />
                </div>
                <div className="full">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="date">Travel date</label>
                  <input id="date" type="date" />
                </div>
                <div>
                  <label htmlFor="people">Travellers</label>
                  <select id="people" defaultValue="2">
                    <option>1</option>
                    <option>2</option>
                    <option>3–5</option>
                    <option>6+</option>
                  </select>
                </div>
                <div className="full">
                  <label htmlFor="tour">Interested in</label>
                  <select id="tour">
                    <option>3-Day Kashi Pilgrimage</option>
                    <option>Ganga Aarti by Boat</option>
                    <option>Sunrise Boat Ride</option>
                    <option>Kashi Vishwanath Temple Trail</option>
                    <option>Sarnath Day Trip</option>
                    <option>Old City Heritage Walk</option>
                    <option>Banarasi Food &amp; Silk Trail</option>
                    <option>Something custom</option>
                  </select>
                </div>
                <div className="full">
                  <label htmlFor="msg">Anything we should know?</label>
                  <textarea id="msg" placeholder="Elders travelling, special puja, dietary needs…"></textarea>
                </div>
                <div className="full" style={{display:'flex',alignItems:'center',gap:'16px',flexWrap:'wrap'}}>
                  <button className="btn" type="submit">Send Enquiry</button>
                  <span className="form-note" role="status">{formNote}</span>
                </div>
              </form>
            </div>
          </div>
        </section>

      </main>

      <div className="border-loop"></div>

      {/* ── Footer ── */}
      <footer>
        <div className="wrap">
          <div className="foot">
            <div>
              <a href="#top" className="brand" style={{marginBottom:'14px'}}>
                <svg viewBox="0 0 120 120"><use href="#sun"/></svg>
                <span><b>Kashi Yatra</b><small>Journeys of the Spirit</small></span>
              </a>
              <p style={{fontSize:'.95rem',maxWidth:'22rem'}}>Spiritual tours and travel in Varanasi, guided by the people who call the ghats home.</p>
            </div>
            <div>
              <h4>Tours</h4>
              <ul>
                <li><a href="#tours">Ganga Aarti</a></li>
                <li><a href="#tours">Sunrise Boat</a></li>
                <li><a href="#tours">Temple Trail</a></li>
                <li><a href="#tours">Sarnath</a></li>
              </ul>
            </div>
            <div>
              <h4>Explore</h4>
              <ul>
                <li><a href="#experience">Our Way</a></li>
                <li><a href="#itinerary">3-Day Yatra</a></li>
                <li><a href="#enquire">Custom Trips</a></li>
              </ul>
            </div>
            <div>
              <h4>Visit</h4>
              <ul>
                <li>Near Dashashwamedh Ghat</li>
                <li>Varanasi, Uttar Pradesh</li>
                <li>hello@yourdomain.com</li>
                <li>+91 00000 00000</li>
              </ul>
            </div>
          </div>
          <div className="copy">
            <span>© {new Date().getFullYear()} Kashi Yatra. All rights reserved.</span>
            <span>हर हर महादेव 🪔</span>
          </div>
        </div>
      </footer>

    </div>
  )
}

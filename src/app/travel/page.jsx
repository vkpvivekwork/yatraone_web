import Navbar from '@/app/components/Navbar'

const U = (id, w = 800) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .28 0 0 0 0 .16 0 0 0 0 .04 0 0 0 .1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

export const metadata = {
  title: 'Travel Stories & News — Yatra Ke Sathi',
  description: 'Latest travel news, tourism updates and travel stories from Varanasi, Ayodhya, Prayagraj and across India.',
  alternates: { canonical: 'https://yatraksathi.com/travel' },
}

const ARTICLES = [
  {
    slug: 'varanasi-ayodhya-replace-vatican-city-top-tourist-destinations',
    title: 'Varanasi & Ayodhya Now Rank Above Vatican City Among World\'s Top Tourist Destinations',
    excerpt: 'Varanasi and Ayodhya have emerged as the world\'s two most popular tourist destinations, surpassing Vatican City, according to UP Chief Minister\'s advisor Awanish Kumar Awasthi speaking at the Network18 Rising Bharat Summit.',
    date: 'November 17, 2024',
    category: 'Tourism News',
    img: '1705952484283-19c31e37e0e4',
    readTime: '3 min read',
  },
  {
    slug: 'india-named-worlds-top-travel-destination-2027',
    title: 'India Named World\'s Top Travel Destination for 2027 by Travel + Leisure',
    excerpt: 'Travel + Leisure magazine has selected India as its Destination of the Year for 2027, citing its extraordinary culture, rapid growth, and world-class hospitality — with Varanasi among the standout experiences.',
    date: 'December 2024',
    category: 'Travel Awards',
    img: '1596097825168-c9b773f404ff',
    readTime: '4 min read',
  },
]

export default function TravelPage() {
  return (
    <div style={{ background: '#F5E8AE', backgroundImage: GRAIN, minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,700;9..144,900&family=Tiro+Devanagari+Hindi&display=swap');
      `}</style>

      <div className="topbar"><div className="wrap">
        <span className="hi">हर हर महादेव · जय श्री राम</span>
        <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
      </div></div>
      <Navbar />

      <main>
        {/* Header */}
        <section style={{ padding: '60px 0 40px', textAlign: 'center' }}>
          <div className="wrap">
            <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '1rem', color: '#B5421A', fontWeight: 700, marginBottom: '10px' }}>यात्रा समाचार</div>
            <h1 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(2rem,5vw,3rem)', color: '#3A1408', margin: '0 0 14px' }}>Travel Stories & News</h1>
            <p style={{ color: '#5A3F28', fontSize: '1rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.65 }}>Tourism updates, travel inspiration and stories from Varanasi, Ayodhya, Prayagraj and across India.</p>
          </div>
        </section>

        {/* Articles Grid */}
        <section style={{ padding: '0 0 80px' }}>
          <div className="wrap">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '28px', maxWidth: '900px', margin: '0 auto' }}>
              {ARTICLES.map(a => (
                <a key={a.slug} href={`/travel/${a.slug}`} style={{ textDecoration: 'none', display: 'block', background: '#FAF5E0', backgroundImage: GRAIN, border: '1.5px solid rgba(196,146,37,.35)', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 6px 24px rgba(43,26,14,.12)', transition: 'transform .2s,box-shadow .2s' }}>
                  <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={U(a.img, 700)} alt={a.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ padding: '20px 22px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <span style={{ background: 'rgba(181,66,26,.1)', color: '#B5421A', fontSize: '.7rem', fontWeight: 700, letterSpacing: '.08em', padding: '3px 10px', borderRadius: '20px', textTransform: 'uppercase' }}>{a.category}</span>
                      <span style={{ fontSize: '.7rem', color: '#8B5E1A' }}>{a.readTime}</span>
                    </div>
                    <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800, fontSize: '1.1rem', color: '#3A1408', lineHeight: 1.35, margin: '0 0 10px' }}>{a.title}</h2>
                    <p style={{ fontSize: '.85rem', color: '#5A3F28', lineHeight: 1.6, margin: '0 0 16px' }}>{a.excerpt}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '.75rem', color: '#8B5E1A' }}>{a.date}</span>
                      <span style={{ fontSize: '.82rem', fontWeight: 700, color: '#B5421A' }}>Read More →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="big-hi" aria-hidden="true">काशी</div>
        <div className="wrap">
          <div className="foot">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <a href="/" className="logo" style={{ marginBottom: '14px' }}><img src="/images/yatra-k-sathi-logo.png" alt="Yatra Ke Sathi" style={{ height: '60px', width: 'auto', display: 'block' }} /></a>
              <p style={{ fontSize: '.93rem', maxWidth: '22rem', color: '#cdb892' }}>Tours, cabs, boats and hotels in Kashi, arranged by people who live here.</p>
            </div>
            <div><h4>Tours</h4><ul>
              <li><a href="/tours">All Packages</a></li>
              <li><a href="/tours/varanasi-tour-package-3-days-2-nights">Varanasi 3D/2N</a></li>
              <li><a href="/tours/varanasi-ayodhya-prayagraj-tour-package">Tri-city Yatra</a></li>
            </ul></div>
            <div><h4>Travel</h4><ul>
              <li><a href="/travel">Travel News</a></li>
              <li><a href="/travel/varanasi-ayodhya-replace-vatican-city-top-tourist-destinations">Varanasi & Ayodhya News</a></li>
              <li><a href="/travel/india-named-worlds-top-travel-destination-2027">India 2027</a></li>
            </ul></div>
            <div><h4>Contact</h4><ul>
              <li>Varanasi, Uttar Pradesh</li>
              <li><a href="tel:+919277472279">+91 92774 72279</a></li>
              <li>info@yatraksathi.com</li>
            </ul></div>
          </div>
          <div className="copy">
            <span>© {new Date().getFullYear()} Yatra Ke Sathi</span>
            <span>Photos: Unsplash</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

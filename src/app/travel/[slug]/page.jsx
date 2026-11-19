import { notFound } from 'next/navigation'
import Navbar from '@/app/components/Navbar'
import { ARTICLES, getArticle } from '@/app/travel/articles'

const U = (id, w = 900) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .28 0 0 0 0 .16 0 0 0 0 .04 0 0 0 .1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
const WA = (name) => `https://wa.me/919277472279?text=${encodeURIComponent(`Namaste! I want to book the ${name}.`)}`

export async function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  const { meta } = article
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: meta.canonical },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
      siteName: 'Yatra Ke Sathi',
      images: [{ url: meta.ogImage, width: 1200, height: 630, alt: article.title }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [meta.ogImage],
    },
  }
}

function renderBlock(block, i) {
  switch (block.type) {
    case 'p':
      return <p key={i} className="art-p" dangerouslySetInnerHTML={{ __html: block.html }} />
    case 'h2':
      return <h2 key={i} className="art-h2">{block.text}</h2>
    case 'h3':
      return <h3 key={i} className="art-h3">{block.text}</h3>
    case 'quote':
      return (
        <blockquote key={i} className="art-quote">
          <p>{block.text}</p>
          {block.cite && <cite>{block.cite}</cite>}
        </blockquote>
      )
    case 'img':
      return (
        <figure key={i} className="art-fig">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={U(block.id, 1000)} alt={block.alt} loading="lazy" />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      )
    case 'list':
      return (
        <ul key={i} className="art-list">
          {block.items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      )
    case 'highlights':
      return (
        <div key={i} className="art-highlights">
          {block.items.map((h, j) => (
            <div key={j} className="art-hl-card">
              <span className="art-hl-icon">{h.icon}</span>
              <div>
                <div className="art-hl-label">{h.label}</div>
                <div className="art-hl-text">{h.text}</div>
              </div>
            </div>
          ))}
        </div>
      )
    case 'source':
      return (
        <div key={i} className="art-source">
          <strong>{block.label}:</strong>{' '}
          <a href={block.url} target="_blank" rel="noopener noreferrer">{block.text} →</a>
        </div>
      )
    default:
      return null
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const { title, date, category, readTime, heroImg, heroAlt, content, relevantTour } = article
  const otherArticles = ARTICLES.filter(a => a.slug !== slug)

  return (
    <div style={{ background: '#F5E8AE', backgroundImage: GRAIN, minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,900&family=Tiro+Devanagari+Hindi&display=swap');

        .art-wrap { max-width: 720px; margin: 0 auto; padding: 0 20px; }

        .art-p { font-size: 1.05rem; color: #2B1A0E; line-height: 1.85; margin: 0 0 20px; font-family: Georgia,serif; }
        .art-h2 { font-family: 'Fraunces',Georgia,serif; font-weight: 800; font-size: clamp(1.25rem,2.8vw,1.6rem); color: #3A1408; margin: 40px 0 14px; line-height: 1.25; padding-top: 8px; border-top: 2px solid rgba(196,146,37,.3); }
        .art-h3 { font-family: 'Fraunces',Georgia,serif; font-weight: 700; font-size: 1.1rem; color: #5A2008; margin: 24px 0 8px; }

        .art-quote { background: rgba(196,146,37,.1); border-left: 4px solid #C49225; margin: 32px 0; padding: 22px 26px; border-radius: 0 10px 10px 0; }
        .art-quote p { font-family: 'Fraunces',Georgia,serif; font-size: 1.1rem; font-style: italic; color: #5A2008; margin: 0 0 12px; line-height: 1.65; }
        .art-quote cite { font-size: .8rem; color: #8B5E1A; font-style: normal; font-weight: 600; }

        .art-fig { margin: 32px 0; border-radius: 10px; overflow: hidden; box-shadow: 0 6px 28px rgba(43,26,14,.2); }
        .art-fig img { width: 100%; display: block; max-height: 420px; object-fit: cover; }
        .art-fig figcaption { padding: 10px 16px; background: #FAF0CC; font-size: .75rem; color: #8B5E1A; font-style: italic; }

        .art-list { list-style: none; padding: 0; margin: 0 0 24px; display: flex; flex-direction: column; gap: 10px; }
        .art-list li { display: flex; gap: 12px; align-items: flex-start; font-family: Georgia,serif; font-size: 1rem; color: #2B1A0E; line-height: 1.7; padding: 10px 14px; background: rgba(196,146,37,.07); border-radius: 6px; }
        .art-list li::before { content: '✦'; color: #C49225; font-size: .7rem; margin-top: 5px; flex-shrink: 0; }

        .art-highlights { display: flex; flex-direction: column; gap: 14px; margin: 20px 0 32px; }
        .art-hl-card { display: flex; gap: 16px; align-items: flex-start; background: #FAF0CC; backgroundImage: ${GRAIN}; border: 1.5px solid rgba(196,146,37,.35); border-radius: 10px; padding: 16px 18px; }
        .art-hl-icon { font-size: 1.5rem; flex-shrink: 0; line-height: 1; padding-top: 2px; }
        .art-hl-label { font-family: 'Fraunces',Georgia,serif; font-weight: 700; font-size: .97rem; color: #3A1408; margin-bottom: 4px; }
        .art-hl-text { font-size: .88rem; color: #5A3F28; line-height: 1.65; }

        .art-source { background: #FAF0CC; border: 1.5px solid rgba(196,146,37,.4); border-radius: 8px; padding: 12px 16px; margin-top: 36px; font-size: .82rem; color: #5A3F28; }
        .art-source a { color: #B5421A; font-weight: 600; }
      `}</style>

      <div className="topbar"><div className="wrap">
        <span className="hi">हर हर महादेव · जय श्री राम</span>
        <span><span className="hide-sm">Call / WhatsApp: </span><a href="tel:+919277472279">+91 92774 72279</a></span>
      </div></div>
      <Navbar />

      <main>

        {/* ── Hero ── */}
        <div style={{ position: 'relative', height: 'clamp(260px,42vw,500px)', overflow: 'hidden', background: '#1A0A02' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={U(heroImg, 1400)} alt={heroAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: .72, display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(10,5,0,.8) 0%,rgba(10,5,0,.05) 55%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(20px,4vw,40px)' }}>
            <div className="art-wrap">
              <span style={{ display: 'inline-block', background: '#C49225', color: '#fff', fontSize: '.68rem', fontWeight: 800, letterSpacing: '.12em', padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase', marginBottom: '12px' }}>{category}</span>
              <h1 style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.4rem,3.5vw,2.2rem)', color: '#fff', lineHeight: 1.2, margin: 0, textShadow: '0 2px 20px rgba(0,0,0,.5)' }}>{title}</h1>
            </div>
          </div>
        </div>

        {/* ── Article Meta ── */}
        <div style={{ background: '#FAF0CC', borderBottom: '2px solid rgba(196,146,37,.35)', padding: '14px 0' }}>
          <div className="art-wrap">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <nav style={{ display: 'flex', gap: '5px', alignItems: 'center', fontSize: '.72rem', color: '#8B5E1A' }}>
                <a href="/" style={{ color: '#B5421A' }}>Home</a>
                <span>›</span>
                <a href="/travel" style={{ color: '#B5421A' }}>Travel</a>
                <span>›</span>
                <span style={{ color: '#5A3F28' }}>Article</span>
              </nav>
              <span style={{ color: 'rgba(196,146,37,.5)', fontSize: '1rem' }}>·</span>
              <span style={{ fontSize: '.72rem', color: '#5A3F28', fontWeight: 600 }}>{date}</span>
              <span style={{ color: 'rgba(196,146,37,.5)', fontSize: '1rem' }}>·</span>
              <span style={{ fontSize: '.72rem', color: '#5A3F28' }}>{readTime}</span>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <article style={{ padding: '48px 0 64px' }}>
          <div className="art-wrap">
            {content.map((block, i) => renderBlock(block, i))}
          </div>
        </article>

        {/* ── Relevant Tour Package Card ── */}
        <section style={{ background: '#FAF0CC', backgroundImage: GRAIN, borderTop: '2px solid rgba(196,146,37,.4)', padding: '48px 0' }}>
          <div className="art-wrap">
            <div style={{ fontFamily: "'Tiro Devanagari Hindi',serif", fontSize: '.9rem', color: '#B5421A', fontWeight: 700, marginBottom: '14px' }}>यात्रा की योजना बनाएं</div>
            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1.5px solid rgba(196,146,37,.4)', boxShadow: '0 8px 32px rgba(43,26,14,.18)', background: '#FAF5E0' }}>
              {/* Fixed-ratio image */}
              <div style={{ width: '100%', aspectRatio: '16/7', overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={U(relevantTour.img, 800)} alt={relevantTour.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              {/* Details */}
              <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ display: 'inline-block', background: 'rgba(181,66,26,.12)', color: '#B5421A', fontSize: '.68rem', fontWeight: 800, letterSpacing: '.1em', padding: '3px 10px', borderRadius: '20px', textTransform: 'uppercase', marginBottom: '8px' }}>{relevantTour.badge}</span>
                    <div style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 900, fontSize: 'clamp(1.05rem,2.5vw,1.3rem)', color: '#3A1408', lineHeight: 1.25 }}>{relevantTour.name}</div>
                    <div style={{ fontSize: '.82rem', color: '#8B5E1A', marginTop: '4px', fontWeight: 600 }}>{relevantTour.tagline}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {relevantTour.tags.map(tag => (
                    <span key={tag} style={{ background: 'rgba(196,146,37,.15)', border: '1px solid rgba(196,146,37,.4)', borderRadius: '20px', padding: '3px 10px', fontSize: '.72rem', color: '#5A3F28', fontWeight: 600 }}>{tag}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <a href={relevantTour.href} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'linear-gradient(135deg,#B5421A,#6B2509)', color: '#FAF5E0', padding: '11px 22px', borderRadius: '6px', fontWeight: 700, fontSize: '.9rem', textDecoration: 'none', boxShadow: '0 3px 12px rgba(107,37,9,.3)' }}>
                    View Tour →
                  </a>
                  <a href={WA(relevantTour.name)} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: '#25D366', color: '#fff', padding: '11px 20px', borderRadius: '6px', fontWeight: 700, fontSize: '.9rem', textDecoration: 'none' }}>
                    <svg viewBox="0 0 32 32" width="16" height="16" fill="#fff"><path d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.4.7 4.7 1.9 6.7L3 29l6.9-2.2c1.9 1 4 1.6 6.1 1.6 7 0 12.7-5.6 12.7-12.6S23 3 16 3zm5.9 15.1c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── More Articles ── */}
        {otherArticles.length > 0 && (
          <section style={{ padding: '48px 0 64px' }}>
            <div className="art-wrap">
              <div style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 800, fontSize: '1.2rem', color: '#3A1408', marginBottom: '20px' }}>More from Travel</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {otherArticles.map(a => (
                  <a key={a.slug} href={`/travel/${a.slug}`} style={{ display: 'flex', gap: '16px', alignItems: 'center', background: '#FAF0CC', border: '1.5px solid rgba(196,146,37,.3)', borderRadius: '10px', overflow: 'hidden', textDecoration: 'none' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={U(a.heroImg, 200)} alt={a.title} loading="lazy" style={{ width: '100px', height: '80px', objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ padding: '12px 16px 12px 0' }}>
                      <div style={{ fontSize: '.68rem', fontWeight: 700, color: '#B5421A', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '4px' }}>{a.category}</div>
                      <div style={{ fontFamily: "'Fraunces',Georgia,serif", fontWeight: 700, fontSize: '.95rem', color: '#3A1408', lineHeight: 1.35 }}>{a.title}</div>
                      <div style={{ fontSize: '.72rem', color: '#8B5E1A', marginTop: '4px' }}>{a.date} · {a.readTime}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

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
              <li><a href="/tours/varanasi-ayodhya-prayagraj-tour-package">Tri-city Yatra</a></li>
              <li><a href="/tours/varanasi-tour-package-3-days-2-nights">Varanasi 3D/2N</a></li>
            </ul></div>
            <div><h4>Travel</h4><ul>
              <li><a href="/travel">Travel News</a></li>
              {ARTICLES.map(a => <li key={a.slug}><a href={`/travel/${a.slug}`}>{a.category}</a></li>)}
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

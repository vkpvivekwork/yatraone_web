import Link from 'next/link'
import Navbar from '@/app/components/Navbar'

export const metadata = {
  title: 'Page Not Found | Yatra Ke Sathi',
}

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main style={{ position: 'relative', overflow: 'hidden' }}>

        {/* Background mandala */}
        <svg
          viewBox="0 0 200 200"
          style={{ position: 'absolute', right: '-80px', top: '-60px', width: '480px', height: '480px', opacity: .07, animation: 'turn 120s linear infinite', pointerEvents: 'none' }}
          aria-hidden="true"
        >
          {[...Array(12)].map((_, i) => (
            <ellipse
              key={i}
              cx="100" cy="100" rx="80" ry="30"
              fill="none" stroke="var(--saffron-deep)" strokeWidth=".8"
              transform={`rotate(${i * 15} 100 100)`}
            />
          ))}
          <circle cx="100" cy="100" r="12" fill="var(--saffron-deep)" opacity=".6" />
          <circle cx="100" cy="100" r="4" fill="var(--marigold)" />
        </svg>

        {/* Dots accent */}
        <div
          className="dots-bg"
          style={{ position: 'absolute', left: '5%', top: '15%', width: '120px', height: '150px', opacity: .4, borderRadius: '8px', pointerEvents: 'none' }}
          aria-hidden="true"
        />

        <div className="wrap" style={{ paddingTop: '80px', paddingBottom: '100px', textAlign: 'center', position: 'relative' }}>

          {/* Handwritten label */}
          <p className="hand" style={{ fontSize: '1.2rem', color: 'var(--saffron-deep)', transform: 'rotate(-2deg)', display: 'inline-block', marginBottom: '10px' }}>
            Oops…
          </p>

          {/* Big 404 */}
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '8px' }}>
            <span style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 700,
              fontSize: 'clamp(7rem, 20vw, 14rem)',
              lineHeight: 1,
              color: 'var(--paper-3)',
              WebkitTextStroke: '3px var(--saffron)',
              display: 'block',
              letterSpacing: '-.04em',
              userSelect: 'none',
            }}>
              404
            </span>
          </div>

          {/* Hindi headline */}
          <p className="hi" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: 'var(--saffron-deep)', lineHeight: 1.2, marginBottom: '8px' }}>
            रास्ता भटक गए?
          </p>

          <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 600, marginBottom: '16px', color: 'var(--ink)' }}>
            This page has wandered off the path
          </h1>

          <p style={{ color: 'var(--ink-soft)', maxWidth: '400px', margin: '0 auto 40px', fontSize: '1.03rem', lineHeight: 1.7 }}>
            The page you are looking for may have moved, been renamed, or no longer exists. Let us guide you back.
          </p>

          {/* Lotus divider */}
          <div className="lotus-div" style={{ marginBottom: '40px' }} aria-hidden="true">
            <svg viewBox="0 0 42 26" fill="currentColor">
              <path d="M21 2C17 8 10 10 4 9c3 4 8 6 13 5-2 3-4 6-4 9 2-2 5-4 8-4s6 2 8 4c0-3-2-6-4-9 5 1 10-1 13-5-6 1-13-1-17-7z" opacity=".9"/>
            </svg>
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '60px' }}>
            <Link href="/" className="btn">
              ← Go Home
            </Link>
            <Link href="/tours" className="btn line">
              View Tour Packages
            </Link>
            <Link
              href={`https://wa.me/919277472279?text=${encodeURIComponent('Namaste! I need help finding a page on your website.')}`}
              className="btn wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '18px', height: '18px' }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.874L.057 23.886a.5.5 0 00.609.61l6.101-1.496A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.655-.49-5.19-1.348l-.369-.214-3.826.938.972-3.724-.232-.382A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Chat with us
            </Link>
          </div>

          {/* Quick links */}
          <p style={{ fontSize: '.82rem', fontWeight: 600, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '14px' }}>
            Popular pages
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { href: '/services',    label: 'Services' },
              { href: '/tours',       label: 'Tour Packages' },
              { href: '/cab',         label: 'Cab Booking' },
              { href: '/boat-rides',  label: 'Boat Rides' },
              { href: '/about',       label: 'About Us' },
              { href: '/plan-yatra',  label: 'Plan My Yatra' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: '.88rem',
                  background: 'var(--cream)',
                  border: '1px solid var(--line)',
                  borderRadius: '999px',
                  padding: '5px 16px',
                  color: 'var(--ink-soft)',
                  transition: 'border-color .2s, color .2s',
                }}
              >
                {label}
              </Link>
            ))}
          </div>

        </div>
      </main>
    </>
  )
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Props {
  onDone: () => void;
}

export default function Preloader({ onDone }: Props) {
  const rootRef    = useRef<HTMLDivElement>(null);
  const logoRef    = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ringsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root    = rootRef.current;
    const logo    = logoRef.current;
    const tagline = taglineRef.current;
    const rings   = ringsRef.current;
    if (!root || !logo || !tagline || !rings) return;

    document.body.style.overflow = 'hidden';

    const ringEls = rings.querySelectorAll<HTMLElement>('.pl-ring');

    // ── Continuous ring spins ──────────────────────────────────────
    const spinners = Array.from(ringEls).map((el, i) =>
      gsap.to(el, {
        rotation: (i % 2 === 0 ? 1 : -1) * 360,
        duration: 2.2 + i * 0.6,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })
    );

    const pulses = Array.from(ringEls).map((el, i) =>
      gsap.to(el, {
        scale: 1 + 0.06 * (i + 1),
        duration: 1.1 + i * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: '50% 50%',
      })
    );

    const tl = gsap.timeline({
      onComplete: () => {
        spinners.forEach((s) => s.kill());
        pulses.forEach((p) => p.kill());
        document.body.style.overflow = '';
        onDone();
      },
    });

    // ① Rings in
    tl.fromTo(ringEls,
      { scale: 0.3, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.4)' }
    );

    // ② Logo letters in
    tl.fromTo(logo.querySelectorAll('.pl-letter'),
      { y: 50, opacity: 0, rotateX: 35 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.65, stagger: 0.05, ease: 'power3.out' },
      '-=0.3'
    );

    // ③ Tagline in
    tl.fromTo(tagline,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' },
      '-=0.25'
    );

    // ④ Hold
    tl.to({}, { duration: 1.4 });

    // ⑤ Content fades — rings shrink, letters drift up
    tl.to(ringEls, { opacity: 0, scale: 0.6, duration: 0.5, stagger: 0.04, ease: 'power2.in' }, '+=0.05');
    tl.to(logo.querySelectorAll('.pl-letter'),
      { y: -24, opacity: 0, duration: 0.45, stagger: 0.025, ease: 'power2.in' },
      '<+0.05'
    );
    tl.to(tagline, { opacity: 0, duration: 0.3, ease: 'power2.in' }, '<');

    // ⑥ Entire panel slides up and off screen
    tl.to(root, {
      y: '-100%',
      duration: 0.75,
      ease: 'power3.inOut',
    }, '+=0.05');

    return () => {
      tl.kill();
      spinners.forEach((s) => s.kill());
      pulses.forEach((p) => p.kill());
      document.body.style.overflow = '';
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={rootRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#1A1814',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Rings ── */}
      <div
        ref={ringsRef}
        style={{ position: 'relative', width: 120, height: 120, marginBottom: '2.5rem' }}
      >
        <span className="pl-ring" style={{ position: 'absolute', inset: 0,  borderRadius: '50%', border: '1.5px solid rgba(43,92,230,0.35)', borderTopColor: '#2B5CE6',                 opacity: 0 }} />
        <span className="pl-ring" style={{ position: 'absolute', inset: 16, borderRadius: '50%', border: '1.5px solid rgba(107,155,255,0.25)', borderBottomColor: '#6B9BFF',             opacity: 0 }} />
        <span className="pl-ring" style={{ position: 'absolute', inset: 32, borderRadius: '50%', border: '1.5px solid rgba(184,146,42,0.3)',   borderLeftColor: '#B8922A',               opacity: 0 }} />
        <span className="pl-ring" style={{ position: 'absolute', inset: 46, borderRadius: '50%', border: '1px solid rgba(245,243,239,0.12)',   borderRightColor: 'rgba(245,243,239,0.5)', opacity: 0 }} />
        <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 5, height: 5, borderRadius: '50%', background: '#2B5CE6', boxShadow: '0 0 10px rgba(43,92,230,0.8)' }} />
      </div>

      {/* ── Logo ── */}
      <div
        ref={logoRef}
        aria-label="Stackora Labs"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(48px, 7.5vw, 88px)',
          fontWeight: 700,
          color: '#F5F3EF',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          display: 'flex',
          perspective: '600px',
          overflow: 'hidden',
          paddingBottom: '0.05em',
        }}
      >
        {'Stackora'.split('').map((ch, i) => (
          <span key={i} className="pl-letter" style={{ display: 'inline-block', opacity: 0 }}>{ch}</span>
        ))}
        <span className="pl-letter" style={{ display: 'inline-block', opacity: 0, color: '#2B5CE6', marginLeft: '0.18em' }}>Labs</span>
      </div>

      {/* ── Tagline ── */}
      <p
        ref={taglineRef}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(11px, 1.2vw, 13px)',
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(245,243,239,0.3)',
          marginTop: '0.75rem',
          opacity: 0,
        }}
      >
        GCC Ecommerce Engineering
      </p>
    </div>
  );
}

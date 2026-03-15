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

    // ── Continuous ring spins (independent of main timeline) ──────
    const spinners = Array.from(ringEls).map((el, i) => {
      const dir = i % 2 === 0 ? 1 : -1;
      const dur = 2.2 + i * 0.6;
      return gsap.to(el, {
        rotation: dir * 360,
        duration: dur,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      });
    });

    // ── Pulse scale on rings ──────────────────────────────────────
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

    // ── Main sequence ─────────────────────────────────────────────
    const tl = gsap.timeline({
      onComplete: () => {
        spinners.forEach((s) => s.kill());
        pulses.forEach((p) => p.kill());
        document.body.style.overflow = '';
        onDone();
      },
    });

    // ① Rings fade + scale in with stagger
    tl.fromTo(
      ringEls,
      { scale: 0.3, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.4)' }
    );

    // ② Logo letters stagger in
    tl.fromTo(
      logo.querySelectorAll('.pl-letter'),
      { y: 50, opacity: 0, rotateX: 35 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.65, stagger: 0.05, ease: 'power3.out' },
      '-=0.3'
    );

    // ③ Tagline fades up
    tl.fromTo(
      tagline,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' },
      '-=0.25'
    );

    // ④ Hold while rings spin
    tl.to({}, { duration: 1.3 });

    // ⑤ Exit — rings collapse inward, content fades
    tl.to(ringEls, { scale: 0, opacity: 0, duration: 0.4, stagger: 0.06, ease: 'power3.in' }, '+=0.05');
    tl.to(logo,    { y: -24, opacity: 0, duration: 0.35, ease: 'power3.in' }, '<');
    tl.to(tagline, { y: 14,  opacity: 0, duration: 0.3,  ease: 'power3.in' }, '<+0.05');

    // ⑥ Curtain wipe
    tl.to(root, { clipPath: 'inset(50% 0% 50% 0%)', duration: 0.5, ease: 'power4.inOut' }, '-=0.1');
    tl.to(root, { opacity: 0, duration: 0.15, ease: 'none' });

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
        clipPath: 'inset(0% 0% 0% 0%)',
      }}
    >
      {/* ── Animated rings ── */}
      <div
        ref={ringsRef}
        style={{
          position: 'relative',
          width: 120,
          height: 120,
          marginBottom: '2.5rem',
        }}
      >
        {/* Ring 1 — outermost, slow */}
        <span
          className="pl-ring"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1.5px solid rgba(43,92,230,0.35)',
            borderTopColor: '#2B5CE6',
            opacity: 0,
          }}
        />
        {/* Ring 2 — mid */}
        <span
          className="pl-ring"
          style={{
            position: 'absolute',
            inset: 16,
            borderRadius: '50%',
            border: '1.5px solid rgba(107,155,255,0.25)',
            borderBottomColor: '#6B9BFF',
            opacity: 0,
          }}
        />
        {/* Ring 3 — inner */}
        <span
          className="pl-ring"
          style={{
            position: 'absolute',
            inset: 32,
            borderRadius: '50%',
            border: '1.5px solid rgba(184,146,42,0.3)',
            borderLeftColor: '#B8922A',
            opacity: 0,
          }}
        />
        {/* Ring 4 — innermost dot ring */}
        <span
          className="pl-ring"
          style={{
            position: 'absolute',
            inset: 46,
            borderRadius: '50%',
            border: '1px solid rgba(245,243,239,0.12)',
            borderRightColor: 'rgba(245,243,239,0.5)',
            opacity: 0,
          }}
        />

        {/* Centre dot */}
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: '#2B5CE6',
            boxShadow: '0 0 10px rgba(43,92,230,0.8)',
          }}
        />
      </div>

      {/* ── Logo word-mark ── */}
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
          <span key={i} className="pl-letter" style={{ display: 'inline-block', opacity: 0 }}>
            {ch}
          </span>
        ))}
        <span
          className="pl-letter"
          style={{ display: 'inline-block', opacity: 0, color: '#2B5CE6', marginLeft: '0.18em' }}
        >
          Labs
        </span>
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

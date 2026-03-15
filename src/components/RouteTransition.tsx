import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

/**
 * Horizontal card-sweep transition.
 * A skewed panel sweeps in from the right, briefly covers the screen
 * (scroll-to-top happens here), then sweeps out to the left —
 * like a card being dealt across the table.
 *
 * Extra 120 % width + negative left offset keeps the skewed
 * leading/trailing edges off-screen.
 */
export default function RouteTransition() {
  const panelRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isFirst  = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    const panel = panelRef.current;
    if (!panel) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.inOut' } });

    tl
      // ① Sweep in from right — skew gives it a dynamic, leaning-forward feel
      .fromTo(panel,
        { xPercent: 115, skewX: -6, opacity: 1 },
        { xPercent: 0,   skewX: 0,  duration: 0.42 }
      )
      // ② Scroll to top while the panel covers the viewport
      .call(() => window.scrollTo(0, 0))
      // ③ Short beat — eye registers the colour / brand mark
      .to({}, { duration: 0.08 })
      // ④ Sweep out to the left — slight skew back for a "rebound" feel
      .to(panel,
        { xPercent: -115, skewX: 6, duration: 0.4 }
      )
      // ⑤ Park back off-right for the next transition
      .set(panel, { xPercent: 115, skewX: 0 });

    return () => { tl.kill(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    /* Clip wrapper — prevents the over-wide panel from ever causing overflow */
    <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden">
      <div
        ref={panelRef}
        aria-hidden="true"
        /* 120 % wide, centered — skewed edges stay outside the clip */
        style={{
          position: 'absolute',
          inset: 0,
          width: '120%',
          left: '-10%',
          transform: 'translateX(115%)',
          background:
            'linear-gradient(105deg, var(--ink) 0%, var(--ink) 82%, var(--accent) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Ghost watermark — barely visible brand mark */}
        <span
          aria-hidden="true"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(120px, 18vw, 220px)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.045)',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          S
        </span>
      </div>
    </div>
  );
}

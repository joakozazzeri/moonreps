import { useEffect, useRef } from 'react';

export default function RingCursor() {
  const ringRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ring = ringRef.current;
    if (!ring) return;

    let tx = -200, ty = -200;
    let cx = -200, cy = -200;
    let rafId;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    // Al hacer click: spawner un ripple que se expande y desaparece
    const onClick = (e) => {
      const r = document.createElement('div');
      r.style.cssText = [
        'position:fixed',
        `left:${e.clientX}px`,
        `top:${e.clientY}px`,
        'width:30px',
        'height:30px',
        'border:1px solid rgba(110,170,255,0.55)',
        'border-radius:50%',
        'pointer-events:none',
        'z-index:9998',
        'transform:translate(-50%,-50%) scale(1)',
        'animation:ringExpand 0.55s cubic-bezier(0.23,1,0.32,1) forwards',
      ].join(';');
      document.body.appendChild(r);
      r.addEventListener('animationend', () => r.remove(), { once: true });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('click', onClick, { passive: true });

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      cx = lerp(cx, tx, 0.13);
      cy = lerp(cy, ty, 0.13);
      ring.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
      rafId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '30px',
        height: '30px',
        border: '1px solid rgba(110,170,255,0.38)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-200px,-200px) translate(-50%,-50%)',
      }}
    />
  );
}

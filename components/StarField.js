import { useEffect, useRef } from 'react';

export default function StarField({ count = 260 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    let rafId;
    let stars = [];
    const meteors = [];

    const init = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;

      stars = Array.from({ length: count }, () => {
        const big = Math.random() < 0.16;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: big ? Math.random() * 1.6 + 1.2 : Math.random() * 0.9 + 0.2,
          baseOpacity: big
            ? Math.random() * 0.45 + 0.38
            : Math.random() * 0.42 + 0.14,
          twinkleAmp:  Math.random() * 0.42,
          twinkleSpeed: Math.random() * 0.024 + 0.007,
          twinkleOffset: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.028,
          vy: (Math.random() - 0.5) * 0.028,
          big,
        };
      });
    };

    // ── Shooting stars ──────────────────────────────────────────
    const spawnMeteor = () => {
      const w = canvas.width;
      const h = canvas.height;
      const angle = Math.PI / 6 + Math.random() * (Math.PI / 6); // 30–60°
      const speed = 5 + Math.random() * 3.5;
      const trailLen = 100 + Math.random() * 80;
      const fromTop = Math.random() < 0.65;

      meteors.push({
        x: fromTop ? Math.random() * w * 0.75 : 0,
        y: fromTop ? 0 : Math.random() * h * 0.5,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        speed,
        trailLen,
        life: 1,
        decay: speed / (trailLen + 320),
      });
    };

    let shootTimer;
    if (!reduced) {
      const scheduleNext = () => {
        shootTimer = setTimeout(() => {
          spawnMeteor();
          scheduleNext();
        }, 3000 + Math.random() * 5000);
      };
      shootTimer = setTimeout(() => {
        spawnMeteor();
        scheduleNext();
      }, 1000);
    }

    // ── Render loop ──────────────────────────────────────────────
    let t = 0;
    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Stars
      for (const s of stars) {
        if (!reduced) {
          s.x = ((s.x + s.vx) % w + w) % w;
          s.y = ((s.y + s.vy) % h + h) % h;
        }

        const op = Math.max(
          0,
          s.baseOpacity + s.twinkleAmp * Math.sin(t * s.twinkleSpeed + s.twinkleOffset)
        );

        if (s.big) {
          const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 6);
          grad.addColorStop(0, `rgba(170, 210, 255, ${op * 0.38})`);
          grad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 6, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(205, 225, 255, ${op})`;
        ctx.fill();
      }

      // Meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.life -= m.decay;

        if (m.life <= 0 || m.x > w + 150 || m.y > h + 150) {
          meteors.splice(i, 1);
          continue;
        }

        const tx = m.x - (m.vx / m.speed) * m.trailLen;
        const ty = m.y - (m.vy / m.speed) * m.trailLen;

        const grad = ctx.createLinearGradient(tx, ty, m.x, m.y);
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(0.55, `rgba(190,220,255,${m.life * 0.38})`);
        grad.addColorStop(1, `rgba(235,248,255,${m.life * 0.92})`);

        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.life * 2.4 + 0.3;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Cabeza brillante
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.life * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 252, 255, ${m.life * 0.95})`;
        ctx.fill();
      }

      t++;
      rafId = requestAnimationFrame(render);
    };

    init();
    render();

    const onResize = () => init();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(shootTimer);
      window.removeEventListener('resize', onResize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}

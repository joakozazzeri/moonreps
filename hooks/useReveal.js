import { useEffect } from 'react';

/**
 * Observa todos los elementos con clase `.reveal` y les agrega `.is-visible`
 * cuando entran en el viewport. Re-corre cuando cambian las deps (ej: cambio
 * de página o categoría vuelven a crear elementos .reveal sin la clase).
 */
export function useReveal(deps = []) {
  useEffect(() => {
    let observer;

    const raf = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.06, rootMargin: '0px 0px -20px 0px' }
      );

      document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => {
        observer.observe(el);
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

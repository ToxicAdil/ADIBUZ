import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls the window to the top on every route change.
 * Place this once inside <BrowserRouter> — no UI rendered.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      let frame = 0;

      const scrollToHash = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'instant', block: 'start' });
          return;
        }

        if (frame < 8) {
          frame += 1;
          requestAnimationFrame(scrollToHash);
        }
      };

      requestAnimationFrame(scrollToHash);
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

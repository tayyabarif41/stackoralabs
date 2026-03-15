import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Handles scroll restoration for non-Link navigations
 * (browser back/forward, direct URL entry).
 * Link-based navigations are handled by RouteTransition.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Isso corrige o erro vermelho: ensina ao TS que gtag existe
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-F0M7EK8WZ9', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
};

export default Analytics;
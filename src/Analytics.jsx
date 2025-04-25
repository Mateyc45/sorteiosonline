
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-F0M7EK8WZ9', {
        page_path: location.pathname,
      });
    }
  }, [location]);

  return null;
};

export default Analytics;

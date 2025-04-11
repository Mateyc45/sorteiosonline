// components/BannerAd.tsx
import { useEffect, useRef } from 'react';

const BannerAd = () => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadScript = () => {
      if (!bannerRef.current || window.adScriptLoaded) return;

      const script = document.createElement('script');
      script.src = '//scornful-idea.com/btX/Vws.dAG/le0/YkWRdYi/YDWv5ru/ZwXQIC/qeMm-9Tu/ZDUblpkTPcTuYyxiMYzJYZyYN/zLMKtyNYjKEvztNWjDIw3CNWA_';
      script.async = true;
      script.referrerPolicy = 'no-referrer-when-downgrade';
      
      bannerRef.current.appendChild(script);
      window.adScriptLoaded = true;
    };

    loadScript();
  }, []);

  return (
    <div className="banner-container" ref={bannerRef} 
         style={{ 
           width: '100%',
           display: 'flex',
           justifyContent: 'center',
           margin: '40px 0',
           minHeight: '250px' // Altura mínima para evitar CLS
         }} 
    />
  );
};

export default BannerAd;
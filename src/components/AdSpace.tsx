'use client';

import React, { useEffect, useRef } from 'react';

export function AdSpace() {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdPushed = useRef(false);

  useEffect(() => {
    if (adRef.current && !isAdPushed.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdPushed.current = true;
      } catch (error) {
        console.error('Error loading AdSense:', error);
      }
    }
  }, []);

  return (
    <div>
      <p className="mt-8 text-center text-gray-500">Publicidade</p>
      <div className=" rounded-lg border border-dashed border-gray-300 p-6">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="pub-6732428339083295"
          data-ad-slot="YOUR_AD_SLOT"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
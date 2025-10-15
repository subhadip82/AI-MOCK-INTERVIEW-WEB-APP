"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const AppDownloadPopup = dynamic(() => import('./AppDownloadPopup'), {
  ssr: false,
  loading: () => null
});

const ClientAppDownloadPopup = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return <AppDownloadPopup />;
};

export default ClientAppDownloadPopup;

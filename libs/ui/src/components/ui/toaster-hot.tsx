'use client';

import { Toaster as HotToaster } from 'react-hot-toast';

export function ToasterHot() {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: { background: '#333', color: '#fff' },
        success: { icon: '🚀' },
        error: { icon: '❌' },
      }}
    />
  );
}

export { toast } from 'react-hot-toast';

'use client';

import {useEffect} from 'react';

export default function Error({
  error,
  reset
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container py-10">
      <h2 style={{fontWeight: 700, fontSize: 20}}>Something went wrong</h2>
      <p style={{opacity: 0.8}}>{error.message}</p>
      <button
        onClick={() => reset()}
        style={{
          padding: '8px 14px',
          borderRadius: 10,
          border: '1px solid #444',
          background: 'transparent',
          cursor: 'pointer',
          marginTop: 12
        }}
      >
        Try again
      </button>
    </div>
  );
}

'use client';

import {useEffect} from 'react';

export default function GlobalError({
  error,
  reset
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  useEffect(() => {
    // Logs with stack in production
    // eslint-disable-next-line no-console
    console.error('GlobalError', error, error?.stack);
  }, [error]);

  return (
    <html>
      <body className="container py-10">
        <h2 style={{fontWeight: 700, fontSize: 20}}>Something went wrong</h2>
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            background: '#111',
            padding: 12,
            borderRadius: 10,
            border: '1px solid #333',
            marginTop: 10,
            maxWidth: 900,
            overflow: 'auto'
          }}
        >
{String(error?.message || error)}
{'\n'}
{error?.stack || ''}
        </pre>
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
          Reload page
        </button>
      </body>
    </html>
  );
}

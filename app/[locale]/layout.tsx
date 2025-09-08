import '../globals.css';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Script from 'next/script';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import type {ReactNode} from 'react';

const LOCALES = ['ar', 'en', 'fr'] as const;

export default function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;

  if (!LOCALES.includes(locale as any)) notFound();
  setRequestLocale(locale as any);

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <NavBar />
        {children}
        <Footer />
        <Script
          defer
          data-domain="tahirsalami.com"
          src="https://plausible.io/js/script.js"
        />
      </body>
    </html>
  );
}


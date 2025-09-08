import '../globals.css';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Script from 'next/script';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import type {ReactNode} from 'react';

type Locale = 'ar' | 'en' | 'fr';
const LOCALES: readonly Locale[] = ['ar', 'en', 'fr'] as const;

export default async function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const {locale} = await params;

  if (!LOCALES.includes(locale)) notFound();
  setRequestLocale(locale);

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

import type { Metadata } from 'next';
import './globals.css';
import {routing} from '@/i18n/routing';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Tahir Salami',
  description: 'Official site for artist Tahir Salami',
};

type Locale = (typeof routing.locales)[number];

export default function RootLayout({children, params}:{children: React.ReactNode; params: {locale: Locale}}) {
  const locale = params.locale;

  if (!routing.locales.includes(locale)) notFound();

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <NavBar />
        {children}
        <Footer />
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-Q1CKHXW9EK" strategy="afterInteractive" />
        <Script id="ga-setup" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Q1CKHXW9EK');
          `}
        </Script>
      </body>
    </html>
  );
}

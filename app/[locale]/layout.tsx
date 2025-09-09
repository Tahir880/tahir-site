import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {setRequestLocale} from 'next-intl/server';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ErrorCatcher from '@/components/ErrorCatcher';
import Script from 'next/script';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Tahir',
  description: 'Official website'
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: 'ar' | 'en' | 'fr'}>;
}) {
  const {locale} = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ErrorCatcher name="NavBar">
            <NavBar />
          </ErrorCatcher>

          <ErrorCatcher name="Content">{children}</ErrorCatcher>

          <ErrorCatcher name="Footer">
            <Footer />
          </ErrorCatcher>

          <Script
            id="org-jsonld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'Tahir'
              })
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

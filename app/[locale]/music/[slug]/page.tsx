import {notFound} from 'next/navigation';
import {getTranslations} from 'next-intl/server';
import {tracks} from '@/data/tracks';
import TrackCard from '@/components/TrackCard';
import Link from 'next/link';
import TrackJsonLd from '@/components/TrackJsonLd';

type Params = {locale: 'ar'|'en'|'fr'; slug: string};

export async function generateStaticParams() {
  return tracks.map(t => ({slug: t.slug, locale: 'en'}));
}

export default async function TrackPage({params}:{params: Params}){
  const t = await getTranslations('nav');
  const tr = tracks.find(tt => tt.slug === params.slug);
  if (!tr) notFound();

  const displayTitle = (tr as any)?.titles?.[params.locale] ?? tr.title;

  return (
    <section className="container py-10 md:py-16 grid gap-6">
      <h2>{displayTitle}</h2>
      <TrackCard track={tr as any}/>
      <div><Link href="/music" className="btn btn-ghost no-underline">← {t('music')}</Link></div>
      <TrackJsonLd track={tr as any} locale={params.locale} />
    </section>
  );
}

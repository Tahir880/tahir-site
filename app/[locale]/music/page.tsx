import {tracks} from '@/data/tracks';
import TrackCard from '@/components/TrackCard';
import {getTranslations} from 'next-intl/server';

export default async function MusicPage(){
  const t = await getTranslations('music');
  return (
    <section className="container py-10 md:py-16 space-y-6">
      <h2>{t('title')}</h2>
      <p className="text-white/70">{t('desc')}</p>
      <div className="grid gap-4">
        {tracks.map((track,i)=>(<TrackCard key={i} track={track as any}/>))}
      </div>
    </section>
  );
}

export async function generateMetadata({ params }: any) {
  return { alternates: { canonical: `https://tahirsalami.com/${params.locale}/music` } };
}

import {getTranslations} from 'next-intl/server';
import type { Metadata } from 'next';
import {routing} from '@/i18n/routing';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'EPK | Tahir Salami',
  description: 'Electronic Press Kit: photos and assets',
};

export default async function EpkPage() {
  // @ts-ignore
  const photos = (require('@/data/epkPhotos').default) as Array<{city:string;slug:string;src:string;srcJpg:string;thumb:string;alt:string}>;
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      {photos.map((p)=>(
        <a key={p.slug} href={p.srcJpg} target="_blank" rel="noreferrer" className="group block relative overflow-hidden rounded-2xl border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.thumb} alt={p.alt} className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105" loading="lazy" />
          <div className="absolute bottom-0 left-0 right-0 p-3 text-sm bg-gradient-to-t from-black/60 to-transparent">{p.city}</div>
        </a>
      ))}
    </div>
  );
}

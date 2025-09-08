'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
type Track = any;

export default function TrackCard({track}:{track:Track}){
  const t = useTranslations('common');
  const links = Object.entries(track.links ?? {}).map(([key, url]) => ({key, url}));

  const platformLabel = (key: string) => {
    try {
      return t(`platform.${key}` as any);
    } catch {
      return key;
    }
  };

  return (
    <div className="card grid md:grid-cols-[160px_1fr] gap-4 items-center">
      <div className="aspect-square w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={track.cover ?? '/logo-white.png'} alt={`${track.title} cover`} className="w-full h-full object-cover" loading="lazy" />
      </div>

      <div className="space-y-2">
        <div className="text-2xl font-semibold">{track.title}</div>
        {track.releaseDate && <div className="text-sm opacity-70">{new Date(track.releaseDate).toLocaleDateString()}</div>}

        {links.length > 0 && (
          <div className="mt-3">
            <div className="text-sm opacity-70 mb-1">{t('allPlatforms')}</div>
            <div className="flex flex-wrap gap-2">
              {links.map(pl => (
                <a key={pl.key} href={pl.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-ghost no-underline">
                  {platformLabel(pl.key)}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

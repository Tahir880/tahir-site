'use client';

import React from 'react';
import {useTranslations} from 'next-intl';

type PlatformKey =
  | 'spotify'
  | 'youtube'
  | 'anghami'
  | 'apple'
  | 'deezer'
  | 'amazon'
  | 'itunes'
  | 'tidal'
  | 'pandora'
  | 'napster'
  | 'boomplay'
  | 'soundcloud'
  | (string & {});

type Track = {
  title: string;
  cover?: string;
  description?: string;
  // object like {spotify: 'https://...', apple: 'https://...'}
  links?: Partial<Record<PlatformKey, string | null | undefined>> | Array<{
    key?: string;
    url?: string | null | undefined;
    href?: string | null | undefined;
    name?: string;
    platform?: string;
  }>;
};

export default function TrackCard({track}: {track: Track}) {
  const t = useTranslations('common');

  const raw =
    (track as any)?.links ??
    (track as any)?.platforms ??
    (track as any)?.urls ??
    [];

  const links: {key: PlatformKey; url: string}[] = Array.isArray(raw)
    ? (raw as any[])
        .map((x) => ({
          key: String(x.key ?? x.name ?? x.platform ?? ''),
          url: String(x.url ?? x.href ?? ''),
        }))
        .filter((x) => x.key && x.url)
    : Object.entries(raw as Record<string, unknown>)
        .filter(([, url]) => typeof url === 'string' && url.length > 0)
        .map(([key, url]) => ({key: key as PlatformKey, url: url as string}));

  const platformLabel = (key: PlatformKey) => {
    switch (key) {
      case 'spotify':
      case 'youtube':
      case 'anghami':
      case 'apple':
      case 'deezer':
      case 'amazon':
      case 'itunes':
      case 'tidal':
      case 'pandora':
      case 'napster':
      case 'boomplay':
      case 'soundcloud':
        return t(key);
      default:
        return key;
    }
  };

  return (
    <div className="card grid md:grid-cols-[160px_1fr] gap-4 items-center">
      <div className="aspect-square w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={track.cover ?? '/logo-white.png'}
          alt={`${track.title} cover`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="grid gap-2">
        <h3 className="text-xl font-semibold">{track.title}</h3>
        {track.description ? (
          <p className="text-sm opacity-80">{track.description}</p>
        ) : null}

        {links.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {links.map((pl) => (
              <a
                key={pl.key}
                href={pl.url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-ghost no-underline"
              >
                {platformLabel(pl.key)}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

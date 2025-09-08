type Track = any;

export default function TrackJsonLd({track, locale}:{track: Track; locale: string}){
  const name = (track as any)?.titles?.[locale] ?? track.title;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MusicRecording',
    'name': name,
    'byArtist': {
      '@type': 'MusicGroup',
      'name': 'Tahir Salami'
    },
    'datePublished': track.releaseDate || undefined,
    'image': track.cover || undefined,
    'url': `/${locale}/music/${track.slug}`
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />;
}

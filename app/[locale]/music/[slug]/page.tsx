import {notFound} from 'next/navigation';
import Link from 'next/link';
import TrackCard from '@/components/TrackCard';
import TrackJsonLd from '@/components/TrackJsonLd';

type Locale = 'ar' | 'en' | 'fr';
type Params = { locale: Locale; slug: string };

export default async function TrackPage({
  params
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;

  // Handle both default and named exports from '@/data/tracks'
  const mod = await import('@/data/tracks');
  const tracks: any[] =
    (mod as any).default ??
    (mod as any).tracks ??
    (mod as any).TRACKS ??
    (mod as any).data ??
    [];

  const tr = tracks.find((t: any) => t.slug === slug);
  if (!tr) notFound();

  const displayTitle: string = tr.titles?.[locale] ?? tr.title ?? slug;

  return (
    <section className="container py-10 md:py-16 grid gap-6">
      <h2>{displayTitle}</h2>
      <TrackCard track={tr as any} />
      <div>
        <Link href="/music" className="btn btn-ghost no-underline">
          ← Music
        </Link>
      </div>
      <TrackJsonLd track={tr as any} locale={locale} />
    </section>
  );
}

export default function JsonLdHome(){
  const data = {
    "@context":"https://schema.org",
    "@type":"Person",
    "name":"Tahir Salami",
    "alternateName":"طاهر سلامي",
    "jobTitle":"Pop Artist",
    "url":"https://tahirsalami.com",
    "image":"https://tahirsalami.com/logo-black.png",
    "sameAs":[
      "https://youtube.com/@tahirsalami",
      "https://instagram.com/tahirsalami",
      "https://tiktok.com/@tahirsalami",
      "https://facebook.com/tahirsalamii",
      "https://twitter.com/TahirSalami",
      "https://open.spotify.com/artist/4QWZDhr7y1O2JgFO75RpUK",
      "https://music.apple.com/us/artist/tahir-salami/1763523726"
    ]
  };
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{__html: JSON.stringify(data)}}
    />
  );
}

interface OGP {
  title: string;
  description: string;
  url: string;
}

export const OgpCard = ({title, description, url}: OGP) => (
  <>
    {/* base */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="article" />
    <meta property="og:url" content={url} />
    <meta property="og:image" content="/icon.png" />
    <meta property="og:site_name" content="Imagraph" />
    <meta property="og:locale" content="ja_JP " />
    {/* Twitter */}
    <meta name="twitter:card" content="Create image filter by shader" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content="Lorem Ipsum Dolor Si Amet" />
  </>
);
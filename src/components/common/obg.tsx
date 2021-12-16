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
    <meta property="og:image" content="画像のURL" />
    <meta property="og:site_name" content="Imagraph" />
    <meta property="og:audio" content="音声ファイルのURL" />
    <meta property="og:video" content="動画ファイルのURL" />
    <meta property="og:locale" content="ローカル言語。デフォは en_US " />
    <meta property="og:locale:alternate" content="翻訳のための他言語" />
    <meta property="og:determiner" content="タイトルの前に付く単語" />
    {/* Twitter */}
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Placeholder Text" />
    <meta name="twitter:description" content="Lorem Ipsum Dolor Si Amet" />
  </>
);
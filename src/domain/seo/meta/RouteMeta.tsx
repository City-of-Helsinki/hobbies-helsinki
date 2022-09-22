import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CmsLanguage } from 'events-helsinki-core';

type Props = {
  languages: CmsLanguage[];
};

function RouteMeta({ languages }: Props) {
  const { locale, asPath } = useRouter();
  const canonical = `${locale}${asPath}`;
  const currentLanguageAndLocale = languages.find(
    (language) => language.slug === locale
  )?.locale;

  return (
    <Head>
      <link rel="canonical" href={canonical} />
      {languages.map((language) => (
        <link
          key={language.id}
          rel="alternate"
          hrefLang={language.locale}
          href={`/${language.slug}${asPath}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={asPath} />
      <meta property="og:locale" content={currentLanguageAndLocale} />
      <meta property="og:url" content={canonical} />
    </Head>
  );
}

export default RouteMeta;

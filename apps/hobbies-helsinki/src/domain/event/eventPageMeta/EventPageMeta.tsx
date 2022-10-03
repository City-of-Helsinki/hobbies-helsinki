import Head from 'next/head';
import React from 'react';
import { useLocale } from 'events-helsinki-components';

import { getEventFields } from '../EventUtils';
import { EventFields } from '../types';

interface Props {
  event: EventFields;
}

const EventPageMeta: React.FC<Props> = ({ event }) => {
  const locale = useLocale();

  const {
    keywords,
    name,
    someImageUrl: image,
    shortDescription: description,
  } = getEventFields(event, locale);

  const openGraphProperties: { [key: string]: string } = {
    description: description,
    image: image,
    title: name,
  };

  return (
    <Head>
      <title>{name}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={keywords
          .map((keyword) => keyword.name.toLowerCase())
          .join(', ')}
      />
      <meta name="twitter:card" content="summary" />
      {Object.entries(openGraphProperties).map(([property, value]) => (
        <meta key={property} property={`og:${property}`} content={value} />
      ))}
    </Head>
  );
};

export default EventPageMeta;

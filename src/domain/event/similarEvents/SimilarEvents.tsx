import { useTranslation } from 'next-i18next';
import React from 'react';
import {
  Card,
  getEventCardProps,
  useConfig,
  Collection,
  CollectionProps,
  PageSection,
  ContentContainer,
} from 'react-helsinki-headless-cms';

import useLocale from '../../../common-events/hooks/useLocale';
import LoadingSpinner from '../../../common/components/spinner/LoadingSpinner';
import { ROUTES } from '../../../constants';
import { getLocalizedCmsItemUrl } from '../../../utils/routerUtils';
import { useSimilarEventsQuery } from '../queryUtils';
import { EventFields } from '../types';
import styles from './similarEvents.module.scss';

interface Props {
  event: EventFields;
  type?: CollectionProps['type'];
}

export const similarEventsListTestId = 'similar-events-list';

const SimilarEvents: React.FC<Props> = ({ event, type = 'carousel' }) => {
  const { t } = useTranslation('event');
  const locale = useLocale();
  const { data: events, loading } = useSimilarEventsQuery(event);
  const {
    components: { EventCardContent },
  } = useConfig();

  const cards = events.map((event, i) => {
    const cardProps = getEventCardProps(event, locale);
    const url = getLocalizedCmsItemUrl(
      ROUTES.COURSES,
      { eventId: event.id },
      locale
    );
    return (
      <Card
        key={cardProps.id}
        {...cardProps}
        url={url}
        direction="fixed-vertical"
        customContent={
          EventCardContent && <EventCardContent event={events[i]} />
        }
      />
    );
  });

  return (
    <PageSection
      korosTop
      korosTopClassName={styles.korosTopCollections}
      className={styles.similarEvents}
    >
      <ContentContainer>
        {/* TODO: the loading should be indicated from inside of the Collection component instead, 
        so that the title would be shown while the content is being loaded and ther ewould be less bouncing. */}
        <LoadingSpinner isLoading={loading}>
          <Collection
            type={type}
            title={t('similarEvents.title')}
            cards={cards}
            loading={loading}
          />
        </LoadingSpinner>
      </ContentContainer>
    </PageSection>
  );
};

export default SimilarEvents;

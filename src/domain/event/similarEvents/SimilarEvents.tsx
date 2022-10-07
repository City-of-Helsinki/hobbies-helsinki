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

export const similarEventsContainerTestId = 'similar-events-container';
export const similarEventsLoadingSpinnerTestId =
  'similar-events-loading-spinner';

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

  const hasCards = !!cards.length;

  // Show the similar events -section when it's still loading or there are some events to be shown.
  if (loading || hasCards) {
    return (
      <PageSection
        korosTop
        korosTopClassName={styles.korosTopCollections}
        className={styles.similarEvents}
        data-testid={similarEventsContainerTestId}
      >
        <ContentContainer>
          <LoadingSpinner
            data-testid={similarEventsLoadingSpinnerTestId}
            isLoading={loading}
          >
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
  }

  // Show nothing / hide the similar events section when there are no events to be shown.
  return null;
};

export default SimilarEvents;

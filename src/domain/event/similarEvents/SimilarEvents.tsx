import { useTranslation } from 'next-i18next';
import React from 'react';

import Container from '../../../common-events/components/layout/Container';
import LoadingSpinner from '../../../common/components/spinner/LoadingSpinner';
// Use same page size as on event search page
import EventCard from '../eventCard/EventCard';
import { useSimilarEventsQuery } from '../queryUtils';
import { EventFields } from '../types';
import styles from './similarEvents.module.scss';

interface Props {
  event: EventFields;
}

export const similarEventsListTestId = 'similar-events-list';

const SimilarEvents: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation('event');
  const { data: events, loading } = useSimilarEventsQuery(event);

  return (
    <div className={styles.similarEvents}>
      <LoadingSpinner hasPadding={false} isLoading={loading}>
        {!!events?.length && (
          <Container>
            <h2 className={styles.similarEventsTitle}>
              {t('similarEvents.title')}
            </h2>
            <div
              className={styles.similarEventList}
              data-testid={similarEventsListTestId}
            >
              {events.map((item) => {
                return <EventCard key={item.id} event={item} />;
              })}
            </div>
          </Container>
        )}
      </LoadingSpinner>
    </div>
  );
};

export default SimilarEvents;

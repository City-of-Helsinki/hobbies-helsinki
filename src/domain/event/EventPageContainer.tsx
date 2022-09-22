import { useTranslation } from 'next-i18next';
import React from 'react';
import { useLazyQuery } from '@apollo/client';
import { Link } from 'react-helsinki-headless-cms';
import { useRouter } from 'next/router';
import { LoadingSpinner } from 'events-helsinki-components';
import { isClient, addParamsToQueryString } from 'events-helsinki-core';
import { ROUTES } from 'events-helsinki-core';
import { useLocale } from 'events-helsinki-components';

import ErrorHero from '../error/ErrorHero';
import {
  EventDetailsDocument,
  EventFieldsFragment,
} from '../nextApi/graphql/generated/graphql';
import EventClosedHero from './eventClosedHero/EventClosedHero';
import EventContent from './eventContent/EventContent';
import EventHero from './eventHero/EventHero';
import EventPageMeta from './eventPageMeta/EventPageMeta';
import { getEventIdFromUrl, isEventClosed } from './EventUtils';
import SimilarEvents from './similarEvents/SimilarEvents';
import { SuperEventResponse } from './types';
import styles from './eventPage.module.scss';
import { getLocalizedCmsItemUrl } from '../../utils/routerUtils';

export interface EventPageContainerProps {
  loading: boolean;
  event?: EventFieldsFragment;
  showSimilarEvents?: boolean;
}

const EventPageContainer: React.FC<EventPageContainerProps> = ({
  event,
  loading,
  showSimilarEvents = true,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const locale = useLocale();
  const search = addParamsToQueryString(router.asPath, {
    returnPath: router.pathname,
  });

  const [superEvent, setSuperEvent] = React.useState<SuperEventResponse>({
    data: null,
    status: 'pending',
  });

  const superEventId = getEventIdFromUrl(
    event?.superEvent?.internalId ?? '',
    'event'
  );

  const [superEventSearch, { data: superEventData }] = useLazyQuery(
    EventDetailsDocument,
    {
      variables: {
        id: superEventId,
        include: ['in_language', 'keywords', 'location', 'audience'],
      },
    }
  );

  React.useEffect(() => {
    if (superEventId) {
      superEventSearch();
      if (superEventData) {
        setSuperEvent({
          data: superEventData.eventDetails,
          status: 'resolved',
        });
      }
    } else if (event) {
      setSuperEvent({ data: null, status: 'resolved' });
    }
  }, [event, superEventId, superEventData, superEventSearch]);

  const eventClosed = !event || isEventClosed(event);
  return (
    <div className={styles.eventPageWrapper}>
      <main>
        <LoadingSpinner isLoading={loading}>
          {event ? (
            <>
              {/* Wait for data to be accessible before updating metadata */}
              <EventPageMeta event={event} />
              {eventClosed ? (
                <EventClosedHero />
              ) : (
                <>
                  <EventHero event={event} superEvent={superEvent} />
                  <EventContent event={event} superEvent={superEvent} />
                </>
              )}
              {/* Hide similar event on SSR to make initial load faster */}
              {isClient && showSimilarEvents && <SimilarEvents event={event} />}
            </>
          ) : (
            <ErrorHero
              text={t('event:notFound.text')}
              title={t('event:notFound.title')}
            >
              <Link
                href={`${getLocalizedCmsItemUrl(
                  ROUTES.SEARCH,
                  {},
                  locale
                )}${search}`}
              >
                {t('event:notFound.linkSearchEvents')}
              </Link>
            </ErrorHero>
          )}
        </LoadingSpinner>
      </main>
    </div>
  );
};

export default EventPageContainer;

import { useTranslation } from 'next-i18next';
import React from 'react';
import { useLazyQuery } from '@apollo/client';

import LoadingSpinner from '../../common/components/spinner/LoadingSpinner';
import isClient from '../../common/utils/isClient';
import { addParamsToQueryString } from '../../common-events/utils/queryString';
import ErrorHero from '../error/ErrorHero';
import Link from '../../common-events/i18n/router/Link';
import {
  EventDetailsDocument,
  useEventDetailsQuery,
} from '../nextApi/graphql/generated/graphql';
import EventClosedHero from './eventClosedHero/EventClosedHero';
import EventContent from './eventContent/EventContent';
import EventHero from './eventHero/EventHero';
import EventPageMeta from './eventPageMeta/EventPageMeta';
import { getEventIdFromUrl, isEventClosed } from './EventUtils';
import SimilarEvents from './similarEvents/SimilarEvents';
import { SuperEventResponse } from './types';
import styles from './eventPage.module.scss';
import useRouter from '../../common-events/i18n/router/useRouter';
import useLocale from '../../common-events/hooks/useLocale';
import { getI18nPath } from '../../common-events/i18n/router/utils';
import { ROUTES } from '../../constants';

export interface EventPageContainerProps {
  showSimilarEvents?: boolean;
}

const EventPageContainer: React.FC<EventPageContainerProps> = ({
  showSimilarEvents = true,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const search = addParamsToQueryString(router.asPath, {
    returnPath: router.pathname,
  });
  const eventId =
    (router.query?.eventId as string) ?? router.pathname.split('/').pop();

  const [superEvent, setSuperEvent] = React.useState<SuperEventResponse>({
    data: null,
    status: 'pending',
  });
  const { data: eventData, loading } = useEventDetailsQuery({
    ssr: false,
    variables: {
      id: eventId,
      include: ['in_language', 'keywords', 'location', 'audience'],
    },
  });
  const locale = useLocale();
  const event = eventData?.eventDetails;

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
              <Link href={`${getI18nPath(ROUTES.SEARCH, locale)}${search}`}>
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

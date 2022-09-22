import classNames from 'classnames';
import { IconArrowRight } from 'hds-react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { BackgroundImage, LinkBox } from 'react-helsinki-headless-cms';
import { useRouter } from 'next/router';
import { addParamsToQueryString, getDateRangeStr } from 'events-helsinki-core';
import { IconButton } from 'events-helsinki-components';
import { ROUTES } from 'events-helsinki-core';
import { useLocale } from 'events-helsinki-components';

import EventKeywords from '../eventKeywords/EventKeywords';
import LocationText from '../eventLocation/EventLocationText';
import EventName from '../eventName/EventName';
import {
  getEventCardId,
  getEventFields,
  getEventPrice,
  isEventClosed,
} from '../EventUtils';
import { EventFields } from '../types';
import styles from './eventCard.module.scss';
import { getLocalizedCmsItemUrl } from '../../../utils/routerUtils';

interface Props {
  event: EventFields;
}

const EventCard: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const locale = useLocale();
  const button = React.useRef<HTMLDivElement>(null);

  const { endTime, id, imageUrl, name, startTime } = getEventFields(
    event,
    locale
  );

  const queryString = addParamsToQueryString(router.asPath, {
    returnPath: router.pathname,
  });
  const eventUrl = `${getLocalizedCmsItemUrl(
    ROUTES.COURSES,
    { eventId: event.id },
    locale
  )}${queryString}`;
  const eventClosed = isEventClosed(event);
  const eventPriceText = getEventPrice(
    event,
    locale,
    t('event:eventCard.isFree')
  );

  const goToEventPage = () => {
    router.push(eventUrl);
  };

  return (
    <LinkBox
      aria-label={t('event:eventCard.ariaLabelLink', {
        name,
      })}
      id={getEventCardId(id)}
      data-testid={event.id}
      href={eventUrl}
    >
      <div
        className={classNames(styles.eventCard, {
          [styles.eventClosed]: eventClosed,
        })}
      >
        {/* INFO WRAPPER. Re-order info wrapper and text wrapper on css */}
        <div className={styles.infoWrapper}>
          <div className={styles.textWrapper}>
            <div className={styles.eventName}>
              <EventName event={event} />
            </div>
            <div className={styles.eventDateAndTime}>
              {!!startTime &&
                getDateRangeStr({
                  start: startTime,
                  end: endTime,
                  locale,
                  includeWeekday: false,
                  includeTime: true,
                  timeAbbreviation: t('common:timeAbbreviation'),
                })}
            </div>
            <div className={styles.eventLocation}>
              <LocationText
                event={event}
                showDistrict={false}
                showLocationName={true}
              />
            </div>
            <div className={styles.eventPrice}>{eventPriceText}</div>

            <div className={styles.keywordWrapperMobile}>
              <EventKeywords
                event={event}
                showIsFree={true}
                showKeywords={false}
              />
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <div ref={button}>
              <IconButton
                ariaLabel={t('event:eventCard.ariaLabelLink', {
                  name,
                })}
                icon={<IconArrowRight aria-hidden />}
                onClick={goToEventPage}
                size="default"
              />
            </div>
          </div>
        </div>
        <BackgroundImage className={styles.imageWrapper} id={id} url={imageUrl}>
          <div className={styles.keywordWrapperDesktop}>
            <EventKeywords
              event={event}
              showIsFree={true}
              showKeywords={false}
            />
          </div>
        </BackgroundImage>
      </div>
    </LinkBox>
  );
};

export default EventCard;

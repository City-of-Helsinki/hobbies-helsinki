import classNames from 'classnames';
import {
  Button,
  IconArrowRight,
  IconCake,
  IconCalendarClock,
  IconLinkExternal,
  IconLocation,
} from 'hds-react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { BackgroundImage, LinkBox } from 'react-helsinki-headless-cms';
import { useRouter } from 'next/router';

import testImage from '../../../common-events/utils/testImage';
import { addParamsToQueryString } from '../../../common-events/utils/queryString';
import EventKeywords from '../eventKeywords/EventKeywords';
import LocationText from '../eventLocation/EventLocationText';
import EventName from '../eventName/EventName';
import {
  getAudienceAgeText,
  getEventFields,
  getEventPrice,
  getLargeEventCardId,
  isEventClosed,
  isEventFree,
} from '../EventUtils';
import { EventFields } from '../types';
import getDateRangeStr from '../../../common-events/utils/getDateRangeStr';
import buttonStyles from '../../../common-events/components/button/button.module.scss';
import styles from './largeEventCard.module.scss';
import { ROUTES } from '../../../constants';
import useLocale from '../../../hooks/useLocale';
import { getLocalizedCmsItemUrl } from '../../../utils/routerUtils';

interface Props {
  event: EventFields;
}

const LargeEventCard: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const locale = useLocale();
  const button = React.useRef<HTMLDivElement>(null);

  const {
    id,
    endTime,
    imageUrl,
    name,
    offerInfoUrl,
    startTime,
    audienceMinAge,
    audienceMaxAge,
  } = getEventFields(event, locale);

  const audienceAge = getAudienceAgeText(t, audienceMinAge, audienceMaxAge);

  const eventClosed = isEventClosed(event);
  const queryString = addParamsToQueryString(router.asPath, {
    returnPath: router.pathname,
  });
  const eventUrl = `${getLocalizedCmsItemUrl(
    ROUTES.COURSES,
    { eventId: event.id },
    locale
  )}${queryString}`;

  const showBuyButton = !eventClosed && !!offerInfoUrl && !isEventFree(event);

  const goToBuyTicketsPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    // avoids also navigating to details page
    e.preventDefault();
    window.open(offerInfoUrl);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const goToEventPage = (ev: React.MouseEvent<HTMLButtonElement>) => {
    router.push(eventUrl);
  };

  return (
    <LinkBox
      type="linkBox"
      aria-label={t('event:eventCard.ariaLabelLink', {
        name,
      })}
      id={getLargeEventCardId(id)}
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
          <div className={styles.eventName}>
            <EventName event={event} />
          </div>

          <div className={styles.eventLocation}>
            <IconLocation aria-hidden />
            <LocationText
              event={event}
              showDistrict={false}
              showLocationName={true}
            />
          </div>
          <div className={styles.eventDateAndTime}>
            {!!startTime && (
              <>
                <IconCalendarClock aria-hidden />
                {getDateRangeStr({
                  start: startTime,
                  end: endTime,
                  locale,
                  includeTime: true,
                  timeAbbreviation: t('common:timeAbbreviation'),
                })}
              </>
            )}
          </div>
          {audienceAge && (
            <div className={styles.eventAudienceAge}>
              <IconCake aria-hidden />
              {audienceAge}
            </div>
          )}
          <div className={styles.eventPrice}>
            {getEventPrice(event, locale, t('event:eventCard.isFree'))}
          </div>
          <div className={styles.keywordWrapperDesktop}>
            <EventKeywords
              event={event}
              hideKeywordsOnMobile={true}
              showIsFree={true}
            />
          </div>
          <div
            className={classNames(
              styles.buttonWrapper,
              showBuyButton ? styles.rightAlign : ''
            )}
          >
            {showBuyButton ? (
              <>
                <div>
                  <Button
                    aria-label={t('event:eventCard.ariaLabelBuyTickets')}
                    iconRight={<IconLinkExternal aria-hidden />}
                    fullWidth
                    onClick={goToBuyTicketsPage}
                    size="small"
                    variant="success"
                  >
                    {t('event:eventCard.buttonBuyTickets')}
                  </Button>
                </div>
                <div ref={button}>
                  <Button
                    aria-label={t('event:eventCard.ariaLabelReadMore', {
                      name,
                    })}
                    className={buttonStyles.buttonGray}
                    fullWidth
                    onClick={goToEventPage}
                    size="small"
                    type="button"
                  >
                    {t('event:eventCard.buttonReadMore')}
                  </Button>
                </div>
              </>
            ) : (
              <IconArrowRight
                className={styles.arrowRight}
                size="l"
                aria-hidden="true"
              />
            )}
          </div>
        </div>
        <BackgroundImage className={styles.imageWrapper} url={imageUrl}>
          <div className={styles.keywordWrapper}>
            <EventKeywords
              event={event}
              hideKeywordsOnMobile={true}
              showIsFree={true}
            />
          </div>
        </BackgroundImage>
      </div>
    </LinkBox>
  );
};

export default LargeEventCard;

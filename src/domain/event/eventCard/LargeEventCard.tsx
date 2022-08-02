import classNames from 'classnames';
import { Button, IconLinkExternal } from 'hds-react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { LinkBox } from 'react-helsinki-headless-cms';

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
import { Language } from '../../../types';
import { ROUTES } from '../../../constants';
import useRouter from '../../../hooks/useRouter';
import useLocale from '../../../hooks/useLocale';
import { getLocalizedCmsItemUrl } from '../../../utils/routerUtils';

interface Props {
  event: EventFields;
}

const LargeEventCard: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [showBackupImage, setShowBackupImage] = React.useState(false);
  const locale = useLocale();
  const button = React.useRef<HTMLDivElement>(null);

  const {
    id,
    endTime,
    imageUrl,
    name,
    offerInfoUrl,
    placeholderImage,
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
    locale,
    router.defaultLocale as Language
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

  React.useEffect(() => {
    if (imageUrl) {
      const testThatImageExist = async () => {
        try {
          await testImage(imageUrl);
        } catch {
          setShowBackupImage(true);
        }
      };

      testThatImageExist();
    }
  }, [imageUrl]);

  return (
    <LinkBox
      ariaLabel={t('event:eventCard.ariaLabelLink', {
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
          <div className={styles.eventDateAndTime}>
            {!!startTime &&
              getDateRangeStr({
                start: startTime,
                end: endTime,
                locale,
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
          {audienceAge && (
            <div className={styles.eventAudienceAge}>{audienceAge}</div>
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
          <div className={styles.buttonWrapper}>
            <div>
              {showBuyButton && (
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
              )}
            </div>
            <div ref={button}>
              <Button
                aria-label={t('event:eventCard.ariaLabelReadMore', { name })}
                className={buttonStyles.buttonGray}
                fullWidth
                onClick={goToEventPage}
                size="small"
                type="button"
              >
                {t('event:eventCard.buttonReadMore')}
              </Button>
            </div>
          </div>
        </div>

        {/* IMAGE WRAPPER */}
        <div
          className={styles.imageWrapper}
          style={{
            backgroundImage: `url(${
              showBackupImage ? placeholderImage : imageUrl
            })`,
          }}
        >
          <div className={styles.keywordWrapper}>
            <EventKeywords
              event={event}
              hideKeywordsOnMobile={true}
              showIsFree={true}
            />
          </div>
        </div>
      </div>
    </LinkBox>
  );
};

export default LargeEventCard;

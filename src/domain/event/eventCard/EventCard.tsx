import classNames from 'classnames';
import { IconArrowRight } from 'hds-react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { LinkBox } from 'react-helsinki-headless-cms';

import getDateRangeStr from '../../../common-events/utils/getDateRangeStr';
import testImage from '../../../common-events/utils/testImage';
import IconButton from '../../../common/components/iconButton/IconButton';
import { addParamsToQueryString } from '../../../common-events/utils/queryString';
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
import { Language } from '../../../types';
import { ROUTES } from '../../../constants';
import useRouter from '../../../hooks/useRouter';
import useLocale from '../../../hooks/useLocale';
import { getLocalizedCmsItemUrl } from '../../../utils/routerUtils';

interface Props {
  event: EventFields;
}

const EventCard: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [showBackupImage, setShowBackupImage] = React.useState(false);
  const locale = useLocale();
  const button = React.useRef<HTMLDivElement>(null);

  const { endTime, id, imageUrl, name, placeholderImage, startTime } =
    getEventFields(event, locale);

  const queryString = addParamsToQueryString(router.asPath, {
    returnPath: router.pathname,
  });
  const eventUrl = `${getLocalizedCmsItemUrl(
    ROUTES.COURSES,
    { eventId: event.id },
    locale,
    router.defaultLocale as Language
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

        {/* IMAGE WRAPPER */}
        <div
          className={styles.imageWrapper}
          style={{
            backgroundImage: `url(${
              showBackupImage ? placeholderImage : imageUrl
            })`,
          }}
        >
          <div className={styles.keywordWrapperDesktop}>
            <EventKeywords
              event={event}
              showIsFree={true}
              showKeywords={false}
            />
          </div>
        </div>
      </div>
    </LinkBox>
  );
};

export default EventCard;

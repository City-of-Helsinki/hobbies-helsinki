import { ParsedUrlQueryInput } from 'querystring';

import classNames from 'classnames';
import {
  Button,
  IconArrowLeft,
  IconCalendarClock,
  IconLinkExternal,
  IconLocation,
  IconTicket,
} from 'hds-react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { parse } from 'query-string';
import {
  BackgroundImage,
  ContentContainer,
  PageSection,
} from 'react-helsinki-headless-cms';
import { useRouter } from 'next/router';
import { Visible, useLocale } from 'events-helsinki-components';
import { buttonStyles, IconButton, InfoWithIcon, SkeletonLoader } from 'events-helsinki-components';
import { getDateRangeStr } from 'events-helsinki-components';

import EventKeywords from '../eventKeywords/EventKeywords';
import LocationText from '../eventLocation/EventLocationText';
import EventName from '../eventName/EventName';
import {
  extractLatestReturnPath,
  ReturnParams,
} from '../eventQueryString.util';
import { getEventFields, getEventPrice } from '../EventUtils';
import { EventFields, SuperEventResponse } from '../types';
import styles from './eventHero.module.scss';


export interface Props {
  event: EventFields;
  superEvent?: SuperEventResponse;
}

const EventHero: React.FC<Props> = ({ event, superEvent }) => {
  const { t } = useTranslation('event');
  const locale = useLocale();
  const router = useRouter();
  const search = router.asPath.split('?')[1];

  const {
    endTime: eventEndTime,
    imageUrl,
    keywords,
    offerInfoUrl,
    shortDescription,
    startTime: eventStartTime,
    today,
    thisWeek,
    showBuyButton,
    registrationUrl,
  } = getEventFields(event, locale);
  const eventPriceText = getEventPrice(
    event,
    locale,
    t('event:hero.offers.isFree')
  );
  const showKeywords = Boolean(today || thisWeek || keywords.length);
  const returnParam = extractLatestReturnPath(search, locale);

  const goBack = ({ returnPath, remainingQueryString }: ReturnParams) => {
    router.push({
      pathname: returnPath,
      query: {
        ...(parse(remainingQueryString ?? '') as ParsedUrlQueryInput),
        eventId: event.id,
      },
    });
  };

  const goToBuyTicketsPage = () => {
    window.open(offerInfoUrl);
  };

  const startTime =
    superEvent?.status === 'pending'
      ? ''
      : superEvent?.data?.startTime || eventStartTime;
  const endTime =
    superEvent?.status === 'pending'
      ? ''
      : superEvent?.data?.endTime || eventEndTime;

  return (
    <PageSection className={classNames(styles.heroSection)}>
      <ContentContainer className={styles.contentContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.backButtonWrapper}>
            <IconButton
              role="link"
              ariaLabel={t('event:hero.ariaLabelBackButton')}
              backgroundColor="white"
              icon={<IconArrowLeft aria-hidden />}
              onClick={() => goBack(returnParam)}
              size="default"
            />
          </div>
          {imageUrl && (
            <div>
              <BackgroundImage
                className={styles.image}
                id={event.id}
                url={imageUrl}
              />
            </div>
          )}
          <div className={styles.leftPanel}>
            <div className={styles.leftPanelWrapper}>
              <div className={styles.leftPanelEmpty} />
              <div className={styles.textWrapper}>
                <h1 className={styles.title}>
                  <EventName event={event} />
                </h1>
                {shortDescription && (
                  <div className={styles.description}>{shortDescription}</div>
                )}
                <div className={styles.additionalInfo}>
                  <Visible above="s" className={styles.location}>
                    <InfoWithIcon
                      icon={<IconLocation aria-hidden />}
                      title={''}
                    >
                      <LocationText
                        event={event}
                        showDistrict={false}
                        showLocationName={true}
                      />
                    </InfoWithIcon>
                  </Visible>
                  <Visible above="s" className={styles.start}>
                    {(startTime !== eventStartTime ||
                      endTime !== eventEndTime) && (
                      <InfoWithIcon
                        icon={<IconCalendarClock aria-hidden />}
                        title={''}
                      >
                        {superEvent?.status === 'pending' ? (
                          <SkeletonLoader />
                        ) : (
                          getDateRangeStr({
                            start: eventStartTime || '',
                            end: eventEndTime,
                            locale,
                            includeTime: true,
                            timeAbbreviation: t('common:timeAbbreviation'),
                          })
                        )}
                      </InfoWithIcon>
                    )}
                  </Visible>
                  {eventPriceText && (
                    <Visible above="s" className={styles.price}>
                      <InfoWithIcon
                        icon={<IconTicket aria-hidden />}
                        title={''}
                      >
                        {eventPriceText}
                      </InfoWithIcon>
                    </Visible>
                  )}
                  {showBuyButton && (
                    <Visible above="s" className={styles.buyButtonWrapper}>
                      <Button
                        aria-label={t('event:hero.ariaLabelBuyTickets')}
                        onClick={goToBuyTicketsPage}
                        iconRight={<IconLinkExternal aria-hidden />}
                        variant="success"
                      >
                        {t('hero.buttonBuyTickets')}
                      </Button>
                    </Visible>
                  )}
                  {registrationUrl && (
                    <Visible className={styles.registrationButtonWrapper}>
                      <Button
                        className={buttonStyles.buttonCoatBlue}
                        aria-label={t('event:hero.ariaLabelEnrol')}
                        onClick={() => window.open(registrationUrl)}
                      >
                        {t('event:hero.buttonEnrol')}
                      </Button>
                    </Visible>
                  )}
                </div>
                {showKeywords && (
                  <div className={styles.categoryWrapper}>
                    <EventKeywords event={event} showIsFree={true} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </ContentContainer>
    </PageSection>
  );
};

export default EventHero;

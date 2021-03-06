import { IconLinkExternal, IconLocation } from 'hds-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import SrOnly from '../../../common/components/srOnly/SrOnly';
import useLocale from '../../../common-events/hooks/useLocale';
import { EventFieldsFragment } from '../../nextApi/graphql/generated/graphql';
import { getEventFields, getServiceMapUrl } from '../EventUtils';
import styles from './eventLocation.module.scss';
import LocationText from './EventLocationText';

interface Props {
  event: EventFieldsFragment;
}

const EventLocation: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { googleDirectionsLink, hslDirectionsLink, name } = getEventFields(
    event,
    locale
  );

  return (
    <div className={styles.eventLocationContainer}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>
          <IconLocation aria-hidden />
          <h2>{t('event:location.title')}</h2>
        </div>
        <a
          className={styles.mapLink}
          href={getServiceMapUrl(event, locale, false)}
          rel="noopener noreferrer"
          target="_blank"
        >
          {t('event:location.openMap')}
          <SrOnly>{t('common:srOnly.opensInANewTab')}</SrOnly>
          <IconLinkExternal size="xs" aria-hidden />
        </a>
      </div>

      <iframe
        title={t('event:location.mapTitle')}
        className={styles.mapContainer}
        src={getServiceMapUrl(event, locale, true)}
      ></iframe>

      <div className={styles.eventName}>{name}</div>
      <div className={styles.location}>
        <LocationText
          event={event}
          showDistrict={true}
          showLocationName={false}
        />
      </div>
      <a
        className={styles.directionsLink}
        href={googleDirectionsLink}
        rel="noopener noreferrer"
        target="_blank"
      >
        {t('event:location.directionsGoogle')}
        <SrOnly>{t('common:srOnly.opensInANewTab')}</SrOnly>
        <IconLinkExternal size="xs" aria-hidden />
      </a>
      <a
        className={styles.directionsLink}
        href={hslDirectionsLink}
        rel="noopener noreferrer"
        target="_blank"
      >
        {t('event:location.directionsHSL')}
        <SrOnly>{t('common:srOnly.opensInANewTab')}</SrOnly>
        <IconLinkExternal size="xs" aria-hidden />
      </a>
    </div>
  );
};

export default EventLocation;

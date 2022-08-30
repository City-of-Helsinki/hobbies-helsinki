import { IconLocation } from 'hds-react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { Link, SecondaryLink } from 'react-helsinki-headless-cms';

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
        <Link
          className={styles.mapLink}
          href={getServiceMapUrl(event, locale, false)}
        >
          {t('event:location.openMap')}
        </Link>
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
      <SecondaryLink
        className={styles.externalLink}
        href={googleDirectionsLink}
      >
        {t('event:location.directionsGoogle')}
      </SecondaryLink>
      <SecondaryLink className={styles.externalLink} href={hslDirectionsLink}>
        {t('event:location.directionsHSL')}
      </SecondaryLink>
    </div>
  );
};

export default EventLocation;

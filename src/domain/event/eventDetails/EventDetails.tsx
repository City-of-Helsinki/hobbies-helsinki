import { useTranslation } from 'next-i18next';
import React from 'react';
import { IconCalendarClock, IconLocation } from 'hds-react';

import { EventFieldsFragment } from '../../nextApi/graphql/generated/graphql';
import { getEventFields } from '../EventUtils';
import useLocale from '../../../hooks/useLocale';
import LocationText from '../eventLocation/EventLocationText';
import getDateRangeStr from '../../../common-events/utils/getDateRangeStr';
import styles from './eventDetails.module.scss';
import EventKeywords from '../eventKeywords/EventKeywords';

interface Props {
  event: EventFieldsFragment;
}
const EventDetails: React.FC<Props> = (props) => {
  const event = props.event;
  const { t } = useTranslation();
  const locale = useLocale();

  if (!event) {
    return null;
  }

  const { startTime, endTime, location } = getEventFields(event, locale);

  return (
    <div>
      {location && (
        <div className={styles.infoRow}>
          <div className={styles.withIcon}>
            <IconLocation aria-hidden />
            <LocationText
              event={event}
              showDistrict={false}
              showLocationName={true}
            />
          </div>
        </div>
      )}

      {!!startTime && (
        <div className={styles.infoRow}>
          <div className={styles.withIcon}>
            <IconCalendarClock aria-hidden />
            {getDateRangeStr({
              start: startTime,
              end: endTime,
              locale,
              includeTime: true,
              timeAbbreviation: t('common:timeAbbreviation'),
            })}
          </div>
        </div>
      )}

      <div className={styles.infoRow}>
        <EventKeywords event={event} showIsFree />
      </div>
    </div>
  );
};

export default EventDetails;

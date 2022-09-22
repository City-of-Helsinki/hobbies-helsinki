import { useTranslation } from 'next-i18next';
import React from 'react';
import { useLocale } from 'events-helsinki-components';

import { EventFieldsFragment } from '../../nextApi/graphql/generated/graphql';
import { getEventFields, isEventCancelled } from '../EventUtils';
import styles from './eventName.module.scss';

interface Props {
  event: EventFieldsFragment;
}

const EventName: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { name } = getEventFields(event, locale);
  const isCancelled = isEventCancelled(event);

  return (
    <>
      {isCancelled && (
        <span className={styles.eventCancelled}>
          {t('event:eventCancelled')}
          {': '}
        </span>
      )}
      {name}
    </>
  );
};

export default EventName;

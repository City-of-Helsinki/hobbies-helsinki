import { IconArrowRight } from 'hds-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import getDateRangeStr from '../../../../common-events/utils/getDateRangeStr';
import useLocale from '../../../../common-events/hooks/useLocale';
import { EventFieldsFragment } from '../../../nextApi/graphql/generated/graphql';
import { getEventFields } from '../../EventUtils';
import { EventFields } from '../../types';
import styles from './eventList.module.scss';
import useRouter from '../../../../common-events/i18n/router/useRouter';
import Link from '../../../../common-events/i18n/router/Link';
import { getI18nPath } from '../../../../common-events/i18n/router/utils';

const EventList: React.FC<{
  events: EventFields[];
  showDate?: boolean;
  showName?: boolean;
  id: string;
}> = ({ events, showDate = false, showName = false, id }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const router = useRouter();
  const search = router.asPath.split('?')[1];

  const getLinkUrl = (event: EventFieldsFragment) =>
    getI18nPath('/courses/[id]', locale).replace('[id]', event.id) +
    (search ? `?${search}` : '');

  return (
    <ul className={styles.timeList} data-testid={id}>
      {events.map((event) => {
        const { name } = getEventFields(event, locale);
        const date = event.startTime
          ? getDateRangeStr({
              start: event.startTime,
              end: event.endTime,
              includeTime: true,
              locale,
              timeAbbreviation: t('common:timeAbbreviation'),
            })
          : '';
        return (
          <li key={event.id}>
            <Link
              href={getLinkUrl(event)}
              // className={styles.listButton}
            >
              <a
                aria-label={
                  showDate
                    ? t('event:otherTimes.buttonReadMore', {
                        date,
                      })
                    : t('event:relatedEvents.buttonReadMore')
                }
              >
                <span>{`${showName ? name : ''} ${showDate ? date : ''}`}</span>
                <i className={styles.arrowContainer}>
                  <IconArrowRight aria-hidden />
                </i>
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default EventList;

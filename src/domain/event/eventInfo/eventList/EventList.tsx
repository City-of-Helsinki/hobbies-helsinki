import { IconArrowRight } from 'hds-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import getDateRangeStr from '../../../../common-events/utils/getDateRangeStr';
import useLocale from '../../../../common-events/hooks/useLocale';
import { EventFieldsFragment } from '../../../nextApi/graphql/generated/graphql';
import { getEventFields } from '../../EventUtils';
import { EventFields } from '../../types';
import styles from './eventList.module.scss';
import { Language } from '../../../../types';
import { ROUTES } from '../../../../constants';
import useRouter from '../../../../hooks/useRouter';
import { getLocalizedCmsItemUrl } from '../../../../utils/routerUtils';
import Link from '../../../../common/components/link/Link';

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
    getLocalizedCmsItemUrl(
      ROUTES.COURSES,
      { eventId: event.id },
      locale,
      router.defaultLocale as Language
    );
  +(search ? `?${search}` : '');

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
              className={styles.link}
              iconRight={<IconArrowRight />}
              href={getLinkUrl(event)}
              aria-label={
                showDate
                  ? t('event:otherTimes.buttonReadMore', {
                      date,
                    })
                  : t('event:relatedEvents.buttonReadMore')
              }
            >
              <span>{`${showName ? name : ''} ${showDate ? date : ''}`}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default EventList;

import { useTranslation } from 'next-i18next';
import React from 'react';
import { useRouter } from 'next/router';

import Keyword from '../../../common-events/components/keyword/Keyword';
import { DATE_TYPES, ROUTES } from '../../../constants';
import { EventFieldsFragment } from '../../nextApi/graphql/generated/graphql';
import { EVENT_DEFAULT_SEARCH_FILTERS } from '../../search/eventSearch/constants';
import { getEventFields } from '../EventUtils';
import { getSearchQuery } from '../../search/eventSearch/utils';
import scrollToTop from '../../../common-events/utils/scrollToTop';
import useLocale from '../../../hooks/useLocale';
import { getI18nPath } from '../../../utils/routerUtils';

interface Props {
  blackOnMobile?: boolean;
  event: EventFieldsFragment;
  hideKeywordsOnMobile?: boolean;
  showIsFree: boolean;
  showKeywords?: boolean;
  showKeywordsCount?: boolean;
}
const EventKeywords: React.FC<Props> = ({
  blackOnMobile,
  event,
  hideKeywordsOnMobile = false,
  showIsFree,
  showKeywords = true,
  showKeywordsCount,
}) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const router = useRouter();
  const { freeEvent, keywords, thisWeek, today } = getEventFields(
    event,
    locale
  );

  const handleClick =
    (type: 'dateType' | 'isFree' | 'text', value = '') =>
    () => {
      const search = getSearchQuery({
        ...EVENT_DEFAULT_SEARCH_FILTERS,
        dateTypes: type === 'dateType' ? [value] : [],
        isFree: type === 'isFree',
        text: type === 'text' ? [value] : [],
      });

      router.push(`${getI18nPath(ROUTES.SEARCH, locale)}${search}`);
      scrollToTop();
    };

  const showComponent =
    today ||
    thisWeek ||
    (showKeywords && keywords.length) ||
    (showIsFree && freeEvent);

  if (!showComponent) {
    return null;
  }

  const [first, second, ...restKeywords] = keywords;
  const customTagsCount = Number(thisWeek) + Number(showIsFree && freeEvent);

  return (
    <>
      {today && (
        <Keyword
          color="engelLight50"
          keyword={t('event:categories.labelToday')}
          onClick={handleClick('dateType', DATE_TYPES.TODAY)}
        />
      )}
      {!today && thisWeek && (
        <Keyword
          color="engelLight50"
          keyword={t('event:categories.labelThisWeek')}
          onClick={handleClick('dateType', DATE_TYPES.THIS_WEEK)}
        />
      )}
      {showIsFree && freeEvent && (
        <Keyword
          color="tramLight20"
          keyword={t('event:categories.labelFree')}
          onClick={handleClick('isFree')}
        />
      )}
      {showKeywords &&
        first &&
        (showKeywordsCount ? customTagsCount < 2 : true) && (
          <Keyword
            color="engelLight50"
            blackOnMobile={blackOnMobile}
            hideOnMobile={hideKeywordsOnMobile}
            key={first.id}
            keyword={first.name}
            onClick={handleClick('text', first.name)}
          />
        )}
      {showKeywords &&
        second &&
        (showKeywordsCount ? customTagsCount < 2 : true) && (
          <Keyword
            color="engelLight50"
            blackOnMobile={blackOnMobile}
            hideOnMobile={hideKeywordsOnMobile}
            key={second.id}
            keyword={second.name}
            onClick={handleClick('text', second.name)}
          />
        )}
      {!!restKeywords.length && showKeywords && showKeywordsCount && (
        <Keyword
          color="engelLight50"
          blackOnMobile={blackOnMobile}
          hideOnMobile={hideKeywordsOnMobile}
          keyword={`+${restKeywords.length + customTagsCount}`}
        />
      )}
    </>
  );
};

export default EventKeywords;

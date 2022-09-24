import { ParsedUrlQueryInput } from 'querystring';

import { useTranslation } from 'next-i18next';
import React from 'react';
import qs, { parse } from 'query-string';
import { IconCrossCircleFill } from 'hds-react';
import { useRouter } from 'next/router';
import { FilterType } from 'events-helsinki-components';
import { formatDate, translateValue } from 'events-helsinki-components';
import { FilterButton, useLocale } from 'events-helsinki-components';

import useDivisionOptions from '../../../../common-events/hooks/useDivisionOptions';
import {
  getSearchFilters,
  getSearchQuery,
  getSuitableForFilterValue,
} from '../utils';
import AgeFilter from './AgeFilter';
import DateFilter from './DateFilter';
import styles from './filterSummary.module.scss';
import PlaceFilter from './PlaceFilter';
import PublisherFilter from './PublisherFilter';
import { getI18nPath } from '../../../../utils/routerUtils';
import { ROUTES } from '../../../../constants';

export const filterSummaryContainerTestId = 'filter-summary';

interface Props {
  onClear: () => void;
}

const FilterSummary: React.FC<Props> = ({ onClear }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const router = useRouter();
  const searchParams = new URLSearchParams(qs.stringify(router.query));
  const {
    categories,
    hobbyTypes,
    dateTypes,
    divisions,
    end,
    isFree,
    keyword,
    keywordNot,
    onlyChildrenEvents,
    places,
    publisher,
    start,
    suitableFor,
    text,
    audienceMaxAgeGt,
    audienceMinAgeLt,
  } = getSearchFilters(searchParams);

  const dateText =
    start || end
      ? `${start ? formatDate(start) : ''} - ${
          end ? formatDate(end) : ''
        }`.trim()
      : '';

  const neighborhoods = useDivisionOptions();
  const getNeighorhoodName = React.useCallback(
    (id: string) => {
      const neighborhood = neighborhoods.find((item) => item.value === id);
      return neighborhood?.text ?? '';
    },
    [neighborhoods]
  );

  const handleFilterRemove = (value: string | number, type: FilterType) => {
    const getFilteredList = (listType: FilterType, list: string[] = []) =>
      type === listType ? list.filter((v) => v !== value) : list;

    const search = getSearchQuery({
      categories: getFilteredList('category', categories),
      hobbyTypes: getFilteredList('hobbyType', hobbyTypes),
      dateTypes: getFilteredList('dateType', dateTypes),
      divisions: getFilteredList('division', divisions),
      end: type === 'date' ? null : end,
      isFree,
      keyword,
      keywordNot,
      onlyChildrenEvents,
      places: getFilteredList('place', places),
      publisher: type !== 'publisher' ? publisher : null,
      start: type === 'date' ? null : start,
      text: getFilteredList('text', text),
      suitableFor: getSuitableForFilterValue(suitableFor, type) ?? [],
      audienceMinAgeLt: type === 'minAge' ? '' : audienceMinAgeLt,
      audienceMaxAgeGt: type === 'maxAge' ? '' : audienceMaxAgeGt,
    });

    router.push({
      pathname: getI18nPath(ROUTES.SEARCH, locale),
      query: parse(search) as ParsedUrlQueryInput,
    });
  };

  const hasFilters =
    !!publisher ||
    !!categories.length ||
    !!hobbyTypes.length ||
    !!dateText ||
    !!dateTypes.length ||
    !!divisions.length ||
    !!places.length ||
    !!text?.length ||
    !!suitableFor?.length ||
    !!(audienceMinAgeLt || '').length ||
    !!(audienceMaxAgeGt || '').length;

  if (!hasFilters) return null;

  return (
    <div
      className={styles.filterSummary}
      data-testid={filterSummaryContainerTestId}
    >
      {categories.map((category) => (
        <FilterButton
          key={category}
          onRemove={handleFilterRemove}
          text={translateValue('home:category.courses.', category, t)}
          type="category"
          value={category}
        />
      ))}
      {hobbyTypes.map((hobbyType) => (
        <FilterButton
          key={hobbyType}
          onRemove={handleFilterRemove}
          text={translateValue('home:hobby.', hobbyType, t)}
          type="hobbyType"
          value={hobbyType}
        />
      ))}
      {publisher && (
        <PublisherFilter id={publisher} onRemove={handleFilterRemove} />
      )}
      {divisions.map((division) => (
        <FilterButton
          key={division}
          onRemove={handleFilterRemove}
          text={getNeighorhoodName(division)}
          type="division"
          value={division}
        />
      ))}
      {places.map((place) => (
        <PlaceFilter key={place} id={place} onRemove={handleFilterRemove} />
      ))}

      {dateText && (
        <DateFilter
          onRemove={handleFilterRemove}
          text={dateText}
          type="date"
          value="date"
        />
      )}
      {dateTypes.map((dateType) => (
        <DateFilter
          key={dateType}
          onRemove={handleFilterRemove}
          type="dateType"
          value={dateType}
        />
      ))}
      {audienceMinAgeLt && (
        <AgeFilter
          type="minAge"
          value={audienceMinAgeLt}
          onRemove={handleFilterRemove}
        />
      )}
      {audienceMaxAgeGt && (
        <AgeFilter
          type="maxAge"
          value={audienceMaxAgeGt}
          onRemove={handleFilterRemove}
        />
      )}
      <button className={styles.clearButton} onClick={onClear} type="button">
        {t('search:buttonClearFilters')}
        <IconCrossCircleFill aria-hidden />
      </button>
    </div>
  );
};

export default FilterSummary;

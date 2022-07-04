import { useTranslation } from 'next-i18next';
import React from 'react';

import { AutosuggestMenuOption } from '../../../common-events/types';
import {
  CATEGORY_CATALOG,
  EVENT_DEFAULT_SEARCH_FILTERS,
} from '../eventSearch/constants';
import { getEventCategoryOptions, getSearchQuery } from '../eventSearch/utils';
import useLocale from '../../../common-events/hooks/useLocale';
import useRouter from '../../../common-events/i18n/router/useRouter';
import { getI18nPath } from '../../../common-events/i18n/router/utils';
import SearchShortcuts from './SearchShortcuts';
import LandingPageSearchForm from './LandingPageSearchForm';
import styles from './landingPageSearch.module.scss';
import { EventTypeId } from '../../nextApi/graphql/generated/graphql';
import { getI18n } from 'react-i18next';

const Search: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const [dateTypes, setDateTypes] = React.useState<string[]>([]);
  const [start, setStart] = React.useState<Date | null>(null);
  const [end, setEnd] = React.useState<Date | null>(null);
  const [isCustomDate, setIsCustomDate] = React.useState<boolean>(false);
  const [autosuggestInput, setAutosuggestInput] = React.useState('');
  const router = useRouter();

  const handleChangeDateTypes = (value: string[]) => {
    setDateTypes(value);
  };

  const toggleIsCustomDate = () => {
    setIsCustomDate(!isCustomDate);
  };

  const goToSearchPage = (search: string) => {
    console.log('goToSearchPage called!..');
    console.log('goToSearchPage', 'router', router);
    router.push({
      pathname: getI18nPath('/search', locale),
      search,
    });
    console.log(
      'router push called!',
      `${getI18nPath('/search', locale)}${search}`
    );
  };

  const handleSubmit = () => {
    const search = getSearchQuery({
      ...EVENT_DEFAULT_SEARCH_FILTERS,
      dateTypes,
      end,
      start,
      text: autosuggestInput ? [autosuggestInput] : [],
    });

    goToSearchPage(search);
  };

  const handleMenuOptionClick = (option: AutosuggestMenuOption) => {
    const search = getSearchQuery({
      ...EVENT_DEFAULT_SEARCH_FILTERS,
      dateTypes,
      end,
      start,
      text: [option.text],
    });
    goToSearchPage(search);
  };

  const categories = getEventCategoryOptions(
    t,
    CATEGORY_CATALOG[EventTypeId.Course].landingPage
  );

  return (
    <>
      <LandingPageSearchForm
        className={styles.landingPageSearch}
        dateTypes={dateTypes}
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
        isCustomDate={isCustomDate}
        autosuggestInput={autosuggestInput}
        setAutosuggestInput={setAutosuggestInput}
        handleChangeDateTypes={handleChangeDateTypes}
        toggleIsCustomDate={toggleIsCustomDate}
        handleSubmit={handleSubmit}
        handleMenuOptionClick={handleMenuOptionClick}
      />
      <SearchShortcuts
        className={styles.categoriesWrapper}
        categories={categories}
        searchFilters={{
          // TODO: use COURSE_DEFAULT_SEARCH_FILTERS
          ...EVENT_DEFAULT_SEARCH_FILTERS,
          dateTypes,
          end,
          start,
        }}
      />
    </>
  );
};

export default Search;

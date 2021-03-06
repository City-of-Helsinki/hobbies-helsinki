import { ParsedUrlQueryInput } from 'querystring';

import classNames from 'classnames';
import { Button, IconCake, IconArrowRight, IconSearch } from 'hds-react';
import uniq from 'lodash/uniq';
import { useTranslation } from 'next-i18next';
import React, { FormEvent } from 'react';
import qs, { parse } from 'query-string';

import Container from '../../../common-events/components/layout/Container';
import SearchAutosuggest from '../../../common-events/components/search/SearchAutosuggest';
import SearchLabel from '../../../common-events/components/search/searchLabel/SearchLabel';
// import useDivisionOptions from "../../../common-events/hooks/useDivisionOptions";
import Checkbox from '../../../common/components/checkbox/Checkbox';
import DateSelector from '../../../common-events/components/dateSelector/DateSelector';
import MultiSelectDropdown from '../../../common-events/components/multiSelectDropdown/MultiSelectDropdown';
import useLocale from '../../../common-events/hooks/useLocale';
import { AutosuggestMenuOption } from '../../../common-events/types';
import useRouter from '../../../common-events/i18n/router/useRouter';
import { getI18nPath } from '../../../common-events/i18n/router/utils';
import PlaceSelector from '../../place/placeSelector/PlaceSelector';
import {
  EVENT_DEFAULT_SEARCH_FILTERS,
  EVENT_SEARCH_FILTERS,
  MAPPED_PLACES,
} from './constants';
import FilterSummary from './filterSummary/FilterSummary';
import {
  getEventCategoryOptions,
  getSearchFilters,
  getSearchQuery,
  MAX_AGE,
  MIN_AGE,
} from './utils';
import styles from './search.module.scss';
import RangeDropdown from '../../../common-events/components/rangeDropdown/RangeDropdown';

interface Props {
  scrollToResultList: () => void;
  'data-testid'?: string;
}

const AdvancedSearch: React.FC<Props> = ({
  scrollToResultList,
  'data-testid': dataTestId,
}) => {
  const { t } = useTranslation('search');
  const locale = useLocale();
  const router = useRouter();
  const params: { place?: string } = router.query;
  const searchParams = React.useMemo(
    () => new URLSearchParams(qs.stringify(router.query)),
    [router.query]
  );

  const [categoryInput, setCategoryInput] = React.useState('');
  const [minAgeInput, setMinAgeInput] = React.useState('');
  const [maxAgeInput, setMaxAgeInput] = React.useState('');
  // const [divisionInput, setDivisionInput] = React.useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [placeInput, setPlaceInput] = React.useState('');

  const [selectedDateTypes, setSelectedDateTypes] = React.useState<string[]>(
    []
  );
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );
  const [selectedDivisions, setSelectedDivisions] = React.useState<string[]>(
    []
  );
  const [selectedPlaces, setSelectedPlaces] = React.useState<string[]>([]);
  const [start, setStart] = React.useState<Date | null>(null);
  const [end, setEnd] = React.useState<Date | null>(null);
  const [isCustomDate, setIsCustomDate] = React.useState<boolean>(false);
  const [selectedTexts, setSelectedTexts] = React.useState<string[]>([]);
  const [autosuggestInput, setAutosuggestInput] = React.useState('');

  const {
    isFree,
    keyword,
    keywordNot,
    onlyChildrenEvents,
    onlyEveningEvents,
    onlyRemoteEvents,
    publisher,
  } = getSearchFilters(searchParams);

  const searchFilters = {
    categories: selectedCategories,
    dateTypes: selectedDateTypes,
    divisions: selectedDivisions,
    end,
    isFree,
    keyword,
    keywordNot,
    onlyChildrenEvents,
    onlyEveningEvents,
    onlyRemoteEvents,
    places: selectedPlaces,
    publisher,
    start,
    text: selectedTexts,
  };

  // const divisionOptions = useDivisionOptions();

  const categories = getEventCategoryOptions(t);

  const handleChangeDateTypes = (value: string[]) => {
    setSelectedDateTypes(value);
  };

  const toggleIsCustomDate = () => {
    setIsCustomDate(!isCustomDate);
  };

  const moveToSearchPage = () => {
    const filters = {
      ...searchFilters,
      text: [autosuggestInput],
    };
    const search = getSearchQuery(filters);

    router.push({
      pathname: getI18nPath('/search', locale),
      query: parse(search) as ParsedUrlQueryInput,
    });
  };

  // Initialize fields when page is loaded
  React.useEffect(() => {
    const {
      categories,
      dateTypes,
      divisions,
      end: endTime,
      places,
      start: startTime,
      text,
    } = getSearchFilters(searchParams);

    const pathPlace = params.place && MAPPED_PLACES[params.place.toLowerCase()];

    if (pathPlace) {
      places.push(pathPlace);
    }

    setSelectedCategories(categories);
    setSelectedDivisions(divisions);
    setSelectedPlaces(places);
    setSelectedTexts(text || []);
    setEnd(endTime);
    setStart(startTime);

    if (endTime || startTime) {
      setIsCustomDate(true);
    } else {
      setSelectedDateTypes(dateTypes);
    }
    setAutosuggestInput(text?.toString() || '');
  }, [searchParams, params]);

  const handleMenuOptionClick = async (option: AutosuggestMenuOption) => {
    const value = option.text;

    const { text } = getSearchFilters(searchParams);

    if (value && !text?.includes(value)) {
      text?.push(value);
    }

    const search = getSearchQuery({
      ...searchFilters,
      text,
    });

    setSelectedTexts(text || []);

    router.push({
      pathname: getI18nPath('/search', locale),
      query: parse(search) as ParsedUrlQueryInput,
    });
    scrollToResultList();
  };

  const handleIsFreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchQuery({
      ...searchFilters,
      isFree: e.target.checked,
    });

    router.push({
      pathname: getI18nPath('/search', locale),
      query: parse(search) as ParsedUrlQueryInput,
    });
  };

  const clearInputValues = () => {
    setCategoryInput('');
    // setDivisionInput("");
    setPlaceInput('');
    setAutosuggestInput('');
    setMaxAgeInput('');
    setMinAgeInput('');
  };

  const clearFilters = () => {
    const search = getSearchQuery(EVENT_DEFAULT_SEARCH_FILTERS);

    router.push({
      pathname: getI18nPath('/search', locale),
      query: parse(search) as ParsedUrlQueryInput,
    });

    clearInputValues();
  };

  const handleSubmit = (event?: FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    moveToSearchPage();
    setAutosuggestInput('');
    scrollToResultList();
  };

  const handleSetAgeValues = (minAge: string, maxAge: string) => {
    setMinAgeInput(minAge);
    setMaxAgeInput(maxAge);
  };

  return (
    <div className={styles.searchContainer} data-testid={dataTestId}>
      <Container>
        <form onSubmit={handleSubmit}>
          <div className={styles.searchWrapper}>
            <div className={styles.rowWrapper}>
              <div className={classNames(styles.row, styles.autoSuggestRow)}>
                <div>
                  <SearchLabel color="black" htmlFor="search">
                    {t('search.labelSearchField')}
                  </SearchLabel>
                  <SearchAutosuggest
                    name="search"
                    onChangeSearchValue={setAutosuggestInput}
                    onOptionClick={handleMenuOptionClick}
                    placeholder={t('search.placeholder')}
                    searchValue={autosuggestInput}
                  />
                </div>
              </div>
            </div>
            <div className={styles.rowWrapper}>
              <div className={styles.row}>
                <div>
                  <MultiSelectDropdown
                    checkboxName="categoryOptions"
                    icon={<></>}
                    inputValue={categoryInput}
                    name="category"
                    onChange={setSelectedCategories}
                    options={categories}
                    setInputValue={setCategoryInput}
                    showSearch={false}
                    title={t('search.titleDropdownCategory')}
                    value={selectedCategories}
                  />
                </div>
                <div className={styles.dateSelectorWrapper}>
                  <DateSelector
                    dateTypes={selectedDateTypes}
                    endDate={end}
                    isCustomDate={isCustomDate}
                    name="date"
                    onChangeDateTypes={handleChangeDateTypes}
                    onChangeEndDate={setEnd}
                    onChangeStartDate={setStart}
                    startDate={start}
                    toggleIsCustomDate={toggleIsCustomDate}
                  />
                </div>
                {/* <div>
                  <MultiSelectDropdown
                    checkboxName="divisionOptions"
                    icon={<IconLocation aria-hidden />}
                    inputValue={divisionInput}
                    name="division"
                    onChange={setSelectedDivisions}
                    options={divisionOptions}
                    selectAllText={t("search.selectAllDivisions")}
                    setInputValue={setDivisionInput}
                    showSearch={true}
                    showSelectAll={true}
                    title={t("search.titleDropdownDivision")}
                    value={selectedDivisions}
                  />
                </div> */}
                <div>
                  <PlaceSelector
                    checkboxName="placesCheckboxes"
                    icon={<></>}
                    inputValue={placeInput}
                    name="places"
                    onChange={setSelectedPlaces}
                    selectAllText={t('search.selectAllPlaces')}
                    setInputValue={setPlaceInput}
                    showSearch={true}
                    showSelectAll={true}
                    title={t('search.titleDropdownPlace')}
                    value={selectedPlaces}
                  />
                </div>
                <div>
                  <RangeDropdown
                    icon={<IconCake aria-hidden />}
                    rangeIcon={<IconArrowRight aria-hidden />}
                    minInputValue={minAgeInput}
                    minInputLabel={t('search.ageLimitMin')}
                    minInputStartValue={MIN_AGE.toString()}
                    minInputFixedValue={'18'}
                    maxInputValue={maxAgeInput}
                    maxInputLabel={t('search.ageLimitMax')}
                    maxInputEndValue={MAX_AGE.toString()}
                    name="ageLimitValues"
                    onChange={handleSetAgeValues}
                    fixedValuesText={t('search.showOnlyAdultCourses')}
                    title={t('search.ageLimitValues')}
                    value={[minAgeInput, maxAgeInput]}
                  />
                </div>
              </div>
              <div className={styles.buttonWrapper}>
                <Button
                  fullWidth={true}
                  iconLeft={<IconSearch aria-hidden />}
                  variant="success"
                  type="submit"
                >
                  {t('search.buttonSearch')}
                </Button>
              </div>
            </div>
            <div className={styles.rowWrapper}>
              <div className={styles.row}>
                {/* <div>
                  <Checkbox
                    className={styles.checkbox}
                    checked={onlyChildrenEvents}
                    id={EVENT_SEARCH_FILTERS.ONLY_CHILDREN_EVENTS}
                    label={t("search.checkboxOnlyChildrenEvents")}
                    onChange={handleOnlyChildrenEventChange}
                  />
                </div> */}
                <div>
                  <Checkbox
                    className={styles.checkbox}
                    checked={isFree}
                    id={EVENT_SEARCH_FILTERS.IS_FREE}
                    label={t('search.checkboxIsFree')}
                    onChange={handleIsFreeChange}
                  />
                </div>
              </div>
            </div>
            <FilterSummary onClear={clearFilters} />
          </div>
        </form>
      </Container>
    </div>
  );
};

export default AdvancedSearch;

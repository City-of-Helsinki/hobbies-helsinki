import classNames from "classnames";
import { Button, Container, IconLocation, IconSearch } from "hds-react";
import uniq from "lodash/uniq";
import { useTranslation } from "next-i18next";
import React, { FormEvent } from "react";

import SearchAutosuggest from "../../../common-events/components/search/SearchAutosuggest";
import SearchLabel from "../../../common-events/components/search/searchLabel/SearchLabel";
import useDivisionOptions from "../../../common-events/hooks/useDivisionOptions";
import Checkbox from "../../../common/components/checkbox/Checkbox";
import DateSelector from "../../../common/components/dateSelector/DateSelector";
import MultiSelectDropdown from "../../../common/components/multiSelectDropdown/MultiSelectDropdown";
import useLocale from "../../../common/hooks/useLocale";
import { AutosuggestMenuOption } from "../../../common/types";
import useRouter from "../../i18n/router/useRouter";
import { getI18nPath } from "../../i18n/router/utils";
import PlaceSelector from "../../place/placeSelector/PlaceSelector";
import {
  EVENT_DEFAULT_SEARCH_FILTERS,
  EVENT_SEARCH_FILTERS,
  MAPPED_PLACES,
} from "./constants";
import FilterSummary from "./filterSummary/FilterSummary";
import styles from "./search.module.scss";
import {
  getEventCategoryOptions,
  getSearchFilters,
  getSearchQuery,
} from "./utils";

interface Props {
  scrollToResultList: () => void;
  "data-testid"?: string;
}

const AdvancedSearch: React.FC<Props> = ({
  scrollToResultList,
  "data-testid": dataTestId,
}) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const router = useRouter();
  const params: { place?: string } = router.query;
  const searchParams = React.useMemo(
    () => new URLSearchParams(router.asPath),
    [router.asPath]
  );

  const [categoryInput, setCategoryInput] = React.useState("");
  const [divisionInput, setDivisionInput] = React.useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [placeInput, setPlaceInput] = React.useState("");

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
  const [autosuggestInput, setAutosuggestInput] = React.useState("");

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

  const divisionOptions = useDivisionOptions();

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
      text: uniq([...searchFilters.text, autosuggestInput]).filter(
        (text) => text
      ),
    };
    const search = getSearchQuery(filters);

    router.push(`${getI18nPath("/search", locale)}${search}`);
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
    setSelectedTexts(text);
    setEnd(endTime);
    setStart(startTime);

    if (endTime || startTime) {
      setIsCustomDate(true);
    } else {
      setSelectedDateTypes(dateTypes);
    }
  }, [searchParams, params]);

  const handleMenuOptionClick = async (option: AutosuggestMenuOption) => {
    const value = option.text;

    const { text } = getSearchFilters(searchParams);

    if (value && !text.includes(value)) {
      text.push(value);
    }

    const search = getSearchQuery({
      ...searchFilters,
      text,
    });

    setSelectedTexts(text);
    setAutosuggestInput("");

    router.push(`${getI18nPath("/search", locale)}${search}`);
    scrollToResultList();
  };

  const handleOnlyChildrenEventChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const search = getSearchQuery({
      ...searchFilters,
      onlyChildrenEvents: e.target.checked,
    });

    router.push(`${getI18nPath("/search", locale)}${search}`);
  };

  const handleOnlyEveningEventChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const search = getSearchQuery({
      ...searchFilters,
      onlyEveningEvents: e.target.checked,
    });

    router.push(`${getI18nPath("/search", locale)}${search}`);
  };

  const handleOnlyRemoteEventChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const search = getSearchQuery({
      ...searchFilters,
      onlyRemoteEvents: e.target.checked,
    });

    router.push(`${getI18nPath("/search", locale)}${search}`);
  };

  const handleIsFreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchQuery({
      ...searchFilters,
      isFree: e.target.checked,
    });

    router.push(`${getI18nPath("/search", locale)}${search}`);
  };

  const clearInputValues = () => {
    setCategoryInput("");
    setDivisionInput("");
    setPlaceInput("");
    setAutosuggestInput("");
  };

  const clearFilters = () => {
    const search = getSearchQuery(EVENT_DEFAULT_SEARCH_FILTERS);

    router.push(`${getI18nPath("/search", locale)}${search}`);

    clearInputValues();
  };

  const handleSubmit = (event?: FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    moveToSearchPage();

    setAutosuggestInput("");
    scrollToResultList();
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
                    {t("eventSearch.search.labelSearchField")}
                  </SearchLabel>
                  <SearchAutosuggest
                    name="search"
                    onChangeSearchValue={setAutosuggestInput}
                    onOptionClick={handleMenuOptionClick}
                    placeholder={t("eventSearch.search.placeholder")}
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
                    title={t("eventSearch.search.titleDropdownCategory")}
                    value={selectedCategories}
                    t={t}
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
                    t={t}
                  />
                </div>
                <div>
                  <MultiSelectDropdown
                    checkboxName="divisionOptions"
                    icon={<IconLocation aria-hidden />}
                    inputValue={divisionInput}
                    name="division"
                    onChange={setSelectedDivisions}
                    options={divisionOptions}
                    selectAllText={t("eventSearch.search.selectAllDivisions")}
                    setInputValue={setDivisionInput}
                    showSearch={true}
                    showSelectAll={true}
                    title={t("eventSearch.search.titleDropdownDivision")}
                    value={selectedDivisions}
                    t={t}
                  />
                </div>
                <div>
                  <PlaceSelector
                    checkboxName="placesCheckboxes"
                    icon={<></>}
                    inputValue={placeInput}
                    name="places"
                    onChange={setSelectedPlaces}
                    selectAllText={t("eventSearch.search.selectAllPlaces")}
                    setInputValue={setPlaceInput}
                    showSearch={true}
                    showSelectAll={true}
                    title={t("eventSearch.search.titleDropdownPlace")}
                    value={selectedPlaces}
                    t={t}
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
                  {t("eventSearch.search.buttonSearch")}
                </Button>
              </div>
            </div>
            <div className={styles.rowWrapper}>
              <div className={styles.row}>
                <div>
                  <Checkbox
                    className={styles.checkbox}
                    checked={onlyChildrenEvents}
                    id={EVENT_SEARCH_FILTERS.ONLY_CHILDREN_EVENTS}
                    label={t("eventSearch.search.checkboxOnlyChildrenEvents")}
                    onChange={handleOnlyChildrenEventChange}
                  />
                </div>
                <div>
                  <Checkbox
                    className={styles.checkbox}
                    checked={isFree}
                    id={EVENT_SEARCH_FILTERS.IS_FREE}
                    label={t("eventSearch.search.checkboxIsFree")}
                    onChange={handleIsFreeChange}
                  />
                </div>
                <div>
                  <Checkbox
                    className={styles.checkbox}
                    checked={onlyEveningEvents}
                    id={EVENT_SEARCH_FILTERS.ONLY_EVENING_EVENTS}
                    label={t("eventSearch.search.checkboxOnlyEveningEvents")}
                    onChange={handleOnlyEveningEventChange}
                  />
                </div>
                <div>
                  <Checkbox
                    className={styles.checkbox}
                    checked={onlyRemoteEvents}
                    id={EVENT_SEARCH_FILTERS.ONLY_REMOTE_EVENTS}
                    label={t("eventSearch.search.checkboxOnlyRemoteEvents")}
                    onChange={handleOnlyRemoteEventChange}
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

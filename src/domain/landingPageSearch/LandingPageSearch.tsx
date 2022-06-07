import { Button, IconSearch } from "hds-react";
import { useTranslation } from "next-i18next";
import React from "react";
import { Link } from "react-helsinki-headless-cms";

import CategoryFilter from "../../common/components/category/CategoryFilter";
import DateSelector from "../../common/components/dateSelector/DateSelector";
import MobileDateSelector from "../../common/components/mobileDateSelector/MobileDateSelector";
// import SearchAutosuggest from "../../common/components/search/SearchAutosuggest";
import SearchLabel from "../../common/components/search/searchLabel/SearchLabel";
import { AutosuggestMenuOption } from "../../common/types";
import { EVENT_DEFAULT_SEARCH_FILTERS } from "../eventSearch/constants";
import { getEventCategoryOptions, getSearchQuery } from "../eventSearch/utils";
import useLocale from "../../hooks/useLocale";
import useRouter from "../i18n/router/useRouter";
import styles from "./landingPageSearch.module.scss";
import { getI18nPath } from "../i18n/router/utils";

const Search: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const [dateTypes, setDateTypes] = React.useState<string[]>([]);
  const [start, setStart] = React.useState<Date | null>(null);
  const [end, setEnd] = React.useState<Date | null>(null);
  const [isCustomDate, setIsCustomDate] = React.useState<boolean>(false);
  const [autosuggestInput, setAutosuggestInput] = React.useState("");
  const router = useRouter();

  const categories = getEventCategoryOptions(t);

  const handleChangeDateTypes = (value: string[]) => {
    setDateTypes(value);
  };

  const toggleIsCustomDate = () => {
    setIsCustomDate(!isCustomDate);
  };

  const goToSearchPage = (search: string) => {
    router.push({
      pathname: getI18nPath("/events", locale),
      search,
    });
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

  // const handleMenuOptionClick = (option: AutosuggestMenuOption) => {
  //   const search = getSearchQuery({
  //     ...EVENT_DEFAULT_SEARCH_FILTERS,
  //     dateTypes,
  //     end,
  //     start,
  //     text: [option.text],
  //   });
  //   goToSearchPage(search);
  // };

  return (
    <>
      <div className={styles.landingPageSearch}>
        {/* Hide Suprise me button on MVP version */}
        {/* <SupriseMeButton onClick={handleClickSupriseMe} /> */}
        <div className={styles.searchRow}>
          <div className={styles.titleWrapper}>
            <h2>{t("home.search.title")}</h2>
          </div>
          <div className={styles.autosuggestWrapper}>
            <SearchLabel htmlFor={"search"}>
              {t("home.search.labelSearchField")}
            </SearchLabel>
            <div></div>
            {/* <SearchAutosuggest
              name="search"
              onChangeSearchValue={setAutosuggestInput}
              onOptionClick={handleMenuOptionClick}
              placeholder={t("home.search.placeholder")}
              searchValue={autosuggestInput}
            /> */}
          </div>
          <div className={styles.dateAndButtonWrapper}>
            <div className={styles.dateSelectorWrapper}>
              <SearchLabel color="black" htmlFor="date" srOnly={true}>
                {t("home.search.labelDateRange")}
              </SearchLabel>
              <div className={styles.desktopDateSelector}>
                <DateSelector
                  dateTypes={dateTypes}
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
              <MobileDateSelector
                dateTypes={dateTypes}
                endDate={end}
                name={"mobile_date"}
                onChangeDateTypes={handleChangeDateTypes}
                onChangeEndDate={setEnd}
                onChangeStartDate={setStart}
                startDate={start}
              />
            </div>
            <div className={styles.buttonWrapper}>
              <Button
                fullWidth={true}
                iconLeft={<IconSearch />}
                onClick={handleSubmit}
                variant="success"
              >
                {t("home.search.buttonSearch")}
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.linkRow}>
          <Link color="white" href={getI18nPath("/events", locale)}>
            {t("home.search.linkAdvancedSearch")}
          </Link>
        </div>
      </div>
      <div className={styles.categoriesWrapper}>
        {categories.map((category) => {
          return (
            <CategoryFilter
              href={`${getI18nPath("/events", locale)}${getSearchQuery({
                ...EVENT_DEFAULT_SEARCH_FILTERS,
                categories: [category.value],
                dateTypes,
                end,
                start,
              })}`}
              key={category.value}
              icon={category.icon}
              text={category.text}
              value={category.value}
            />
          );
        })}
      </div>
    </>
  );
};

export default Search;

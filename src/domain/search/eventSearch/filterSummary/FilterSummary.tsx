import { useTranslation } from "next-i18next";
import React from "react";
import qs from "query-string";

import useDivisionOptions from "../../../../common-events/hooks/useDivisionOptions";
import FilterButton from "../../../../common/components/filterButton/FilterButton";
import { FilterType } from "../../../../common/components/filterButton/types";
import useLocale from "../../../../common/hooks/useLocale";
import { formatDate } from "../../../../common/utils/dateUtils";
import { translateValue } from "../../../../common/utils/translateUtils";
import useRouter from "../../../i18n/router/useRouter";
import { getI18nPath } from "../../../i18n/router/utils";
import {
  getSearchFilters,
  getSearchQuery,
  getSuitableForFilterValue,
} from "../utils";
import DateFilter from "./DateFilter";
import styles from "./filterSummary.module.scss";
import PlaceFilter from "./PlaceFilter";
import PublisherFilter from "./PublisherFilter";
import TextFilter from "./TextFilter";

export const filterSummaryContainerTestId = "filter-summary";

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
    text,
    suitableFor,
  } = getSearchFilters(searchParams);

  const dateText =
    start || end
      ? `${start ? formatDate(start) : ""} - ${
          end ? formatDate(end) : ""
        }`.trim()
      : "";

  const neighborhoods = useDivisionOptions();
  const getNeighorhoodName = React.useCallback(
    (id: string) => {
      const neighborhood = neighborhoods.find((item) => item.value === id);
      return neighborhood?.text ?? "";
    },
    [neighborhoods]
  );

  const handleFilterRemove = (value: string | number, type: FilterType) => {
    const getFilteredList = (listType: FilterType, list: string[] = []) =>
      type === listType ? list.filter((v) => v !== value) : list;

    const search = getSearchQuery({
      categories: getFilteredList("category", categories),
      dateTypes: getFilteredList("dateType", dateTypes),
      divisions: getFilteredList("division", divisions),
      end: type === "date" ? null : end,
      isFree,
      keyword,
      keywordNot,
      onlyChildrenEvents,
      places: getFilteredList("place", places),
      publisher: type !== "publisher" ? publisher : null,
      start: type === "date" ? null : start,
      text: getFilteredList("text", text),
      suitableFor: getSuitableForFilterValue(suitableFor, type) ?? [],
    });

    router.push({
      pathname: getI18nPath("/search", locale),
      search,
    });
  };

  const hasFilters =
    !!publisher ||
    !!categories.length ||
    !!dateText ||
    !!dateTypes.length ||
    !!divisions.length ||
    !!places.length ||
    !!text.length ||
    !!suitableFor?.length;

  if (!hasFilters) return null;

  return (
    <div
      className={styles.filterSummary}
      data-testid={filterSummaryContainerTestId}
    >
      {text.map((item, index) => (
        <TextFilter
          key={index}
          text={item}
          onRemove={handleFilterRemove}
          t={t}
        />
      ))}
      {categories.map((category) => (
        <FilterButton
          key={category}
          onRemove={handleFilterRemove}
          text={translateValue("home.category.", category, t)}
          type="category"
          value={category}
          t={t}
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
          t={t}
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
          t={t}
        />
      )}
      {dateTypes.map((dateType) => (
        <DateFilter
          key={dateType}
          onRemove={handleFilterRemove}
          type="dateType"
          value={dateType}
          t={t}
        />
      ))}
      <button className={styles.clearButton} onClick={onClear} type="button">
        {t("eventSearch.buttonClearFilters")}
      </button>
    </div>
  );
};

export default FilterSummary;

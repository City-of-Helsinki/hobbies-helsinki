import { Button, IconSearch } from "hds-react";
import { Link } from "react-helsinki-headless-cms";
import { TFunction } from "next-i18next";
import classnames from "classnames";

import DateSelector from "../../../common-events/components/dateSelector/DateSelector";
import MobileDateSelector from "../../../common-events/components/mobileDateSelector/MobileDateSelector";
import SearchAutosuggest from "../../../common-events/components/search/SearchAutosuggest";
import SearchLabel from "../../../common-events/components/search/searchLabel/SearchLabel";
import { AutosuggestMenuOption } from "../../../common-events/types";
import useLocale from "../../../common-events/hooks/useLocale";
import { getI18nPath } from "../../i18n/router/utils";
import styles from "./landingPageSearchForm.module.scss";

export type LandingPageSearchFormProps = {
  t: TFunction;
  className?: string;
  dateTypes: string[];
  start: Date | null;
  end: Date | null;
  isCustomDate: boolean;
  autosuggestInput: string;
  setStart: (value: Date | null) => void;
  setEnd: (value: Date | null) => void;
  setAutosuggestInput: (value: string) => void;
  handleChangeDateTypes: (value: string[]) => void;
  toggleIsCustomDate: () => void;
  handleSubmit: () => void;
  handleMenuOptionClick: (option: AutosuggestMenuOption) => void;
};

export default function LandingPageSearchForm({
  t,
  className,
  dateTypes,
  start,
  setStart,
  end,
  setEnd,
  isCustomDate,
  autosuggestInput,
  setAutosuggestInput,
  handleChangeDateTypes,
  toggleIsCustomDate,
  handleSubmit,
  handleMenuOptionClick,
}: LandingPageSearchFormProps) {
  const locale = useLocale();

  return (
    <div className={classnames(className, styles.landingPageSearch)}>
      <div className={styles.searchRow}>
        <div className={styles.titleWrapper}>
          <h2>{t<string>("home.search.title")}</h2>
        </div>
        <div className={styles.autosuggestWrapper}>
          <SearchLabel htmlFor={"search"}>
            {t<string>("home.search.labelSearchField")}
          </SearchLabel>

          <SearchAutosuggest
            name="search"
            onChangeSearchValue={setAutosuggestInput}
            onOptionClick={handleMenuOptionClick}
            placeholder={t<string>("home.search.placeholder")}
            searchValue={autosuggestInput}
          />
        </div>
        <div className={styles.dateAndButtonWrapper}>
          <div className={styles.dateSelectorWrapper}>
            <SearchLabel color="black" htmlFor="date" srOnly={true}>
              {t<string>("home.search.labelDateRange")}
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
                t={t}
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
              t={t}
            />
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              fullWidth={true}
              iconLeft={<IconSearch />}
              onClick={handleSubmit}
              variant="success"
            >
              {t<string>("home.search.buttonSearch")}
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.linkRow}>
        <Link color="white" href={getI18nPath("/search", locale)}>
          {t<string>("home.search.linkAdvancedSearch")}
        </Link>
      </div>
    </div>
  );
}

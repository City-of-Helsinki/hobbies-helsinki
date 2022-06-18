import { useTranslation } from "next-i18next";
import React, { FunctionComponent } from "react";

import CategoryFilter from "../../common-events/components/category/CategoryFilter";
import useLocale from "../../common-events/hooks/useLocale";
import { getI18nPath } from "../../common-events/i18n/router/utils";
import {
  CATEGORY_CATALOG,
  COURSE_DEFAULT_SEARCH_FILTERS,
} from "../search/eventSearch/constants";
import { CategoryExtendedOption, Filters } from "../search/eventSearch/types";
import {
  getEventCategoryOptions,
  getSearchQuery,
} from "../search/eventSearch/utils";
import styles from "./footerCategories.module.scss";

const FooterCategories: FunctionComponent = () => {
  const { t } = useTranslation("footer");
  const locale = useLocale();
  const route = "/courses";

  const getCategoryLink = (category: CategoryExtendedOption) => {
    return `${getI18nPath("/search", locale)}${getSearchQuery({
      ...defaultSearchFiltersMap[route],
      categories: [category.value],
    })}`;
  };

  const defaultSearchFiltersMap: Record<string, Filters> = {
    [route]: COURSE_DEFAULT_SEARCH_FILTERS,
  };

  const categories = getEventCategoryOptions(
    t,
    CATEGORY_CATALOG.Course.default
  );
  const footerTitle = t(`titleCoursesCategories`);

  return (
    <div className={styles.topFooterWrapper}>
      <hr className={styles.divider} aria-hidden />
      <h2 className={styles.categoriesTitle}>{footerTitle}</h2>
      <div className={styles.categoriesInnerWrapper}>
        {categories.map((category) => {
          return (
            <CategoryFilter
              href={getCategoryLink(category)}
              key={category.value}
              hasHorizontalPadding={true}
              icon={category.icon}
              text={category.text}
              value={category.value}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FooterCategories;

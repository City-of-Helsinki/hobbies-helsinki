import React from "react";
import classNames from "classnames";

import CategoryFilter from "../../../common/components/category/CategoryFilter";
import { CategoryExtendedOption, Filters } from "../eventSearch/types";
import { getI18nPath } from "../../i18n/router/utils";
import useLocale from "../../../common/hooks/useLocale";
import { getSearchQuery } from "../eventSearch/utils";

type SearchShortcutsProps = {
  className: string;
  categories: CategoryExtendedOption[];
  searchFilters: Filters;
};

export default function SearchShortcuts({
  className,
  categories,
  searchFilters,
}: SearchShortcutsProps) {
  const locale = useLocale();

  const getCategoryLink = (category: CategoryExtendedOption) => {
    return `${getI18nPath("/search", locale)}${getSearchQuery({
      ...searchFilters,
      categories: [category.value],
    })}`;
  };

  return (
    <div className={classNames(className, "searchShortcuts")}>
      {categories.map((category) => {
        return (
          <CategoryFilter
            href={getCategoryLink(category)}
            key={category.value}
            icon={category.icon}
            text={category.text}
            value={category.value}
          />
        );
      })}
    </div>
  );
}

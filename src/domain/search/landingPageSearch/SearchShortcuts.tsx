import React from 'react';
import classNames from 'classnames';

import CategoryFilter from '../../../common-events/components/category/CategoryFilter';
import { CategoryExtendedOption, Filters } from '../eventSearch/types';
import { getSearchQuery } from '../eventSearch/utils';
import { ROUTES } from '../../../constants';
import useLocale from '../../../hooks/useLocale';
import { getI18nPath } from '../../../utils/routerUtils';

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
    return `${getI18nPath(ROUTES.SEARCH, locale)}${getSearchQuery({
      ...searchFilters,
      categories: [category.value],
    })}`;
  };

  return (
    <div className={classNames(className, 'searchShortcuts')}>
      {categories.map((category) => {
        return (
          <CategoryFilter
            hasHorizontalPadding
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

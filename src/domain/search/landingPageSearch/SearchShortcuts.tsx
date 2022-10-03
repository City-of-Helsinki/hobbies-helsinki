import React from 'react';
import classNames from 'classnames';
import { useLocale } from 'events-helsinki-components';

import CategoryFilter from '../../../common-events/components/category/CategoryFilter';
import { CategoryOption, Filters } from '../eventSearch/types';
import { getSearchQuery } from '../eventSearch/utils';
import { getLocalizedCmsItemUrl } from '../../../utils/routerUtils';
import { ROUTES } from '../../../constants';

type SearchShortcutsProps = {
  className: string;
  categories: CategoryOption[];
  searchFilters: Filters;
};

export default function SearchShortcuts({
  className,
  categories,
  searchFilters,
}: SearchShortcutsProps) {
  const locale = useLocale();

  const getCategoryLink = (category: CategoryOption) => {
    return `${getLocalizedCmsItemUrl(
      ROUTES.SEARCH,
      {},
      locale,
    )}${getSearchQuery({
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

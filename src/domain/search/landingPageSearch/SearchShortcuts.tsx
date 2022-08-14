import React from 'react';
import classNames from 'classnames';

import CategoryFilter from '../../../common-events/components/category/CategoryFilter';
import { CategoryExtendedOption, Filters } from '../eventSearch/types';
import { getSearchQuery } from '../eventSearch/utils';
import { ROUTES } from '../../../constants';
import useLocale from '../../../hooks/useLocale';
import { getLocalizedCmsItemUrl } from '../../../utils/routerUtils';
import { Language } from '../../../types';
import useRouter from '../../../hooks/useRouter';

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
  const router = useRouter();

  const getCategoryLink = (category: CategoryExtendedOption) => {
    return `${getLocalizedCmsItemUrl(
      ROUTES.SEARCH,
      {},
      locale
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

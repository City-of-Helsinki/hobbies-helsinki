import React from 'react';

import useConfig from '../../../../common-events/hooks/useConfig';
import { FilterType } from '../../../../common-events/components/filterButton/types';
import FilterButton from '../../../../common-events/components/filterButton/FilterButton';

export interface AgeFilterProps {
  value: string;
  type: 'minAge' | 'maxAge';
  onRemove: (value: string, type: FilterType) => void;
}

const AgeFilter: React.FC<AgeFilterProps> = ({ value, type, onRemove }) => {
  const { t } = useConfig();

  return (
    <FilterButton
      onRemove={onRemove}
      text={t(`search:search.ageFilter.${type}`, {
        age: value,
        yearAbbr: t('common:yearsShort'),
      })}
      type={type}
      value={value}
    />
  );
};

export default AgeFilter;

import React from 'react';
import { FilterType } from 'events-helsinki-components';
import { FilterButton, useConfig } from 'events-helsinki-components';

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

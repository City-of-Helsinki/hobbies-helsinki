import React from 'react';

import { translateValue } from '../../../../common-events/utils/translateUtils';
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
  const text = type === 'minAge' ? 'ageLimitMin' : 'ageLimitMax';

  return (
    <FilterButton
      onRemove={onRemove}
      text={text || translateValue(`search:ageFilter.${text}`, value, t)}
      type={type}
      value={value}
    />
  );
};

export default AgeFilter;

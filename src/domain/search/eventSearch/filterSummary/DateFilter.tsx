import React from 'react';
import { FilterType } from 'events-helsinki-components';
import { translateValue } from 'events-helsinki-components';
import { FilterButton, useConfig } from 'events-helsinki-components';


export interface DateFilterProps {
  onRemove: (value: string, type: FilterType) => void;
  text?: string;
  type: 'date' | 'dateType';
  value: string;
}

const DateFilter: React.FC<DateFilterProps> = ({
  onRemove,
  text,
  type,
  value,
}) => {
  const { t } = useConfig();
  return (
    <FilterButton
      onRemove={onRemove}
      text={text || translateValue('common:dateSelector.dateType', value, t)}
      type={type}
      value={value}
    />
  );
};

export default DateFilter;

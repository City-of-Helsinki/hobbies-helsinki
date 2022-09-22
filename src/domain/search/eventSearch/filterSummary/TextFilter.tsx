import React from 'react';
import { FilterType } from 'events-helsinki-components';
import { FilterButton } from 'events-helsinki-components';


interface Props {
  onRemove: (value: string, type: FilterType) => void;
  text: string;
}

const TextFilter: React.FC<Props> = ({ onRemove, text }) => (
  <FilterButton onRemove={onRemove} text={text} type="text" value={text} />
);

export default TextFilter;

import React from "react";

import FilterButton from "../../../../common-events/components/filterButton/FilterButton";
import { FilterType } from "../../../../common-events/components/filterButton/types";
import { UnionTFunction } from "../../../../common-events/types";

interface Props {
  onRemove: (value: string, type: FilterType) => void;
  text: string;
  t: UnionTFunction;
}

const TextFilter: React.FC<Props> = ({ onRemove, text, t }) => (
  <FilterButton
    onRemove={onRemove}
    text={text}
    type="text"
    value={text}
    t={t}
  />
);

export default TextFilter;

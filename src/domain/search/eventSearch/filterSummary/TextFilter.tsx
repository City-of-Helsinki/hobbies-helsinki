import { TFunction } from "next-i18next";
import React from "react";

import FilterButton from "../../../../common/components/filterButton/FilterButton";
import { FilterType } from "../../../../common/components/filterButton/types";

interface Props {
  onRemove: (value: string, type: FilterType) => void;
  text: string;
  t: TFunction;
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

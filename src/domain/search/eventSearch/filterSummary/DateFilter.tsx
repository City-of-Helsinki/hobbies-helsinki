import React from "react";

import FilterButton from "../../../../common-events/components/filterButton/FilterButton";
import { FilterType } from "../../../../common-events/components/filterButton/types";
import { UnionTFunction } from "../../../../common-events/types";
import { translateValue } from "../../../../common-events/utils/translateUtils";

export interface DateFilterProps {
  onRemove: (value: string, type: FilterType) => void;
  text?: string;
  type: "date" | "dateType";
  value: string;
  t: UnionTFunction;
}

const DateFilter: React.FC<DateFilterProps> = ({
  onRemove,
  text,
  type,
  value,
  t,
}) => {
  return (
    <FilterButton
      onRemove={onRemove}
      text={text || translateValue("commons.dateSelector.dateType", value, t)}
      type={type}
      value={value}
      t={t}
    />
  );
};

export default DateFilter;

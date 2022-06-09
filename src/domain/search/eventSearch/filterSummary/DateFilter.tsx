import { TFunction } from "next-i18next";
import React from "react";

import FilterButton from "../../../../common/components/filterButton/FilterButton";
import { FilterType } from "../../../../common/components/filterButton/types";
import { translateValue } from "../../../../common/utils/translateUtils";

export interface DateFilterProps {
  onRemove: (value: string, type: FilterType) => void;
  text?: string;
  type: "date" | "dateType";
  value: string;
  t: TFunction;
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

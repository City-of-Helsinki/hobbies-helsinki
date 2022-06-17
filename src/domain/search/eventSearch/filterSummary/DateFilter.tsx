import React from "react";

import FilterButton from "../../../../common-events/components/filterButton/FilterButton";
import { FilterType } from "../../../../common-events/components/filterButton/types";
import useConfig from "../../../../common-events/hooks/useConfig";
import { translateValue } from "../../../../common-events/utils/translateUtils";

export interface DateFilterProps {
  onRemove: (value: string, type: FilterType) => void;
  text?: string;
  type: "date" | "dateType";
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
      text={text || translateValue("common:dateSelector.dateType", value, t)}
      type={type}
      value={value}
    />
  );
};

export default DateFilter;

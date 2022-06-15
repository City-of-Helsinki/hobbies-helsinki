import classNames from "classnames";
import { IconCross } from "hds-react";
import React from "react";

import { UnionTFunction } from "../../types";
import styles from "./filterButton.module.scss";
import { FilterType } from "./types";

interface Props {
  onRemove: (value: string, type: FilterType) => void;
  text: string;
  type: FilterType;
  value: string;
  t: UnionTFunction;
}

const FilterButton: React.FC<Props> = ({ onRemove, text, type, value, t }) => {
  const handleRemove = () => {
    onRemove(value, type);
  };

  return (
    <div className={classNames(styles.filter, styles[type])}>
      <button
        type="button"
        className={styles.closeButton}
        onClick={handleRemove}
        aria-label={t<string>("commons.filter.ariaButtonRemove", {
          filter: text,
        })}
      >
        <IconCross size="s" aria-hidden />
      </button>
      {text}
    </div>
  );
};

export default FilterButton;

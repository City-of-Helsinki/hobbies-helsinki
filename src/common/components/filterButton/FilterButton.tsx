import classNames from "classnames";
import { IconCross } from "hds-react";
import { TFunction } from "next-i18next";
import React from "react";

import styles from "./filterButton.module.scss";
import { FilterType } from "./types";

interface Props {
  onRemove: (value: string, type: FilterType) => void;
  text: string;
  type: FilterType;
  value: string;
  t: TFunction;
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

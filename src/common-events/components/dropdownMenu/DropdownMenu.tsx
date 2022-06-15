import React from "react";

import { UnionTFunction } from "../../types";
import styles from "./dropdownMenu.module.scss";

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  onClear: () => void;
  t: UnionTFunction;
}

const DropdownMenu: React.FC<Props> = ({ children, isOpen, onClear, t }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.dropdownMenu}>
      <div className={styles.dropdownMenuWrapper}>{children}</div>
      <button className={styles.btnClear} onClick={onClear} type="button">
        {t<string>("commons.dropdown.menu.buttonClear")}
      </button>
    </div>
  );
};

export default DropdownMenu;

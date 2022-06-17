import React from "react";

import useConfig from "../../hooks/useConfig";
import styles from "./dropdownMenu.module.scss";

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  onClear: () => void;
}

const DropdownMenu: React.FC<Props> = ({ children, isOpen, onClear }) => {
  const { t } = useConfig();
  if (!isOpen) return null;

  return (
    <div className={styles.dropdownMenu}>
      <div className={styles.dropdownMenuWrapper}>{children}</div>
      <button className={styles.btnClear} onClick={onClear} type="button">
        {t<string>("common:dropdown.menu.buttonClear")}
      </button>
    </div>
  );
};

export default DropdownMenu;

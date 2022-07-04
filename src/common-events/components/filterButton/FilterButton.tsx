import classNames from 'classnames';
import { IconCross } from 'hds-react';
import React from 'react';

import useConfig from '../../hooks/useConfig';
import { FilterType } from './types';
import styles from './filterButton.module.scss';

interface Props {
  onRemove: (value: string, type: FilterType) => void;
  text: string;
  type: FilterType;
  value: string;
}

const FilterButton: React.FC<Props> = ({ onRemove, text, type, value }) => {
  const { t } = useConfig();
  const handleRemove = () => {
    onRemove(value, type);
  };

  return (
    <div className={classNames(styles.filter, styles[type])}>
      <button
        type="button"
        className={styles.closeButton}
        onClick={handleRemove}
        aria-label={t<string>('common:filter.ariaButtonRemove', {
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

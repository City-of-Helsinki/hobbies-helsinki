import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import styles from './keyword.module.scss';

interface Props {
  blackOnMobile?: boolean;
  color?: 'engelLight50' | 'tramLight20' | 'black10' | 'transparent';
  hideOnMobile?: boolean;
  keyword: string;
  onClick?: () => void;
}

const Keyword: FunctionComponent<Props> = ({
  blackOnMobile,
  color,
  hideOnMobile,
  keyword,
  onClick,
}) => {
  const handleClick = (ev: React.MouseEvent) => {
    ev.preventDefault();
    onClick && onClick();
  };

  return (
    <button
      className={classNames(styles.keyword, color && styles[color], {
        [styles.blackOnMobile]: blackOnMobile,
        [styles.hideOnMobile]: hideOnMobile,
      })}
      onClick={handleClick}
      type="button"
      role="link"
    >
      {keyword}
    </button>
  );
};

export default Keyword;

import classNames from 'classnames';
import React from 'react';

import styles from './korosWrapper.module.scss';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const KorosWrapper: React.FC<Props> = ({ children = null, className }) => {
  return (
    <div className={classNames(styles.korosWrapper, className)}>
      {children}
      <div className={styles.koros}></div>
    </div>
  );
};

export default KorosWrapper;

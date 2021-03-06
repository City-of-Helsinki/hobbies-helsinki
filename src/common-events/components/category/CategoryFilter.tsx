import classNames from 'classnames';
import * as CSS from 'csstype';
import { IconAngleRight } from 'hds-react';
import Link from 'next/link';
import React, { FunctionComponent } from 'react';

import { Category } from '../../types';
import styles from './categoryFilter.module.scss';

interface Props extends Category {
  className?: string;
  hasHorizontalPadding?: boolean;
  style?: CSS.Properties;
  href: string;
}

const CategoryFilter: FunctionComponent<Props> = ({
  className,
  hasHorizontalPadding,
  icon,
  style,
  text,
  href,
}) => {
  return (
    <div
      className={classNames(
        styles.categoryFilter,
        {
          [styles.withHorizontalPadding]: hasHorizontalPadding,
        },
        className
      )}
      style={style}
    >
      <Link href={href}>
        <a onClick={() => window?.scrollTo({ top: 0 })}>
          {icon}
          <span>{text}</span>
          <IconAngleRight aria-hidden />
        </a>
      </Link>
    </div>
  );
};

export default CategoryFilter;

import classNames from 'classnames';
import { IconAngleRight, IconLinkExternal } from 'hds-react';
import React from 'react';
import { LinkProps as ReactScrollLinkProps } from 'react-scroll/modules/components/Link';

import RouterLink from '../../i18n/router/Link';
import SrOnly from '../../../common/components/srOnly/SrOnly';
import styles from './link.module.scss';
import useConfig from '../../hooks/useConfig';

export interface LinkProps extends Omit<ReactScrollLinkProps, 'size'> {
  color?: 'default' | 'white';
  isExternal?: boolean;
  size?: 'default' | 'small';
  to: string;
  children?: React.ReactNode;
  className?: string;
}

const ALink: React.FC<LinkProps> = ({
  className,
  color = 'default',
  children,
  isExternal = false,
  size = 'default',
  to,
  ...rest
}) => {
  const { t } = useConfig();

  const commonProps = {
    className: classNames(
      styles.link,
      styles[`${color}Color`],
      styles[`${size}Size`],
      className
    ),
  };

  return isExternal ? (
    <a href={to} rel="noopener noreferrer" target="_blank" {...commonProps}>
      {children}
      <SrOnly>{t<string>('common:srOnly.opensInANewTab')}</SrOnly>
      <IconLinkExternal aria-hidden />
    </a>
  ) : (
    <RouterLink href={to} {...commonProps} {...rest}>
      {children}
      <IconAngleRight aria-hidden />
    </RouterLink>
  );
};

export default ALink;

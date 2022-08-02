import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';
import { SecondaryLink } from 'react-helsinki-headless-cms';
import {
  Link as DefaultLink,
  LinkBox,
  LinkProps,
} from 'react-helsinki-headless-cms';
import { useConfig } from 'react-helsinki-headless-cms';

type CustomLinkProps = React.PropsWithRef<
  Omit<NextLinkProps & LinkProps, 'href'>
> & {
  href: string;
  type?: 'link' | 'secondaryLink' | 'linkBox';
};

export default function Link({
  type = 'link',
  href,
  children,
  ...rest
}: CustomLinkProps) {
  const {
    utils: { getIsHrefExternal },
  } = useConfig();

  const isExternal = getIsHrefExternal(href);

  const getLinkComponent = () => {
    switch (type) {
      case 'link':
        return (
          <DefaultLink href={href} {...rest}>
            {children}
          </DefaultLink>
        );
      case 'secondaryLink':
        return (
          <SecondaryLink href={href} {...rest}>
            {children}
          </SecondaryLink>
        );
      case 'linkBox':
        return (
          <LinkBox href={href} {...rest}>
            {children}
          </LinkBox>
        );
      default:
        break;
    }
  };

  const linkComponent = getLinkComponent();

  return isExternal ? (
    <>{linkComponent}</>
  ) : (
    <NextLink href={href} {...rest}>
      {linkComponent}
    </NextLink>
  );
}

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';
import {
  Link as DefaultLink,
  LinkBox,
  LinkProps,
} from 'react-helsinki-headless-cms';
import { useConfig } from 'react-helsinki-headless-cms';

type CustomLinkProps = React.PropsWithRef<
  Omit<NextLinkProps & LinkProps, 'href'>
> & {
  variant: 'default' | 'arrowRight';
  href: string;
  type?: 'link' | 'linkBox';
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

  const linkComponent =
    type === 'link' ? (
      <DefaultLink href={href} {...rest}>
        {children}
      </DefaultLink>
    ) : (
      <LinkBox href={href} {...rest}>
        {children}
      </LinkBox>
    );

  return isExternal ? (
    <>{linkComponent}</>
  ) : (
    <NextLink href={href} {...rest} passHref>
      {linkComponent}
    </NextLink>
  );
}

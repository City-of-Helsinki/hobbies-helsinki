import React from 'react';
import NextLink, { LinkProps } from 'next/link';

import useRouter from './useRouter';
import { getI18nPath, stringifyUrlObject } from './utils';
import { Language } from '../../../types';

type Props = React.PropsWithChildren<Omit<LinkProps, 'locale'>> & {
  escape?: boolean;
  locale?: Language | false;
};

export default function Link({ href, escape, ...delegated }: Props) {
  const router = useRouter();

  // Use string hrefs as is
  if (typeof href === 'string') {
    return <NextLink {...delegated} href={href} />;
  }

  const locale = delegated.locale || router.locale;
  const i18nHref = {
    ...href,
    pathname: href.pathname
      ? getI18nPath(href.pathname, locale)
      : undefined ?? router.pathname,
  };
  const enhancedHref = escape
    ? i18nHref
    : stringifyUrlObject(i18nHref) ?? i18nHref;

  return <NextLink {...delegated} href={enhancedHref} />;
}

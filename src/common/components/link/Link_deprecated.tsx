import React from 'react';
import NextLink, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

import { Language } from '../../../types';
import { getI18nPath, stringifyUrlObject } from '../../../utils/routerUtils';

type Props = React.PropsWithChildren<Omit<LinkProps, 'locale'>> & {
  id?: string;
  escape?: boolean;
  locale?: Language | false;
};

export default function Link({ id, href, escape, ...delegated }: Props) {
  const router = useRouter();

  // DEPRECATED. But implementation might be used in future
  if (typeof href === 'string') {
    return <NextLink id={id} {...delegated} href={href} />;
  }

  const locale = delegated.locale || router.locale;
  const i18nHref = {
    ...href,
    pathname: href.pathname
      ? getI18nPath(href.pathname, locale as Language)
      : undefined ?? router.pathname,
  };
  const enhancedHref = escape
    ? i18nHref
    : stringifyUrlObject(i18nHref) ?? i18nHref;

  return <NextLink id={id} {...delegated} href={enhancedHref} />;
}

import { NextRequest, NextResponse } from 'next/server';

import { stringifyUrlObject } from './utils/routerUtils';

//TODO: For some reason middleware cannot read `'events-helsinki-core` package without breaking the build
// import { DEFAULT_LANGUAGE } from 'events-helsinki-core';

const DEFAULT_LANGUAGE = 'fi'

const requestType = {
  isStaticFile: (req: NextRequest) => req.nextUrl.pathname.startsWith('/_next'),
  isPagesFolderApi: (req: NextRequest) =>
    req.nextUrl.pathname.includes('/api/'),
  isPublicFile: (req: NextRequest) => /\.(.*)$/.test(req.nextUrl.pathname),
};

/**
 * Enforce prefix for default locale 'fi'
 * https://github.com/vercel/next.js/discussions/18419
 * @param req
 */
const prefixDefaultLocale = async (req: NextRequest) => {
  // stringify and map dynamic paths to segmented, ie: /venues/:id => /venues/[id]
  const path = stringifyUrlObject(req.nextUrl);

  if (req.nextUrl.locale === 'default') {
    return NextResponse.redirect(
      new URL(`/${DEFAULT_LANGUAGE}${path}`, req.url)
    );
  }
  if (!path.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(
      new URL(`/${req.nextUrl.locale}${path}`, req.url)
    );
  }
};

export async function middleware(req: NextRequest) {
  if (
    requestType.isStaticFile(req) ||
    requestType.isPagesFolderApi(req) ||
    requestType.isPublicFile(req)
  ) {
    return;
  }
  return prefixDefaultLocale(req);
}

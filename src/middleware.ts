import { NextRequest, NextResponse } from 'next/server'

import { DEFAULT_LANGUAGE } from './constants';
import { stringifyUrlObject } from './utils/routerUtils';

const PUBLIC_FILE = /\.(.*)$/

/**
 * Enforce prefix for default locale 'fi'
 * https://github.com/vercel/next.js/discussions/18419
 * @param req
 */
export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }
  // stringify and map dynamic paths to segmented, ie: /venues/:id => /venues/[id]
  const path = stringifyUrlObject(req.nextUrl);
  if (req.nextUrl.locale === 'default') {
    return NextResponse.redirect(new URL(`/${DEFAULT_LANGUAGE}${path}`, req.url));
  }
  if (!path.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(`/${req.nextUrl.locale}${path}`, req.url));
  }
}
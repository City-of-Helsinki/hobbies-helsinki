import { NextRequest, NextResponse } from 'next/server'

import { DEFAULT_LANGUAGE } from './constants';

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
    return
  }

  if (req.nextUrl.locale === 'default') {
    return NextResponse.redirect(new URL(`/${DEFAULT_LANGUAGE}${req.nextUrl.pathname}`, req.url))
  }
}
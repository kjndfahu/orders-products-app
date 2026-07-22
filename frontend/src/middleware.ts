import { NextRequest, NextResponse } from 'next/server';

const locales = ['ru', 'en'] as const;
const defaultLocale = 'ru';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  
  if (pathnameIsMissingLocale) {
    const locale = defaultLocale;
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};

import type { AppRouter } from '@/server/router';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).+)'],
};

export default async function middleware(req: NextRequest) {
  const slug = req.nextUrl.pathname.slice(1);

  const trpc = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({ url: `${req.nextUrl.origin}/api/trpc` })],
  });

  const data = await trpc.getUrl.query(slug).catch(() => null);

  if (!data) {
    return NextResponse.next();
  }

  return NextResponse.redirect(data.url, {
    status: 301,
    // https://vercel.com/docs/concepts/edge-network/caching#stale-while-revalidate
    headers: { 'Cache-Control': `s-maxage=${60 * 60}, stale-while-revalidate=${60 * 60 * 24}` },
  });
}

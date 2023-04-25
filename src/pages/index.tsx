import { ButtonLink } from '@/components/button';
import { Github } from 'lucide-react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Form = dynamic(() => import('@/components/form'), { ssr: false });

export default function Home() {
  const title = 'eee.ar';
  const description = 'Open-source URL shortener';
  const image = `${process.env.NEXT_PUBLIC_APP_URL}/api/og`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta content="width=device-width, initial-scale=1" name="viewport" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={image} />
      </Head>
      <main className="mx-auto mt-20 flex min-h-screen max-w-sm flex-col gap-10 p-4">
        <h1 className="scroll-m-20 text-center text-4xl font-bold tracking-tight lg:text-5xl">
          Shorten your links{' '}
          <span className="whitespace-nowrap" aria-hidden>
            : ^)
          </span>
        </h1>
        <ButtonLink
          className="mx-auto gap-2"
          href="https://github.com/emicba/eee.ar"
          rel="noreferrer"
          target="_blank"
          variant="outline"
        >
          <Github className="h-5 w-5" aria-hidden />
          Star on GitHub
        </ButtonLink>
        <Form />
      </main>
    </>
  );
}

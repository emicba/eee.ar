import dynamic from 'next/dynamic';
import Head from 'next/head';

const Form = dynamic(() => import('@/components/form'), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>eee.ar</title>
        <meta content="Open-source URL shortener" name="description" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <main className="mx-auto min-h-screen max-w-sm items-center justify-center p-4">
        <h1 className="my-20 scroll-m-20 text-center text-4xl font-bold tracking-tight lg:text-5xl">
          Short your links :^)
        </h1>

        <Form />
      </main>
    </>
  );
}

import { Toaster } from '@/components/toaster';
import '@/styles/globals.css';
import { trpc } from '@/utils/trpc';
import { Inter } from '@next/font/google';
import type { AppType } from 'next/app';
import Head from 'next/head';

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
});

const App: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <style>{`
        :root {
          --font-sans: ${inter.style.fontFamily}
        }
      `}</style>
      </Head>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
};

export default trpc.withTRPC(App);

import '@/styles/globals.css';
import { Inter } from '@next/font/google';
import type { AppProps } from 'next/app';
import Head from 'next/head';

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
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
    </>
  );
}

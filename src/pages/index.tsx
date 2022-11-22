import { NextPage } from 'next';
import dynamic from 'next/dynamic';

const Form = dynamic(() => import('../components/form'), { ssr: false });

const Home: NextPage = () => {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center p-4">
      <h1 className="text-4xl">Hello 👋</h1>
      <Form />
    </main>
  );
};

export default Home;

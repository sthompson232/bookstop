import type { NextPage } from 'next';
import Head from 'next/head';

const HomePage: NextPage = () => (
  <>
    <Head>
      <title>Home | Bookstop</title>
      <meta name="description" content="Bookstop home page" />
    </Head>
    <div className="container">
      <h1>Home page</h1>
    </div>
  </>
);

export default HomePage;

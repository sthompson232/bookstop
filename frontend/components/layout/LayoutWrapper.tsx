import Head from 'next/head';
import { ReactNode } from 'react';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';

interface PropTypes {
  children: ReactNode
}

const LayoutWrapper = ({ children }: PropTypes) => (
  <>
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Bookstop." />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="Bookstop" />
      <meta property="og:description" content="Bookstop" />
      <meta property="og:image" content="/images/landing.png" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_GB" />
      <meta name="theme-color" content="#00ad8b" />
      <link rel="shortcut icon" href="/icons/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="48x48" href="/icons/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      <title>Bookstop</title>
    </Head>
    <span className="flex flex-col h-screen antialiased selection:bg-accent selection:text-white">
      <Navbar />
      <main className="prose prose-headings:my-0 prose-p:my-0 max-w-none flex-grow">
        {children}
      </main>
      <Footer />
    </span>
  </>
);

export default LayoutWrapper;

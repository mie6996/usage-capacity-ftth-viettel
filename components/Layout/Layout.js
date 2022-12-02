import Head from 'next/head';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Head>
          <title>Data Viettel</title>
        </Head>
        <Header />
        <main className="grow">{children}</main>
        <Footer />
      </div>
    </>
  );
}

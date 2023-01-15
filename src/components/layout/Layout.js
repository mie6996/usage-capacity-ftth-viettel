import React from 'react';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }) {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="grow">{children}</main>
        <Footer />
      </div>
    </>
  );
}

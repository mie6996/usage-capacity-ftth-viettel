import React from 'react';
import Auth from '../common/Auth/Auth';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <Auth>
      <div className="h-screen flex flex-col">
        <Header />
        <main className="grow">{children}</main>
        <Footer />
      </div>
    </Auth>
  );
};

export default Layout;

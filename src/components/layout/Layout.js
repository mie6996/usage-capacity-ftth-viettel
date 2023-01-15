import React from 'react';
import Auth from '../common/Auth/Auth';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <Auth>
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </Auth>
  );
};

export default Layout;

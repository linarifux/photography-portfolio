import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const AppLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* This is where the page content will be rendered */}
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
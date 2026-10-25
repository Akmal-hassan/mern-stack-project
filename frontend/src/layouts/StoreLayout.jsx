import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import WhatsAppButton from '../components/WhatsAppButton';

export default function StoreLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
      <Header />
      <main style={{ flex: 1, width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <Toast />
    </div>
  );
}

import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Layout from '../components/layout/Layout';
import { persistor, rootStore } from '../store/store.js';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={rootStore}>
        <PersistGate loading={null} persistor={persistor}>
          <Head>
            <link rel="icon" href="/favicon.png" />
            <title>Data Viettel</title>
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Toaster />
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;

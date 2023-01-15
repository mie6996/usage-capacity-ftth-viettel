import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../store/store.js';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <title>Data Viettel</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toaster />
      </Provider>
    </>
  );
}

export default MyApp;

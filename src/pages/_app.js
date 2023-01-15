import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Data Viettel</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster />
    </>
  );
}

export default MyApp;

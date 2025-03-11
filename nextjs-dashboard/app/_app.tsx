import { ReactNode } from 'react';
import '../styles/globals.css';  // Import your styles
import Layout from './layout'; // Default layout

function MyApp({ Component, pageProps }: any) {
  // Check if the page has a custom layout function
  const getLayout = Component.getLayout || ((page: ReactNode) => <Layout>{page}</Layout>);

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;

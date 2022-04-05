import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { GlobalStore } from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalStore.Provider>
      <Component {...pageProps} />
    </GlobalStore.Provider>
  );
}

export default MyApp;

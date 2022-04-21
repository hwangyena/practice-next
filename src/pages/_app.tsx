import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { GlobalStore } from '../store';
import { SWRConfig } from 'swr';
import { getFetch } from 'src/lib/api';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalStore.Provider>
      <SWRConfig value={{ fetcher: getFetch }}>
        <Component {...pageProps} />
      </SWRConfig>
    </GlobalStore.Provider>
  );
}

export default MyApp;

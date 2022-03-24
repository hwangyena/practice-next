import '../styles/globals.css'
import type { AppProps } from 'next/app'
import GlobalState from '../store'

function MyApp({ Component, pageProps }: AppProps) {
  return (<GlobalState.Provider>
  <Component {...pageProps} />
  </GlobalState.Provider>)
}

export default MyApp

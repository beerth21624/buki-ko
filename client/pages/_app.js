import '../styles/globals.css';
import { Provider } from 'mobx-react';
import allStores from '../store/allStores';

function MyApp({ Component, pageProps }) {
  return (
    <Provider {...allStores}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

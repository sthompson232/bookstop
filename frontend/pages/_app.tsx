import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
// Local components
import LayoutWrapper from '../components/layout/LayoutWrapper';
import AlertContextProvider from '../components/alerts/AlertContextProvider';
// Constants
import { ReCaptchaInstance } from '../constants/types/recaptcha';
// Utils
import { defaultFetcher } from '../swr/fetchers';
import useRecaptcha from '../components/hooks/use-recaptcha';
// Styling
import '../styles/globals.css';

declare global {
  interface Window {
    captchaOnLoad: () => void
    grecaptcha: ReCaptchaInstance
  }
}

const App = ({ Component, pageProps }: AppProps) => {
  useRecaptcha();
  return (
    <SWRConfig value={{ fetcher: defaultFetcher }}>
      <AlertContextProvider>
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </AlertContextProvider>
    </SWRConfig>
  );
};

export default App;

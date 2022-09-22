import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
// Local components
import LayoutWrapper from '../components/layout/LayoutWrapper'
import AlertContextProvider from '../components/alerts/AlertContextProvider'
// Styling
import '../styles/globals.css'
// Utils
import { defaultFetcher } from '../swr/fetchers'


const App = ({ Component, pageProps }: AppProps) => {
  return (
		<SWRConfig value={{ fetcher: defaultFetcher }}>
			<AlertContextProvider>
				<LayoutWrapper>
					<Component {...pageProps} />
				</LayoutWrapper>
			</AlertContextProvider>
		</SWRConfig>
	)
}

export default App

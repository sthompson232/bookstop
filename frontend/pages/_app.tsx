import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
// Local components
import LayoutWrapper from '../components/layout/LayoutWrapper'
import '../styles/globals.css'
import { defaultFetcher } from '../swr/fetchers'


const App = ({ Component, pageProps }: AppProps) => {
  return (
		<SWRConfig value={{ fetcher: defaultFetcher }}>
			<LayoutWrapper>
				<Component {...pageProps} />
			</LayoutWrapper>
		</SWRConfig>
	)
}

export default App

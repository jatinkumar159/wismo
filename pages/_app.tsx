import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import store from '../redux/store'
import Navigation from '../components/Navigation/Navigation';
import '../styles/globals.css'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <Navigation />
          <Component {...pageProps} />
        </QueryClientProvider>
      </ChakraProvider>
    </Provider>
  )
}

import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import store from '../redux/store'
import Navigation from '../components/Navigation/Navigation';
import '../styles/globals.css'
import { useEffect } from 'react';
import { useMessaging } from '../redux/hooks';

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  useEffect(
    () => {
    if(window) {
      window.addEventListener("message", function(message: MessageEvent) {
        console.log("Received postMessage", message)
      });
    }
  });
  useMessaging();

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

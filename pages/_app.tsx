import { Provider } from 'react-redux';
import { Flex, ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import store from '../redux/store'
import Navigation from '../components/Navigation/Navigation';
import '../styles/globals.css'
import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import styles from './../styles/app.module.scss';
import Sidebar from '../components/Sidebar/Sidebar';
import { setCartPayload } from '../redux/slices/settingsSlice';

const queryClient = new QueryClient()

const InitialiseMessaging = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handler = (message: MessageEvent) => {
      if (message.data?.type?.indexOf('TURBO') === -1) return;
      console.log("Received cart payload from parent.", message.data.cartPayload);
      dispatch(setCartPayload(message.data.cartPayload));
    }

    window.addEventListener("message", handler);
    return () => window.removeEventListener('message', handler);
  })
  return null;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <InitialiseMessaging />
          <Flex flexDir="row" h={`100vh`}>
            <Flex className={styles.container} flexDir="column" grow={1}>
              <Navigation />
              <Component {...pageProps} className={styles.pageContainer}/>
            </Flex>
            <Flex className={styles.sidebar} bg={`gray.50`} p={4} pt={4}>
              <Sidebar />
            </Flex>
          </Flex>
        </QueryClientProvider>
      </ChakraProvider>
    </Provider>
  )
}

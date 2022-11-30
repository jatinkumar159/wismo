import { Provider } from 'react-redux';
import { Flex, ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import store from '../redux/store'
import Navigation from '../components/Navigation/Navigation';
import '../styles/globals.css'
import { useEffect } from 'react';
import { initialiseMessaging } from '../redux/hooks';
import styles from './../styles/app.module.scss';
import Sidebar from '../components/Sidebar/Sidebar';

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  initialiseMessaging();

  return (
    <Provider store={store}>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <Flex flexDir="row" h={`100vh`}>
            <Flex className={styles.container} flexDir="column" grow={1}>
              <Navigation />
              <Component {...pageProps} />
            </Flex>
            <Flex className={styles.sidebar} bg={`gray.50`} p={4} pt={14}>
              <Sidebar />
            </Flex>
          </Flex>

        </QueryClientProvider>
      </ChakraProvider>
    </Provider>
  )
}

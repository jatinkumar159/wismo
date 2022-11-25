import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import Navigation from './components/Navigation/Navigation'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Navigation />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

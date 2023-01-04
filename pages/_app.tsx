import { Center, ChakraProvider, Flex, Spinner, extendTheme, StyleFunctionProps } from '@chakra-ui/react'
import { Mulish } from '@next/font/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useEffect, useState } from 'react'

import Navigation from '../components/Navigation/Navigation'
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import { ActionModalTheme } from '../components/theme/action-modal/actionModal'
import styles from '../styles/app.module.scss'
import '../styles/globals.css'

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px)'
}

// const CustomSteps = {
//   ...Steps,
//   baseStyle: (props: StyleFunctionProps) => {
//     return {
//       ...Steps.baseStyle(props),
//       label: {
//         ...Steps.baseStyle(props).label,
//         'font-size': '0.5rem',
//       },
//       steps: {
//         ...Steps.baseStyle(props).steps,
//         'width': '20rem',
//       }
//     }
//   }
// }

export const theme = extendTheme({
  components: {
    Modal: ActionModalTheme,
    Form: {
      variants: {
        floating: {
          container: {
            '_focusWithin': {
              label: {
                ...activeLabelStyles
              }
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label': {
              ...activeLabelStyles
            },
            'label': {
              top: 0,
              left: 0,
              zIndex: 2,
              position: 'absolute',
              backgroundColor: 'white',
              pointerEvents: 'none',
              lineHeight: 1.7,
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: 'left top'
            }
          }
        }
      }
    },
    Radio: {
      parts: ['label'],
      baseStyle: {
        label: {
          display: `inline-flex`,
          width: `100%`
        }
      }
    },
    Steps: Steps
  }
})

const mulish = Mulish({
  subsets: ['latin']
})

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [isPageTransitionActive, setIsPageTransitionActive] = useState<boolean>(false)
  NProgress.settings.showSpinner = false
  useEffect(() => {
    const handleRouteStart = () => {
      NProgress.start()
      setIsPageTransitionActive(true)
    }
    const handleRouteDone = () => {
      NProgress.done()
      setIsPageTransitionActive(false)
    }

    router.events.on('routeChangeStart', handleRouteStart)
    router.events.on('routeChangeComplete', handleRouteDone)
    router.events.on('routeChangeError', handleRouteDone)

    return () => {
      router.events.off('routeChangeStart', handleRouteStart)
      router.events.off('routeChangeComplete', handleRouteDone)
      router.events.off('routeChangeError', handleRouteDone)
    }
  })

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Flex flexDir="row" className={mulish.className}>
            <Flex className={styles.container} flexDir="column" grow={1}>
              <Navigation />
              {isPageTransitionActive ? (
                <Center h={`calc(100vh - 80px)`}>
                  <Spinner />
                </Center>
              ) : (
                <Component {...pageProps} className={styles.pageContainer} />
              )}
            </Flex>
          </Flex>
        </QueryClientProvider>
      </ChakraProvider>
    </>
  )
}

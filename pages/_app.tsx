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
import { StepsStyleConfig } from 'chakra-ui-steps';
import { ActionModalTheme } from '../components/theme/action-modal/actionModal'
import styles from '../styles/app.module.scss'
import '../styles/globals.css'
import AuthProvider from '../components/AuthProvider/AuthProvider'

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px)'
}

const CustomSteps = {
  ...StepsStyleConfig,
  baseStyle: (props: StyleFunctionProps) => {
    return {
      ...StepsStyleConfig.baseStyle(props),
      label: {
        ...StepsStyleConfig.baseStyle(props).label,
        // "font-size": "0.625rem",
        // "font-weight": "normal"
      },
      iconLabel: {
        ...StepsStyleConfig.baseStyle(props).iconLabel,
        "fontSize": "0"
      },
      steps: {
        ...StepsStyleConfig.baseStyle(props).steps,
      },
      description: {
        ...StepsStyleConfig.baseStyle(props).description,
        "whiteSpace": "pre-line",
        "text-align": "left",
        "marginLeft": "0.5rem"
      },
      stepIconContainer: {
        ...StepsStyleConfig.baseStyle(props).stepIconContainer,
        "width": '1rem',
        "height": '1rem',
        "borderColor": "#A0AEC0",
        "_activeStep": {
          "bg": "gray.400"
        }
      }
    }
  }
}

export const theme = extendTheme({
  components: {
    Modal: ActionModalTheme,
    Popover: {
      variants: {
        responsive: {
          popper: {
            maxWidth: 'unset',
            width: 'unset',
          },
          content: { width: "unset" },
        }
      }
    },
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
    Steps: CustomSteps
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
        <title>UniShipper - Unicommerce</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      </Head>

      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Flex flexDir="row" align="center" justify="center" h={`100vh`} w={`100vw`} className={`${mulish.className} ${styles.pageContainer}`}>
            <ChakraProvider theme={theme}>
              <Flex className={styles.turboContainer} flexDir="column" grow={1}>
                <Navigation />
                {isPageTransitionActive ? (
                  <Center h={`calc(100vh - 80px)`}>
                    <Spinner />
                  </Center>
                ) : (
                  <Component {...pageProps} className={styles.pageContainer} />
                )}
              </Flex>
            </ChakraProvider>
          </Flex>
        </QueryClientProvider>
      </AuthProvider>
    </>
  )
}

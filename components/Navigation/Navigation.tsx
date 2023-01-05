import { Flex, Link, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router';

import imageLoader from '../../utils/imageLoader'
import styles from './Navigation.module.scss'

export default function Navigation() {
  const router = useRouter();

  const handleOnBack = () => {
    router.push('/');
  }

  return (
    <div className={styles.container}>
      <div className={styles.brand}>
        <Image loader={imageLoader} src="https://cdn.worldvectorlogo.com/logos/reddit-logo-new.svg" alt="Brand" width="60" height="40" onClick={handleOnBack}></Image>
      </div>
      <div className={styles.attribution}>
        <Flex dir="row" alignItems="center">
          <Text as="span" fontSize="xs" className={styles.lightText} mr={2}>Powered by </Text>
          <Image
            loader={imageLoader}
            src="https://infowordpress.s3.ap-south-1.amazonaws.com/wp-content/uploads/2022/10/06114711/logo.webp"
            alt="Unicommerce"
            width="60"
            height="40"
            priority
          />
        </Flex>
      </div>
    </div>
  )
}

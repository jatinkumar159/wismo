import Image from 'next/image';
import imageLoader from '../../utils/imageLoader';
import styles from './Navigation.module.scss';
import { Flex } from '@chakra-ui/react';

export default function Navigation() {
    return (
        <div className={styles.container}>
            <div className={styles.brand}>
                <Image loader={imageLoader} src='https://cdn.worldvectorlogo.com/logos/reddit-logo-new.svg' alt='Brand' width='60' height='40'></Image>
            </div>
            <div className={styles.attribution}>
                <Flex dir='row' alignItems='center'>
                    <span>Powered by </span>
                    <Image loader={imageLoader} src='https://infowordpress.s3.ap-south-1.amazonaws.com/wp-content/uploads/2022/10/06114711/logo.webp' alt="Unicommerce" width='60' height='40' priority />
                </Flex>
            </div>
        </div>
    )
}
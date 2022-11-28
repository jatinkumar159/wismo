import { ArrowBackIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Navigation.module.scss';

export default function Navigation() {
    return (
        <div className={styles.container}>
            <div className={styles.brand}>
                <Link href="">
                    <IconButton aria-label="back" icon={<ArrowBackIcon />} background={"transparent"} _hover={{ bg: 'transparent' }} />
                </Link>
                <Image src={'https://infowordpress.s3.ap-south-1.amazonaws.com/wp-content/uploads/2022/10/06114711/logo.webp'} alt="Logo" width='70' height='50' priority />
            </div>
            <div className={styles.attribution}>
                <span>Powered by&nbsp;</span><a href="https://unicommerce.com">TURBO</a>
            </div>
        </div>
    )
}
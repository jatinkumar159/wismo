import { ArrowBackIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectIsVerified, selectPhone, unsetPhone } from '../../redux/slices/profileSlice';
import styles from './Navigation.module.scss';

export default function Navigation() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const phone = useAppSelector(selectPhone);
    const isVerified = useAppSelector(selectIsVerified);

    const handleBackNavigation = () => {
        console.log(router.pathname);
        if (router.pathname === '/profile' && phone && !isVerified) {
            dispatch(unsetPhone());
            return;
        }
        router.back();
    }

    const handleClose = () => {
        window.top!.postMessage({type: "TURBO_EXIT", data: "close event"}, '*')
    }

    return (
        <div className={styles.container}>
            <div className={styles.brand}>
            {!(router.pathname === '/profile' && !phone) ? <IconButton aria-label="back" icon={<ArrowBackIcon />} background={"transparent"} _hover={{ bg: 'transparent' }} onClick={handleBackNavigation} /> : <IconButton aria-label="close" icon={<SmallCloseIcon />} background={"transparent"} _hover={{ bg: 'transparent' }} onClick={handleClose}/>}
                <Image src={'https://infowordpress.s3.ap-south-1.amazonaws.com/wp-content/uploads/2022/10/06114711/logo.webp'} alt="Logo" width='70' height='50' priority />
            </div>
            <div className={styles.attribution}>
                <span>Powered by&nbsp;</span><a href="https://unicommerce.com">TURBO</a>
            </div>
        </div>
    )
}
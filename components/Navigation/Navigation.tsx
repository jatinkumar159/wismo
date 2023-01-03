import Image from 'next/image';
import imageLoader from '../../utils/imageLoader';
import styles from './Navigation.module.scss';

export default function Navigation() {
    return (
        <div className={styles.container}>
            <div className={styles.attribution}>
                <Image loader={imageLoader} src={'https://infowordpress.s3.ap-south-1.amazonaws.com/wp-content/uploads/2022/10/06114711/logo.webp'} alt="Logo" width='70' height='50' priority />
            </div>
        </div>
    )
}
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import MerchantWindow from './components/MerchantWindow/MerchantWindow'

export default function HomeModule() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Turbo Merchant</title>
        <meta name="description" content="Turbo Merchant Experience" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MerchantWindow></MerchantWindow>
    </div>
  )
}

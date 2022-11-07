import Head from 'next/head'
import styles from '../styles/Home.module.css'
export default function HomeModule() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Turbo Merchant</title>
        <meta name="description" content="Turbo Merchant Experience" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="merchant-window">
        <main className={styles.main}>
          Main Content comes here.
        </main>
        <aside>
          Aside Content comes here.
        </aside>
      </div>
    </div>
  )
}

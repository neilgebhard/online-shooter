import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Online Shooter</title>
        <meta name='description' content='An online shooter game' />
        <link rel='icon' href='/favicons/favicon.ico' />
      </Head>

      <main></main>
    </Layout>
  )
}

export default Home

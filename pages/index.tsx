import type { NextPage } from 'next'
import { useState } from 'react'
import Game from '../components/Game'
import Head from 'next/head'
import Layout from '../components/Layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Shooterly</title>
        <meta name='description' content='An online shooter game' />
        <link rel='icon' href='/favicons/favicon.ico' />
      </Head>
      <Game />
    </Layout>
  )
}

export default Home

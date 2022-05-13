import React from 'react'
import Navbar from './Navbar'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <main className='w-[800px] mx-auto '>
      <Navbar />
      {children}
    </main>
  )
}

export default Layout

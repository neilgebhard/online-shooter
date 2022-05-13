import { useSession, signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import ProfileDropdown from './ProfileDropdown'
import { LoginIcon } from '@heroicons/react/outline'

const Navbar = () => {
  const { data: session, status } = useSession()
  const isLoadingUser = status === 'loading'

  return (
    <nav className='flex justify-between items-center mb-20 pt-4'>
      <Link href='/'>
        <a className='flex items-center gap-x-2 text-4xl'>
          <div className='relative w-10 h-10'>
            <Image src='/logo.png' layout='fill' alt='Logo' />
          </div>
          <span>Shooterly</span>
        </a>
      </Link>
      {isLoadingUser ? (
        <div className='bg-gray-500 w-12 h-12 pulse' />
      ) : session ? (
        <ProfileDropdown />
      ) : (
        <button
          className='flex gap-1 hover:bg-gray-700 rounded px-2 py-2'
          onClick={() => signIn()}
        >
          <LoginIcon className='h-6 w-6' /> Sign in
        </button>
      )}
    </nav>
  )
}

export default Navbar

import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'

const Navbar: React.FC = () => {
  const { data: session } = useSession()

  return (
    <nav className='flex justify-between mb-20 w-[800px] mx-auto'>
      <div className='relative w-10 h-10'>
        <Image src='/logo.png' layout='fill' alt='Logo' />
      </div>
      {session ? (
        <div>
          <Image
            className='rounded-full'
            src={session?.user?.image}
            width={40}
            height={40}
            alt='Avatar'
          />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <div>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      )}
    </nav>
  )
}

export default Navbar

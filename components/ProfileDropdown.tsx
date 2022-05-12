import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import {
  ChevronDownIcon,
  UserIcon,
  InformationCircleIcon,
} from '@heroicons/react/solid'
import { LogoutIcon } from '@heroicons/react/outline'
import MyLink from './MyLink'

export default function ProfileDropdown() {
  const { data: session } = useSession()

  return (
    <div className='top-16 w-56 text-right'>
      <Menu as='div' className='group relative inline-block text-left'>
        <div>
          <Menu.Button className='inline-flex items-center justify-center w-full rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
            <Image
              className='rounded-full'
              src={session?.user?.image!}
              width={40}
              height={40}
              alt='Avatar'
            />
            <ChevronDownIcon
              className='ml-2 -mr-1 h-5 w-5 text-gray-400 group-hover:text-gray-100'
              aria-hidden='true'
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='bg-gray-700 absolute right-0 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='px-1 py-1 '>
              <Menu.Item>
                <MyLink
                  href='/account'
                  className='hover:bg-gray-600 text-gray-100 group flex gap-2 w-full items-center rounded-md px-2 py-2 text-lg'
                >
                  <UserIcon className='w-6 h-6' /> My Account
                </MyLink>
              </Menu.Item>
              <Menu.Item>
                <MyLink
                  href='/about'
                  className='hover:bg-gray-600 text-gray-100 group flex gap-2 w-full items-center rounded-md px-2 py-2 text-lg'
                >
                  <InformationCircleIcon className='w-6 h-6' /> About
                </MyLink>
              </Menu.Item>
              <Menu.Item>
                <button
                  className='hover:bg-gray-600 text-gray-100 group flex gap-2 w-full items-center rounded-md px-2 py-2 text-lg'
                  onClick={() => signOut()}
                >
                  <LogoutIcon className='w-6 h-6' /> Sign out
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

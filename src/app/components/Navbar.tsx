'use client';

import Image from "next/image";
import Link from "next/link";
import type { Session } from "next-auth";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { FaUserCircle } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { usePathname } from 'next/navigation';
import { signIn, signOut } from "next-auth/react";

type Props = { user: Session["user"] | null };

const navigation = [
  { name: 'Temple List', href: '/temples', userAuthenticated: false },
  { name: 'Your Visits', href: '/visits', userAuthenticated: true },
  { name: 'Add Visit', href: '/visits/add', userAuthenticated: true }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example({ user }: Props) {
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="text-gray-300 bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="rounded-md p-2 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="sr-only">Open main menu</span>
              <IoMdMenu aria-hidden="true" className="block size-6" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* Product logo */}
            <div className="flex shrink-0 items-center">
              <Link href="/" className="rounded-md p-1 sm:p-0 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-50">
                <Image src="/icon.png" width="512" height="512" alt="Temple Tracker" className="h-8 w-auto"></Image>
              </Link>
            </div>
            {/* Navbar items */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={classNames(
                        isActive ? 'bg-gray-900/50 text-white' : 'hover:bg-white/5 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                    >
                      {item.name}
                    </Link>
                  )})}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            {user ? (
              <Menu as="div" className="relative ml-3">
                <MenuButton className="relative flex items-center rounded-full p-1 text-sm text-gray-300 hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                  <span className="sr-only">Open user menu</span>
                  {user.image ? (
                    <Image
                      alt="User avatar"
                      src={user.image ?? '/icon.png'}
                      width={256}
                      height={256}
                      className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                    />
                  ) : (
                    <FaUserCircle className="block size-[32px]" />
                  )}
                  <div className="hidden sm:ml-2 sm:block items-center pr-1">{user.name}</div>
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10 transition data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in"
                >
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        href="/user"
                        className={`block px-4 py-2 text-sm ${active ? 'bg-white/5 outline-hidden' : ''} hover:text-white`}
                      >
                        Your profile
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        type="button"
                        className={`block w-full px-4 py-2 text-left text-sm ${active ? 'bg-white/5 outline-hidden' : ''} hover:text-white`}
                        onClick={() => signOut({ callbackUrl: '/' })}
                      >
                        Sign out
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : (
              <button
                type="button"
                className="relative ml-3 flex items-center rounded-full p-1 text-sm hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                onClick={() => signIn()}
              >
                <span className="sr-only">Sign in</span>
                <FaUserCircle className="block size-[32px]" />
                <div className="hidden sm:ml-2 sm:block items-center pr-1">Sign in</div>
              </button>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={classNames(
                  isActive ? 'bg-gray-900/50 text-white' : 'hover:bg-white/5 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
              >
                {item.name}
              </DisclosureButton>
            )})}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

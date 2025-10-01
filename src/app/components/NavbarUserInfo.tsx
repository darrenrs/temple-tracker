'use client';
import Image from "next/image";
import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { UserInfoProps } from '@/app/types/UserInfoProps';
import { signOut } from "next-auth/react";

export default function NavbarUserInfo({ user }: UserInfoProps) {
  return (
    <>
      <Menu>
        <MenuButton>
          <div className="flex items-center">
            {user!.image ? (
              <Image src={user!.image} width="24" height="24" alt="User" className="rounded-full mr-2"></Image>
            ) : (
              <></>
            )}
            <p>{user!.name}</p>
            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </div>
        </MenuButton>
        <MenuItems anchor="bottom" className="text-white bg-slate-900 p-4 rounded-xl">
          <MenuItem>
            <Link className="block data-[focus]:bg-slate-700" href="/user">
              User Info
            </Link>
          </MenuItem>
          <MenuItem>
            <Link className="block data-[focus]:bg-slate-700" href="/support">
              Support
            </Link>
          </MenuItem>
          <MenuItem>
            <button
              type="button"
              className="block w-full text-left data-[focus]:bg-slate-700"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign Out
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </>
  )
}
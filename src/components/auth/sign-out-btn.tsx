"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useSession, signOut } from 'next-auth/react'
import { FaSignOutAlt } from 'react-icons/fa';

export default function SignOutBtn() {
    const session = useSession();



  return (
    <>
    <Button type="submit" className="bg-transparent text-white text-sm hover:bg-transparent inline-flex items-center p-0 h-fit font-normal" onClick={() => signOut()}>
    <FaSignOutAlt className="mr-2 text-white" />
    
    Logout
  </Button>
  </>
  )
}

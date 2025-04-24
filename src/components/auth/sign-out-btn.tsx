"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useSession, signOut } from 'next-auth/react'

export default function SignOutBtn() {
    const session = useSession();



  return (
    <>
    <Button type="submit" className="bg-transparent text-white text-sm hover:bg-transparent p-0 h-fit font-normal" onClick={() => signOut()}>
    Logout
  </Button>
  </>
  )
}

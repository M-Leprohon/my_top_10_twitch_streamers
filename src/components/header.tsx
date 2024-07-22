'use client'

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import randomWord from "@/components/words/WordRandomizer";
import React from "react";
//import { auth, signIn, signOut } from "@/auth";
import { useSession } from "next-auth/react";
import { Session } from "inspector";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation"


export default function Header() {
  const { data: session, status: string, update: UpdateSession } = useSession();
  //console.log(session);
  const router = useRouter();

  const logoutUser = async (e: any) => {
    e.preventDefault();
    signOut();
    router.push('/');
  }

  return(
    <Navbar>
    <NavbarBrand>
      <Link href="/">Vocabook</Link>
    </NavbarBrand>
    <NavbarContent>
      <NavbarItem>
        <Link href="/notebook">Notebook</Link>
      </NavbarItem>
      <NavbarItem>
        <Link href="/random">Random</Link>
      </NavbarItem>
     
        {session?.user ? (
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <NavbarItem>{session?.user?.email}</NavbarItem>
            <NavbarItem><button onClick={() => signOut()}>Sign out</button></NavbarItem>
          </div>
        ) : (
          <>
           <NavbarItem><Link href="/login">Login</Link></NavbarItem>
           <NavbarItem><Link href="/register">Register</Link></NavbarItem>
          </>
        )}
    </NavbarContent>
  </Navbar>
);

  
}

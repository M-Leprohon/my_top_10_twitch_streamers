"use client"

import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation'
import { revalidatePath } from "next/cache";


export const ButtonRefresh = () => {
  const router = useRouter()

  return (
    <Button onClick={() => {
      console.log('lol?');
      //revalidatePath('/random')
      router.push(`/random?refreshId=${new Date().getTime()}`)
      //router.push('/random')
    }}>Get another word</Button>
  )
}
import { db } from "@/db";
import { WordCard } from '@/components/words/WordCard';
import { authOptions } from "../../app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

export default async function randomWord() {
  const itemCount = await db.word.count();
  const skip = Math.max(0, Math.floor(Math.random() * itemCount));
  const session = await getServerSession(authOptions);

  const word = await db.word.findMany({
    take: 1,
    skip: skip,
    where: {
      userId: session?.user?.id
    }
  })
  
  return (
    word['0'].original_word
  )
}
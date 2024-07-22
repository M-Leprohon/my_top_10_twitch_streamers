import type { Word } from "@prisma/client";
import { db } from '@/db'
import { getServerSession } from "next-auth";
import { authOptions } from "../../app/api/auth/[...nextauth]/authOptions";


export async function fetchAllWords(): Promise<Word[] | null> {
  const session = await getServerSession(authOptions);

  return await db.word.findMany({
    where: {
      userId: session?.user?.id
    }
  })
}

export async function fetchWordBySlug(slug: string): Promise<Word | null> {
  const session = await getServerSession(authOptions);

  const word = await db.word.findUnique({
    where: {
      original_word: slug,
      userId: session?.user?.id
    }
  });
  return word;
}

export async function fetchWordByCategory(category: number): Promise<Word[] | null> {
  const session = await getServerSession(authOptions);

  const words = db.word.findMany({
      where: {
        categoryId: category,
        userId: session?.user?.id
      }
  })
  return words;
}
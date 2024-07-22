'use server'

import { db } from "@/db";
import type { Word } from "@prisma/client";

export default async function fetchWordsByCategory(category: number): Promise<Word[] | null> {
  const words = db.word.findMany({
      where: {
        categoryId: category
      }
  })
  return words;
}
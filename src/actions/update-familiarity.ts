'use server'

import { db } from "@/db"

export default async function UpdateFamiliarity(word: string, familiarity: string) {
  console.log(familiarity)
  let change = 0;
  if(familiarity == "good") {
    change = 1;
  } else {
    change = -1;
  }

  await db.word.update ({
    where: {
      original_word: word
    },
    data: {
      familiarity: {
        increment: change
      }
    }
  })
}
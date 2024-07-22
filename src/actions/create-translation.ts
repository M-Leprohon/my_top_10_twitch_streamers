'use server'
import { db } from "@/db";
import { redirect } from 'next/navigation';

export async function CreateTranslation(slug: string,
  formData: FormData) {
    console.log(formData.get('translation'));

  await db.word.update ({
    where: {
      original_word: slug,
    },
    data: {
      translated_word: formData.get('translation') as string,
    },
  })

  const encodedSlug = encodeURI(slug);
  redirect(`/word/${encodedSlug}`)
}
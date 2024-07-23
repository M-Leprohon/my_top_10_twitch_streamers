'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Word } from "@prisma/client";
import { db } from '@/db'
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/authOptions";
import { setEngine } from 'crypto';


const createTopicSchema = z.object({
  original_word: z
    .string()
    .min(1),
});

interface CreateWordFormState {
  errors: {
    original_word?: string[];
    _form?: string[];
  };
}

export async function createTerm(
  formState: CreateWordFormState,
  formData: FormData,
): Promise<CreateWordFormState> {
  const session = await getServerSession(authOptions);

  const result = createTopicSchema.safeParse({
    original_word: formData.get('word'),
  });

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  let word: Word;
  const encodedWord = encodeURI(result.data.original_word);

  try {
    word = await db.word.create({
      data: {
        original_word: result.data.original_word,
        translated_word: 'notTranslated',
        user: {
          connect: {
            id: session?.user?.id,
          },
        },
      }
    })
  } catch (err: unknown) {
    if(err instanceof Error) {
      //err.code?
      switch( err.name ) {
        case 'P2002': 
        const translationCheck = await db.word.findUnique({
          where: {
            original_word: result.data.original_word
          }
        });
        if(translationCheck?.translated_word == 'notTranslated') {
          redirect(`/word/${encodedWord}/translate`);
        }
        err.message = 'This word already exists in the database';
      }
      return {
        errors: {
          _form: [err.message]
        }
      }
    } else {
      return {
        errors: {
          _form: ['Something went wrong']
        }
      }
    }
  }

  revalidatePath('/');

  redirect(`/word/${encodedWord}/translate`);
}

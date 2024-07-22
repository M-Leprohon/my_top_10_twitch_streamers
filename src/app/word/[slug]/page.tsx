import { fetchWordBySlug } from '@/db/queries/words'
import { WordCard } from '@/components/words/WordCard'
import Link from 'next/link';
import randomWord from '@/components/words/WordRandomizer'
import { redirect } from 'next/navigation';


interface TranslationShowProps {
  params: {
    slug: string;
  }
}

export default async function TranslationShow({ params }: TranslationShowProps) {
  const word = await fetchWordBySlug(decodeURI(params.slug));
  const url = await randomWord();
  if(word?.translated_word == 'notTranslated' || word?.translated_word == 'notTranslated' || word?.translated_word == null) {
    redirect(`/word/${params.slug}/translate`);
  }
  let output = (
    <div>
      <WordCard originalWord={ word?.original_word} translatedWord={ word?.translated_word }/>
      <Link href={url}>Next word</Link>
    </div>
  )
  if (word == null) {
    output = (
      <div>Word not found</div>
    )
  }
  return output;
}
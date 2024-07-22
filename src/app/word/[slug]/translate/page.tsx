import { Button, Input } from "@nextui-org/react";
import { CreateTranslation } from "@/actions/create-translation";
import { TranslatedWord } from "@/components/words/TranslatedWord"
import * as deepl from 'deepl-node';



interface WordShowProps {
  params: {
    slug: string;
  }
}

export default async function WordShow({ params }: WordShowProps) {
  const decodedWord = decodeURI(params.slug);
  const createTranslationAction = CreateTranslation.bind(null, decodedWord)

  const authKey = "6536db4c-511c-411a-bd5d-6c02a2d043be:fx"; // Replace with your key
  const translator = new deepl.Translator(authKey);

  const returnedResult = await translator.translateText(decodedWord, 'fi', 'en-GB');
  const result: string = returnedResult.text; // Bonjour, le monde !

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-6xl">{decodedWord}</h1>
      </div>
      <div className='flex justify-center mt-8'>
        <div className='w-6/12'>
          <form className="flex" action={createTranslationAction}>
            <Input
              name="translation"
              label=""
              labelPlacement="outside"
              placeholder="Enter the translation"
            />
            <input
              name="slug"
              type="hidden"
              value={decodedWord}
            />
            <Button type="submit">Submit</Button>
          </form>
          <div className="pt-10">Suggested translation from Deepl: {result}</div>

        </div>
      </div>
    </>);
}
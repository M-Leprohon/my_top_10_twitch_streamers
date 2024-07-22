import * as deepl from 'deepl-node';

interface Props {
  word: string;
}

export async function TranslatedWord(props: Props) {
  const authKey = "6536db4c-511c-411a-bd5d-6c02a2d043be:fx"; // Replace with your key
  const translator = new deepl.Translator(authKey);

  let result: any;
  result = await translator.translateText(props.word, null, 'fr');
  result = result.text; // Bonjour, le monde !
  console.log(result)

  return(
    <div>Le word: {result}</div>
  )
}
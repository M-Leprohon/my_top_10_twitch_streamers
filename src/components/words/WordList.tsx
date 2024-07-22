import type { Word } from '@prisma/client'
import Link from 'next/link';

interface Props {
    words?: Word[]|null;
}

export const WordList = (props: Props) => {

  const renderable = props.words?.map((word, i) => {
    const url = `/word/${word.original_word}`
    return <div className="block" key={i}>
      <div className="inline-block w-2/5">
        <Link className="underline decoration-solid" href={url}>{ word.original_word }</Link>
      </div>
      <div className="inline-block w-2/5">
        <Link className="underline decoration-solid" href={url}>{ word.translated_word }</Link>
      </div>
      <div className="inline-block w-1/5">
        <Link className="underline decoration-solid" href={url}>{ word.familiarity }</Link>
      </div>
      </div>
  });

  return (
    <div className="">{renderable}</div>
  );
}
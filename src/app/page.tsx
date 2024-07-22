'use client';

import { useFormState } from 'react-dom';
import {
  Input,
  Button
} from '@nextui-org/react';
import { createTerm } from '@/actions/create-term';
 

export default function Home() {
  const [formState, action] = useFormState(createTerm, {
    errors: {},
  });

  return (
    <div className='flex justify-center mt-16'>
      <div className='w-6/12'>
        <form className="flex" action={action}>
          <Input
            name="word"
            label=""
            labelPlacement="outside"
            placeholder="Enter a word to translate"
            isInvalid={!!formState.errors.original_word}
            errorMessage={formState.errors.original_word?.join(', ')}
          />
           
          <Button type="submit">Submit</Button>
        </form>
        {formState.errors._form ? <div className="text-red-500 text-xs pt-1 pl-1">{formState.errors._form?.join(', ')}</div> : null}

      </div>
    </div>
  );
}

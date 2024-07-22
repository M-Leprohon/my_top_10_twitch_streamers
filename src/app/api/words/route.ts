import { fetchAllWords } from '@/db/queries/words'
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const result = await fetchAllWords();
  console.log('we in route');

    //return response JSON
    return NextResponse.json(
      {
        sucess: true,
        message: 'List Data Notes',
        data: result,
      },
      {
        status: 200,
      }
    );
}

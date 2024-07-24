import { db } from "@/db";

export default async function random() {
  const itemCount = await db.word.count();
  const id = Math.floor(Math.random() * itemCount);
  const skip = Math.max(0, Math.floor(Math.random() * itemCount) - 1);

  const slug = await db.word.findMany({
    take: 1,
    skip: skip,
  })
  
  return slug[0]?.original_word;
}
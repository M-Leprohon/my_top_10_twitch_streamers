import WordRandomizer from "@/components/words/WordRandomizer"
import { Button } from "@nextui-org/react"
import { ButtonRefresh } from "@/components/ButtonRefresh"

export default function Random() {
  return (
    <div>
      <WordRandomizer></WordRandomizer>
      <ButtonRefresh></ButtonRefresh>
    </div>
  )
}
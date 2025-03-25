import { Character } from "@/src/types/character";
import characters from "./dummy/characters";

export function findCharacterFromSlug(charSlug: string) {
  const { name, tag, slug, imageUrl, jpName, jpTag }: Character = characters.find(
    (x) => x.slug === charSlug
  ) as Character;

  const character = {
    name: name || "Unknown",
    tag: tag || "I don't know",
    slug: slug || "/",
    imageUrl: imageUrl || "",
    jpName: jpName || "",
    jpTag: jpTag || ""
  };

  return character;
}

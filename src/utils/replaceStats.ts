import characters from "./dummy/characters";
import { findCharacterFromSlug } from "./findCharacter";
import { Character } from "@/types/character";

export function replaceStatsOnCharacter(charSlug: string) {
    const { rarity, race, attribute } : Character = characters.find(
        (x) => x.slug === charSlug) as Character;
    const character = {
        rarity: "https://gcdatabase.com/images/icons/rarity_ssr.webp" || rarity,
        race: "https://gcdatabase.com/images/icons/race_giant.webp" || race,
        attribute: "https://gcdatabase.com/images/icons/attribute_vitality.webp" || attribute
    }
    return character;
    
}
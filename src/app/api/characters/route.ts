import db from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const characters = await db.character.findMany({
            select: {
                id: true,
                name: true,
                imageUrl:true,
                slug: true,
                attribute: true,
                race: true,
                rarity: true,
                game: true,
                Crossover: true,
                Favourite: true,
            }
        })
        
        const formattedCharacters = characters.map((char => ({
            id: char.id,
            name: char.name,
            imageUrl: char.imageUrl,
            slug: char.slug,
            attribute: char.attribute,
            race: char.race,
            rarity: char.rarity,
            game: char.game,
            crossover: char.Crossover,
            favourite: char.Favourite
        })));

        return NextResponse.json(formattedCharacters);
    } catch (err) {
        console.error("Error fetching characters", err);
        return NextResponse.json({ error: "Failed to fetch characters"}, { status: 500});
    }
}
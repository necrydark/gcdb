import db from "../../../lib/db";
import { NextResponse } from "next/server";


const ALLOWED_ORIGIN =
  process.env.NODE_ENV === 'production'
    ? 'http://gcwiki.vercel.app'
    : 'http://localhost:3333';

    export async function OPTIONS() {
        return new Response(null, {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3333",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Credentials": "true"
          }
        });
      }
export async function GET() {
    try {
        const characters = await db.character.findMany({
            select: {
                id: true,
                name: true,
                imageUrl:true,
                tag: true,
                slug: true,
                attribute: true,
                race: true,
                rarity: true,
                game: true,
                Crossover: true,
                collection: true,
            }
        })
        
        const formattedCharacters = characters.map((char => ({
            id: char.id,
            name: char.name,
            imageUrl: char.imageUrl,
            tag: char.tag,
            slug: char.slug,
            attribute: char.attribute,
            race: char.race,
            rarity: char.rarity,
            game: char.game,
            crossover: char.Crossover,
            collection: char.collection
        })));

        return NextResponse.json(formattedCharacters, {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3333",
                "Content-Type": "application/json"
              }
        });
    } catch (err) {
        console.error("Error fetching characters", err);
        return NextResponse.json({ error: "Failed to fetch characters"}, { status: 500});
    }
}
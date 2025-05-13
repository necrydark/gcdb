'use server'

import db from "../lib/db"
import * as z from 'zod'

export type SearchResult = {
    id: string
  name: string
  slug?: string
  type: 'character' | 'relic' | 'user'
  href: string
  tag?: string
  imageUrl?: string
}

const searchSchema = z.object({
    query: z.string().min(1).max(50)
})

export async function searchItems(query: string): Promise<SearchResult[]> {
    // Validate input
    const validatedFields = searchSchema.safeParse({ query })
    
    if (!validatedFields.success) {
      return []
    }
    
    const searchTerm = validatedFields.data.query.toLowerCase()
    

    try {
      const characters = await db.character.findMany({
        where: {
          name: {
            contains: searchTerm,
            mode: 'insensitive', 
          },
        },
        select: {
          id: true,
          name: true,
          slug: true,
          tag: true,
          imageUrl: true,
        },
        take: 5, 
      })
  

  
      // Search users
      const users = await db.user.findMany({
        where: {
          username: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        select: {
          id: true,
          username: true,
        },
        take: 5,
      })


  
      // Format results
      return [
        ...characters.map(char => ({
          id: char.id,
          name: char.name ?? 'Unknown Character',
          slug: char.slug ?? undefined,
          type: 'character' as const,
          href: `/characters/${char.slug}`,
          tag: char.tag ?? undefined,
          imageUrl: char.imageUrl ?? ""
        })),
  
        ...users.map(user => ({
          id: user.id,
          name: user.username,
          type: 'user' as const,
          href: `/profile/${user.username}`,

        })),
      ]
    } catch (error) {
      console.error('Search error:', error)
      return []
    }
  }
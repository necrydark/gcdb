"use server"

import { client } from "../sanity/lib/client"

import { SanityDocument } from 'next-sanity';

const option = { next: { revalidate: 30 } };

interface Guide extends SanityDocument {
  _id: string;
  title: string;
  slug: { current: string };
  image: any;
  description: string;
  publishedAt: string;
  difficulty: number;
  author: {
    name: string;
    image: any;
  };
  category: {
    _id: string;
    title: string;
    slug: { current: string };
  };
  tags: Array<{
    _id: string;
    title: string;
    slug: { current: string };
  }>;
  views: number; // Add views field
}

export async function getGuides(
  searchQuery: string = '',
  sortOption: string = 'recent',
  categorySlug?: string, // Add categorySlug parameter
  difficultyOption: string = "beginner"
): Promise<Guide[]> {
  let orderClause = '';
  switch (sortOption) {
    case 'recent':
      orderClause = 'publishedAt desc';
      break;
    case 'views':
      orderClause = 'views desc';
      break;
      case 'difficultyAsc': // New sort option for ascending difficulty
    orderClause = 'difficulty asc';
    break;
  case 'difficultyDesc': // New sort option for descending difficulty
    orderClause = 'difficulty desc';
    break;
    default:
      orderClause = 'publishedAt desc';
  }



  let filters: string[] = [`_type == "guide" && defined(slug.current)`];
  const params: { [key: string]: any } = {};

  if (searchQuery) {
    // Case-insensitive search on title and description
    filters.push(`(title match "*${searchQuery}*")`);
  }

  if (categorySlug && categorySlug !== 'all') {
    filters.push(` category->slug.current == "${categorySlug}"`);
    params.categorySlug = categorySlug;
  }

  let numericalDifficultyLevel: number | undefined;
  if (difficultyOption && difficultyOption !== 'all') {
    switch(difficultyOption) {
        case "beginner":
            numericalDifficultyLevel = 1;
            break;
        case "intermediate":
            numericalDifficultyLevel = 2;
            break;
        case "advanced":
            numericalDifficultyLevel = 3;
            break;
        case "expert":
            numericalDifficultyLevel = 4;
            break;
        default:
            console.warn(`Unrecognized difficultyOption: "${difficultyOption}". No difficulty filter applied.`);
    }

    // Only add difficulty filter to GROQ and the param if a valid numerical level was found
    if (numericalDifficultyLevel !== undefined) {
        filters.push(`difficulty == ${numericalDifficultyLevel}`);
        params.difficultyLevel = numericalDifficultyLevel; // Param is set ONLY when filter is added
    }
  }
  // Join all filters with ' && '
  const filterClause = filters.join(' && ');


  const query = `*[
    ${filterClause}
  ]|order(${orderClause})[0..12]{
    _id,
    title,
    slug,
    image,
    description,
    publishedAt,
    views, 
    difficulty,
    author->{
      name,
      image
    },
    category->{
      _id,
      title,
      slug
    },
    tags[]->{
      _id,
      title,
      slug
    }
  }`;


console.log(query)

  const data = await client.fetch<Guide[]>(query, {}, option);
  return data;
}

// Function to increment views
export async function incrementGuideViews(guideId: string) {
  try {
    const result = await client
      .patch(guideId)
      .setIfMissing({ views: 0 }) // Initialize views to 0 if not present
      .inc({ views: 1 }) // Increment views by 1
      .commit();
    return result;
  } catch (error) {
    console.error('Error incrementing guide views:', error);
    return null;
  }
}
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
  difficulty: {
    name: string;
  };
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
): Promise<Guide[]> {
  let orderClause = '';
  switch (sortOption) {
    case 'recent':
      orderClause = 'publishedAt desc';
      break;
    case 'views':
      orderClause = 'views desc';
      break;
    default:
      orderClause = 'publishedAt desc';
  }

  let filterClause = `_type == "guide" && defined(slug.current)`;

  if (searchQuery) {
    // Case-insensitive search on title and description
    filterClause += ` && (title match "*${searchQuery}*")`;
  }

  if (categorySlug && categorySlug !== 'all') {
    filterClause += ` && references(*[_type == "category" && slug.current == "${categorySlug}"]._id)`;
  }

  const query = `*[
    ${filterClause}
  ]|order(${orderClause})[0..12]{
    _id,
    title,
    slug,
    image,
    description,
    publishedAt,
    views, // Include views in the query
    difficulty->{
      name
    },
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
    console.log(`Guide views incremented for ${guideId}:`, result.views);
    return result;
  } catch (error) {
    console.error('Error incrementing guide views:', error);
    return null;
  }
}
// lib/queries.js
export const postsByAnyTagsQuery = `
  *[_type == "post" && count((categories[]->slug.current)[@ in $categories]) > 0]{
    _id,
    title,
    slug,
    categories[]->{
      title,
      slug
    }
  }
`;

// lib/queries.js
export const postsByAllTagsQuery = `
  *[_type == "post" && count((categories[]->slug.current)[@ in $categories]) == $tagCount]{
    _id,
    title,
    slug,
    categories[]->{
      title,
      slug
    }
  }
`;


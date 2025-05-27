import CategoryFilter from '@/src/components/category-filtering';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { Card, CardDescription, CardTitle,CardHeader, CardContent, CardFooter } from '@/src/components/ui/card';
import { client } from '@/src/sanity/lib/client';
import { urlFor } from '@/src/sanity/lib/image';
import { ArrowRight } from 'lucide-react';
import { SanityDocument } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const  option = { next: { revalidate: 30}}

interface Guide extends SanityDocument {
  _id: string;
  title: string;
  slug: { current: string };
  image: any;
  description: string;
  publishedAt: string;
  tags: Array<{
    _id: string;
    title: string;
    slug: { current: string };
  }>;
}

interface Category extends SanityDocument {
  _id: string;
  title: string;
  slug: { current: string };
}



async function getGuidesData(categorySlug?: string) {
  if (categorySlug && categorySlug !== 'all') {
    // Filter guides that reference the specific category
    const query = `*[
      _type == "guide"
      && defined(slug.current)
      && references(*[_type == "category" && slug.current == "${categorySlug}"]._id)
    ]|order(publishedAt desc)[0..12]{
      _id, 
      title, 
      slug, 
      image, 
      description, 
      publishedAt,
      tags[]->{
        _id,
        title,
        slug
      }
    }`;
    
    const data = await client.fetch<Guide[]>(query, {}, option);
    return data;
  } else {
    // Get all guides
    const query = `*[
      _type == "guide"
      && defined(slug.current)
    ]|order(publishedAt desc)[0..12]{
      _id, 
      title, 
      slug, 
      image, 
      description, 
      publishedAt,
      tags[]->{
        _id,
        title,
        slug
      }
    }`;
    
    const data = await client.fetch<Guide[]>(query, {}, option);
    return data;
  }
}


async function getCategoriesData() {
  const query = `*[_type == "category"]|order(title asc){
    _id,
    title,
    slug
  }`;

  const data = await client.fetch<Category[]>(query, {}, option);
  return data;
}


// async function getData() {
//   const query = `*[
//     _type == "guide"
//     && defined(slug.current)
//   ]|order(publishedAt desc)[0..12]{_id, title, slug, image, description, publishedAt}`

//   const data = await client.fetch<SanityDocument[]>(query, {}, option)
//   return data;
// }


export default async function GuidesPage({ searchParams }: { searchParams: Promise<{category?: string}>}) {

  const { category} = await searchParams
  const selectedCategory = category || 'all';
  
  const [guides, categories] = await Promise.all([
    getGuidesData(selectedCategory),
    getCategoriesData()
  ]);

  // const guides = await getData();
  
  console.log("Guides Data:", guides);

  return (
    <div className='min-h-screen pt-[10rem]'>
      <section className='container px-12 max-w-6xl mx-auto py-6'>
        <h1 className="text-4xl md:text-5xl text-white font-bold text-center mb-[2rem]">Guides</h1>
        
        {/* Category Filter */}
        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory}
        />

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-300 text-center">
            {selectedCategory === 'all' 
              ? `Showing all ${guides.length} guide(s)`
              : `Showing ${guides?.length > 0 ? guides.length : 0} guides in "${categories.find(cat => cat.slug.current === selectedCategory)?.title || selectedCategory}"`
            }
          </p>
        </div>

        {/* Guides Grid */}
        {guides && guides.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {guides.map((guide) => (
              <Card key={guide._id} className="flex flex-col bg-purple-500 dark:bg-purple-900 rounded-lg border-0">
                <Image 
                  src={urlFor(guide.image).url()} 
                  alt={guide.title}
                  width={500}
                  height={300}
                  className="w-full h-64 object-cover rounded-t-[5px]"
                  priority 
                />
                <CardHeader>
                  <CardTitle className='text-white mt-[1.5rem]'>
                    {guide.title}
                  </CardTitle>
                  <CardDescription className='text-gray-300'>
                    {new Date(guide.publishedAt).toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white">
                    {guide.description || "No description available."}
                  </p>
                  {guide.tags && guide.tags.length > 0 && (
                    <div className='mt-4'>
                      <h3 className='text-gray-200 font-semibold mb-2'>Tags:</h3>
                      <div className='flex flex-row gap-2 flex-wrap'>
                        {guide.tags.map((tag) => (
                          <Badge variant={"purple"} key={tag._id} className='text-gray-300'>
                            {tag.title}
                          </Badge>
                        ))}
                      </div>
                    </div> 
                  )}
                </CardContent>
                <CardFooter className='mt-auto'>
                  <Button className="w-full rounded-[5px] bg-purple-700 hover:opacity-75 dark:bg-purple-950 text-white" asChild>
                    <Link href={`/resources/guides/${guide.slug.current}`}>
                      Read More <ArrowRight className='text-white w-4 h-4 ml-1' />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-300 text-lg">
              No guides found for the selected category.
            </p>
            <Link href="/resources/guides" className="text-purple-400 hover:text-purple-300 underline mt-2 inline-block">
              View all guides
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}

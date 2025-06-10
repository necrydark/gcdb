import { getGuides } from '@/src/actions/guides';
import CategoryFilter from '@/src/components/category-filtering';
import DifficultyFilter from '@/src/components/guides/difficulty-filter';
import GuideSearch from '@/src/components/guides/guide-search';
import SortOptions from '@/src/components/guides/sort-options';
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { Card, CardDescription, CardTitle,CardHeader, CardContent, CardFooter } from '@/src/components/ui/card';
import { client } from '@/src/sanity/lib/client';
import { urlFor } from '@/src/sanity/lib/image';
import { ArrowRight, Clock, Eye } from 'lucide-react';
import { SanityDocument } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const  option = { next: { revalidate: 30}}

export interface Guide extends SanityDocument {
  _id: string;
  title: string;
  slug: { current: string };
  image: any;
  description: string;
  publishedAt: string;
  views: number;
  difficulty: number;
  author: {
    name: string;
    image: any;
  },
  category: {
    _id: string;
    title: string;
    slug: { current: string };
  }
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
      views
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
      views
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


export function switchDifficulties(difficulty: number) {
  switch (difficulty) {
    case 1:
      return "Beginner"
    case 2:
      return "Intermediate"
    case 3:
      return "Advanced"
    case 4:
        return "Expert"
}
}


export default async function GuidesPage({ searchParams }: { searchParams: Promise<{category?: string; query: string; sort: string; difficulty: string}>}) {

  const { category, query, sort, difficulty} = await searchParams
  const selectedCategory = category || 'all';
  
  const [categories] = await Promise.all([
    // getGuidesData(selectedCategory),
    getCategoriesData(),
  ]);

  const searchQuery = query|| '';
  const searchSort = sort || "recent"
  const searchDifficulty = difficulty || "all"
  const guides = await getGuides(searchQuery, searchSort, category, searchDifficulty);


  
  console.log("Guides Data:", guides);
  
  return (
    <div className='pt-[5rem]'>
          <div className='mb-[1.1rem]'>
          <h1 className="text-4xl md:text-5xl text-white font-bold text-center mb-4">Game Guides</h1>
          <p className="text-xl text-gray-300 text-center">Comprehensive guides and tutorials to help you master every aspect of the game</p>
        </div>
      <GuideSearch initialQuery={query} />
    <div className='min-h-screen pt-[1rem]'>
      <section>
    
        {/* Category Filter */}
        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory}
        />

      <div className='container max-w-6xl mx-auto py-6'>
        <div className="flex justify-between items-center flex-row mb-6">
        <h1 className="text-2xl text-white font-bold text-center">Recent Guides</h1>
        
        <div className='flex flex-row gap-4'>
          
        <DifficultyFilter initialSelectedDifficulty={searchDifficulty} />
        <SortOptions currentSort={sort} />

        </div>
        </div>
      
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
            {guides.map((guide: any) => (
              <Card key={guide._id} className="flex flex-col bg-purple-800/50 rounded-[5px] border-0">
                <Image 
                  src={urlFor(guide.image).url()} 
                  alt={guide.title}
                  width={500}
                  height={300}
                  className="w-full h-64 object-cover rounded-t-[5px]"
                  priority 
                />
               
                <CardHeader>
                <div className='flex justify-between items-start'>
                    <div>
                      <div className='flex flex-row gap-2 flex-wrap'>
                          <Badge variant={"purple"}  className='text-gray-300'>
                            {guide.category?.title}
                          </Badge>
                      </div>
                    </div> 
                   <Badge variant={"purple"}className='text-gray-300'>
                            {switchDifficulties(guide.difficulty)}
                          </Badge>
                </div>
                  <CardTitle className='text-white mt-2 py-2'>
                    {guide.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={guide.author.image || "/placeholder.svg"} alt={guide.author.name} />
                        <AvatarFallback>{guide.author.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span>{guide.author.name}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white line-clamp-3 text-lg">
                    {guide.description || "No description available."}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                      {guide.tags.map((tag: any, idx:any) => (
                        <Badge key={idx} variant="purple" className="text-xs">
                          {tag.title}
                        </Badge>
                      ))}
                      {guide.tags.length > 3 && (
                        <Badge variant="purple" className="text-xs">
                          +{guide.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                </CardContent>
                <CardFooter className='mt-auto flex justify-between items-center'>
                 <div className="flex flex-row gap-2">
                 <p> 
                    <Clock className='h-4 w-4 inline-flex text-white text-sm mr-2' />
                    {new Date(guide.publishedAt).toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                    <p>
                      <Eye className='h-4 w-4 inline-flex text-sm text-white mr-2' />
                      {guide.views || 0} 
                    </p>
                 </div>
                  <Button size={"lg"} className="w-full rounded-[5px] bg-purple-700 max-w-48 hover:opacity-75 dark:bg-purple-950 text-white" asChild>
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
        </div>
      
      </section>
      <section  className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
          <div className='flex md:flex-row flex-col p-8 bg-purple-800/50 justify-between items-center'>
            <div className='mb-6 md:mb-0 md:mr-6'>
              <h2 className='text-2xl text-white font-semibold'>Got Knowledge?</h2>
              <p className='text-gray-300 text-sm max-w-xl'>Have strategies or insights to share? Write a guide and help other players improve their game. The community appreciates quality content from experienced players.</p>
            </div>
            <Button size={"lg"} className="w-full rounded-[5px] max-w-[150px] bg-purple-700 hover:opacity-75 dark:bg-purple-950 text-white" asChild>
                    <Link href={"/contact"}>
                      Join Us <ArrowRight className='text-white w-4 h-4 ml-1' />
                    </Link>
                  </Button>
          </div>
        </div>
      </section>
    </div>
    </div>
  )
  
}

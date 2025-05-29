'use client';

import { Button } from '@/src/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
}

export default function CategoryFilter({ categories, selectedCategory }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = useCallback((categorySlug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (categorySlug === 'all') {
      params.delete('category');
    } else {
      params.set('category', categorySlug);
    }

    const queryString = params.toString();
    const url = queryString ? `?${queryString}` : '';
    
    router.push(`/resources/guides${url}`);
  }, [router, searchParams]);

  return (
    <div className="mb-8 border-b-[1px] border-b-white px-8 py-12">
      <div className="flex flex-wrap gap-3 justify-center">
        {/* All Categories Button */}
        <Button
          onClick={() => handleCategoryChange('all')}
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          className={`rounded-full ${
            selectedCategory === 'all'
              ? 'bg-purple-600 hover:bg-purple-700 text-white border-purple-600'
              : 'bg-transparent border-purple-400 text-purple-400 hover:bg-purple-600 hover:text-white hover:border-purple-600'
          }`}
        >
          All Guides
        </Button>

        {/* Individual Category Buttons */}
        {categories.map((category) => (
          <Button
            key={category._id}
            onClick={() => handleCategoryChange(category.slug.current)}
            variant={selectedCategory === category.slug.current ? 'default' : 'outline'}
            className={`rounded-full ${
              selectedCategory === category.slug.current
                ? 'bg-purple-600 hover:bg-purple-700 text-white border-purple-600'
                : 'bg-transparent border-purple-400 text-purple-400 hover:bg-purple-600 hover:text-white hover:border-purple-600'
            }`}
          >
            {category.title}
          </Button>
        ))}
      </div>
    </div>
  );
}
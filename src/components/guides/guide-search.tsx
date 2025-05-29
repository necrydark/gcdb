'use client';

import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { SearchIcon, XCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface GuideSearchProps {
  initialQuery?: string;
}

export default function GuideSearch({ initialQuery = '' }: GuideSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);

  // Sync state with URL on initial load and searchParams changes
  useEffect(() => {
    setQuery(searchParams.get('query') || '');
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const currentParams = new URLSearchParams(searchParams.toString());
    if (query) {
      currentParams.set('query', query);
    } else {
      currentParams.delete('query');
    }
    router.push(`?${currentParams.toString()}`);
  };

  const handleClear = () => {
    setQuery('');
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.delete('query');
    router.push(`?${currentParams.toString()}`);
  };

  return (
    <div className="flex flex-row justify-center mb-6 pt-4">
      <form onSubmit={handleSearch} className="w-full max-w-xl flex flex-row gap-2">
       <div className='relative w-full h-full'>
       <Input
          type="text"
          placeholder="Search guides by title or description..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-purple-900 bg-purple-600 h-full rounded-[5px] border-[2px] w-full pl-10 pr-10 py-2  ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"

        />
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white" />
        {query && (
          <Button
            type="button"
            onClick={handleClear}
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-white hover:bg-purple-600 rounded-full"
          >
            <XCircle className="h-5 w-5" />
          </Button>
        )}
       </div>
        <Button
        className="text-white rounded-[5px] max-w-[100px] dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px] flex flex-row items-center  hover:text-white dark:bg-purple-700 transition-all duration-250"
        type='submit'
        >
            <SearchIcon className="h-5 w-5" />
            Search 
        </Button>
      </form>
    </div>
  );
}
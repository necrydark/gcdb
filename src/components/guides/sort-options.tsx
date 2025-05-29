'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import React, { useEffect, useState } from 'react';

interface SortOptionsProps {
  currentSort?: string;
}

export default function SortOptions({ currentSort = 'recent' }: SortOptionsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedSort, setSelectedSort] = useState(currentSort);

  // Sync state with URL on initial load and searchParams changes
  useEffect(() => {
    setSelectedSort(searchParams.get('sort') || 'recent');
  }, [searchParams]);

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    const currentParams = new URLSearchParams(searchParams.toString());
    if (value && value !== 'recent') { // Only set 'sort' param if it's not the default
      currentParams.set('sort', value);
    } else {
      currentParams.delete('sort'); // Remove 'sort' param if it's default
    }
    router.push(`?${currentParams.toString()}`);
  };

  return (
    <div className="flex justify-center mb-6 pt-4">
      <Select value={selectedSort} onValueChange={handleSortChange}>
        <SelectTrigger  className="w-[180px] border-purple-900 focus:ring-0 focus-visible:ring-0 bg-purple-600 border-[2px] rounded-[5px]  text-white dark:bg-purple-800  focus:border-purple-900 ">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="bg-purple-600 rounded-[5px] text-white dark:bg-purple-800">
          <SelectItem 
          className="hover:bg-purple-400 focus:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950 dark:focus:bg-purple-950"
          value="recent">Recently Added</SelectItem>
          <SelectItem 
          className="hover:bg-purple-400 focus:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950 dark:focus:bg-purple-950"
          value="views">Most Viewed</SelectItem>
          {/* <SelectItem value="alphabetical">Alphabetical (A-Z)</SelectItem> */}
        </SelectContent>
      </Select>
    </div>
  );
}
'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select'; 

interface DifficultyOption {
  label: string; 
  value: string; 
}

interface DifficultyFilterProps {
  initialSelectedDifficulty?: string;
}

export default function DifficultyFilter({ initialSelectedDifficulty }: DifficultyFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const difficultyOptions: DifficultyOption[] = [
    { label: 'All Difficulties', value: 'all' },
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
    { label: 'Expert', value: 'expert' },
  ];

  const [currentSelectedDifficulty, setCurrentSelectedDifficulty] = useState(
    initialSelectedDifficulty || 'all'
  );

  useEffect(() => {
    setCurrentSelectedDifficulty(initialSelectedDifficulty || 'all');
  }, [initialSelectedDifficulty]);

  const handleDifficultyChange = useCallback(
    (newValue: string) => {
      setCurrentSelectedDifficulty(newValue);

      const params = new URLSearchParams(searchParams.toString());

      if (newValue === 'all') {
        params.delete('difficulty');
      } else {
        params.set('difficulty', newValue); 
      }

      const queryString = params.toString();
      const url = queryString ? `?${queryString}` : '';

      router.push(`/resources/guides${url}`);
    },
    [router, searchParams] 
  );

  return (
    <div className='pt-4 flex justify-center mb-6'>
      <div className="flex flex-wrap items-center justify-center gap-3">

        <Select
          value={currentSelectedDifficulty}
          onValueChange={handleDifficultyChange}
        >
          <SelectTrigger className="w-[180px] border-purple-900 focus:ring-0 focus-visible:ring-0 bg-purple-600 border-[2px] rounded-[5px]  text-white dark:bg-purple-800  focus:border-purple-900 ">
            <SelectValue placeholder="Select Difficulty" />
          </SelectTrigger>
          <SelectContent className="bg-purple-600 rounded-[5px] text-white dark:bg-purple-800">
            {difficultyOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="hover:bg-purple-400 focus:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950 dark:focus:bg-purple-950"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
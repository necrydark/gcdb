"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SortOptionsProps {
  currentSort?: string;
}

export default function SortOptions({
  currentSort = "recent",
}: SortOptionsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedSort, setSelectedSort] = useState(currentSort);

  useEffect(() => {
    setSelectedSort(searchParams.get("sort") || "recent");
  }, [searchParams]);

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    const currentParams = new URLSearchParams(searchParams.toString());
    if (value && value !== "recent") {
      currentParams.set("sort", value);
    } else {
      currentParams.delete("sort");
    }
    router.push(`?${currentParams.toString()}`);
  };

  return (
    <div className="flex justify-center">
      <Select value={selectedSort} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px] border-2 focus:ring-0 focus-visible:ring-0 bg-gradient-to-r from-purple-600 to-blue-600 border-purple-700/50 rounded-[5px] text-white hover:from-purple-700 hover:to-blue-700 focus:border-purple-700 shadow-lg">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="bg-gradient-to-br from-card via-card to-purple-50/30 dark:to-purple-900/10 rounded-[5px] border border-border/50 shadow-xl">
          <SelectItem
            className="hover:bg-purple-600/75 focus:bg-purple-600/75 rounded-[5px] dark:hover:bg-purple-900/75 dark:focus:bg-purple-900/75"
            value="recent"
          >
            Recently Added
          </SelectItem>
          <SelectItem
            className="hover:bg-purple-600/75 focus:bg-purple-600/75 rounded-[5px] dark:hover:bg-purple-900/75 dark:focus:bg-purple-900/75"
            value="views"
          >
            Most Viewed
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

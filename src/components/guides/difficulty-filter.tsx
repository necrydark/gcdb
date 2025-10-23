"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface DifficultyOption {
  label: string;
  value: string;
}

interface DifficultyFilterProps {
  initialSelectedDifficulty?: string;
}

export default function DifficultyFilter({
  initialSelectedDifficulty,
}: DifficultyFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const difficultyOptions: DifficultyOption[] = [
    { label: "All Difficulties", value: "all" },
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advanced", value: "advanced" },
    { label: "Expert", value: "expert" },
  ];

  const [currentSelectedDifficulty, setCurrentSelectedDifficulty] = useState(
    initialSelectedDifficulty || "all"
  );

  useEffect(() => {
    setCurrentSelectedDifficulty(initialSelectedDifficulty || "all");
  }, [initialSelectedDifficulty]);

  const handleDifficultyChange = useCallback(
    (newValue: string) => {
      setCurrentSelectedDifficulty(newValue);

      const params = new URLSearchParams(searchParams.toString());

      if (newValue === "all") {
        params.delete("difficulty");
      } else {
        params.set("difficulty", newValue);
      }

      const queryString = params.toString();
      const url = queryString ? `?${queryString}` : "";

      router.push(`/resources/guides${url}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Select
          value={currentSelectedDifficulty}
          onValueChange={handleDifficultyChange}
        >
          <SelectTrigger className="w-[180px] border-2 focus:ring-0 focus-visible:ring-0 bg-gradient-to-r from-purple-600 to-blue-600 border-purple-700/50 rounded-[5px] text-white hover:from-purple-700 hover:to-blue-700 focus:border-purple-700 shadow-lg">
            <SelectValue placeholder="Select Difficulty" />
          </SelectTrigger>
          <SelectContent className="bg-gradient-to-br from-card via-card to-purple-50/30 dark:to-purple-900/10 rounded-[5px] border border-border/50 shadow-xl">
            {difficultyOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="hover:bg-purple-600/75 focus:bg-purple-600/75 rounded-[5px] dark:hover:bg-purple-900/75 dark:focus:bg-purple-900/75"
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

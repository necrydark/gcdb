"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");

  const handleScroll = () => {
    const currentPosition = window.pageYOffset;
    if (currentPosition > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
    setScrollPosition(currentPosition);

    if (scrollPosition > currentPosition) {
      setScrollDirection("up");
    } else {
      setScrollDirection("down");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div>
      <div
        className={`${
          isVisible ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300 border border-purple-300 fixed bottom-3 z-[100] right-3 flex bg-muted/50 hover:bg-purple-800/50  cursor-pointer rounded-full text-white p-2`}
        onClick={scrollToTop}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <MdKeyboardArrowUp className="text-[2rem]" />
            </TooltipTrigger>
            <TooltipContent>Back to top</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default BackToTop;
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Calendar, ExternalLink, Eye, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface VideoCardProps {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: string;
  viewCount: string;
  commentCount: string;
  publishedAt: string;
  formatDate: (date: string) => string;
  formatDuration: (duration: string) => string;
}

export function VideoCard({
  id,
  title,
  description,
  thumbnailUrl,
  duration,
  viewCount,
  commentCount,
  publishedAt,
  formatDate,
  formatDuration,
}: VideoCardProps) {
  return (
    <Card className="overflow-hidden group bg-gradient-to-t from-card via-card to-muted/20 rounded-[5px] border-0 hover:ring-1 hover:ring-border/60 transition-all duration-300">
      <div className="relative overflow-hidden">
        <Image
          src={thumbnailUrl || "/placeholder.svg"}
          alt={title || "YouTube video thumbnail"}
          width={480}
          height={270}
          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-2 right-2 bg-background/90 text-foreground px-2 py-0.5 rounded text-xs font-mono font-medium backdrop-blur-sm">
          {formatDuration(duration)}
        </div>
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-red-600 rounded-full p-3 shadow-lg">
              <svg
                className="w-5 h-5 text-white ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <CardHeader className="pb-1.5">
        <CardTitle className="text-base leading-snug line-clamp-2  transition-colors">
          {title}
        </CardTitle>
        <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            {Number(viewCount).toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="h-3.5 w-3.5" />
            {Number(commentCount).toLocaleString()}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {description}
        </p>
        <Button
          size="sm"
          asChild
          className="w-full rounded-[5px] hover:text-foreground text-foreground border-primary/50 hover:border-primary/60"
        >
          <Link
            href={`https://www.youtube.com/watch?v=${id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="mr-2 h-3.5 w-3.5" />
            Watch Video
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

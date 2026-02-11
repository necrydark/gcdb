import { getGuides } from "@/src/actions/guides";
import CategoryFilter from "@/src/components/category-filtering";
import DifficultyFilter from "@/src/components/guides/difficulty-filter";
import GuideSearch from "@/src/components/guides/guide-search";
import SortOptions from "@/src/components/guides/sort-options";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { client } from "@/src/sanity/lib/client";
import { urlFor } from "@/src/sanity/lib/image";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Eye,
  Star,
  TrendingUp,
} from "lucide-react";
import { SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

const option = { next: { revalidate: 30 } };

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
  };
  category: {
    _id: string;
    title: string;
    slug: { current: string };
  };
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
  if (categorySlug && categorySlug !== "all") {
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
      return "Beginner";
    case 2:
      return "Intermediate";
    case 3:
      return "Advanced";
    case 4:
      return "Expert";
  }
}

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    query: string;
    sort: string;
    difficulty: string;
  }>;
}) {
  const { category, query, sort, difficulty } = await searchParams;
  const selectedCategory = category || "all";

  const [categories] = await Promise.all([getCategoriesData()]);

  const searchQuery = query || "";
  const searchSort = sort || "recent";
  const searchDifficulty = difficulty || "all";
  const guides = await getGuides(
    searchQuery,
    searchSort,
    category,
    searchDifficulty,
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-[5rem]">
        <div className="mb-[1.1rem] relative overflow-hidden border-b border-border/50">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/60 rounded-full blur-3xl pointer-events-none"></div>
          <div className="container mx-auto max-w-6xl px-4 pt-20 pb-10 relative z-10 text-center space-y-6">
            <h1 className="text-4xl md:text-5xl text-white font-bold text-center mb-4">
              Game Guides
            </h1>
            <p className="text-xl text-gray-300 text-center">
              Comprehensive guides and tutorials to help you master every aspect
              of the game
            </p>

            <GuideSearch initialQuery={query} />
            {/* Category Filter */}
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
        <div className="min-h-screen pt-[1rem]">
          <section>
            <div className="container max-w-6xl mx-auto px-4 py-6">
              <div className="flex justify-between items-center flex-row mb-6">
                <h1 className="text-2xl text-white font-bold text-center">
                  {searchQuery
                    ? `Search Results: "${searchQuery}"`
                    : "Recent Guides"}
                </h1>

                <div className="flex flex-row gap-4">
                  <DifficultyFilter
                    initialSelectedDifficulty={searchDifficulty}
                  />
                  <SortOptions currentSort={sort} />
                </div>
              </div>

              {/* Results count */}
              <div className="mb-6">
                <p className="text-gray-300 text-center">
                  {selectedCategory === "all"
                    ? `Showing all ${guides.length} guide(s)`
                    : `Showing ${guides?.length > 0 ? guides.length : 0} guides in "${categories.find((cat) => cat.slug.current === selectedCategory)?.title || selectedCategory}"`}
                </p>
              </div>

              {/* Guides Grid */}
              {guides && guides.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {guides.map((guide: any) => (
                    <Card
                      key={guide._id}
                      className="flex flex-col bg-gradient-to-br from-card via-card to-purple-50/30 dark:to-purple-900/10 border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-xl overflow-hidden group"
                    >
                      <div className="relative">
                        <Image
                          src={urlFor(guide.image).url()}
                          alt={guide.title}
                          width={400}
                          height={250}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                          priority
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge
                            variant="default"
                            className="bg-purple-700 hover:bg-purple-700/50 text-white shadow-md backdrop-blur-sm"
                          >
                            {guide.category?.title}
                          </Badge>
                          <Badge
                            variant="default"
                            className={`${
                              guide.difficulty <= 2
                                ? "bg-green-600 hover:bg-green-600/50"
                                : guide.difficulty === 3
                                  ? "bg-yellow-600 hover:bg-yellow-600/50"
                                  : "bg-red-600 hover:bg-red-600/50"
                            } text-white shadow-md backdrop-blur-sm`}
                          >
                            {switchDifficulties(guide.difficulty)}
                          </Badge>
                        </div>
                        {guide.views && guide.views > 1000 && (
                          <div className="absolute top-4 right-4">
                            <Badge
                              variant="secondary"
                              className="bg-black/70 text-white backdrop-blur-sm"
                            >
                              <Star className="w-3 h-3 mr-1" />
                              Popular
                            </Badge>
                          </div>
                        )}
                      </div>

                      <CardHeader className="pb-3">
                        <CardTitle className="text-white text-lg line-clamp-2  transition-colors">
                          {guide.title}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 text-gray-300">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={guide.author.image || "/placeholder.svg"}
                              alt={guide.author.name}
                            />
                            <AvatarFallback className="text-xs">
                              {guide.author.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{guide.author.name}</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="py-0">
                        <p className="text-gray-300 line-clamp-3 text-sm mb-4">
                          {guide.description || "No description available."}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {guide.tags.slice(0, 4).map((tag: any, idx: any) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs bg-purple-600/20 hover:bg-purple-600/30 transition-colors cursor-default text-purple-300 border border-purple-600/30"
                            >
                              {tag.title}
                            </Badge>
                          ))}
                          {guide.tags.length > 4 && (
                            <Badge variant="purple" className="text-xs">
                              +{guide.tags.length - 4}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="mt-auto flex justify-between items-center pt-3">
                        <div className="flex flex-row gap-3 text-xs text-gray-400">
                          <p className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(guide.publishedAt).toLocaleDateString(
                              "en-GB",
                              { month: "short", day: "numeric" },
                            )}
                          </p>
                          <p className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {(guide.views || 0).toLocaleString()}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          className="rounded-lg  text-white shadow-lg "
                          asChild
                        >
                          <Link
                            href={`/resources/guides/${guide.slug.current}`}
                          >
                            Read{" "}
                            <ArrowRight className="text-white w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <BookOpen className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      No Guides Found
                    </h3>
                    <p className="text-gray-300 mb-6">
                      No guides match your selected criteria. Try adjusting your
                      filters or browse all guides.
                    </p>
                    <Link
                      href="/resources/guides"
                      className="inline-flex items-center text-purple-400 hover:text-purple-300 underline"
                    >
                      View all guides <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-12 px-4">
            <div className="container mx-auto max-w-6xl">
              <Card className="bg-gradient-to-br from-purple-600/10 to-purple-800/10 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden">
                <CardContent className="flex md:flex-row flex-col p-8 justify-between items-center gap-6">
                  <div className="text-white max-w-xl">
                    <h2 className="text-2xl font-semibold mb-2">
                      Share Your Knowledge
                    </h2>
                    <p className="text-gray-300 text-sm">
                      Have strategies or insights to share? Write a guide and
                      help other players improve their game. The community
                      appreciates quality content from experienced players.
                    </p>
                    <div className="flex gap-4 mt-4">
                      <div className="flex items-center gap-2 text-sm text-purple-300">
                        <Star className="h-4 w-4" />
                        <span>Reach thousands of players</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-purple-300">
                        <TrendingUp className="h-4 w-4" />
                        <span>Build your reputation</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button
                      size="lg"
                      className="rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-lg min-w-[150px] group-hover:scale-105 transition-transform"
                      asChild
                    >
                      <Link href="/contact">
                        Join Us <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                    <p className="text-xs text-gray-400 text-center">
                      No experience needed - we&apos;ll help you get started!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

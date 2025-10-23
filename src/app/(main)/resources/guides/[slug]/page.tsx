import { incrementGuideViews } from "@/src/actions/guides";
import BackToTop from "@/src/components/guides/back-to-top";
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
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { Separator } from "@/src/components/ui/separator";
import { formatDate } from "@/src/lib/date-format";
import { client } from "@/src/sanity/lib/client";
import {
  PortableTextComponentProps,
  PortableTextReactComponents,
} from "@portabletext/react";
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Clock,
  Eye,
  Tag,
} from "lucide-react";
import {
  PortableText,
  PortableTextBlockComponent,
  PortableTextMarkComponent,
} from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Guide, switchDifficulties } from "../page";

interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

const GUIDE_QUERY = `*[_type == "guide" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    image,
    description,
    publishedAt,
    content,
    _updatedAt,
    read,
    views,
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
    },
    teams[],
    "headings": content[style in ["h1", "h2", "h3", "h4", "h5", "h6"]]
}`;
const POST_AUTHOR = `*[_type == "author"]{
    name,
    bio,
    "authorImage": image.asset->url,
    "posts": *[_type == "post" && author._ref in authors[]->author._id ]{
      title,
      "slug": slug.current,
    }
}`;

const options = { next: { revalidate: 30 } };

export default async function GuidePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const guide = await client.fetch<Guide>(GUIDE_QUERY, await params, options);

  const portableTextComponents: Partial<PortableTextReactComponents> = {
    types: {
      image: ({ value }: PortableTextComponentProps<any>) => (
        <div className="my-8">
          <Image
            src={`/placeholder.svg?height=400&width=800&text=${encodeURIComponent(value.alt || "Guide Image")}`}
            alt={value.alt || "Guide image"}
            width={800}
            height={400}
            className="w-full rounded-lg"
          />
          {value.alt && (
            <p className="text-sm text-muted-foreground text-center mt-2">
              {value.alt}
            </p>
          )}
        </div>
      ),
    },
    block: {
      h1: (({ children }) => (
        <h1
          className="text-3xl font-bold mt-8 mb-4 scroll-mt-8"
          id={generateAnchor(children)}
        >
          {children}
        </h1>
      )) as PortableTextBlockComponent,

      h2: (({ children }) => (
        <h2
          className="text-2xl font-semibold mt-6 mb-3 scroll-mt-8"
          id={generateAnchor(children)}
        >
          {children}
        </h2>
      )) as PortableTextBlockComponent,

      h3: (({ children }) => (
        <h3
          className="text-xl font-medium mt-5 mb-2 scroll-mt-8"
          id={generateAnchor(children)}
        >
          {children}
        </h3>
      )) as PortableTextBlockComponent,

      normal: (({ children }) => (
        <p className="mb-4 leading-relaxed">{children}</p>
      )) as PortableTextBlockComponent,
    },
    list: {
      bullet: ({ children }: PortableTextComponentProps<any>) => (
        <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
      ),
      number: ({ children }: PortableTextComponentProps<any>) => (
        <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }: PortableTextComponentProps<any>) => (
        <li className="ml-4">{children}</li>
      ),
      number: ({ children }: PortableTextComponentProps<any>) => (
        <li className="ml-4">{children}</li>
      ),
    },
    marks: {
      strong: (({ children }) => (
        <strong className="font-semibold">{children}</strong>
      )) as PortableTextMarkComponent<any>,

      em: (({ children }) => (
        <em className="italic">{children}</em>
      )) as PortableTextMarkComponent<any>,

      code: (({ children }) => (
        <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      )) as PortableTextMarkComponent<any>,

      link: (({ children, value }) => (
        <a
          href={value?.href || "#"}
          className="text-primary underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      )) as PortableTextMarkComponent<{ _type: string; href?: string }>,
    },
  };

  // Helper function to generate anchor IDs from text content
  function generateAnchor(children: React.ReactNode): string {
    const text = React.Children.toArray(children).join("").toLowerCase();
    return text.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function getHeadingText(block: any): string {
    return block.children?.map((child: any) => child.text).join("") || "";
  }

  function slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  if (!guide) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Guide Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The guide you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button variant={"purple"} asChild>
            <Link href="/guides">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Guides
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  await incrementGuideViews(guide._id);

  return (
    <div className="min-h-screen scroll-smooth">
      <div className="bg-muted/50">
        <div className="container mx-auto max-w-6xl p-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link
              href="/resources"
              className="text-muted-foreground hover:text-foreground"
            >
              Resources
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link
              href="/resources/guides"
              className="text-muted-foreground hover:text-foreground"
            >
              Guides
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{guide.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-8">
              <Card className="bg-gradient-to-br from-purple-600 to-blue-600 border-0 shadow-xl rounded-xl overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-white">
                    Table of Contents
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ScrollArea className="h-[400px]">
                    <nav className="space-y-1">
                      {guide.headings?.map((block: any, idx: number) => {
                        const text = getHeadingText(block);
                        const id = slugify(text);
                        type HeadingLevel =
                          | "h1"
                          | "h2"
                          | "h3"
                          | "h4"
                          | "h5"
                          | "h6";

                        const headingStyles: Record<HeadingLevel, string> = {
                          h1: "pl-2",
                          h2: "pl-4",
                          h3: "pl-6",
                          h4: "pl-8",
                          h5: "pl-10",
                          h6: "pl-12",
                        };

                        const indent =
                          headingStyles[block.style as HeadingLevel] || "pl-2";

                        return (
                          <Link
                            key={idx}
                            href={`#${id}`}
                            className={`block py-2 text-sm hover:bg-purple-700/50 text-white rounded-lg transition-colors ${indent}`}
                          >
                            {text}
                          </Link>
                        );
                      })}
                      {guide.teams && (
                        <Link
                          href="#recommended-teams"
                          className="block py-2 text-sm hover:bg-purple-700/50 text-white rounded-lg transition-colors pl-2"
                        >
                          Recommended Teams
                        </Link>
                      )}
                    </nav>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge
                  variant="default"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                >
                  {guide.category?.title}
                </Badge>
                <Badge
                  variant="default"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                >
                  {switchDifficulties(guide.difficulty)}
                </Badge>
                {guide.tags.slice(0, 3).map((tag: any, idx: any) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="text-xs bg-muted/50"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag.title}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {guide.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {guide.read} min read
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(guide.publishedAt)}
                </div>
                {guide.updatedAt && (
                  <div className="flex items-center">
                    Updated {formatDate(guide.updatedAt)}
                  </div>
                )}
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {guide.views || 0}
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={guide.author.image || "/placeholder.svg"}
                      alt={guide.author.name}
                    />
                    <AvatarFallback>
                      {guide.author.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{guide.author.name}</p>
                  </div>
                </div>
              </div>
              <Separator className="bg-border/50" />
            </div>
            <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
              <PortableText
                value={guide.content}
                components={portableTextComponents}
              />
            </div>

            {guide.teams && (
              <div className="space-y-6" id="recommended-teams">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent scroll-mt-24">
                  Recommended Teams
                </h2>
                {guide.teams.map((team: any, idx: number) => (
                  <Card
                    key={idx}
                    className="bg-gradient-to-br from-purple-600/10 via-card to-blue-600/10 border border-border/50 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl font-bold text-foreground mb-2">
                            {team.teamName}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {team.teamNotes}
                          </p>
                        </div>
                        <Badge
                          variant="default"
                          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                        >
                          Team {idx + 1}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {team.members.map(
                          (member: string, memberIdx: number) => (
                            <div
                              key={memberIdx}
                              className="flex flex-col gap-2 items-center justify-center p-4 rounded-xl bg-gradient-to-br from-muted/30 to-muted/50 hover:from-muted/50 hover:to-muted/70 transition-all duration-300 group"
                            >
                              <div className="relative">
                                <Image
                                  alt={member}
                                  src="/placeholder.svg?height=75&width=75"
                                  width={75}
                                  height={75}
                                  className="rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-md">
                                  {memberIdx + 1}
                                </div>
                              </div>
                              <p className="text-sm font-medium text-foreground text-center">
                                {member}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* {guide.teams &&
                guide.teams.map((team: any, idx: any) => (
                  <>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      Recommended Teams
                    </h1>
                    <div>
                      <h1 className="font-bold text-lg">{team.teamName}</h1>
                      <p className="text-sm">{team.teamNotes}</p>
                    </div>
                    <div
                      key={idx}
                      className="flex flex-row gap-4 items-center justify-evenly my-4"
                    >
                      {team.members.map(async (member: any, idx: any) => {
                        const char = member.split(" ");
                        const joined = char.join("-").toLowerCase();
                        const searched = await getCharacterBySlug(
                          joined as string
                        );
                        return (
                          <div key={idx}>
                            <Link
                              className="flex flex-col gap-2 items-center justify-center"
                              href={`/characters/${searched?.slug}`}
                            >
                              <Image
                                alt={searched?.name as string}
                                src={searched?.imageUrl as string}
                                width={75}
                                height={75}
                              />
                              <p className="text-sm">{searched?.name}</p>
                              <p className="text-[10px]">{searched?.tag}</p>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ))} */}
          </div>
        </div>
        {/* Back to Top Button */}
        <div className="fixed bottom-8 right-8">
          <BackToTop />
        </div>
      </div>
    </div>
  );
}

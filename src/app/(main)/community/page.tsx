import { getYoutubeVideos } from "@/data/get-youtube-videos";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { formatDate } from "@/src/lib/date-format";
import { formatYoutubeDuration } from "@/src/lib/youtube-duration";
import {
  Award,
  Calendar,
  ChevronDown,
  ExternalLink,
  Eye,
  Heart,
  MessageCircle,
  MessageSquare,
  Users,
  Youtube,
  YoutubeIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export type YoutubeRes = {
  kind: string;
  etag: string
  items: Video[];
}

export type Video = {
  kind: string;
  etag: string; 
  id: string; 
  snippet: {
    title:string;
    publishedAt: string;
    description: string;

    thumbnails: {
      high: {
        url: string;
      }
    }
  }
contentDetails:{
  duration: string;
  caption: string;
}
statistics: {
  viewCount: string
  commentCount: string;
}
}

export default async function CommunityPage() {
  const communityPlatforms = [
    {
      id: "discord",
      name: "Discord",
      description:
        "Join our active Discord community with over 10,000 members. Get help, share strategies, and participate in events.",
      icon: MessageSquare,
      url: "https://discord.com/invite/fMFKvXy7FQ",
      members: "4,000+",
      colour: "bg-indigo-500",
      cta: "Join Server",
    },
    {
      id: "youtube",
      name: "YouTube - Amazing",
      description: "Watch guides, gameplay, and analysis from Amazing.",
      icon: Youtube,
      url: "https://www.youtube.com/@AmazingGrandCross",
      subscribers: "50,000+",
      colour: "bg-red-500",
      cta: "Visit Channel",
    },
    {
      id: "youtube2",
      name: "YouTube - Marilli",
      description: "Watch guides, gameplay, and analysis from Marilli.",
      icon: Youtube,
      url: "https://www.youtube.com/@Marilli",
      subscribers: "39,000+",
      colour: "bg-red-500",
      cta: "Visit Channel",
    },
    {
      id: "youtube3",
      name: "YouTube - Sora",
      description: "Watch guides, gameplay, and analysis from Sora.",
      icon: Youtube,
      url: "https://www.youtube.com/@Sora-GrandCross",
      subscribers: "54,000+",
      colour: "bg-red-500",
      cta: "Visit Channel",
    },
  ];

  const contributionAreas = [
    {
      id: "1",
      name: "Data Entry",
      description: "Help us keep character stats, skills, and equipment information up to date.",
      difficulty: "Easy",
      icon: "📊",
    },
    {
      id: "2",
      name: "Guide Writing",
      description: "Create guides for characters, game mechanics, or events to help other players.",
      difficulty: "Medium",
      icon: "📝",
    },
    {
      id: "3",
      name: "Code Contribution",
      description: "Contribute to our open-source tools and website on GitHub.",
      difficulty: "Hard",
      icon: "💻",
    },
    {
      id: "4",
      name: "Community Moderation",
      description: "Help maintain a positive and helpful community across our platforms.",
      difficulty: "Medium",
      icon: "🛡️",
    },
    {
      id: "5",
      name: "Content Creation",
      description: "Create videos, infographics, or other visual content for the community.",
      difficulty: "Medium",
      icon: "🎨",
    },
  ]

  const videos = await getYoutubeVideos();
  return (
    <div className="pt-[7rem] container mx-auto px-6">
      <section className="flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl text-white font-bold mb-4">
            Community
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-300 max-w-2xl mx-auto">
            Join our thriving community of players, contributors, and
            enthusiasts
          </p>
        </div>
      </section>

      {/* Community Resources */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8">Join Our Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communityPlatforms.map((platform) => (
              <Card
                key={platform.id}
                className="overflow-hidden rounded-[5px]  border-0 flex flex-col"
              >
                <CardHeader className={`${platform.colour} text-white`}>
                  <div className="flex items-center gap-3">
                    <platform.icon className="h-6 w-6" />
                    <CardTitle>{platform.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 flex-grow bg-purple-500 dark:bg-purple-700">
                  <p className="mb-4">{platform.description}</p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                    <Users className="h-4 w-4 mr-1" />
                    <span>
                      {platform.members ||
                        platform.subscribers ||
                        "Join our community"}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="mt-auto bg-purple-500 dark:bg-purple-700">
                  <Button
                    variant="purple"
                    className="w-full rounded-[5px]"
                    asChild
                  >
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {platform.cta}
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Youtube videos */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
           <div className="flex justify-between items-center mb-8">
            <div>
            <h3 className="text-2xl font-bold">Latest Youtube Videos - Amazing</h3>
              <p>
                Check out the latest videos from Amazing on his channel.
              </p>
            </div>
              <Button
                variant="purple"
                className="dark:hover:bg-purple-950 hover:bg-purple-700 transition-all duration-300 rounded-[5px]"
                size="lg"
                asChild
              >
                <Link href="https://www.youtube.com/@AmazingGrandCross" target="_blank" rel="noopener noreferrer">
                <YoutubeIcon className="mr-2 h-5 w-5" /> Visit Channel
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video: Video) => (
                <Card key={video.id} className="overflow-hidden  group-hover:shadow-lg transition-shadow bg-purple-500 dark:bg-purple-900 rounded-[5px] border-0">
                  <div className="relative">
                    <Image src={video.snippet.thumbnails.high.url || ""}
                    alt={video.snippet.title || "Youtube video thumbnail"}
                    width={320}
                    height={160}
                    className="w-full h-[160px] object-cover group-hover:scale-105 transition-transform duration-300" />         
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded-[5px] text-xs font-medium">
                    {formatYoutubeDuration(video.contentDetails.duration)}
                    </div>     
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-red-600 rounded-full p-3">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    
                    </div>  
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {video.snippet.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {video.statistics.viewCount}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(video.snippet.publishedAt)}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {video.statistics.commentCount}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-300 line-clamp-2 mb-4">
                      {video.snippet.description}
                    </p>
                    <Button variant={"purple"} 
  asChild
className="dark:hover:bg-purple-950 hover:bg-purple-700 transition-all duration-300 w-full rounded-[5px]"
>
  <Link href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
  <ExternalLink className="mr-2 h-4 w-4" />
  Watch Video
  </Link>
</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
        </div>
      </section>

      {/* How To Contribute */}
      {/* <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mt-12 =">
            <div className="p-8 max-w-2xl text-center mx-auto">
              <Heart className="w-12 h-12 text-white mx-auto p-4" />
              <h3 className="text-2xl font-bold mb-2">How To Contribute</h3>
              <p className="mb-6">
                There are many ways to help improve the website and community. Find the perfect fit for your skills and interests
              </p>
             
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contributionAreas.map((area) => (
                <Card key={area.id} className="overflow-hidden bg-purple-500 dark:bg-purple-900 rounded-[5px] border-0">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{area.icon}</span>
                      <CardTitle>{area.name}</CardTitle>
                    </div>
                      <CardDescription>Difficulty: {area.difficulty}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{area.description}</p>
                  </CardContent>
                  <CardFooter className="mt-auto">
                  <Button variant="purple" className="dark:hover:bg-purple-950 hover:bg-purple-700 transition-all duration-300 w-full rounded-[5px]"
 asChild>
                    <Link href={`/contribute/${area.id}`}>
                      Get Started <ChevronDown className="ml-2 h-4 w-4 rotate-[-90deg]" />
                    </Link>
                  </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section> */}


      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mt-12 text-center">
            <div className="p-8 max-w-2xl mx-auto">
              <Heart className="w-12 h-12 text-white mx-auto p-4" />
              <h3 className="text-2xl font-bold mb-2">Become a Team Member</h3>
              <p className="mb-6">
                Ready to take your contribution to the next level? Apply to join
                our team of moderators, administrators, and content creators.
              </p>
              <Button
                variant="purple"
                className="dark:hover:bg-purple-950 mt-6 hover:bg-purple-700 transition-all duration-300 rounded-[5px]"
                size="lg"
                asChild
              >
                <Link href="/contact">
                  Apply Now <Award className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Community Guidelines</h2>
          <Card className="bg-purple-700 dark:bg-purple-950 rounded-[5px] border-0">
            <CardContent className="pt-6 space-y-4">
              <div className="prose prose-sm max-w-none dark:prose-invert  ">
                <p className="lead">
                  Our community is built on respect, collaboration, and a shared
                  passion for the game. Please follow these guidelines to ensure
                  a positive experience for everyone.
                </p>

                <h3>Be Respectful</h3>
                <p>
                  Treat all community members with respect. Harassment, hate
                  speech, and personal attacks are not tolerated. Remember that
                  there are real people behind the usernames.
                </p>

                <h3>Quality Contributions</h3>
                <p>
                  Aim to provide accurate, helpful information. When
                  contributing to the database or creating guides, verify your
                  information and present it clearly.
                </p>

                <h3>Stay On Topic</h3>
                <p>
                  Keep discussions relevant to the game, database, or community.
                  Each platform has dedicated channels or threads for different
                  topics.
                </p>

                <h3>No Cheating or Exploits</h3>
                <p>
                  Discussions about cheating, hacking, or exploiting game
                  mechanics are prohibited. We support fair play and the game&apos;s
                  terms of service.
                </p>

                <h3>Respect Privacy</h3>
                <p>
                  Do not share personal information about yourself or others.
                  This includes contact information, real names (unless publicly
                  shared by the person), or any identifying details.
                </p>

                <h3>Moderation</h3>
                <p>
                  Moderators have the final say in enforcing these guidelines.
                  If you have concerns about moderation actions, please contact
                  an administrator privately.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

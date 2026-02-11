import { getYoutubeVideos } from "@/data/get-youtube-videos";
import {
  BreadcrumbNav,
  CtaBanner,
  SectionCard,
} from "@/src/components/contribute";
import { FeatureCard } from "@/src/components/contribute/feature-card";
import { GuidelineItem } from "@/src/components/contribute/guideline-item";
import { PlatformCard } from "@/src/components/contribute/platform-card";
import { VideoCard } from "@/src/components/contribute/video-card";
import { Button } from "@/src/components/ui/button";
import { formatDate } from "@/src/lib/date-format";
import {
  ArrowRight,
  Award,
  Ban,
  BookOpen,
  CheckCircle2,
  Gavel,
  HandHeart,
  Heart,
  Lock,
  MessageSquare,
  Shield,
  ShieldCheck,
  Trophy,
  Users,
  Youtube,
  YoutubeIcon,
  Zap,
} from "lucide-react";
import Link from "next/link";

export type YoutubeRes = {
  kind: string;
  etag: string;
  items: Video[];
};

export type Video = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    title: string;
    publishedAt: string;
    description: string;

    thumbnails: {
      high: {
        url: string;
      };
    };
  };
  contentDetails: {
    duration: string;
    caption: string;
  };
  statistics: {
    viewCount: string;
    commentCount: string;
  };
};

export default async function CommunityPage() {
  const communityPlatforms = [
    {
      id: "discord",
      name: "Discord Community",
      description:
        "Join our active Discord community with over 4,000 members. Get help, share strategies, and participate in events.",
      icon: <MessageSquare />,
      url: "https://discord.com/invite/fMFKvXy7FQ",
      members: "4,000+",
      colour: "bg-indigo-500",
      cta: "Join Server",
      features: [
        "24/7 Active Chat",
        "Strategy Discussions",
        "Event Updates",
        "Help & Support",
      ],
    },
    {
      id: "youtube",
      name: "YouTube - Amazing",
      description:
        "Comprehensive guides, character analysis, and gameplay tutorials from Amazing.",
      icon: <Youtube />,
      url: "https://www.youtube.com/@AmazingGrandCross",
      subscribers: "50,000+",
      colour: "bg-red-500",
      cta: "Visit Channel",
      features: [
        "Character Guides",
        "Tier Lists",
        "Event Coverage",
        "Meta Analysis",
      ],
    },
    {
      id: "youtube2",
      name: "YouTube - Marilli",
      description:
        "In-depth gameplay mechanics, team building guides, and PvP strategies from Marilli.",
      icon: <Youtube />,
      url: "https://www.youtube.com/@Marilli",
      subscribers: "39,000+",
      colour: "bg-red-500",
      cta: "Visit Channel",
      features: [
        "PvP Content",
        "Team Building",
        "Gear Guides",
        "Raid Strategies",
      ],
    },
    {
      id: "youtube3",
      name: "YouTube - Sora",
      description:
        "Updated content, new character showcases, and breaking news from Sora.",
      icon: <Youtube />,
      url: "https://www.youtube.com/@Sora-GrandCross",
      subscribers: "54,000+",
      colour: "bg-red-500",
      cta: "Visit Channel",
      features: [
        "New Content",
        "Character Reviews",
        "News & Updates",
        "Live Streams",
      ],
    },
  ];

  const contributeAreas = [
    {
      icon: <BookOpen className="h-7 w-7 text-blue-400" />,
      iconBgClass: "bg-blue-500/15",
      title: "Guide Writing",
      description:
        "Create comprehensive guides for characters, game mechanics, or events to help other players.",
    },
    {
      icon: <Trophy className="h-7 w-7 text-emerald-400" />,
      iconBgClass: "bg-emerald-500/15",
      title: "Data Entry",
      description:
        "Help us keep character stats, skills, and equipment information up to date.",
    },
    {
      icon: <Shield className="h-7 w-7 text-purple-400" />,
      iconBgClass: "bg-purple-500/15",
      title: "Moderation",
      description:
        "Help maintain a positive and helpful community across our platforms.",
    },
    {
      icon: <Zap className="h-7 w-7 text-amber-400" />,
      iconBgClass: "bg-amber-500/15",
      title: "Code & Tech",
      description: "Contribute to our open-source tools and website on GitHub.",
    },
  ];

  const guidelines = [
    {
      icon: <HandHeart className="h-5 w-5 text-emerald-400" />,
      title: "Be Respectful",
      description:
        "Treat all community members with respect. Harassment, hate speech, and personal attacks are not tolerated. Remember that there are real people behind the usernames.",
    },
    {
      icon: <CheckCircle2 className="h-5 w-5 text-blue-400" />,
      title: "Quality Contributions",
      description:
        "Aim to provide accurate, helpful information. When contributing to the database or creating guides, verify your information and present it clearly.",
    },
    {
      icon: <MessageSquare className="h-5 w-5 text-purple-400" />,
      title: "Stay On Topic",
      description:
        "Keep discussions relevant to the game, database, or community. Each platform has dedicated channels or threads for different topics.",
    },
    {
      icon: <Ban className="h-5 w-5 text-red-400" />,
      title: "No Cheating or Exploits",
      description:
        "Discussions about cheating, hacking, or exploiting game mechanics are prohibited. We support fair play and the game's terms of service.",
    },
    {
      icon: <Lock className="h-5 w-5 text-amber-400" />,
      title: "Respect Privacy",
      description:
        "Do not share personal information about yourself or others. This includes contact information, real names (unless publicly shared by the person), or any identifying details.",
    },
    {
      icon: <Gavel className="h-5 w-5 text-muted-foreground" />,
      title: "Moderation",
      description:
        "Moderators have the final say in enforcing these guidelines. If you have concerns about moderation actions, please contact an administrator privately.",
    },
  ];

  function formatYoutubeDuration(duration: string): string {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return duration;
    const h = match[1] ? `${match[1]}:` : "";
    const m = match[2] ? match[2].padStart(h ? 2 : 1, "0") : "0";
    const s = match[3] ? match[3].padStart(2, "0") : "00";
    return `${h}${m}:${s}`;
  }

  const videos = await getYoutubeVideos();

  console.log("Fetched Videos", videos);
  return (
    <div className="min-h-screen bg-background">
      <BreadcrumbNav
        items={[{ label: "Home", href: "/" }, { label: "Community" }]}
      />
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/60 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto max-w-6xl px-4 py-20 relative z-10 text-center">
          <div className="inline-flex items-center justify-center  bg-primary/50 border border-primary/20 p-4 rounded-xl shrink-0 mb-6">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
            Community
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join our thriving community of players, contributors, and
            enthusiasts
          </p>
        </div>
      </section>

      {/* Community Resources */}
      <main className="container mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-14">
          {/* Community Platforms */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Join Our Community
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {communityPlatforms.map((platform) => (
                <PlatformCard
                  key={platform.id}
                  name={platform.name}
                  description={platform.description}
                  icon={platform.icon}
                  url={platform.url}
                  memberCount={platform.members}
                  accentColor={platform.colour}
                  subscribers={platform.subscribers}
                  cta={platform.cta}
                  features={platform.features}
                />
              ))}
            </div>
          </section>

          {/* YouTube Videos */}
          <section>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Latest YouTube Videos - Amazing
                </h2>
                <p className="text-muted-foreground mt-1">
                  Check out the latest videos from Amazing on his channel.
                </p>
              </div>
              <Button
                size="lg"
                className="rounded-[5px] transition-all duration-300 shrink-0"
                asChild
              >
                <Link
                  href="https://www.youtube.com/@AmazingGrandCross"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <YoutubeIcon className="mr-2 h-5 w-5" />
                  Visit Channel
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, i) => (
                <VideoCard
                  key={`${video.id}-${i}`}
                  id={video.id}
                  title={video.snippet.title}
                  description={video.snippet.description}
                  thumbnailUrl={video.snippet.thumbnails.high.url}
                  duration={video.contentDetails.duration}
                  viewCount={video.statistics.viewCount}
                  commentCount={video.statistics.commentCount}
                  publishedAt={video.snippet.publishedAt}
                  formatDate={formatDate}
                  formatDuration={formatYoutubeDuration}
                />
              ))}
            </div>
          </section>

          {/* How to Contribute */}
          <section className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              How To Contribute
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              There are many ways to help improve our website and community.
              Find the perfect fit for your skills and interests.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {contributeAreas.map((area) => (
                <FeatureCard
                  key={area.title}
                  icon={area.icon}
                  iconBgClass={area.iconBgClass}
                  title={area.title}
                  description={area.description}
                />
              ))}
            </div>
            <div className="mt-8">
              <Button
                size="lg"
                className="rounded-[5px] transition-all duration-300"
                asChild
              >
                <Link href="/contribute">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </section>

          {/* Become a Team Member */}
          <CtaBanner
            icon={<Heart className="h-6 w-6 text-white" />}
            title="Become a Team Member"
            description="Ready to take your contribution to the next level? Apply to join our team of moderators, administrators, and content creators."
            buttons={[
              {
                label: "Apply Now",
                href: "/contact",
                icon: <Award className="ml-2 h-5 w-5" />,
              },
            ]}
          />

          {/* Community Guidelines */}
          <SectionCard
            icon={<ShieldCheck className="h-5 w-5 text-white" />}
            title="Community Guidelines"
          >
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Our community is built on respect, collaboration, and a shared
              passion for the game. Please follow these guidelines to ensure a
              positive experience for everyone.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {guidelines.map((g) => (
                <GuidelineItem
                  key={g.title}
                  icon={g.icon}
                  title={g.title}
                  description={g.description}
                />
              ))}
            </div>
          </SectionCard>
        </div>
      </main>
    </div>
  );
}

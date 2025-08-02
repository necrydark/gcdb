import { getCharacterCount } from "@/data/character";
import { getRelicCount } from "@/data/relics";
import { ExternalLink, Shield, Sparkles, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MonthlyActiveUsers from "../components/analytics/mau";
import PageViews from "../components/analytics/page-views";
import AuthNavbar from "../components/auth/auth-nav";
import Footer from "../components/footer";
import CommandSearch from "../components/home/search-bar";
import Navbar from "../components/navbar";
import Pricing from "../components/pricing";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import db from "../lib/db";
import { getAllPosts } from "../lib/posts";
import { getRarityColour } from "../lib/rarity-colours";
import { currentUser } from "../utils/auth";

async function getCharactersByDate() {
  try {
    const res = await db.character.findMany({
      orderBy: {
        releaseDate: "desc",
      },
    });

    return res;
  } catch (err) {
    console.error(err);
  }
}

async function getRelicsByReleaseDate() {
  try {
    const res = await db.holyRelic.findMany({
      orderBy: {
        releaseDate: "desc",
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
}

export default async function HomePage() {
  const user = await currentUser();
  const charactersCount = await getCharacterCount();
  const relicCount = await getRelicCount();
  const releasedCharacters = await getCharactersByDate();
  const releasedRelics = await getRelicsByReleaseDate();
  const changelogs = getAllPosts();

  return (
    <div className="min-h-screen flex flex-col  bg-background transition-all duration-300">
      {user && <AuthNavbar />}
      {!user && <Navbar />}
      <section className="relative gradient-mesh pt-[8rem] py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background"></div>
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center mb-12">
            <div className="flex items-center mb-8 bg-background/90 glass-effect text-foreground rounded-2xl w-fit gap-3 mx-auto p-4 shadow-xl border border-border/50">
              <div className="p-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Sparkles className="h-4 w-4 text-white" />
              </div>
              <p className="font-medium">
                Looking for moderators, admins and helpers!
              </p>
              <Button
                    variant="default"
                    className="rounded-[5px] bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
                    size="sm"
                    asChild
              >
                <Link href={"/contact"}>Join Team</Link>
              </Button>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 dark:from-purple-400 dark:via-blue-400 dark:to-purple-300 bg-clip-text text-transparent leading-tight">
              GCWiki
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Your comprehensive resource for characters, holy relics, and game
              information
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <CommandSearch />
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button
  variant="default"
  className="rounded-[5px] bg-gradient-to-r from-purple-600 text-white to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-xl px-8 py-6 text-lg"
  asChild
  size="lg"
            >
              <Link href={"/characters"}>
                <Users className="mr-2 h-5 w-5" />
                Characters
              </Link>
            </Button>
            <Button
           variant="default"
           className="rounded-[5px] bg-gradient-to-r from-purple-600 text-white to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-xl px-8 py-6 text-lg"
           asChild
           size="lg"
            >
              <Link href={"/relics"}>
                <Shield className="mr-2 h-5 w-5" />
                Holy Relics
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-card via-card to-purple-50/50 dark:to-purple-900/10 border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[5px]">
              <CardContent className="pt-6">
                <div className="flex dark:text-white items-center gap-2">
                  <Users className="h-5 w-5 dark:text-white" />
                  <p className="text-sm font-medium">Latest Characters</p>
                </div>
                <div className="flex flex-wrap justify-evenly gap-6 mb-8">
                  {releasedCharacters?.map((char, idx) => (
                    <div
                      key={idx}
                      className="overflow-hidden mt-4 border-0 hover:scale-105 transition-all duration-300"
                    >
                      <Link href={`/characters/${char.slug}`}>
                        <div className="relative w-fit">
                          <Image
                            src={char.imageUrl || ""}
                            alt={`${char.name}'s Image`}
                            width={100}
                            height={100}
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge
                              className={`${getRarityColour(char.rarity)}`}
                            >
                              {char.rarity}
                            </Badge>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-card via-card to-purple-50/50 dark:to-purple-900/10 border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[5px]">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 dark:text-white" />
                  <p className="text-sm dark:text-white font-medium">
                    Latest Relics
                  </p>
                </div>
                <div className="flex flex-wrap justify-evenly gap-6 mb-8">
                  {releasedRelics?.map((relic, idx) => (
                    <div
                      key={idx}
                      className="overflow-hidden mt-4 border-0 hover:scale-105 transition-all duration-300"
                    >
                      <Link href={`/relics`}>
                        <div className="relative w-fit">
                          <Image
                            src={relic.imageUrl || ""}
                            alt={`${relic.name}'s Image`}
                            width={100}
                            height={100}
                            className="object-cover"
                          />
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 gradient-mesh">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <MonthlyActiveUsers />
            <PageViews />
            <Card className="bg-gradient-to-br from-green-500/10 via-card to-green-600/20 dark:from-green-900/20 dark:to-green-800/30 border-green-200/50 dark:border-green-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
              <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">Total Characters</p>
                </div>
                <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent  mt-2">
                  {charactersCount}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-500/10 via-card to-orange-600/20 dark:from-orange-900/20 dark:to-orange-800/30 border-orange-200/50 dark:border-orange-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
              <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">Total Relics</p>
                </div>
                <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent mt-2">
                  {relicCount}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest News */}

      {/* Latest Content Additions */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Latest Updates
            </h2>
            <p className="text-muted-foreground text-lg">Stay up to date with the latest changes and improvements</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {changelogs?.slice(0, 2).map((changelog, idx) => (
              <Card
             className="bg-gradient-to-br from-card via-card to-muted/20 border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 group"
                key={idx}
              >
                <CardHeader>
                  <CardTitle className="text-foreground">
                    {changelog.data.title}
                  </CardTitle>
                  <CardDescription >
                    {changelog.data.date}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button
                    className="w-full rounded-[5px] text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
                    asChild
                  >
                    <Link
                      className="no-underline"
                      href={`/changelog/${changelog.slug}`}
                    >
                      Read More
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community & Resources */}
      <section className="py-20 px-4 gradient-mesh">
        <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">

        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Community & Resources
            </h2>
            <p className="text-muted-foreground text-lg">Stay up to date with the latest changes and improvements</p>

        </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="flex flex-col bg-gradient-to-br from-card via-card to-yellow-50/30 dark:to-yellow-900/10 border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl dark:text-white text-black">Game Guides</CardTitle>
                </div>
                <CardDescription>
                  Helpful guides for beginners & advanced players.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow">
                {[
                  { title: "Beginner's Guide", desc: "Essential tips for new players" },
                  { title: "Character Building", desc: "How to build effective character teams" },
                  { title: "Holy Relic Guide", desc: "Best relics for each character type" },
                ].map((guide, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-muted/30 to-muted/50 hover:from-muted/50 hover:to-muted/70 transition-all duration-300"
                  >
                    <div className="p-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg">
                      <Star className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">{guide.title}</h4>
                      <p className="text-sm text-muted-foreground">{guide.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="mt-auto">
              <Button disabled variant="outline" className="w-full rounded-xl opacity-50 text-black dark:text-white bg-transparent">
                  View All Guides (Coming Soon)
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col bg-gradient-to-br from-card via-card to-red-50/30 dark:to-red-900/10 border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl shadow-lg">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-black dark:text-white">Tier Lists</CardTitle>
                </div>
                <CardDescription>Current rankings of characters and equipment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow">
                {[
                  { title: "PvP Tier List", desc: "Best characters for player vs player" },
                  { title: "PvE Tier List", desc: "Best characters for story and events" },
                  { title: "Holy Relic Rankings", desc: "Top relics by category" },
                ].map((tier, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-muted/30 to-muted/50 hover:from-muted/50 hover:to-muted/70 transition-all duration-300"
                  >
                    <div className="p-1 bg-gradient-to-r from-red-400 to-pink-400 rounded-lg">
                      <Star className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">{tier.title}</h4>
                      <p className="text-sm text-muted-foreground">{tier.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="mt-auto">
                <Button disabled variant="outline" className="w-full rounded-xl text-black dark:text-white opacity-50 bg-transparent">
                  View Tier Lists (Coming Soon)
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col bg-gradient-to-br from-card via-card to-green-50/30 dark:to-green-900/10 border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
                    <ExternalLink className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-black dark:text-white">Community</CardTitle>
                </div>
                <CardDescription>Join the conversation and get help</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow">
                {[
                  { title: "Discord Server", desc: "Chat with other players and get help" },
                  { title: "Reddit Community", desc: "Discussions, memes, and strategies" },
                  { title: "YouTube Channels", desc: "Video guides and gameplay" },
                ].map((community, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-muted/30 to-muted/50 hover:from-muted/50 hover:to-muted/70 transition-all duration-300"
                  >
                    <div className="p-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg">
                      <ExternalLink className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">{community.title}</h4>
                      <p className="text-sm text-muted-foreground">{community.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
                  asChild
                >
                  <Link href="/community">Join Community</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto max-w-6xl">
           <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Support GCWiki
            </h2>
            <p className="text-muted-foreground text-lg">Help us keep the wiki running and growing</p>
          </div>
          <Pricing />
        </div>
      </section>
      <Footer />
    </div>
  );
}

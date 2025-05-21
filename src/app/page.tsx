import Navbar from "../components/navbar";
import Footer from "../components/footer";
import AuthNavbar from "../components/auth/auth-nav";
import { auth } from "../auth";
import { getCharacterCount } from "@/data/character";
import { getRelicCount } from "@/data/relics";
import CommandSearch from "../components/home/search-bar";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { ExternalLink, Shield, Sparkles, Star, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { getUserCount } from "../actions/admin";
import db from "../lib/db";
import { resourceLimits } from "worker_threads";
import { Badge } from "../components/ui/badge";
import { Rarity } from "@prisma/client";
import Image from "next/image";
import { getRarityColour } from "../lib/rarity-colours";
import { currentUser } from "../utils/auth";
import Pricing from "../components/pricing";

async function getCharactersByDate() {
  try {
    const res = await db.character.findMany({
      orderBy: {
        releaseDate: "desc"
      }
    })

    return res;
  } catch (err) {
    console.error(err)
  }
}

async function getRelicsByReleaseDate() {
  try{
    const res = await db.holyRelic.findMany({
      orderBy: {
        releaseDate: "desc"
      },
    })
    return res;
  } catch (err) {
    console.error(err)
  }
}

export default async function HomePage() {
  const user = await currentUser();
  const userCount = await getUserCount();
  const charactersCount = await getCharacterCount();
  const relicCount = await getRelicCount();
  const releasedCharacters = await getCharactersByDate();
  const releasedRelics = await getRelicsByReleaseDate();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })
  }



  // const relics = await getRelicsByReleaseDate();
  // const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };
  // const hidden = { opacity: 0, y: -10 };
  return (
    <div
      className="min-h-screen flex flex-col  bg-background transition-all duration-300"
    >
      {user && <AuthNavbar />}
      {!user && <Navbar />}
      <section className="relative bg-gradient-to-b from-purple-400/20 to bg-purple-700/50 pt-[8rem] py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
          <div className="flex items-center mb-6 bg-purple-950 text-white rounded-[5px] w-fit gap-2 mx-auto p-4">
            <Sparkles className="h-4 w-4 mr-2 text-white" />
            <p className="font-medium">Looking for moderators, admins and helpers!</p>
            <Button variant={"purple"} className="rounded-[5px]" size={"sm"} asChild>
              <Link href={"/contact"}>
                Join Team
              </Link>
            </Button>
          </div>

          <h1 className="text-4xl md:text-5xl text-white font-bold mb-4">GCWiki</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Your comprehensive resource for characters, holy relics, and game information
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <CommandSearch />
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button variant={"purple"} className="rounded-[5px]" asChild size={"lg"}>
              <Link href={"/characters"}>
                <Users className="mr-2 h-5 w-5" />
                Characters
              </Link>
            </Button>
            <Button variant={"purple"} className="rounded-[5px]" asChild size={"lg"}>
              <Link href={"/relics"}>
                <Shield className="mr-2 h-5 w-5" />
                Holy Relics
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-purple-700/50">
      <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-purple-500 dark:bg-purple-900 rounded-lg border-0">
              <CardContent className="pt-6">
                <div className="flex text-white items-center gap-2">
                  <Users className="h-5 w-5 text-white" />
                  <p className="text-sm font-medium">Latest Characters</p>
                </div>
                <div className="flex flex-wrap justify-evenly gap-6 mb-8">
                {releasedCharacters?.map((char, idx) => (
                  <div key={idx} className="overflow-hidden mt-4 border-0">
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
                     <Badge className={`${getRarityColour(char.rarity)}`}>{char.rarity}</Badge>
                   </div>
             
                 </div>
                     </Link>
                  </div>
                ))}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-purple-500 dark:bg-purple-900 rounded-lg border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-white" />
                  <p className="text-sm text-white font-medium">Latest Relics</p>
                </div>
                <div className="flex flex-wrap justify-evenly gap-6 mb-8">
                {releasedRelics?.map((relic, idx) => (
                  <div key={idx} className="overflow-hidden mt-4 border-0">
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

      <section className="py-12 px-4 bg-purple-700/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="bg-purple-500 dark:bg-purple-900 rounded-lg border-0">
              <CardContent className="pt-6">
                <div className="flex text-white items-center gap-2">
                  <Users className="h-5 w-5 text-white" />
                  <p className="text-sm font-medium">Total Users</p>
                </div>
                <p className="text-3xl text-white font-bold mt-2">
                  {userCount}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-purple-500 dark:bg-purple-900 rounded-lg border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-white" />
                  <p className="text-sm text-white font-medium">Total Characters</p>
                </div>
                <p className="text-3xl text-white font-bold mt-2">
                  {charactersCount}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-purple-500 dark:bg-purple-900 rounded-lg border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-white" />
                  <p className="text-sm text-white font-medium">Total Relics</p>
                </div>
                <p className="text-3xl text-white font-bold mt-2">
                  {relicCount}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest News */}
      

      {/* Latest Content Additions */}

      {/* Community & Resources */}
      <section className="py-12 px-4 bg-purple-700/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-white">
            Community & Resources
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="flex flex-col bg-purple-500 dark:bg-purple-900 rounded-lg border-0">
              <CardHeader>
                <CardTitle className="text-white">Game Guides</CardTitle>
                <CardDescription className="text-gray-300">Helpful guides for beginners & advanced players.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-white">
                    <Star className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Beginner&apos;s Guide</h4>
                    <p className="text-sm text-gray-300">Essential tips for new players</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-white">
                    <Star className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Character Building</h4>
                    <p className="text-sm text-gray-300">How to build effective character teams</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-white">
                    <Star className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Holy Relic Guide</h4>
                    <p className="text-sm text-gray-300">Best relics for each character type</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button disabled className="w-full text-white hover:bg-transparent bg-purple-500 dark:bg-purple-800 opacity-50 rounded-[5px]" asChild>
                  {/* <Link href="/guides">View All Guides (Coming Soon)</Link> */}
                 <span> View All Guides (Coming Soon)</span>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col bg-purple-500 dark:bg-purple-900 rounded-lg border-0">
              <CardHeader>
                <CardTitle className="text-white">Tier Lists</CardTitle>
                <CardDescription className="text-gray-300">Current rankings of characters and equipment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-white">
                    <Star className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">PvP Tier List</h4>
                    <p className="text-sm text-gray-300">Best characters for player vs player</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-white">
                    <Star className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">PvE Tier List</h4>
                    <p className="text-sm text-gray-300">Best characters for story and events</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-white">
                    <Star className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Holy Relic Rankings</h4>
                    <p className="text-sm text-gray-300">Top relics by category</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button disabled className="w-full text-white hover:bg-transparent bg-purple-500 dark:bg-purple-800 opacity-50 rounded-[5px]" asChild>
                  {/* <Link href="/tier-lists">View Tier Lists (Coming Soon)</Link> */}
                  <span>View Tier Lists (Coming Soon)</span>
                </Button>
              </CardFooter>
            </Card>

            
            <Card className="flex flex-col bg-purple-500 dark:bg-purple-900 rounded-lg border-0">
              <CardHeader>
                <CardTitle className="text-white">Community</CardTitle>
                <CardDescription className="text-gray-300">Join the conversation and get help</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-white">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Discord Server</h4>
                    <p className="text-sm text-gray-300">Chat with other players and get help</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-white">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Reddit Community</h4>
                    <p className="text-sm text-gray-300">Discussions, memes, and strategies</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-white">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">YouTube Channels</h4>
                    <p className="text-sm text-gray-300">Video guides and gameplay</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button  className="w-full rounded-[5px] bg-purple-700 hover:opacity-75 dark:bg-purple-950 text-white" asChild>
                  <Link href="/community">Join Community</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 px-4 bg-purple-700/50">
      <div className="container mx-auto max-w-6xl">
      <h2 className="text-3xl font-bold mb-8 text-white">
            Pricing
          </h2>
          <Pricing />
      </div>
      </section>
      <Footer />
    </div>
  );
}

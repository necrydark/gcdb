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

export default async function HomePage() {
  const user = await auth();
  const userCount = await getUserCount();
  const charactersCount = await getCharacterCount();
  const relicCount = await getRelicCount();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
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

          <h1 className="text-4xl md:text-5xl font-bold mb-4">GCWiki</h1>
            <p className="text-lg text-gray-500 dark:text-gray-300 max-w-2xl mx-auto">
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
                <Users className="mr-2 h-5 w-5" />
                Holy Relics
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-purple-700/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="bg-purple-500 dark:bg-purple-900 rounded-lg border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <p className="text-sm font-medium">Total Users</p>
                </div>
                <p className="text-3xl font-bold mt-2">
                  {userCount}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-purple-500 dark:bg-purple-900 rounded-lg border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <p className="text-sm font-medium">Total Characters</p>
                </div>
                <p className="text-3xl font-bold mt-2">
                  {charactersCount}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-purple-500 dark:bg-purple-900 rounded-lg border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <p className="text-sm font-medium">Total Relics</p>
                </div>
                <p className="text-3xl font-bold mt-2">
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
          <h2 className="text-3xl font-bold mb-8">
            Community & Resources
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="flex flex-col dark:bg-purple-950 rounded-lg border-0">
              <CardHeader>
                <CardTitle>Game Guides</CardTitle>
                <CardDescription>Helpful guides for beginners & advanced players.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-primary">
                    <Star className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Beginner&apos;s Guide</h4>
                    <p className="text-sm text-muted-foreground">Essential tips for new players</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-primary">
                    <Star className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Character Building</h4>
                    <p className="text-sm text-muted-foreground">How to build effective character teams</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-primary">
                    <Star className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Holy Relic Guide</h4>
                    <p className="text-sm text-muted-foreground">Best relics for each character type</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button disabled className="w-full text-white bg-purple-500 dark:bg-purple-800 opacity-50 rounded-[5px]" asChild>
                  {/* <Link href="/guides">View All Guides (Coming Soon)</Link> */}
                 <span> View All Guides (Coming Soon)</span>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col dark:bg-purple-950 rounded-lg border-0">
              <CardHeader>
                <CardTitle>Tier Lists</CardTitle>
                <CardDescription>Current rankings of characters and equipment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-primary">
                    <Star className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">PvP Tier List</h4>
                    <p className="text-sm text-muted-foreground">Best characters for player vs player</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-primary">
                    <Star className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">PvE Tier List</h4>
                    <p className="text-sm text-muted-foreground">Best characters for story and events</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-primary">
                    <Star className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Holy Relic Rankings</h4>
                    <p className="text-sm text-muted-foreground">Top relics by category</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button disabled className="w-full text-white bg-purple-500 dark:bg-purple-800 opacity-50 rounded-[5px]" asChild>
                  {/* <Link href="/tier-lists">View Tier Lists (Coming Soon)</Link> */}
                  <span>View Tier Lists (Coming Soon)</span>
                </Button>
              </CardFooter>
            </Card>

            
            <Card className="flex flex-col dark:bg-purple-950 rounded-lg border-0">
              <CardHeader>
                <CardTitle>Community</CardTitle>
                <CardDescription>Join the conversation and get help</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 flex-grow">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-primary">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Discord Server</h4>
                    <p className="text-sm text-muted-foreground">Chat with other players and get help</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-primary">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">Reddit Community</h4>
                    <p className="text-sm text-muted-foreground">Discussions, memes, and strategies</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-primary">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">YouTube Channels</h4>
                    <p className="text-sm text-muted-foreground">Video guides and gameplay</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button variant="purple" className="w-full rounded-[5px]" asChild>
                  <Link href="/community">Join Community</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

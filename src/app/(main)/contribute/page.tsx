import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/src/components/ui/card";
import {
  ArrowRight,
  ChevronDown,
  Heart,
  Lightbulb,
  Star,
  Users
} from "lucide-react";
import Link from "next/link";



export default async function ContributePage() {
  const contributionAreas = [
    {
      id: "data-entry",
      name: "Data Entry",
      description: "Help us keep character stats, skills, and equipment information up to date.",
      difficulty: "Easy",
      icon: "📊",
    },
    {
      id: "guide-writing",
      name: "Guide Writing",
      description: "Create guides for characters, game mechanics, or events to help other players.",
      difficulty: "Medium",
      icon: "📝",
    },
    {
      id: "code-contribution",
      name: "Code Contribution",
      description: "Contribute to our open-source tools and website on GitHub.",
      difficulty: "Hard",
      icon: "💻",
    },
    {
      id: "community-moderation",
      name: "Community Moderation",
      description: "Help maintain a positive and helpful community across our platforms.",
      difficulty: "Medium",
      icon: "🛡️",
    },
    {
      id: "content-creation",
      name: "Content Creation",
      description: "Create videos, infographics, or other visual content for the community.",
      difficulty: "Medium",
      icon: "🎨",
    },
  ]

  return (
    <div className="pt-[7rem] container mx-auto px-6">
      <section className="flex flex-col">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl text-white font-bold mb-4">
            Community
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-300 max-w-2xl mx-auto">
            Join our thriving community of players, contributors, and
            enthusiasts
          </p>
        </div>
      </section>
 

      {/* How To Contribute */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mt-12 ">
            <div className="p-8 max-w-2xl text-center mx-auto">
              <h3 className="text-2xl font-bold mb-2 text-white">Contribute To The Community</h3>
              <p className="mb-6 text-gray-700 dark:text-gray-300">
              Help us build the most comprehensive game database. Your contributions make a difference for thousands of players worldwide.
              </p>
     
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contributionAreas.map((area) => (
                <Card key={area.id} className="overflow-hidden flex flex-col flex-1 basis-0 bg-purple-500 dark:bg-purple-900 rounded-[5px] border-0">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{area.icon}</span>
                      <CardTitle>{area.name}</CardTitle>
                    </div>
                      <CardDescription className="text-gray-700 dark:text-gray-300">Difficulty: {area.difficulty}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white">{area.description}</p>
                  </CardContent>
                  <CardFooter className="mt-auto">
                  <Button  size="lg" variant={"purple"} className="rounded-[5px] bg-purple-700 hover:bg-purple-700/50 w-full"
 asChild>
                    <Link href={`/contribute/${area.id}`}
                    >
                      Get Started <ChevronDown className="ml-2 h-4 w-4 rotate-[-90deg]" />
                    </Link>
                  </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>


      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Why Contribute?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="overflow-hidden flex flex-col flex-1 basis-0 bg-purple-500 dark:bg-purple-950 rounded-[5px] border-0">
              <CardHeader>
                <Star className="h-8 w-8 text-white mb-2" />
                <CardTitle>Build Your Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white">
                  Showcase your contributions on your profile. Great for demonstrating skills to potential employers or
                  collaborators.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden flex flex-col flex-1 basis-0 bg-purple-500 dark:bg-purple-950 rounded-[5px] border-0">
              <CardHeader>
                <Users className="h-8 w-8 text-white mb-2" />
                <CardTitle>Join a Community</CardTitle>
              </CardHeader>
              <CardContent>
              <p className="text-white">
                  Connect with like-minded individuals who share your passion for the game and helping others learn and
                  improve.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden flex flex-col flex-1 basis-0 bg-purple-500 dark:bg-purple-950 rounded-[5px] border-0">
              <CardHeader>
                <Lightbulb className="h-8 w-8 text-white mb-2" />
                <CardTitle>Learn & Grow</CardTitle>
              </CardHeader>
              <CardContent>
              <p className="text-white">
                  Develop new skills, learn from experienced contributors, and gain valuable experience in your chosen
                  area.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-8 text-center">
              <Heart className="h-12 w-12 text-white mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4 text-white">Ready to Make a Difference?</h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Join hundreds of contributors who are helping build the most comprehensive game database. Your expertise
                and passion can help thousands of players improve their gameplay.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant={"purple"} className="rounded-[5px]" asChild>
                  <Link href="/contribute/application">
                    Start Contributing <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-[5px] dark:border-purple-800 border-purple-600 dark:hover:bg-purple-900 hover:bg-purple-700" asChild>
                  <Link href="/contribute/guidelines">Read Guidelines</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

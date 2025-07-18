import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { ArrowLeft, Award, BookOpen, CheckCircle, Clock, Medal, PenTool, Settings, Shield, Star, TrendingUp, Users } from "lucide-react";
import Link from "next/link";


export default function GuideWritingPage() {
  return (
    <div className="pt-[3.75rem]">
      <div className="border-b bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href={"/"} className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/contribute" className="text-muted-foreground hover:text-foreground">
              Contribute
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">Guide Writing</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <Button variant={"ghost"} className="mb-4 hover:bg-purple-600 text-white hover:text-white" asChild> 
            <Link href={"/contribute"}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back To Contribute
            </Link>
          </Button>

          <div className="flex items-center gap-4 mb-4">
            <div className="bg-purple-700 border-purple-900 p-3 rounded-lg">
                <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Guide Writing</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={"secondary"} className="bg-purple-700 hover:bg-purple-700/50 text-white">Medium</Badge>
                <Badge variant={"outline"} className="border-purple-700 text-white">Whenever You Can</Badge>
                <Badge variant={"outline"} className="border-purple-700 text-white">Intermediate</Badge>
              </div>
            </div>
          </div>
          
          <p className="text-lg dark:text-gray-300 text-muted-foreground">Share your expertise by creating comprehensive guides that help players master characters, game mechanics, and strategies. Perfect for experienced players who love teaching and helping others improve.</p>
        </div>

        <Card className="mb-8 bg-purple-500 border-0 dark:bg-purple-900">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 w-5 h-5" />
              What You&apos;ll Do
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-white">Primary Tasks:</h3>
                <ul className="space-y-2 text-white">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Write character build guides</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Create beginner tutorials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Document game mechanics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Update existing guides</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Create event walkthroughs</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-white">Skills You&apos;ll Develop:</h3>
                <ul className="space-y-2 text-white">
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Technical writing skills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Content strategy and planning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">SEO and content optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Community engagement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Educational content creation</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>


        <Card className="mb-8 bg-purple-500 border-0 dark:bg-purple-900">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PenTool className="mr-2 h-5 w-5" />
              Types of Guides You Can Write
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border border-purple-950 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-white">Character Guides</h3>
                  <p className="text-sm text-gray-300 mb-2">
                    In-depth analysis of characters including builds, team compositions, and usage strategies.
                  </p>
                  <Badge variant="outline" className="text-xs border-purple-950 text-white">
                    High Demand
                  </Badge>
                </div>

                <div className="border border-purple-950 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-white">Beginner Tutorials</h3>
                  <p className="text-sm text-gray-300 mb-2">
                    Step-by-step guides for new players covering basic mechanics and progression.
                  </p>
                  <Badge variant="outline" className="text-xs border-purple-950 text-white">
                    Always Needed
                  </Badge>
                </div>

                <div className="border border-purple-950 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-white">Advanced Strategies</h3>
                  <p className="text-sm text-gray-300 mb-2">
                    Complex tactics for experienced players including PvP strategies and optimization.
                  </p>
                  <Badge variant="outline" className="text-xs border-purple-950 text-white">
                    Expert Level
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border border-purple-950 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-white">Event Guides</h3>
                  <p className="text-sm text-gray-300 mb-2">
                    Timely guides for limited events, including rewards and optimal strategies.
                  </p>
                  <Badge variant="outline" className="text-xs border-purple-950 text-white">
                    Time Sensitive 
                  </Badge>
                </div>

                <div className="border border-purple-950 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-white">Meta Analysis</h3>
                  <p className="text-sm text-gray-300 mb-2">
                    Current meta breakdowns, tier lists, and competitive analysis.
                  </p>
                  <Badge variant="outline" className="text-xs border-purple-950 text-white">
                    Regular Updates
                  </Badge>
                </div>

                <div className="border border-purple-950 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-white">Resource Guides</h3>
                  <p className="text-sm text-gray-300 mb-2">
                    Farming guides, resource management, and efficiency optimization.
                  </p>
                  <Badge variant="outline" className="text-xs border-purple-950 text-white">
                    Evergreen Content
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-purple-500 border-0 dark:bg-purple-900">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 w-5 h-5" />
              Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-white">Required:</h3>
                <ul className="space-y-2 text-white">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Strong game knowledge and experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Good writing and communication skills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Ability to explain complex concepts clearly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Commitment to accuracy and quality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Portfolio of 2-3 sample guides</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-white">Preferred:</h3>
                <ul className="space-y-2 text-white">
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Previous writing or content creation experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Understanding of SEO and content optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Experience with Markdown or similar formats</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Active community participation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Knowledge of current meta and trends</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Code Standards */}
        <Card className="mb-8 bg-purple-500 border-0 dark:bg-purple-900">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PenTool className="mr-2 w-5 h-5" />
              Writing Process
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple-950 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-white">Topic Selection & Approval</h3>
                  <p className="text-gray-300">
                    Choose a topic from our priority list or propose your own. Get approval from the editorial team
                    before starting.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-950 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-white">Research & Outline</h3>
                  <p className="text-gray-300">
                    Conduct thorough research, test strategies in-game, and create a detailed outline following our
                    guide template.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-950 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-white">Writing & Formatting</h3>
                  <p className="text-gray-300">
                    Write your guide using our content management system, including screenshots, tables, and proper
                    formatting.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-950 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-white">Review & Publication</h3>
                  <p className="text-gray-300">
                    Submit for editorial review, make revisions if needed, and celebrate when your guide goes live!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>


          {/* Recognition */}
        <Card className="mb-8 bg-purple-500 border-0 dark:bg-purple-900">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2 w-5 h-5" />
              Recognition & Rewards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 border rounded-lg">
                <Badge className="bg-purple-950 hover:bg-purple-950/50 text-white mb-2">Author Badge</Badge>
                <p className="text-sm text-white">Displayed on your profile and Discord</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Badge className="bg-purple-950 hover:bg-purple-950/50 text-white mb-2">Guide Analytics</Badge>
                <p className="text-sm text-white">Track views, likes, and engagement</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Badge className="bg-purple-950 hover:bg-purple-950/50 text-white mb-2">Community Recognition</Badge>
                <p className="text-sm text-white">Featured author spotlights</p>
              </div>
            </div>


            <div className="text-center">
              <h3 className="font-semibold mb-2 text-white">Performance Rewards</h3>
              <p className="text-gray-300 mb-4">
              Top-performing guides and authors receive special recognition and advancement opportunities.
              </p>
              <div className="flex justify-center gap-2 flex-wrap">
                <Badge variant="outline" className="border-purple-950 text-white">
                  <Star className="h-3 w-3 mr-1" />
                 Featured Guide
                </Badge>
                <Badge variant="outline" className="border-purple-950 text-white">
                  <Users className="h-3 w-3 mr-1" />
                  Community Featured
                </Badge>
                <Badge variant="outline" className="border-purple-950 text-white">
                  <Shield className="h-3 w-3 mr-1" />
                  Security Reviewer
                </Badge>
                <Badge variant="outline" className="border-purple-950 text-white">
                  <Medal className="h-3 w-3 mr-1" />
                  Guide Of The Month
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

    

        <Alert className=" bg-purple-500 border-0 dark:bg-purple-900 mb-8 text-white">
          <AlertDescription>
          <strong>Code of Conduct:</strong> All contributors must follow our code of conduct. We maintain a welcoming,
            inclusive environment for developers of all skill levels. Harassment, discrimination, or toxic behavior will
            not be tolerated.
          </AlertDescription>
        </Alert>

        <Card className="bg-purple-500 border-0 dark:bg-purple-900 mb-8 text-white">
          <CardContent className="pt-6 text-center">
            <BookOpen className="h-12 w-12 text-white mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Ready to Share Your Expertise?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join our team of guide writers and help educate the community. Your knowledge and writing skills can help thousands of players improve their gameplay and enjoy the game more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="purple"     className="rounded-[5px] bg-purple-700 hover:opacity-75 dark:bg-purple-950 text-white"
                  asChild >
                <Link href={"/"}>Apply as Guide Writer</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-[5px]  hover:text-white text-white dark:text-white dark:border-purple-800 hover:bg-purple-800/50 border-purple-600 dark:hover:bg-purple-950/50" asChild>
                <Link href="/contribute/guidelines">Writing Guidelines</Link>
              </Button>
            </div>
   
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

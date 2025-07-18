import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { ArrowLeft, Award, BookOpen, CheckCircle, Clock, Database, Rocket, Settings, Shield, Star, TrendingUp, Users } from "lucide-react";
import Link from "next/link";


export default function DataEntryPage() {
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
            <span className="font-medium">Data Entry</span>
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
              <h1 className="text-3xl font-bold text-white">Data Entry</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={"secondary"} className="bg-purple-700 hover:bg-purple-700/50 text-white">Easy</Badge>
                <Badge variant={"outline"} className="border-purple-700 text-white">Whenever You Can</Badge>
                <Badge variant={"outline"} className="border-purple-700 text-white">Beginner</Badge>
              </div>
            </div>
          </div>
          
          <p className="text-lg dark:text-gray-300 text-muted-foreground">Help us maintain the most accurate and up-to-date game database by contributing character stats, skills, and equipment information. Perfect for players who love attention to detail and want to help the community.</p>
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
                    <span className="text-sm">Update character statistics and abilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Add new character information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Verify existing data accuracy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Input holy relic details and stats</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Update event information</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-white">Skills You&apos;ll Develop:</h3>
                <ul className="space-y-2 text-white">
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Data accuracy and verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Database management basics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Quality assurance processes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Game mechanics expertise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Collaborative teamwork</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* Requirements */}
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
                    <span className="text-sm">Active game account (any level)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Basic understanding of game mechanics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Attention to detail</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Reliable internet connection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Commitment to accuracy</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-white">Preferred:</h3>
                <ul className="space-y-2 text-white">
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Experience with spreadsheets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Knowledge of multiple characters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Previous data entry experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Understanding of game meta</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Community involvement</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>


          {/* Recognition */}
        <Card className="mb-8 bg-purple-500 border-0 dark:bg-purple-900">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2 w-5 h-5" />
              Recognition & Career Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 rounded-lg">
                <Badge className="bg-purple-950 hover:bg-purple-950/50 text-white mb-2">Developer Badge</Badge>
                <p className="text-sm text-white">Displayed on your GitHub and profile</p>
              </div>
              <div className="text-center p-4  rounded-lg">
                <Badge className="bg-purple-950 hover:bg-purple-950/50 text-white mb-2">Contribution Stats</Badge>
                <p className="text-sm text-white">Track your impact and contributions</p>
              </div>
              <div className="text-center p-4  rounded-lg">
                <Badge className="bg-purple-950 hover:bg-purple-950/50 text-white mb-2">Open Source Credit</Badge>
                <p className="text-sm text-white">Build your open source portfolio</p>
              </div>
            </div>


            <div className="text-center">
              <h3 className="font-semibold mb-2 text-white">Advancement Opportunities</h3>
              <p className="text-gray-300 mb-4">
                Outstanding contributors may be invited to join our core development team with additional
                responsibilities and recognition.
              </p>
              <div className="flex justify-center gap-2 flex-wrap">
                <Badge variant="outline" className="border-purple-950 text-white">
                  <Star className="h-3 w-3 mr-1" />
                  Core Maintainer
                </Badge>
                <Badge variant="outline" className="border-purple-950 text-white">
                  <Users className="h-3 w-3 mr-1" />
                  Technical Lead
                </Badge>
                <Badge variant="outline" className="border-purple-950 text-white">
                  <Shield className="h-3 w-3 mr-1" />
                  Security Reviewer
                </Badge>
                <Badge variant="outline" className="border-purple-950 text-white">
                  <Rocket className="h-3 w-3 mr-1" />
                  DevOps Engineer
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

             {/* Process */}
             <Card className="mb-8 bg-purple-500 border-0 dark:bg-purple-900">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-white">
              <div className="flex items-start gap-4">
                <div className="bg-purple-950 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold">Application & Training</h3>
                  <p className="text-gray-300">
                    Submit your application and complete a brief training session to learn our data entry standards and
                    tools.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-950 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold">Get Access to Tools</h3>
                  <p className="text-gray-300">
                    Receive access to our contributor dashboard, data entry forms, and verification tools.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-950 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold">Start with Simple Tasks</h3>
                  <p className="text-gray-300">
                    Begin with basic data verification tasks and gradually move to more complex data entry as you gain
                    experience.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-950 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div>
                  <h3 className="font-semibold">Review & Approval</h3>
                  <p className="text-gray-300">
                    Your contributions are reviewed by experienced team members before being published to ensure
                    accuracy.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tools & Resources */}
        <Card className="mb-8 bg-purple-500 border-0 dark:bg-purple-900">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Tools & Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-white">You&apos;ll Have Access To:</h3>
                <ul className="space-y-2 text-white">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Contributor dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Data entry forms and templates
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Character stat calculators
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Image upload tools
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Quality assurance checklists
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-white">Support Available:</h3>
                <ul className="space-y-2 text-white">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Dedicated Discord channel
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Mentor assignment
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Video tutorials
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Weekly Q&A sessions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Documentation and guides
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-purple-500 border-0 dark:bg-purple-900">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-5 w-5" />
              Recognition & Rewards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Badge variant={"secondary"} className="bg-purple-900 hover:bg-purple-900/50 mb-2 text-white">Contributor Badge</Badge>
                <p className="text-sm text-white">Displayed on your profile</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Badge variant={"secondary"} className="bg-purple-900 hover:bg-purple-900/50 mb-2 text-white">Early Access</Badge>
                <p className="text-sm text-white">New features before public release</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Badge variant={"secondary"} className="bg-purple-900 hover:bg-purple-900/50 mb-2 text-white">Credits</Badge>
                <p className="text-sm text-white">Recognition in database credits</p>
              </div>
            </div>

            <div className="text-center mt-8">
              <h3 className="font-semibold mb-2 text-white">Advancement Opportunities</h3>
              <p className="text-white mb-4">
                Top contributors may be invited to join our core team as Data Moderators or Team Leaders.
              </p>
              <div className="flex justify-center gap-2">
                <Badge variant={"outline"} className="border-purple-600 text-white">Data Moderator</Badge>
                <Badge variant={"outline"} className="border-purple-600 text-white">Team Leader</Badge>
                <Badge variant={"outline"} className="border-purple-600 text-white">Quality Assurance</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Alert className=" bg-purple-500 border-0 dark:bg-purple-900  mb-8 text-white">
          <AlertDescription>
          <strong>Code of Conduct:</strong> All contributors must follow our code of conduct. We maintain a welcoming,
            inclusive environment for developers of all skill levels. Harassment, discrimination, or toxic behavior will
            not be tolerated.
          </AlertDescription>
        </Alert>

        <Card className="bg-purple-500 border-0 dark:bg-purple-900 mb-8  text-white">
          <CardContent className="pt-6 text-center">
            <Users className="h-12 w-12 text-white mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Ready to Start Contributing?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join our team of data contributors and help build the most comprehensive game database. Your attention to
            detail will help thousands of players make better decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="purple" className="dark:hover:bg-purple-950 hover:bg-purple-800/50 transition-all duration-300 rounded-[5px]" asChild>
                <Link href={"/"}>Apply Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-[5px]  hover:text-white text-white dark:text-white dark:border-purple-800 hover:bg-purple-800/50 border-purple-600 dark:hover:bg-purple-950/50" asChild>
                <Link href="/contribute/guidelines">Read Guidelines</Link>
              </Button>
            </div>
   
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import {
  ArrowRight,
  Award,
  BookOpen,
  Camera,
  Edit,
  ExternalLink,
  Eye,
  Headphones,
  Instagram,
  Lightbulb,
  Mic,
  Palette,
  Play,
  Share2,
  Star,
  Target,
  Twitch,
  Twitter,
  Users,
  Video,
  Youtube,
  Zap
} from "lucide-react"
import Link from "next/link"

export default function ContentCreationPage() {
  return (
    <div className="pt-[3.75rem]">
      {/* Hero Section */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/contribute" className="text-muted-foreground hover:text-foreground">
              Contribute
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">Content Creation</span>
          </nav>
        </div>
      </div>
      <div className=" text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-purple-700 border-purple-900 p-4 rounded-full">
                <Video className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Content Creation</h1>
            <p className="text-xl md:text-2xl mb-8 text-white">
              Create engaging videos, streams, and tutorials to help the community grow
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-purple-700 hover:bg-purple-700/50 text-white">
                <Video className="h-4 w-4 mr-2" />
                Video Production
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-purple-700 hover:bg-purple-700/50 text-white" >
                <Camera className="h-4 w-4 mr-2" />
                Live Streaming
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-purple-700 hover:bg-purple-700/50 text-white">
                <BookOpen className="h-4 w-4 mr-2" />
                Tutorial Creation
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Overview Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className=" shadow-lg bg-purple-500 border-0 dark:bg-purple-900">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl mb-4">What is Content Creation?</CardTitle>
              <CardDescription className="text-lg text-gray-300">
                Content creators produce educational, entertaining, and engaging material that helps community members
                learn, improve their skills, and stay connected with the latest developments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Video className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">Video Tutorials</h3>
                  <p className="text-sm text-gray-300">Create step-by-step guides and educational content</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Camera className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">Live Streaming</h3>
                  <p className="text-sm text-gray-300">Host live sessions, Q&As, and interactive content</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Share2 className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">Social Content</h3>
                  <p className="text-sm text-gray-300">Share updates, tips, and community highlights</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Types & Process */}
        <div className="max-w-6xl mx-auto mb-16">
          <Tabs defaultValue="types" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="types">Content Types</TabsTrigger>
              <TabsTrigger value="tools">Tools & Resources</TabsTrigger>
              <TabsTrigger value="distribution">Distribution</TabsTrigger>
            </TabsList>

            <TabsContent value="types" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-purple-500 border-0 dark:bg-purple-900">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-red-600" />
                      Video Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Play className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-white">Tutorial Videos</p>
                        <p className="text-sm text-gray-300">Step-by-step guides for game mechanics and strategies</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Eye className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-white">Gameplay Reviews</p>
                        <p className="text-sm text-gray-300">
                          Analysis of builds, strategies, and character performances
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-white">Tips & Tricks</p>
                        <p className="text-sm text-gray-300">Quick tips and advanced techniques</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-white">Character Showcases</p>
                        <p className="text-sm text-gray-300">Detailed character builds and optimization guides</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-500 border-0 dark:bg-purple-900">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="h-5 w-5 text-purple-600" />
                      Live Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-white">Community Streams</p>
                        <p className="text-sm text-gray-300">Interactive gameplay sessions with community</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mic className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-white">Q&A Sessions</p>
                        <p className="text-sm text-gray-300">Answer community questions and provide guidance</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Target className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-white">Challenge Runs</p>
                        <p className="text-sm text-gray-300">Attempt difficult challenges with community input</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <BookOpen className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-white">Educational Workshops</p>
                        <p className="text-sm text-gray-300">In-depth teaching sessions on complex topics</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>


            <TabsContent value="tools" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-purple-500 border-0 dark:bg-purple-900">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Edit className="h-5 w-5 text-blue-600" />
                      Production Tools
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-purple-800 rounded-lg">
                      <Video className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium text-white">OBS Studio Pro License</p>
                        <p className="text-sm text-gray-300">Professional streaming and recording</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-800 rounded-lg">
                      <Edit className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-white">Adobe Creative Suite</p>
                        <p className="text-sm text-gray-300">Premiere Pro, After Effects, Photoshop</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-800 rounded-lg">
                      <Mic className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-white">Audio Enhancement Tools</p>
                        <p className="text-sm text-gray-300">Noise reduction and audio optimization</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-800 rounded-lg">
                      <Palette className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="font-medium text-white">Graphics & Assets Library</p>
                        <p className="text-sm text-gray-300">Branded templates and visual assets</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-500 border-0 dark:bg-purple-900">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Headphones className="h-5 w-5 text-green-600" />
                      Support & Training
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-purple-800 rounded-lg">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-white">Content Creation Masterclass</p>
                        <p className="text-sm text-gray-300">Comprehensive video production training</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-800 rounded-lg">
                      <Users className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-white">Creator Mentorship Program</p>
                        <p className="text-sm text-gray-300">One-on-one guidance from experienced creators</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-800 rounded-lg">
                      <Share2 className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-white">Collaboration Network</p>
                        <p className="text-sm text-gray-300">Connect with other creators for joint projects</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-800 rounded-lg">
                      <Zap className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-white">Technical Support</p>
                        <p className="text-sm text-gray-300">24/7 help with tools and technical issues</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="distribution" className="mt-8">
              <div className="grid md:grid-cols-1 gap-6">
                <Card className="bg-purple-500 border-0 dark:bg-purple-900">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Share2 className="h-5 w-5 text-blue-600" />
                      Platform Strategy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Youtube className="h-6 w-6 text-red-600" />
                      <div className="flex-1">
                        <p className="font-medium text-white">YouTube</p>
                        <p className="text-sm text-gray-300">Long-form tutorials and guides</p>
                      </div>
                      <Badge variant="outline" className="text-white">Primary</Badge>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Twitch className="h-6 w-6 text-purple-300" />
                      <div className="flex-1">
                        <p className="font-medium text-white">Twitch</p>
                        <p className="text-sm text-gray-300">Live streaming and community interaction</p>
                      </div>
                      <Badge variant="outline" className="text-white">Live</Badge>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Instagram className="h-6 w-6 text-pink-600" />
                      <div className="flex-1">
                        <p className="font-medium text-white">Instagram</p>
                        <p className="text-sm text-gray-300">Short clips and community highlights</p>
                      </div>
                      <Badge variant="outline" className="text-white">Social</Badge>
                    </div>
                    <div className="flex items-center gap-3 p-3 border rounded-lg">
                      <Twitter className="h-6 w-6 text-blue-500" />
                      <div className="flex-1">
                        <p className="font-medium text-white">Twitter/X</p>
                        <p className="text-sm text-gray-300">Quick tips and community updates</p>
                      </div>
                      <Badge variant="outline" className="text-white">Updates</Badge>
                    </div>
                  </CardContent>
                </Card>

             
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Requirements */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card  className="bg-purple-500 border-0 dark:bg-purple-900 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-4">Creator Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-xl text-white">Anyone can become a creator!</p>
            </CardContent>
          </Card>
        </div>

        {/* Creator Tiers & Benefits */}
        <div className="max-w-6xl mx-auto mb-16">
          <Card className="bg-purple-500 border-0 dark:bg-purple-900 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-4">Creator Program Tiers</CardTitle>
              <CardDescription>Advance through our creator program and unlock exclusive benefits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Video className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">Emerging Creator</h3>
                  <p className="text-sm text-gray-300 mb-3">New creators building their audience</p>
                  <Badge variant="outline" className="text-white">0-1K subscribers</Badge>
                  <ul className="text-xs text-left mt-4 space-y-1 text-white">
                    <li>• Emerging Creator Badge</li>
                    <li>• Emerging Creator Achievement</li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Star className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">Rising Creator</h3>
                  <p className="text-sm text-gray-300 mb-3">Growing creators with engaged audiences</p>
                  <Badge variant="outline" className="text-white">1K-10K subscribers</Badge>
                  <ul className="text-xs text-left mt-4 text-white space-y-1">
                    <li>• Rising Creator Achievement</li>
                    <li>• Rising Creator Badge</li>

                  </ul>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white">Partner Creator</h3>
                  <p className="text-sm text-gray-300 mb-3">Established creators and community leaders</p>
                  <Badge variant="outline" className="text-white">10K+ subscribers</Badge>
                  <ul className="text-xs text-left mt-4 text-white space-y-1">
                  <li>• Partner Creator Badge</li>
                  <li>• Partner Creator Achievement</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-purple-500 border-0 dark:bg-purple-900 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4 text-white">Ready to Create Amazing Content?</h2>
              <p className="text-lg text-gray-300 mb-8">
                Join our creator program and help educate, entertain, and inspire the community
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="purple" className="dark:hover:bg-purple-950 hover:bg-purple-800/50 transition-all duration-300 rounded-[5px]" asChild>
                <Link href="/contribute">
                Apply to Create
                <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-[5px]  hover:text-white text-white dark:text-white dark:border-purple-800 hover:bg-purple-800/50 border-purple-900 dark:hover:bg-purple-950/50" asChild>
                <Link href="/contribute/guidelines">
                View Creator Guidelines
                <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

              <p className="text-sm text-gray-300 mt-4">
                Creator applications are reviewed bi-weekly. Portfolio review takes 3-5 business days.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { AlertCircle, ArrowLeft, Award, Bug, CheckCircle, Code, Database, GitBranch, Plus, Rocket, Settings, Shield, Star, Terminal, Users, Zap } from "lucide-react";
import Link from "next/link";

const stack = [
  {
    name: "Frontend",
    icon: <Code className="h-4 w-4 mr-2 text-blue-500" />,
    skills: [
      {
        name: "React",
      },
      {
        name: "Next.js"
      },
      {
        name: "TypeScript"
      },
      {
        name: "Tailwind CSS"
      },
      {
        name: "shadcn/ui"
      }
    ]
  },
  {
    name: "Backend",
    icon: <Database className="h-4 w-4 mr-2 text-blue-500" />,
    skills: [
      {
        name: "Node.js",
      },
      {
        name: "PostgreSQL"
      },
      {
        name: "Prisma"
      },
      {
        name: "tRPC (Changing)"
      },
      {
        name: "NextAuth.js"
      },
      {
        name: "Stripe"
      }
    ]
  },
  {
    name: "Tools",
    icon: <Settings className="h-4 w-4 mr-2 text-blue-500" />,
    skills: [
      {
        name: "Git",
      },
      {
        name: "GitHub"
      },
      {
        name: "Vercel"
      },
      {
        name: "Docker (Adding)"
      },
      {
        name: "Jest (Adding)"
      }
    ]
  },
  
]

const contribution = [
  {
    name: "Bug Fixes",
    difficulty: "Good First Issue",
    icon: <Bug className="h-5 w-5 text-red-500" />,
    description: "Fix reported bug and issues in the codebase. Great way to get familiar with the project.",
    tag: [
      {
        name: "Frontend"
      }, 
      {
        name: "Backend"
      }
    ]
  },
  {
    name: "New Features",
    difficulty: "Medium",
    icon: <Plus className="h-5 w-5 text-green-500" />,
    description: "Implement new functionality and features requested by the community.",
    tag: [
      {
        name: "Full Stack"
      }, 
      {
        name: "UI/UX"
      }
    ]
  },
  {
    name: "Performance",
    difficulty: "Advanced",
    icon: <Zap className="h-5 w-5 text-red-500" />,
    description: "Optimize application performance, reduce load times and improve user experience.",
    tag: [
      {
        name: "Optimization"
      }, 
      {
        name: "Database"
      }
    ]
  },
  {
    name: "Security",
    difficulty: "Critical",
    icon: <Shield className="h-5 w-5 text-red-500" />,
    description: "Identify and fix security vulnerabilities, implement security best practices.",
    tag: [
      {
        name: "Security"
      }, 
      {
        name: "Authentication"
      }
    ]
  },
  
]

export default function CodeContributionPage() {
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
            <span className="font-medium">Code Contribution</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <Button variant={"ghost"} className="mb-4 hover:bg-purple-600 hover:text-white" asChild> 
            <Link href={"/contribute"}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back To Contribute
            </Link>
          </Button>

          <div className="flex items-center gap-4 mb-4">
            <div className="bg-purple-500 p-3 rounded-lg">
                <Code className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Code Contribution</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={"secondary"} className="bg-purple-600 hover:bg-purple-600/50 text-white">Hard</Badge>
                <Badge variant={"outline"} className="border-purple-600">Whenever You Can</Badge>
                <Badge variant={"outline"} className="border-purple-600">Advanced</Badge>
              </div>
            </div>
          </div>
          
          <p className="text-lg dark:text-gray-300 text-muted-foreground">Help build and improve our open-source tools, website and infrastructure. Perfect for developers who want to contribute their technical skills to create better tools for the community.</p>
        </div>

        <Card className="mb-8 bg-purple-700 border-purple-900">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Terminal className="mr-2 w-5 h-5" />
              Our Tech Stack
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stack.map((stack, idx) => (
                <div key={idx} className="border rounded-md text-white border-purple-900 p-4">
                         <h3 className="font-semibold mb-2 flex items-center">
                    {stack.icon}
                    {stack.name}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {stack.skills.map((tech) => (
                      <Badge key={tech.name} className="border-purple-900 text-white" variant={"outline"}>
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>


        {/* Type Of Contribution */}
        <Card className="mb-8 bg-purple-700 border-purple-900">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Terminal className="mr-2 w-5 h-5" />
              Types Of Contribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contribution.map((type, idx) => (
              <div key={idx} className="space-y-4">
                <div className="border rounded-md text-white border-purple-900 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {type.icon}
                  <h3 className="font-semibold ">
                    {type.name}
                  </h3>
                  <Badge variant={"outline"} className="border-purple-900 text-white text-xs">{type.difficulty}</Badge>
                  </div>      
                  <p className="text-gray-300 text-sm mb-2">{type.description}</p>            
                  <div className="flex flex-wrap gap-1">
                   {type.tag.map((tag) => (
                    <Badge key={tag.name}  className="bg-purple-900 hover:bg-purple-900/50 text-white">{tag.name}</Badge>
                   ))}
                  </div>
                </div>
              </div>
              ))}

            </div>
          </CardContent>
        </Card>

        {/* Development Workflow */}
        <Card className="mb-8 bg-purple-700 border-purple-900">
          <CardHeader>
            <CardTitle className="flex items-center">
              <GitBranch className="mr-2 w-5 h-5" />
              Development Workflow
            </CardTitle>
          </CardHeader>
          <CardContent>
              <Tabs defaultValue="setup" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="setup">Setup</TabsTrigger>
                    <TabsTrigger value="development">Development</TabsTrigger>
                    {/* <TabsTrigger value="setup">Testing</TabsTrigger> */}
                    <TabsTrigger value="submission">Submission</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="setup" className="mt-6 text-white">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Getting Started</h3>
                      <div className="bg-purple-800/50 rounded-lg p-4">
                        <pre className="text-sm">
                          <code>{`# Clone the repository
git clone https://github.com/necrydark/gcdb.git
cd holy-relics

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run the development server
npm run dev`}</code>
                        </pre>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Prerequisites:</h4>
                        <ul className="text-sm space-y-1 ml-4">
                            <li>Node.js 18+ and npm</li>
                            <li>PostgreSQL database (local or cloud)</li>
                            <li>Git configured with your GitHub account</li>
                            <li>IDE (VSCode Recommended)</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="development" className="mt-6">
                  <div className="space-y-4">
                  <h3 className="font-semibold text-white">Development Process</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-900/50 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Choose an Issue</h4>
                        <p className="text-sm text-gray-300">
                          Browse our GitHub issues and pick one that matches your skill level. Look for &quot;good first
                          issue&quot; labels if you&apos;re new.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-purple-900/50 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Create a Branch</h4>
                        <p className="text-sm text-gray-300">
                          Create a feature branch from main with a descriptive name like &quot;fix/login-bug&quot; or
                          &quot;feature/user-dashboard&quot;.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-purple-900/50 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Implement Changes</h4>
                        <p className="text-sm text-gray-300">
                          Write your code following our style guide and best practices. Make small, focused commits with
                          clear messages.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-purple-900/50 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                        4
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Update Documentation</h4>
                        <p className="text-sm text-gray-300">
                          Update relevant documentation, comments, and README files as needed for your changes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                  </TabsContent>
                  <TabsContent value="submission" className="mt-6 text-white">
                <div className="space-y-4">
                  <h3 className="font-semibold">Submitting Your Contribution</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Pull Request Template:</h4>
                      <div className="bg-purple-800/50 rounded-lg p-4 text-sm">
                        <div className="space-y-2">
                          <p>
                            <strong>Description:</strong> Brief description of changes
                          </p>
                          <p>
                            <strong>Type of Change:</strong> Bug fix / New feature / Performance / Documentation
                          </p>
                          <p>
                            <strong>Testing:</strong> How you tested your changes
                          </p>
                          <p>
                            <strong>Screenshots:</strong> If applicable, add screenshots
                          </p>
                          <p>
                            <strong>Checklist:</strong>
                          </p>
                          <ul className="ml-4 space-y-1">
                            <li>□ Tests pass locally</li>
                            <li>□ Code follows style guidelines</li>
                            <li>□ Documentation updated</li>
                            <li>□ No breaking changes</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Review Process:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Automated checks run on your PR</li>
                        <li>• Code review by maintainers</li>
                        <li>• Address feedback and make changes</li>
                        <li>• Final approval and merge</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              </Tabs>
          </CardContent>
        </Card>

        {/* Code Standards */}
        <Card className="mb-8 bg-purple-700 border-purple-900">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 w-5 h-5" />
              Code Standard & Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-white">Code Quality:</h3>
                <ul className="space-y-2 text-white">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Use TypeScript for type safety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Follow ESLint and Prettier configurations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Write self-documenting code with clear names</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Keep functions small and focused</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Use consistent error handling patterns</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-white">Performance:</h3>
                <ul className="space-y-2 text-white">
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Optimize database queries and indexes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Use React best practices (memo, useMemo, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Implement proper caching strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Optimize images and assets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">Monitor and measure performance impacts</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>


          {/* Recognition */}
        <Card className="mb-8 bg-purple-700 border-purple-900">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2 w-5 h-5" />
              Recognition & Career Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 border rounded-lg">
                <Badge className="bg-purple-900 hover:bg-purple-900/50 text-white mb-2">Developer Badge</Badge>
                <p className="text-sm text-white">Displayed on your GitHub and profile</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Badge className="bg-purple-900 hover:bg-purple-900/50 text-white mb-2">Contribution Stats</Badge>
                <p className="text-sm text-white">Track your impact and contributions</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Badge className="bg-purple-900 hover:bg-purple-900/50 text-white mb-2">Open Source Credit</Badge>
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
                <Badge variant="outline" className="border-purple-900 text-white">
                  <Star className="h-3 w-3 mr-1" />
                  Core Maintainer
                </Badge>
                <Badge variant="outline" className="border-purple-900 text-white">
                  <Users className="h-3 w-3 mr-1" />
                  Technical Lead
                </Badge>
                <Badge variant="outline" className="border-purple-900 text-white">
                  <Shield className="h-3 w-3 mr-1" />
                  Security Reviewer
                </Badge>
                <Badge variant="outline" className="border-purple-900 text-white">
                  <Rocket className="h-3 w-3 mr-1" />
                  DevOps Engineer
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Alert className=" bg-purple-700 border-purple-900 mb-8 text-white">
          <AlertCircle className="h-4 w-4 text-white"/>
          <AlertDescription>
          <strong>Code of Conduct:</strong> All contributors must follow our code of conduct. We maintain a welcoming,
            inclusive environment for developers of all skill levels. Harassment, discrimination, or toxic behavior will
            not be tolerated.
          </AlertDescription>
        </Alert>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <CardContent className="pt-6 text-center">
            <Code className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Ready to Start Coding?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join our development team and help build the tools that thousands of gamers rely on. Your code can make a
              real difference in the gaming community while building your open source portfolio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="purple" className="dark:hover:bg-purple-950 hover:bg-purple-700 transition-all duration-300 rounded-[5px]" asChild>
                <Link href="https://github.com/necrydark/gcdb">View on GitHub</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-[5px] text-black hover:text-white dark:text-white dark:border-purple-800 border-purple-600 dark:hover:bg-purple-900 hover:bg-purple-700" asChild>
                <Link href="/contribute/guidelines">Development Guidelines</Link>
              </Button>
            </div>
   
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

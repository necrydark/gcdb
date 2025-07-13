"use client"

import { Alert, AlertDescription } from "@/src/components/ui/alert"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Separator } from "@/src/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Code,
  FileText,
  Palette,
  Shield,
  Star,
  Target,
  Users
} from "lucide-react"
import Link from "next/link"

export default function ContributeGuidelinesPage() {
  return (
    <div className="pt-[3.75rem]">
      {/* Breadcrumb Navigation */}
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
            <span className="font-medium">Guidelines</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
        <Button variant={"ghost"} className="mb-4 hover:bg-purple-600 text-white hover:text-white" asChild> 
            <Link href={"/contribute"}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back To Contribute
            </Link>
          </Button>

          <div className="flex items-center gap-4 mb-4">
            <div className="bg-purple-500 p-3 rounded-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Contribution Guidelines</h1>
              <p className="text-muted-foreground">Standards and best practices for all contributors</p>
            </div>
          </div>

          <p className="text-lg text-muted-foreground">
            These guidelines ensure quality, consistency, and a positive experience for all contributors and users of
            our database. Please read them carefully before starting your contribution journey.
          </p>
        </div>

        {/* Quick Overview */}
        <Alert className="mb-8 bg-purple-700 border-purple-900 text-white">
        <Star className="h-4 w-4" />
          <AlertDescription>
            <strong>New to contributing?</strong> Start with our{" "}
            <Link href="/contribute" className="text-white hover:underline">
              contribution overview
            </Link>{" "}
            to understand the different ways you can help, then return here for detailed guidelines.
          </AlertDescription>
        </Alert>

        {/* Guidelines by Category */}
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="data">Data Entry</TabsTrigger>
            <TabsTrigger value="guides">Guide Writing</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          {/* General Guidelines */}
          <TabsContent value="general">
            <Card className="bg-purple-700 border-purple-900 text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  General Guidelines
                </CardTitle>
                <CardDescription className="text-gray-300">Core principles that apply to all types of contributions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Quality Standards
                  </h3>
                  <ul className="space-y-2 ml-6">
                    <li>• All information must be accurate and verifiable in-game</li>
                    <li>• Double-check your work before submitting</li>
                    <li>• Use official sources when possible</li>
                    <li>• Test strategies and builds personally when applicable</li>
                    <li>• Keep content up-to-date with the latest game version</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Users className="mr-2 h-4 w-4 text-blue-500" />
                    Community Standards
                  </h3>
                  <ul className="space-y-2 ml-6">
                    <li>• Be respectful and professional in all interactions</li>
                    <li>• Give constructive feedback when reviewing others&apos; work</li>
                    <li>• Credit other contributors when building on their work</li>
                    <li>• Help newcomers learn our processes and standards</li>
                    <li>• Report issues or concerns to moderators promptly</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Shield className="mr-2 h-4 w-4 text-orange-500" />
                    Prohibited Content
                  </h3>
                  <ul className="space-y-2 ml-6">
                    <li>• Cheating methods, exploits, or hacks</li>
                    <li>• Copyrighted content without permission</li>
                    <li>• Misleading or false information</li>
                    <li>• Personal attacks or harassment</li>
                    <li>• Spam or promotional content</li>
                    <li>• Content that violates game terms of service</li>
                  </ul>
                </div>

                <Alert  className="bg-purple-800 text-white border-purple-900">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <AlertDescription>
                    Violations of these guidelines may result in warnings, temporary suspension, or permanent removal
                    from the contributor program, depending on severity.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Entry Guidelines */}
          <TabsContent value="data">
            <Card className="bg-purple-700 border-purple-900 text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Data Entry Guidelines
                </CardTitle>
                <CardDescription className="text-gray-300">Specific standards for database contributions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Data Accuracy</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Verify all statistics in-game before submitting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Use the latest game version for all data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Include source screenshots when possible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Follow naming conventions exactly as they appear in-game</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Formatting Standards</h3>
                  <ul className="space-y-2">
                    <li>• Use consistent number formatting (no extra spaces or characters)</li>
                    <li>• Follow the established template for each data type</li>
                    <li>• Include all required fields, mark optional fields clearly</li>
                    <li>• Use proper capitalization and spelling</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Image Requirements</h3>
                  <ul className="space-y-2">
                    <li>• High resolution (minimum 1080p for screenshots)</li>
                    <li>• Clear, unobstructed view of relevant information</li>
                    <li>• No UI overlays that block important data</li>
                    <li>• Consistent lighting and visual settings</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guide Writing Guidelines */}
          <TabsContent value="guides">
            <Card className="bg-purple-700 border-purple-900 text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Guide Writing Guidelines
                </CardTitle>
                <CardDescription className="text-gray-300">Standards for creating high-quality guides</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Content Structure</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Start with a clear introduction and overview</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Use logical section headings and subheadings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Include a table of contents for longer guides</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>End with a conclusion and key takeaways</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Writing Style</h3>
                  <ul className="space-y-2">
                    <li>• Write in clear, concise language</li>
                    <li>• Use active voice when possible</li>
                    <li>• Explain technical terms and abbreviations</li>
                    <li>• Write for your target audience (beginner, intermediate, advanced)</li>
                    <li>• Use bullet points and numbered lists for clarity</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Visual Elements</h3>
                  <ul className="space-y-2">
                    <li>• Include relevant screenshots and images</li>
                    <li>• Use tables for statistical comparisons</li>
                    <li>• Add diagrams for complex strategies</li>
                    <li>• Ensure all images have descriptive alt text</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">SEO and Discoverability</h3>
                  <ul className="space-y-2">
                    <li>• Use descriptive, keyword-rich titles</li>
                    <li>• Include relevant tags and categories</li>
                    <li>• Write compelling meta descriptions</li>
                    <li>• Link to related guides and resources</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Code Contribution Guidelines */}
          <TabsContent value="code">
            <Card className="bg-purple-700 border-purple-900 text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5" />
                  Code Contribution Guidelines
                </CardTitle>
                <CardDescription className="text-gray-300">Standards for technical contributions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Code Quality</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Follow existing code style and conventions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Write clear, self-documenting code</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Include comments for complex logic</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Test your changes thoroughly</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Pull Request Process</h3>
                  <ul className="space-y-2">
                    <li>• Create feature branches from the main branch</li>
                    <li>• Write descriptive commit messages</li>
                    <li>• Include tests for new functionality</li>
                    <li>• Update documentation as needed</li>
                    <li>• Request review from appropriate team members</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Security Considerations</h3>
                  <ul className="space-y-2">
                    <li>• Never commit sensitive information (API keys, passwords)</li>
                    <li>• Validate all user inputs</li>
                    <li>• Follow security best practices</li>
                    <li>• Report security vulnerabilities privately</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Moderation Guidelines */}
          <TabsContent value="moderation">
            <Card className="bg-purple-700 border-purple-900 text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Moderation Guidelines
                </CardTitle>
                <CardDescription className="text-gray-300">Standards for community moderation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Moderation Principles</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Be fair, consistent, and impartial</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Explain decisions clearly and respectfully</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Focus on behavior, not personal characteristics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Escalate complex situations to senior moderators</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Response Guidelines</h3>
                  <ul className="space-y-2">
                    <li>• Respond to reports within 24 hours</li>
                    <li>• Document all moderation actions</li>
                    <li>• Provide warnings before taking punitive action</li>
                    <li>• Offer appeals process for all decisions</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Conflict Resolution</h3>
                  <ul className="space-y-2">
                    <li>• Listen to all parties involved</li>
                    <li>• Seek to understand underlying issues</li>
                    <li>• Mediate rather than dictate when possible</li>
                    <li>• Follow up to ensure resolution</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Creation Guidelines */}
          <TabsContent value="content">
            <Card className="bg-purple-700 border-purple-900 text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="mr-2 h-5 w-5" />
                  Content Creation Guidelines
                </CardTitle>
                <CardDescription className="text-gray-300">Standards for visual and multimedia content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Visual Standards</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Maintain consistent branding and style</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Use high-quality images and graphics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Ensure accessibility with alt text and captions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Optimize file sizes for web delivery</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Video Content</h3>
                  <ul className="space-y-2">
                    <li>• Minimum 1080p resolution for tutorials</li>
                    <li>• Clear audio with minimal background noise</li>
                    <li>• Include closed captions when possible</li>
                    <li>• Keep videos focused and well-paced</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Copyright and Attribution</h3>
                  <ul className="space-y-2">
                    <li>• Only use content you have rights to</li>
                    <li>• Properly attribute third-party assets</li>
                    <li>• Respect game developer intellectual property</li>
                    <li>• Provide source links when required</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Review Process */}
        <Card className="mt-8 mb-8 bg-purple-700 border-purple-900 text-white">
          <CardHeader>
            <CardTitle>Review and Approval Process</CardTitle>
            <CardDescription className="text-gray-300">How contributions are reviewed and published</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple-950 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold">Initial Submission</h3>
                  <p className="text-gray-300">
                    Submit your contribution through the appropriate channel (dashboard, GitHub, etc.)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-950 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold">Automated Checks</h3>
                  <p className="text-gray-300">
                    Basic formatting, quality, and guideline compliance checks are performed automatically
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-950 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold">Peer Review</h3>
                  <p className="text-gray-300">
                    Experienced contributors review content for accuracy, quality, and adherence to guidelines
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-950 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div>
                  <h3 className="font-semibold">Final Approval</h3>
                  <p className="text-gray-300">
                    Team leads provide final approval and the content is published to the database
                  </p>
                </div>
              </div>
            </div>

            <Alert className="mt-6 border-purple-900 bg-purple-800 text-white">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                The review process typically takes 24-48 hours for most contributions. Complex submissions may take
                longer. You&apos;ll receive notifications about the status of your submissions.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Getting Help */}
        <Card className="mb-8 bg-purple-700 border-purple-900 text-white">
          <CardHeader>
            <CardTitle>Getting Help</CardTitle>
            <CardDescription className="text-gray-300">Resources and support for contributors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Documentation</h3>
                <ul className="space-y-2 ">
                  <li>
                    <Link href="/contribute/tutorials" className="text-white hover:underline">
                      Video tutorials and walkthroughs
                    </Link>
                  </li>
                  <li>
                    <Link href="/contribute/templates" className="text-white hover:underline">
                      Templates and examples
                    </Link>
                  </li>
                  <li>
                    <Link href="/contribute/faq" className="text-white hover:underline">
                      Contributor FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/contribute/style-guide" className="text-white hover:underline">
                      Style guide and formatting
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Community Support</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="https://discord.gg/contributors" className="text-white hover:underline">
                      Contributors Discord channel
                    </Link>
                  </li>
                  <li>
                    <Link href="/community/mentorship" className="text-white hover:underline">
                      Mentorship program
                    </Link>
                  </li>
                  <li>
                    <Link href="/contribute/office-hours" className="text-white hover:underline">
                      Weekly office hours
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-white hover:underline">
                      Direct support contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-purple-700 border-purple-900 text-white">
          <CardContent className="pt-6 text-center">
            <FileText className="h-12 w-12 text-white mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Now that you understand our guidelines, you&apos;re ready to start contributing! Choose your area of interest
              and begin making a difference in our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="purple" className="dark:hover:bg-purple-950 hover:bg-purple-800/50 transition-all duration-300 rounded-[5px]" asChild>
                <Link href="/contribute">Choose Your Contribution Area</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-[5px]  hover:text-white text-white dark:text-white dark:border-purple-800 hover:bg-purple-800/50 border-purple-600 dark:hover:bg-purple-900/50" asChild>
                <Link href="/contribute/guidelines">Apply To Contribute</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

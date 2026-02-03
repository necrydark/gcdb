"use client";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  ChevronDown,
  ChevronRight,
  Mail,
  MessageSquare,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const FaqItem = ({
  question,
  answer,
}: {
  question: string;
  answer: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="  rounded-[5px] mb-4">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full !rounded-b-none flex bg-gradient-to-br from-card via-card to-purple-50/50 dark:to-purple-900/10 border-border/50 justify-between items-center p-4 text-left rounded-[5px] font-medium focus:outline-none"
      >
        <span>{question}</span>
        <ChevronDown
          className={`h-5 w-5 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
        />
      </Button>
      {isOpen && (
        <div className="p-4 bg-gradient-to-br from-card via-card to-purple-50/50 dark:to-purple-900/10 border-border/50  prose prose-sm max-w-none dark:prose-invert">
          {typeof answer === "string" ? <p>{answer}</p> : answer}
        </div>
      )}
    </div>
  );
};

const generalFAQs = [
  {
    question: "What is this database?",
    answer: (
      <>
        <p>
          This is a comprehensive database for the game, providing detailed
          information about characters, holy relics, events, and more. Our goal
          is to be the most accurate and up-to-date resource for players.
        </p>
        <p>
          The database is community-driven, with contributions from players
          around the world who help maintain and expand our collection of
          information.
        </p>
      </>
    ),
  },
  {
    question: "Is this an official website?",
    answer:
      "No, this is a fan-made database created by the community. While we strive for accuracy, this is not affiliated with or endorsed by the game developers or publishers.",
  },
  {
    question: "How often is the database updated?",
    answer:
      "We update the database as quickly as possible when new content is released. Major updates typically happen within 24-48 hours of new content being available in the game. Minor updates and corrections happen continuously as our contributors work to improve the database.",
  },
  {
    question:
      "Can I use the information from this database on my own website or videos?",
    answer: (
      <>
        <p>
          Yes, you are welcome to use information from our database for your own
          content, but we ask that you credit our website as the source. Please
          include a link back to our site when sharing our information.
        </p>
        <p>
          For extensive use of our data or API access, please contact us through
          the form at the bottom of this page.
        </p>
      </>
    ),
  },
  {
    question: "I found an error in the database. How can I report it?",
    answer:
      "We appreciate your help in maintaining accuracy! You can report errors by clicking the 'Report Error' button on any page where you find incorrect information. Alternatively, you can join our Discord server and report the issue in the #database-corrections channel.",
  },
];

const accountFAQs = [
  {
    question: "Do I need an account to use the database?",
    answer:
      "No, you can browse all the information in our database without creating an account. However, creating an account allows you to save favorites, track your collection, contribute to the database, and participate in the community.",
  },
  {
    question: "How do I create an account?",
    answer: (
      <>
        <p>
          To create an account, click on the &quot;Sign Up&quot; button in the
          top right corner of any page. You&apos;ll need to provide:
        </p>
        <ul>
          <li>A valid email address</li>
          <li>A username</li>
          <li>A secure password</li>
        </ul>
        <p>
          After submitting the form, you&apos;ll receive a verification email.
          Click the link in the email to activate your account.
        </p>
      </>
    ),
  },
  {
    question: "I forgot my password. How can I reset it?",
    answer:
      "If you've forgotten your password, click on the 'Login' button, then select 'Forgot Password'. Enter the email address associated with your account, and we'll send you a password reset link.",
  },
  {
    question: "How can I change my username or profile picture?",
    answer:
      "Once logged in, click on your profile icon in the top right corner and select 'Settings'. From there, you can update your username, profile picture, and other account information.",
  },
  {
    question: "Can I delete my account?",
    answer:
      "Yes, you can delete your account by going to Settings > Account > Delete Account. Please note that this action is permanent and will remove all your contributions, comments, and saved data.",
  },
];

const contributionFAQs = [
  {
    question: "How can I contribute to the database?",
    answer: (
      <>
        <p>There are several ways to contribute to our database:</p>
        <ul>
          <li>
            Add missing information for characters, holy relics, or events
          </li>
          <li>Update existing entries with new or corrected information</li>
          <li>Write guides for characters, game mechanics, or events</li>
          <li>Translate content into other languages</li>
          <li>Report errors or outdated information</li>
        </ul>
        <p>
          To start contributing, create an account and visit our{" "}
          <Link href="/contribute">Contribution Guide</Link> for detailed
          instructions.
        </p>
      </>
    ),
  },
  {
    question: "Do I need special permissions to edit the database?",
    answer:
      "Basic contributions like reporting errors or suggesting updates can be done by any registered user. For more extensive editing capabilities, you'll need to become a verified contributor. This status is granted after you've made several quality contributions and are familiar with our guidelines.",
  },
  {
    question: "Are there guidelines for contributions?",
    answer: (
      <>
        <p>
          Yes, we have specific guidelines to maintain quality and consistency
          across the database:
        </p>
        <ul>
          <li>All information must be accurate and verifiable in-game</li>
          <li>Follow our formatting and style guide for consistency</li>
          <li>
            Do not copy content directly from other sources without permission
          </li>
          <li>
            Be respectful and collaborative when working with other contributors
          </li>
        </ul>
        <p>
          For complete guidelines, please review our{" "}
          <Link href="/contribute/guidelines">Contribution Guidelines</Link>.
        </p>
      </>
    ),
  },
  {
    question: "How are contributions reviewed?",
    answer:
      "All contributions are reviewed by our moderation team before being published to ensure accuracy and adherence to our guidelines. The review process typically takes 24-48 hours, though it may be longer for extensive contributions.",
  },
  {
    question: "Can I become a moderator or admin?",
    answer:
      "Yes! We're always looking for dedicated community members to join our team. To be considered, you should have a history of quality contributions, be active in the community, and demonstrate a thorough understanding of the game. You can apply through the 'Join Team' link in the Community section.",
  },
];

const gameFAQs = [
  {
    question: "Where can I download the game?",
    answer: (
      <>
        <p>The game is available on multiple platforms:</p>
        <ul>
          <li>
            <strong>iOS:</strong> Download from the App Store
          </li>
          <li>
            <strong>Android:</strong> Download from Google Play Store
          </li>
          <li>
            <strong>PC:</strong> Available through the official website or
            specific game launchers
          </li>
        </ul>
        <p>
          For direct links, please visit the{" "}
          <Link href="/download">Download Page</Link>.
        </p>
      </>
    ),
  },
  {
    question: "Is the game free to play?",
    answer:
      "Yes, the game is free to play with optional in-app purchases. You can enjoy the full game without spending money, though some cosmetic items and convenience features may require purchases.",
  },
  {
    question: "What are the minimum system requirements?",
    answer: (
      <>
        <p>
          <strong>Mobile:</strong>
        </p>
        <ul>
          <li>iOS 11.0 or later / Android 7.0 or later</li>
          <li>2GB RAM minimum (4GB recommended)</li>
          <li>3GB free storage space</li>
        </ul>
        <p>
          <strong>PC:</strong>
        </p>
        <ul>
          <li>Windows 10 64-bit / macOS 10.14 or later</li>
          <li>Intel Core i3 or equivalent</li>
          <li>4GB RAM</li>
          <li>Intel HD Graphics 4000 or better</li>
          <li>5GB available space</li>
        </ul>
      </>
    ),
  },
  {
    question: "How do I link my game account across multiple devices?",
    answer:
      "To link your game account across devices, you need to create a publisher account in the game settings. Once created, you can log in with the same account on different devices to access your game progress.",
  },
  {
    question:
      "I'm having technical issues with the game. Where can I get help?",
    answer:
      "For technical support, please visit the official game support page or contact the publisher's customer service. Our database is focused on game information rather than technical support, though our community Discord may have helpful players who can assist with common issues.",
  },
];

const technicalFAQs = [
  {
    question: "Is there an API available for the database?",
    answer:
    "There is not a public API at the moment for the database. Future plans may include developing an API for developers to access the data programmatically. Stay tuned for updates on our website, join our Discord for announcements or view our roadmap about future features and updates we want to add.",
    // answer:
    //   "Yes, we offer a REST API for developers who want to access our database programmatically. The API is currently in beta and available to approved partners. If you're interested in using our API, please fill out the API request form on our Developer page.",
  },
  {
    question: "Why is the website slow to load sometimes?",
    answer:
      "We experience higher traffic during major game updates or events, which can occasionally cause slower loading times. We're continuously working to optimize our infrastructure to handle these traffic spikes better. If you experience persistent performance issues, please report them to us.",
  },
  {
    question: "Can I use the database offline?",
    answer:
      "Currently, we don't offer a fully offline version of the database. However, many pages will work with limited functionality if you've visited them before, thanks to browser caching. We're exploring options for a dedicated offline app in the future.",
  },
  {
    question: "Is the website mobile-friendly?",
    answer:
      "Yes, our website is fully responsive and designed to work well on mobile devices, tablets, and desktop computers. If you encounter any display issues on your device, please let us know through the feedback form.",
  },
  {
    question: "How can I clear the site cache?",
    answer:
      "If you're experiencing issues with outdated information, you can refresh the page with Ctrl+F5 (Windows) or Cmd+Shift+R (Mac) to bypass your browser cache. For a complete cache clear, you can go to your browser settings and clear browsing data for our specific site.",
  },
];

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("general");

  const filterQuestions = (faqs: any[]) => {
    if (!searchQuery) return faqs;

    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (typeof faq.answer === "string" &&
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const filteredGeneral = filterQuestions(generalFAQs);
  const filteredAccount = filterQuestions(accountFAQs);
  const filteredContribution = filterQuestions(contributionFAQs);
  const filteredGame = filterQuestions(gameFAQs);
  const filteredTechnical = filterQuestions(technicalFAQs);

  const totalFilteredLength =
    filteredGeneral.length +
    filteredAccount.length +
    filteredContribution.length +
    filteredGame.length +
    filteredTechnical.length;

  return (
    <div className="min-h-screen pt-[5rem]">
      <section className="relative py-16 px-4">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-white max-w-2xl mx-auto">
              Find answers to common questions about our database, the game and
              how to contribute.
            </p>
          </div>
          <div className="max-w-2xl mx-auto relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300"
              size={20}
            />
            <Input
              placeholder="Search questions..."
              // className="h-12 rounded-[5px] border-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 w-full pl-10 pr-10 py-3 border-border/50 glass-effect ring-0 focus:ring-0 placeholder:text-white text-white focus:border-purple-700 focus-visible:ring-0 shadow-lg"

              className="border-purple-900 bg-purple-800 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white  focus-visible:ring-0 pl-10 h-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {searchQuery && (
            <div className="mb-6">
              <p className="text-gray-300">
                {totalFilteredLength}{" "}
                {totalFilteredLength === 1 ? "result" : "results"} for{" "}
                {searchQuery}
              </p>
              {totalFilteredLength === 0 && (
                <div className="mt-4 p-4 bg-gradient-to-br from-card via-card to-purple-50/50 dark:to-purple-900/10 border-border/50 rounded-lg text-center">
                  <p className="mb-2 font-medium">No FAQs match your search</p>
                  <p className="text-gray-300">
                    Try different keywords or check our contact section below
                  </p>
                </div>
              )}
            </div>
          )}

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-1 md:grid-cols-5 mb-8">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="contribution">Contribution</TabsTrigger>
              <TabsTrigger value="game">Game</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <h2 className="text-2xl font-bold mb-4 text-white">
                General Questions
              </h2>
              {filteredGeneral.length > 0
                ? filteredGeneral.map((faq, idx) => (
                    <FaqItem
                      key={idx}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))
                : !searchQuery && (
                    <p className="text-muted-foreground">
                      No general questions available.
                    </p>
                  )}
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Account Questions</h2>
              {filteredAccount.length > 0
                ? filteredAccount.map((faq, idx) => (
                    <FaqItem
                      key={idx}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))
                : !searchQuery && (
                    <p className="text-muted-foreground">
                      No account questions available.
                    </p>
                  )}
            </TabsContent>

            <TabsContent value="contribution" className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">
                Contribution Questions
              </h2>
              {filteredContribution.length > 0
                ? filteredContribution.map((faq, idx) => (
                    <FaqItem
                      key={idx}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))
                : !searchQuery && (
                    <p className="text-muted-foreground">
                      No contribution questions available.
                    </p>
                  )}
            </TabsContent>

            <TabsContent value="game" className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Game Questions</h2>
              {filteredGame.length > 0
                ? filteredGame.map((faq, idx) => (
                    <FaqItem
                      key={idx}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))
                : !searchQuery && (
                    <p className="text-muted-foreground">
                      No game questions available.
                    </p>
                  )}
            </TabsContent>

            <TabsContent value="technical" className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Technical Questions</h2>
              {filteredTechnical.length > 0
                ? filteredTechnical.map((faq, idx) => (
                    <FaqItem
                      key={idx}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))
                : !searchQuery && (
                    <p className="text-muted-foreground">
                      No technical questions available.
                    </p>
                  )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">
            Popular Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-card via-card to-purple-50/50 dark:to-purple-900/10 border-border/50 rounded-lg  flex flex-col flex-1">
              <CardHeader>
                <CardTitle>How do I add a new character?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white">
                  To add a new character, you need to be a verified contributor.
                  Once verified, navigate to the Admin section and use the
                  character creation form.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full rounded-[5px] text-white bg-purple-600  hover:bg-purple-700 shadow-lg"
                  asChild
                >
                  <Link href="/contribute/characters">
                    Character Contribution Guide{" "}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-gradient-to-br from-card via-card to-purple-50/50 dark:to-purple-900/10 border-border/50 rounded-lg  flex flex-col flex-1">
              <CardHeader>
                <CardTitle>How do I track my collection?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white">
                  Create an account and visit your profile page. From there, you
                  can access the Collection Tracker tool to mark which
                  characters and items you&apos;ve obtained in-game.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full rounded-[5px] text-white bg-purple-600  hover:bg-purple-700 shadow-lg"
                  asChild
                >
                  <Link href="/collection">
                    Collection Tracker <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-gradient-to-br from-card via-card to-purple-50/50 dark:to-purple-900/10 border-border/50 rounded-lg  flex flex-col flex-1">
              <CardHeader>
                <CardTitle>How do I report incorrect information?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white">
                  On any page with incorrect information, look for the
                  &quot;Report Error&quot; button. Fill out the form with
                  details about what&apos;s wrong and our team will review it.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full rounded-[5px] text-white bg-purple-600  hover:bg-purple-700 shadow-lg"
                  asChild
                >
                  <Link href="/report">
                    Report an Error <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Still have questions?
            </h2>
            <p className="text-lg dark:text-gray-300 text-gray-700 max-w-2xl mx-auto">
              Can&apos;t find what you&apos;re looking for? Contact us directly
              and we&apos;ll get back to you as soon as possible.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <Card className="bg-gradient-to-br from-card via-card to-purple-50/50 dark:to-purple-900/10 border-border/50 rounded-lg ">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5" /> Email Support
                </CardTitle>
                <CardDescription className="text-gray-700 dark:text-gray-300">
                  Get a response within 24-48 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-white">
                  Send us an email with your question and we&apos;ll get back to
                  you as soon as possible. Please include as much detail as you
                  can to help us assist you better.
                </p>
                <Button
                  className="w-full rounded-[5px] text-white bg-purple-600  hover:bg-purple-700 shadow-lg"
                  asChild
                >
                  <a href="mailto:necrydark@gmail.com">Contact Support</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card via-card to-purple-50/50 dark:to-purple-900/10 border-border/50 rounded-lg ">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" /> Community Discord
                </CardTitle>
                <CardDescription className="text-gray-700 dark:text-gray-300">
                  Get help from the community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-white">
                  Join our Discord server to get help from other community
                  members and our moderators. We have dedicated channels for
                  different types of questions.
                </p>
                <Button
                  className="w-full rounded-[5px] text-white bg-purple-600  hover:bg-purple-700 shadow-lg"
                  asChild
                >
                  <a
                    href="https://discord.gg/gamedatabase"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Discord
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

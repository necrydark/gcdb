import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ResourcesPage() {
  const resources = [
    {
      name: "FAQ",
      description:
        "View commonly asked questions about the website and contact our support for any issues related to the site!",
      link: "/resources/faq",
    },
    {
      name: "Guides",
      description:
        "View our guides about the game and the content within the game, view guides tailor-made by youtubers for the content you want help with.",
      link: "/resources/guides",
    },
    {
      name: "Tier List",
      description: "View our tierlists for PVP and PVE activities.",
      link: "/resources/tierlist",
    },
    {
      name: "Calculators",
      description:
        "View our calculators for calculating CC for teams or stats for characters.",
      link: "/resources/calculators",
    },
  ];
  return (
    <div className="pt-[10rem]">
      <section className="container mx-auto px-12 py-6">
        <h1 className="text-4xl md:text-5xl  leading-tight font-bold mb-8 text-center">
          Resources
        </h1>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          {resources.map((resource, idx) => (
            <Card
              key={idx}
              className=" flex flex-col bg-gradient-to-br from-card via-card to-purple-50/50 dark:to-purple-900/10 border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[5px]"
            >
              <CardHeader>
                <CardTitle>{resource.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white text-sm">{resource.description}</p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Link href={resource.link}>
                  <Button
                    size="lg"
                    className="w-full rounded-[5px] bg-purple-600 hover:bg-purple-700"
                  
                  >
                    Visit
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <Card className="bg-gradient-to-br from-card via-card to-purple-50/50 dark:to-purple-900/10 border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[5px] mt-6">
          <CardHeader>
            <CardTitle>Community</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white text-sm">
              View community resources and how to get involved in the community.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/community">
              <Button
                size="lg"
             
                className="w-full rounded-[5px] bg-purple-600 hover:bg-purple-700"
              >
                Visit
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}

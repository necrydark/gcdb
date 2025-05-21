import { Button } from "@/src/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { getAllPosts } from "@/src/lib/posts";
import Link from "next/link";




export default function Changelog() {
    const posts = getAllPosts();
    return (
        <div className="container mx-auto p-4 max-w-6xl prose pt-[7rem]">
                     <h1 className="text-4xl md:text-5xl text-white font-bold mb-8">Changelog</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {posts?.map(({ slug, data}) => (
                    <Card className="bg-purple-500 dark:bg-purple-900 rounded-lg border-0" key={slug}>
                        <CardHeader>
                            <CardTitle>{data.title}</CardTitle>
                            <CardDescription className="text-gray-300">{data.date}</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button  className="w-full rounded-[5px] transition-all duration-250 bg-purple-700 hover:opacity-75 dark:bg-purple-950 text-white" asChild >
                            <Link className="no-underline" href={`/changelog/${slug}`}>Read More</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

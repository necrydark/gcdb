import { GetStaticPaths, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown"
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/src/lib/posts";
import { Button } from "@/src/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";



export async function generateStaticParams() {
    const slugs = getPostSlugs()
    return slugs.map((slug) => ({
        slug: slug.replace(/\md$/, ''),
    }))
}

export default async function Post(props: any) {
    const params = await props.params;

    const { slug } = params;

    const post = getPostBySlug(slug);



    return(
        <article className="prose container max-w-8xl mx-auto p-4 pt-[7rem]">
          <div className="flex  gap-2">
          <Button 
          variant={"outline"}
          size={"icon"} 
          asChild
          className="dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px]  hover:text-white dark:bg-purple-700 transition-all duration-250"
          >
     <Link href={"/changelog"}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
          </Button>
          <div className="flex flex-col gap-2">
        <h1 className="text-2xl text-white mb-0">{post.data.title}</h1>
        <p className="text-gray-300 m-0">{post.data.date}</p>
        </div>
          </div>
   
           <div className="!text-white">
           <ReactMarkdown>
            {post.content}
            </ReactMarkdown>
           </div>
        </article>
    )
}


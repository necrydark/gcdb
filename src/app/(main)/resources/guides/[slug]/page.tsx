import { Button } from "@/src/components/ui/button";
import { client } from "@/src/sanity/lib/client";
import { urlFor } from "@/src/sanity/lib/image";
import { PortableText, SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

const GUIDE_QUERY = `*[_type == "guide" && slug.current == $slug][0]`;
const POST_AUTHOR = `*[_type == "author"]{
    name,
    bio,
    "authorImage": image.asset->url,
    "posts": *[_type == "post" && author._ref in authors[]->author._id ]{
      title,
      "slug": slug.current,
    }
}`;




const options = { next: { revalidate: 30 } };

export default async function GuidePostPage({ params}: {   params: Promise<{ slug: string }>;}) {
    const guide = await client.fetch(
        GUIDE_QUERY,
        await params,
        options
    )

    const author = await client.fetch<SanityDocument[]>(POST_AUTHOR, {}, options);

    console.log("Guide Details", guide.teams)

    return (
        <article className="container mx-auto max-w-6xl py-12 flex flex-col gap-4 min-h-screen pt-[7rem] ">
   <Button  size="sm" variant="outline" className="dark:hover:bg-purple-950 bg-purple-600 dark:bg-purple-900 border-purple-400 border-[2px] w-fit rounded-[5px] hover:text-white hover:bg-purple-700">
   <Link href="/resources/guides">
        ← 
      </Link>

   </Button>
      <Image
        src={urlFor(guide.image)?.url()}
        alt={guide.title}
        className="mx-auto rounded-xl"
        width="800"
        height="310"
      />
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white">
            {guide.title}
        </h1>
        <div className="flex flex-row items-center justify-center gap-2">
            {author.map((author, idx) => (
                <p key={idx} className="text-center text-white">{author.name}</p>
            ))}
              {" - "}
            <p>{new Date(guide.publishedAt).toLocaleDateString("en-GB")}</p>
        </div>
        <div className="mt-[4rem] max-w-6xl text-white prose">
        {Array.isArray(guide.content) && <PortableText value={guide.content} />}
        </div>

        <div className="flex flex-col mt-[2rem] p-4  bg-purple-500 dark:bg-purple-900 rounded-[5px] border-0 gap-4">
            {guide.teams.map((team: any, idx: any) => (
                <div key={idx}>
                <h1>{team.teamName}</h1>
                <p className="text-sm">{team.teamNotes}</p>
                <div className="flex flex-row gap-4">
                {team.members.map((member: any, idx: any) => (
                        <p key={idx}>{member}</p>
                        ))}
                        </div>
                </div>
            ))}
        </div>
        </article>
    )

}
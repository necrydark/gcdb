import axios from "axios";
import { load as loadHtml } from "cheerio";
import { z } from "zod";


interface Post {
    title: string;
    link: string;
}

const PostSchema = z.object({
    title: z.string(),
    link: z.string(),
});

async function scrapePosts(url: string): Promise<Post[]> {
    const { data } = await axios.get(url);
    const $ = loadHtml(data);
    const posts: Post[] = [];

    $("div.TopicList_item__1Z2m1").each((_, element) => {
        const title = $(element).find("a.Topic_title__1AC5W").text();
        const link = $(element).find("a.Topic_title__1AC5W").attr("href") || "";

        const post = { title, link };
        if (PostSchema.safeParse(post).success) {
            posts.push(post);
        }
    });

    return posts;
}

// Usage
scrapePosts("https://forum.netmarble.com/7ds_en").then(posts => console.log(posts));
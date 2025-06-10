import { Video, YoutubeRes } from "@/src/app/(main)/community/page";

export async function getYoutubeVideos(): Promise<Video[]> {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;
    const apiURL = process.env.YOUTUBE_API_URL;
    const videosURL = "https://www.googleapis.com/youtube/v3/videos"

    try {

        const data = await fetch(
            `${apiURL}?key=${apiKey}&channelId=${channelId}&part=id,id&order=date&maxResults=9`
        )

       if(!data.ok) {
        throw new Error("Failed to fetch videos")
       }

       const searchData = await data.json();

       const videoIds = searchData.items.filter((item: any) => item.id.videoId)
       .map((item: any) => item.id.videoId)

       if(videoIds.length === 0) {
        console.warn("No video IDs found for the specified channel.");
            return []; // Return empty array if no videos found
       }


       const videoIdsString = videoIds.join(",")

       const videosRes = await fetch(
        `${videosURL}?key=${apiKey}&id=${videoIdsString}&part=snippet,contentDetails,statistics`
       )

       if(!videosRes.ok) {
        const errorText = await videosRes.text();
        console.error("YouTube Videos API Error:", videosRes.status, errorText);
        throw new Error(`Failed to fetch video details from YouTube Videos API: ${videosRes.status}`);
       }
       
       const videosData: YoutubeRes = await videosRes.json();
       
       return videosData.items;
       
    } catch (err) {
        throw new Error("Failed to fetch videos")
    }
}
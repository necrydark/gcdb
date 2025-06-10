import { format } from "date-fns";

/**
 * @param isoDuration - The ISO 8601 string
 * @returns The total duration in seconds
 */

function isoDurationToSeconds(isoDuration: string): number {
    if(!isoDuration || typeof isoDuration !== "string") {
        return 0
    };

    const matches = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);;

    if(!matches) {
        return 0
    };

    const hours = parseInt(matches[1] || '0', 10)
    const minutes = parseInt(matches[2] || '0', 10)
    const seconds = parseInt(matches[3] || '0', 10)

    return hours * 3600 + minutes * 60 + seconds;
}

/**
 * @param totalSeconds
 * @returns Formatted duration string
 */

function formatSecondsToDuration(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60;

    const pad = (num: number): string => String(num).padStart(2, '0')

    if(hours > 0){
        return `${hours}:${pad(minutes)}:${pad(seconds)}`
    } else {
        return `${minutes}:${pad(seconds)}`
    }
}

export function formatYoutubeDuration(isoDuration: string): string {
    const seconds = isoDurationToSeconds(isoDuration)
    return formatSecondsToDuration(seconds)
}
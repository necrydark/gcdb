export type Stats = {
    attack?: string;
    defense?: string;
    hp?: string;
}

export type HolyRelic = {
    name: string;
    imageUrl: string;
    effect: string;
    stats: Stats[];
}
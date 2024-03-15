import { CharacterPreview } from "./character";

export type Stats = {
    attack?: string;
    defense?: string;
    hp?: string;
}

export type Materials = {
    name: string;
    imageUrl: string;
}

export type Relic = {
    name: string;
    imageUrl: string;   
}

export type HolyRelic = {
    relic: Relic;
    effect: string;
    characters?: CharacterPreview[];
    materials?: Materials[];
    stats?: Stats[];
}
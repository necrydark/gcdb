import { materials, relic } from "./relics";

const hraesvelgr = [
    {
        relic: relic.Hrungnir,
        materials: [
            materials.windSource, 
            materials.magnificenceofValhalla,
            materials.blueEssence,
            materials.eitris
        ],
        effect: "Increases the hero's damage dealt to enemies by 25%.",
        characters: [
            {
                name: "Ice Spice",
                imageUrl: "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
                slug: "queen_diane"
            }
        ]
    }
]

export const bossRelics = [hraesvelgr, [], [], [], []]
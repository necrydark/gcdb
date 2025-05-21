export type TierName = keyof typeof subscriptionTiers
export type PaidTierNames = Exclude<TierName, "Free">;

export const subscriptionTiers = {
    Free: {
        name: "Free",
        priceInPence: 0,
        description: "Free plan with limited features.",
        stripePriceId: null,
    },
    SR: {
        name: "SR",
        priceInPence: 500,
        description: "Standard plan with additional features.",
        stripePriceId: process.env.NEXT_PUBLIC_BASIC_PRICE_ID,
    },
    SSR: {
        name: "SSR",
        priceInPence: 1000,
        description: "Premium plan with all features.",
        stripePriceId: process.env.NEXT_PUBLIC_PREMIUM_PRICE_ID,
    },
} as const;

export const tiersInOrder = [
    subscriptionTiers.Free,
    subscriptionTiers.SR,
    subscriptionTiers.SSR,
]

export function getTierByPriceId(priceId: string) {
    return Object.values(subscriptionTiers).find(
        tier => tier.stripePriceId === priceId
    )
}
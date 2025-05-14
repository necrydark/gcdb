import { getCharacters } from "@/data/character";
import { getGiftById, getGiftByName } from "@/src/actions/admin";
import ViewGiftPage from "@/src/components/admin/gifts/view-gift-page";
import db from "@/src/lib/db";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

type Params = Promise<{slug: string}>


export default async function GiftViewPage({ params}: { params: Params}) {

    const {slug } = await params;
    const gift = await getGiftById(slug);
    const existingGifts = await db.gift.findUnique({
        where: {id: slug},
        include: {
            Character: true
        }
    })

    if(!gift) {
        return <p>Gift not found.</p>
    }

    if(!existingGifts) {
        return <p>Characters & Gifts not found.</p>
    }


    return (
        <div className="container mx-auto py-10 h-full">
            <div>
            <Suspense fallback={<div className="flex justify-center items-center text-3xl flex-row gap-2 h-full text-white">Loading Data...<Loader2 className="animate-spin h-6 w-6" /></div>}>
                    <ViewGiftPage gift={gift} giftCharacters={existingGifts} />
                </Suspense>
            </div>
        </div>
    )
}
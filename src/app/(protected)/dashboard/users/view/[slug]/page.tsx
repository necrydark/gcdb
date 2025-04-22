import ViewUserPage from "@/src/components/admin/users/view-user-page";
import db from "@/src/lib/db";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default async function UserViewPage({ params} : { params: { slug: string}}) {
    const user = await db.user.findUnique({
        where: {
            id: params.slug
        },
        include: {
            Comments: true,
            Favourite: true
        }
    })
    
    if(!user) {
        return (
            <div>
                User Not Found.
            </div>
        )
    }

    return (
        <div className="container mx-auto py-10 max-w-[1400px] h-full">
            <div>
            <Suspense fallback={<div className="flex justify-center items-center text-3xl flex-row gap-2 h-full text-white">Loading Data...<Loader2 className="animate-spin h-6 w-6" /></div>}>
                <ViewUserPage user={user} />
            </Suspense>
            </div>
        </div>
    )
}
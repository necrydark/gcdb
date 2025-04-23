import { getUserById } from "@/data/user"
import EditUserForm from "@/src/components/admin/users/edit-user-form"
import { Loader2 } from "lucide-react"
import { Suspense } from "react"

export default async function EditUserPage({ params}: { params: {slug: string}}) {
    console.log(params.slug)

    const user = await getUserById(params.slug as string)

    if(!user) {
        return (
            <div>
                User Not Found.
            </div>
        )
    }
    
    return (
            <div className="container mx-auto p-10 h-full">
                <Suspense fallback={<div className="flex justify-center items-center text-3xl flex-row gap-2 h-full text-white">Loading Data...<Loader2 className="animate-spin h-6 w-6" /></div>}>
                    <EditUserForm user={user}/>
                </Suspense>
            </div>
    )
}
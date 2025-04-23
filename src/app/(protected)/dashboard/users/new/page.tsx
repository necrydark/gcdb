import AddUserForm from "@/src/components/admin/users/add-user-form";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default function AddUserPage() {
    return(

        <div className="container mx-auto py-10 h-full">
   <Suspense fallback={<div className="flex justify-center items-center text-3xl flex-row gap-2 h-full text-white">Loading Data...<Loader2 className="animate-spin h-6 w-6" /></div>}>
                <AddUserForm />
               </Suspense>
        </div>
    )
}
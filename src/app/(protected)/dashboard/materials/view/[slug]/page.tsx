import ViewMaterialPage from "@/src/components/admin/materials/view-material-page";
import db from "@/src/lib/db";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

type Params = Promise<{slug: string}>


export default async function MaterialViewPage({ params} : {params: Params}) {

    const { slug } = await params;
    const relicWithMaterial = await db.material.findUnique({
        where: {
            id: slug
        },
        include: {
            holyRelics: {
                include: {
                    materials: true
                }
            }
        }
    });

    if (!relicWithMaterial) {
        return <p>Material Not Found</p>;
    }

    return (
        <div className="container mx-auto py-10 max-w-[1440px] h-full">
            <Suspense fallback={<div className="flex justify-center items-center text-3xl flex-row gap-2 h-full text-white">Loading Data...<Loader2 className="animate-spin h-6 w-6" /></div>}>
                <ViewMaterialPage relicMaterials={relicWithMaterial} />
            </Suspense>
        </div>
    )
}
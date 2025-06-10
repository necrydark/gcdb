import ViewEnhanceMaterialPage from "@/src/components/admin/enhance-material/view-enhance-material-page";
import ViewMaterialPage from "@/src/components/admin/materials/view-material-page";
import db from "@/src/lib/db";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

type Params = Promise<{slug: string}>


export default async function EnhanceMaterialViewPage({ params} : {params: Params}) {

    const { slug } = await params;
    const relicWithEnhanceMaterial = await db.relicEnhanceMaterial.findUnique({
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

    if (!relicWithEnhanceMaterial) {
        return <p>Enhance Material Not Found</p>;
    }

    return (
        <div className="container mx-auto py-10 max-w-[1440px] h-full">
            <Suspense fallback={<div className="flex justify-center items-center text-3xl flex-row gap-2 h-full text-white">Loading Data...<Loader2 className="animate-spin h-6 w-6" /></div>}>
                <ViewEnhanceMaterialPage relicMaterials={relicWithEnhanceMaterial} />
            </Suspense>
        </div>
    )
}
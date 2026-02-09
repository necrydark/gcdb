import AddMaterialForm from "@/src/components/admin/materials/add-material-form";
import { AdminPageLayout } from "@/src/components/admin/shared/admin-page-layout";

const AddMaterialPage = () => {
  return (
    <AdminPageLayout 
      title="Add New Material"
      description="Create a new material for your inventory"
      backButtonHref="/dashboard/materials"
      backButtonLabel="Back to Materials"
    >
      <AddMaterialForm />
    </AdminPageLayout>
  );
};

export default AddMaterialPage;

import AddCategoryForm from "@/components/admin/categories/add-category-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const AddCategoriesPage = () => {
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-20 py-10 px-15">
      <Card className="w-lg">
        <CardHeader className="w-full text-center">
          <CardTitle className="text-2xl text-primary font-semibold font-heading">
            Add Employee
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AddCategoryForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCategoriesPage;

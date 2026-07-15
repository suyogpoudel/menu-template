import { Button } from "@/components/ui/button";
import Link from "next/link";

const CategoriesPage = () => {
  return (
    <div>
      <Button size="lg" asChild>
        <Link href="/admin/categories/add">Add</Link>
      </Button>
    </div>
  );
};

export default CategoriesPage;

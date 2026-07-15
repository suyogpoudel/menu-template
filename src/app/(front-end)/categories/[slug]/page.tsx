import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORIES, MENU_ITEMS } from "@/lib/temp";
import { notFound } from "next/navigation";
import Image from "next/image";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const category = CATEGORIES.find((cat) => cat.slug === slug);

  if (!category) notFound();

  const filteredItems = MENU_ITEMS.filter(
    (menu) => menu.categoryId === category.id,
  );

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-20 py-10 px-15">
      <div className="flex flex-col gap-4 md:gap-6 w-full px-4 md:px-0">
        <h2 className="text-primary font-bold text-xl md:text-2xl tracking-tight border-b pb-2">
          {category.name}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full">
          {filteredItems.map((menu) => (
            <Card
              key={menu.id}
              className="group overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col p-0"
            >
              <div className="relative w-full aspect-16/10 overflow-hidden bg-muted">
                <Image
                  src={menu.image}
                  alt={`Picture of ${menu.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority={category.order === 1}
                />
              </div>

              <CardContent className="p-4 flex flex-col justify-between flex-1 gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-foreground text-base md:text-lg font-semibold leading-snug group-hover:text-primary transition-colors duration-200">
                      {menu.name}
                    </h3>

                    {menu.dietary && (
                      <Badge
                        variant={
                          menu.dietary === "veg" ? "default" : "destructive"
                        }
                        className="capitalize text-[10px] px-2 py-0.5 rounded-md shrink-0 font-medium"
                      >
                        {menu.dietary}
                      </Badge>
                    )}
                  </div>
                </div>

                <p className="text-primary font-bold text-base">
                  Rs. {menu.price}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

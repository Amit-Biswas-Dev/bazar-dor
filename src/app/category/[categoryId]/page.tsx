
import ItemsCard from "@/components/ItemsCard";
import { notFound } from "next/navigation";
import type { ComponentProps } from "react";

interface PageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(categoryId)}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    notFound();
  }

  const result = await res.json();

  const products = Array.isArray(result)
    ? result
    : Array.isArray(result.data)
      ? result.data
      : [];

  if (products.length === 0) {
    notFound();
  }

  return (
    <div className="p-4">
      <h1 className="mb-6 text-2xl font-bold">
        {products[0]?.categoryNameBn || "পণ্যের তালিকা"}
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product: ComponentProps<typeof ItemsCard>["product"]) => (
          <ItemsCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Page;

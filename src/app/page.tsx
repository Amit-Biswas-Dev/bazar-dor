
import ItemsCard from "./components/ItemsCard";

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | string;
    pct: number;
  };
}

export default async function Home() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      next: { revalidate: 3600 },
    }
  );

if (!res.ok) {
  throw new Error("Failed to fetch products");
}

if (!res.ok) {
  throw new Error("Failed to fetch products");
}

const result = await res.json();

const products: Product[] = Array.isArray(result) ? result : [];

const increasedProducts = products.filter(
  (product) => product.change?.dir === "up"
);

  

  const decreasedProducts = products.filter(
    (product) => product.change?.dir ==="down"
  );

  

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
     <div className="py-4 my-6">
       <div className="mb-8">
        <h1 className="text-3xl font-bold text-base-content">
          আজ দাম বেড়েছে
        </h1>
        
      </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {increasedProducts.slice(0,6).map((product) => (
            <ItemsCard key={product.id} product={product} />
          ))}
        </div>
     </div>

     <div className="py-4 my-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base-content">
        আজ দাম কমেছে
        </h1>
        
      </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {decreasedProducts.slice(0,6).map((product) => (
            <ItemsCard key={product.id} product={product} />
          ))}
        </div>
     </div>

      <div className="py-4 my-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base-content">
        সব পণ্য
        </h1>
        
      </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ItemsCard key={product.id} product={product} />
          ))}
        </div>
     </div>
     
      
    </main>
  );
}

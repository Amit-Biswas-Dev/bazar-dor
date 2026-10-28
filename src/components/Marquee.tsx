
import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

type Product = {
  categoryIcon: string;
  id?: number | string;
  nameBn: string;
  today: number;
  unit?: string;
};

const Marquee = async () => {
  let products: Product[] = [];

  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
      { next: { revalidate: 60 } }
    );

    if (res.ok) {
      const data = await res.json();

      products = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
          ? data.data
          : [];
    }
  } catch (error) {
    console.error("Product fetch error:", error);
  }

  return (
    <div className="mx-auto flex max-w-7xl overflow-hidden border-y border-gray-200 bg-white text-black">
      <div className="shrink-0 bg-white px-5 py-2 font-bold text-black">
        আজকের বাজার দর
      </div>

      <div className="flex-1 overflow-hidden py-2">
        <MarqueeText>
          {products.length > 0 ? (
            products.map((product, index) => (
              <span key={product.id ?? index}>
                <Link
                  href={`/items/${product.id}`}
                  className="font-medium text-gray-800 transition-colors hover:text-green-600 hover:underline"
                >
                  {product.categoryIcon} {product.nameBn} —{" "}
                  {Number(product.today).toLocaleString("bn-BD")} টাকা
                  {product.unit ? ` / ${product.unit}` : ""}
                </Link>

                <span className="mx-5 text-gray-400">•</span>
              </span>
            ))
          ) : (
            <span className="text-black">
              আজকের বাজার দর দেখতে আমাদের পণ্য তালিকা দেখুন।
            </span>
          )}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;

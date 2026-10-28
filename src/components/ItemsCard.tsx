import Link from "next/link";
import type { Product } from "../app/page";

interface ItemsCardProps {
  product: Product;
}

const unitLabels: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export default function ItemsCard({ product }: ItemsCardProps) {
  const isUp = product.change.dir === "up";
  const unit = unitLabels[product.unit] ?? product.unit;

  return (
    <Link href={`/items/${product.id}`}>
      <div className="card border border-base-300">
        <div className="flex h-20 items-center gap-3 px-5">
          <span className="text-6xl" role="img" aria-label={product.nameBn}>
            {product.image}
          </span>

          <div>
            <h2 className="mt-1 text-lg font-bold">{product.nameBn}</h2>
            <p className="text-sm text-base-content/60">{unit}</p>
          </div>
        </div>

        <div className="card-body gap-3 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-base-content/60">আজকের দাম</p>
              <p className="text-2xl font-bold text-success">
                ৳{product.today.toLocaleString("bn-BD")}
                <span className="text-sm font-normal text-base-content/60">
                  /{unit}
                </span>
              </p>
            </div>

            <span
              className={`badge ${
                isUp ? "badge-error" : "badge-success"
              }`}
            >
              {isUp ? "▲" : "▼"}{" "}
              {product.change.pct.toLocaleString("bn-BD")}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
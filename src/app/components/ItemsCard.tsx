
import type { Product } from "../page";

interface ItemsCardProps {
  product: Product;
}

export default function ItemsCard({ product }: ItemsCardProps) {
  const isUp = product.change.dir === "up";

  return (
    <div className="card border border-base-50 ">


      <div className="flex h-20 items-center ">
        <span className="text-6xl" role="img" aria-label={product.nameBn}>
          {product.image}
        </span>

        <div>
          <h2 className="mt-1 text-lg font-bold">
            {product.nameBn}
          </h2>
          <p>{product.unit}</p>
        </div>
      </div>

      <div className="card-body gap-3 p-5">
        



       <div className="flex justify-between">
         <div>
          <p className="text-sm text-base-content/60">
            আজকের দাম
          </p>
          <p className="text-2xl font-bold text-success">
            ৳{product.today}
            <span className="text-sm font-normal text-base-content/60">
              /{product.unit}
            </span>
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-base-300 pt-3">
          

          <span
            className={`badge ${
              isUp ? "badge-error" : "badge-success"
            }`}
          >
            {isUp ? "▲" : "▼"} {product.change.pct}%
          </span>
        </div>
       </div>

       
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import React from "react";

const DetailsCard = async ({
  params,
}: {
  params: Promise<{ itemsId: string }>;
}) => {
  const { itemsId } = await params;

  const url = `https://openapi.programming-hero.com/api/bazardor/products/${itemsId}`;
  const res = await fetch(url);

  if (!res.ok) {
    return <p>Failed to fetch product. Status: {res.status}</p>;
  }

  const data = await res.json();
  const item = data.data ?? data;

   if(!item){
    notFound()
  }

  const priceChange = item.today - item.yesterday;

 
  const minMarket = item.markets.reduce((lowest: any, market: any) =>
    market.min < lowest.min ? market : lowest
  );

  const maxMarket = item.markets.reduce((highest: any, market: any) =>
    market.max > highest.max ? market : highest
  );

  const averagePrice =
    item.markets.reduce(
      (total: number, market: any) => total + (market.min + market.max) / 2,
      0
    ) / item.markets.length;

  return (
    <div className="mx-auto max-w-7xl">
     <div className="card flex flex-col gap-3 rounded-xl border p-5 shadow-sm sm:flex-row sm:items-center sm:gap-4">
  <p className="text-3xl">{item.categoryIcon}</p>

  <div className="flex-1">
    <h1 className="text-2xl font-bold">{item.nameBn}</h1>
    <p className="text-sm text-gray-500">প্রতি {item.unit}</p>
  </div>

  <p
    className={`text-sm font-semibold ${
      priceChange > 0
        ? "text-red-600"
        : priceChange < 0
          ? "text-green-600"
          : "text-gray-500"
    }`}
  >
    {priceChange > 0
      ? `আজ দাম বেড়েছে · ${priceChange.toLocaleString("bn-BD")} টাকা`
      : priceChange < 0
        ? `আজ দাম কমেছে · ${Math.abs(priceChange).toLocaleString("bn-BD")} টাকা`
        : "আজ দাম অপরিবর্তিত"}
  </p>
</div>

     <div>
  <h2 className="mb-4 text-xl font-bold">দামের সারসংক্ষেপ</h2>

  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <div className="card border-2 p-4">
      <h3>সর্বনিম্ন দাম</h3>
      <h2 className="text-2xl font-bold">
        ৳{minMarket.min.toLocaleString("bn-BD")}
      </h2>
      <p>{minMarket.market}</p>
    </div>

    <div className="card border-2 p-4">
      <p>সর্বোচ্চ দাম</p>
      <h3 className="text-2xl font-bold">
        ৳{maxMarket.max.toLocaleString("bn-BD")}
      </h3>
      <p>সবচেয়ে বেশি দামের বাজার: {maxMarket.market}</p>
    </div>

    <div className="card border-2 p-4">
      <p>গড় দাম</p>
      <h2 className="text-2xl font-bold">
        ৳
        {averagePrice.toLocaleString("bn-BD", {
          maximumFractionDigits: 2,
        })}
      </h2>
      <p>প্রতি {item.unit}-এর হিসাবে</p>
    </div>
  </div>
</div>

      <div>
        <h2 className="mt-6 mb-3 text-xl font-bold">
          বাজারভিত্তিক দাম
        </h2>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th>সর্বনিম্ন দাম</th>
                <th>সর্বোচ্চ দাম</th>
              </tr>
            </thead>

            <tbody>
              {item.markets.map(
                (
                  market: {
                    market: string;
                    division: string;
                    min: number;
                    max: number;
                  },
                  index: number
                ) => (
                  <tr key={`${market.market}-${index}`}>
                    <td>{market.market}</td>
                    <td>{market.division}</td>
                    <td>৳{market.min.toLocaleString("bn-BD")}</td>
                    <td>৳{market.max.toLocaleString("bn-BD")}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
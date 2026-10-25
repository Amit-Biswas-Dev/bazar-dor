
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {

       const date = new Date().toLocaleDateString('bn-BD',{
        dateStyle:'full',
    });
  return (
    <section className="bg-base-100">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-10 px-5 py-12 md:flex-row md:py-20">

        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <span className="mb-4 inline-block rounded-full bg-success/10 px-4 py-2 text-sm font-semibold text-success">
            {date}
          </span>

          <h1 className="text-3xl font-extrabold leading-tight text-base-content sm:text-4xl lg:text-5xl">
            আজকের বাজারের দাম
            <span className="mt-2 block text-success">
              এক নজরে
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-base-content/70 md:mx-0 md:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
            <Link href="/products" className="btn btn-success">
              সব পণ্য দেখুন
            </Link>

           
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex flex-1 justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-6 rounded-full bg-success/10 blur-3xl" />

            <Image
              className="relative h-auto w-full object-contain"
              height={450}
              width={450}
              priority
              src="/bazar-hero.png"
              alt="বাজার সদাই ও নিত্যপ্রয়োজনীয় পণ্য"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Banner;

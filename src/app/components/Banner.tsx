import React from 'react';
import Image from 'next/image';

const Banner = () => {
    return (
        <div>
            <div className='flex sp'>
                <div>
                    <h2>আজকের বাজারের দাম এক নজরে</h2>
                    <p>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-<br/>সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
                    <button className='btn btn-active'>সব পণ্য দেখুন</button>
                </div>
                <div>
                     <Image
                                className="w-10 h-10 bg-green-800 "
                                height={50}
                                width={50}
                                src="/bazar-hero.png"
                                alt="Bazar dor logo"
                              />
                </div>
            </div>
        </div>
    );
};

export default Banner;
import React from 'react';
import Image from 'next/image';
import NavLink from './NavLink';


const Header = () => {

    const date = new Date().toLocaleDateString('bn-BD',{
        dateStyle:'full',
    });
    return (
        <div>
            <header className="relative mx-auto max-w-7xl px-4 py-4 ">
      <div className="flex items-center justify-between">
        {/* Left side: Logo + Title */}
        <div className="flex items-center gap-3">
          <Image
            className="w-10 h-10 bg-green-800 "
            height={50}
            width={50}
            src="/logo-icon.png"
            alt="Bazar dor logo"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-900">বাজার দর</h2>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
        </div>

        {/* Right side: Auth buttons in Bangla */}
        {/* <UserInfo/> */}
       
      </div>
      
      <NavLink/>
      
    </header>
        </div>
    );
};

export default Header;
"use client"

import { authClient } from "@/lib/auth-client";
import { signOut } from "better-auth/api";
import Link from "next/link";
const UserInfo = () => {

    const {data: session} = authClient.useSession()
    const user = session?.user;

    const handleSignout = async() =>{
        await authClient.signOut();
    }


    return (
        <div className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
            {
                 user?(<Link href={'/profile'}><div className="flex flex-col items-center gap-2">
                    <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                   <img alt="Tailwind-CSS-Avatar-component" src={user?.image as string} />
                    </div>
                    </div>
                    <h2>{user?.name}</h2>
                    <p>{user?.email}</p>

                    <button onClick ={handleSignout}  className="btn btn-error btn-xs">SignOut</button>
                 </div></Link>) : (<div className="flex items-center gap-3">
          <Link href={'/signin'}>
                    <button >
            সাইন ইন
          </button>
          </Link>
          <Link href={'/signup'}>
                    <button className="px-4 py-2 rounded-md bg-red-700 text-white hover:bg-red-800 transition">
            সাইন আপ
          </button>
          </Link>
        </div>)
            }
           
        </div>
    );
};

export default UserInfo;
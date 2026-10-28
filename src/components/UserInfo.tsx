
"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const handleSignout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.push("/signin");
      router.refresh();
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  return (
    <div className="text-gray-800">
      {user ? (
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/profile"
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-green-50"
          >
            <div className="avatar">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-green-100 ring-2 ring-green-500 ring-offset-2">
                {user.image ? (
                  <img
                    src={user.image}
                    alt="User avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="font-bold text-green-700">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                )}
              </div>
            </div>

            <span className="hidden max-w-28 truncate text-sm font-semibold sm:block">
              {user.name || "User"}
            </span>
          </Link>

          <button
            onClick={handleSignout}
            className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 sm:text-sm"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/signin"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-green-50 hover:text-green-700 sm:px-4"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 sm:px-4"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;

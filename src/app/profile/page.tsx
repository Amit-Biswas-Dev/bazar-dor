
"use client";

import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
      toast.error("সাইন আউট করার সময় সমস্যা হয়েছে।");
    }
  };

  const handleUpdateProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const newUserData = {
      name: String(formData.get("name") ?? "").trim(),
    };

    try {
      const { error } = await authClient.updateUser(newUserData);

      if (error) {
        toast.error(error.message || "প্রোফাইল আপডেট করা যায়নি।");
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
    } catch {
      toast.error("প্রোফাইল আপডেট করার সময় সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <h2 className="text-2xl font-bold">আমার প্রোফাইল</h2>
        <p>আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

        <div className="flex w-full items-center justify-between gap-3 rounded-box border border-base-300 bg-base-200 p-4">
          <div className="avatar">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-green-100">
              {user?.image ? (
                <img
                  alt="Profile avatar"
                  src={user.image}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xl font-bold text-green-700">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              )}
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="font-bold">{user?.name}</h2>
            <p className="break-all text-sm">{user?.email}</p>
          </div>

          <button
            onClick={handleSignout}
            className="btn btn-error btn-xs"
          >
            Sign Out
          </button>
        </div>

        <form onSubmit={handleUpdateProfile} className="w-full">
          <fieldset className="fieldset w-full rounded-box border border-base-300 bg-base-200 p-4">
            <h2 className="text-2xl font-bold">তথ্য আপডেট</h2>

            <label className="label" htmlFor="name">
              নাম
            </label>

            <input
              id="name"
              type="text"
              name="name"
              defaultValue={user?.name ?? ""}
              className="input w-full"
              placeholder="আপনার নাম"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="btn btn-neutral mt-4 w-full"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Page;

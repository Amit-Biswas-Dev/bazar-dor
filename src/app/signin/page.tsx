
"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SignInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const { error } = await authClient.signIn.email({
        email: String(formData.get("email") ?? "").trim(),
        password: String(formData.get("password") ?? ""),
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const socialSignIn = async (provider: "google" | "github") => {
    setLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message || `${provider} দিয়ে সাইন ইন করা যায়নি।`
        );
      }
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-100 px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">সাইন ইন</h1>
          <p className="mt-2 text-sm text-base-content/70">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে
            অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="fieldset w-full rounded-box border border-base-300 bg-base-200 p-6"
        >
          <label className="label" htmlFor="email">
            ইমেইল
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="input w-full"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />

          <label className="label" htmlFor="password">
            পাসওয়ার্ড
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="input w-full"
            placeholder="আপনার পাসওয়ার্ড লিখুন"
            autoComplete="current-password"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="btn btn-success mt-4 w-full"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>

          <div className="divider">অথবা</div>

          <button
            type="button"
            onClick={() => socialSignIn("google")}
            disabled={loading}
            className="btn btn-outline w-full"
          >
            Google দিয়ে চালিয়ে যান
          </button>

          <button
            type="button"
            onClick={() => socialSignIn("github")}
            disabled={loading}
            className="btn btn-outline mt-3 w-full"
          >
            GitHub দিয়ে চালিয়ে যান
          </button>

          <p className="mt-4 text-center text-sm">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="link link-primary font-semibold"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;

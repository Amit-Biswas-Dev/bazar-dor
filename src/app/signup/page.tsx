
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(
      formData.get("confirmPassword") ?? ""
    );

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না।");
      setLoading(false);
      return;
    }

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");

      router.push("/");
      router.refresh();
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const socialSignUp = async (provider: "google" | "github") => {
    setLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || `${provider} দিয়ে সাইন আপ করা যায়নি।`);
      }
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="mt-3 text-center text-sm text-gray-500">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>

        <form onSubmit={onSubmit} className="mt-6 w-full">
          <fieldset className="fieldset w-full rounded-box border border-base-300 bg-base-200 p-6">
            <label className="label" htmlFor="name">
              নাম
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="input w-full"
              placeholder="যেমন: রহিম উদ্দিন"
              autoComplete="name"
              required
            />

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
              placeholder="কমপক্ষে ৮ অক্ষর"
              autoComplete="new-password"
              minLength={8}
              required
            />

            <label className="label" htmlFor="confirmPassword">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              className="input w-full"
              placeholder="আবার লিখুন"
              autoComplete="new-password"
              minLength={8}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="btn btn-success mt-4 w-full"
            >
              {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>

            <div className="divider">অথবা</div>

            <button
              type="button"
              onClick={() => socialSignUp("google")}
              disabled={loading}
              className="btn w-full"
            >
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              onClick={() => socialSignUp("github")}
              disabled={loading}
              className="btn mt-2 w-full"
            >
              GitHub দিয়ে চালিয়ে যান
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;

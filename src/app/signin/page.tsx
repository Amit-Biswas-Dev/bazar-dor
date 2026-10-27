
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignInPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    const { error } = await authClient.signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      callbackURL: "/",
    });

    if (error) {
      setError(error.message || "Sign-in failed");
      return;
    }

    router.push("/");
    router.refresh();
  };

  const socialSignIn = async (provider: "google" | "github") => {
    setError("");

    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });

    if (error) {
      setError(error.message || `${provider} sign-in failed`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-100 px-4">
      <form
        onSubmit={onSubmit}
        className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-sm border p-6"
      >
        <legend className="fieldset-legend text-lg">Sign In</legend>

        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          className="input w-full"
          placeholder="Email"
          required
        />

        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          className="input w-full"
          placeholder="Password"
          required
        />

        {error && <p className="text-sm text-error">{error}</p>}

        <button type="submit" className="btn btn-neutral mt-4 w-full">
          Sign In
        </button>

        <div className="divider">OR</div>

        <button
          type="button"
          onClick={() => socialSignIn("google")}
          className="btn btn-outline w-full"
        >
          Sign in with Google
        </button>

        <button
          type="button"
          onClick={() => socialSignIn("github")}
          className="btn btn-outline mt-3 w-full"
        >
          Sign in with GitHub
        </button>
      </form>
    </div>
  );
};

export default SignInPage;


"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUpPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    const { error } = await authClient.signUp.email({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      image: String(formData.get("image") ?? "") || undefined,
      callbackURL: "/",
    });

    if (error) {
      setError(error.message || "Sign-up failed");
      return;
    }

    router.push("/");
    router.refresh();
  };

  const socialSignUp = async (provider: "google" | "github") => {
    setError("");

    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });

    if (error) {
      setError(error.message || `${provider} sign-up failed`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Sign Up</legend>

          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            className="input w-full"
            placeholder="Name"
            autoComplete="name"
            required
          />

          <label className="label">Image URL</label>
          <input
            type="url"
            name="image"
            className="input w-full"
            placeholder="Image URL"
          />

          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input w-full"
            placeholder="Email"
            autoComplete="email"
            required
          />

          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input w-full"
            placeholder="Password"
            autoComplete="new-password"
            required
          />

          {error && <p className="text-sm text-error">{error}</p>}

          <button type="submit" className="btn btn-neutral mt-4 w-full">
            Sign Up
          </button>

          <div className="divider">OR</div>

          <button
            type="button"
            onClick={() => socialSignUp("google")}
            className="btn w-full"
          >
            Sign Up With Google
          </button>

          <button
            type="button"
            onClick={() => socialSignUp("github")}
            className="btn mt-2 w-full"
          >
            Sign Up With GitHub
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUpPage;

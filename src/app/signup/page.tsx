
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";

const SignUpPage = () => {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      image: String(formData.get("image") ?? ""),
    };

    const { data, error } = await authClient.signUp.email({
      ...user,
      image: user.image || undefined,
      callbackURL: "/",
    });

    if (data) {
      console.log("Signed up successfully:", data);
      router.push("/");
      router.refresh();
    }

    if (error) {
      console.log("Sign up error:", error);
    }
  };

  async function handleGoogleSignUp() {
        const data = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    }

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

          <button type="submit" className="btn btn-neutral mt-4 w-full">
            Sign Up
          </button>

          <div className="divider">OR</div>

          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="btn w-full"
          >
            Sign Up With Google
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUpPage;

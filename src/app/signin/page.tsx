
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignInPage = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || "Invalid email or password.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign-in error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage("");
    setGoogleLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || "Google sign-in failed.");
        setGoogleLoading(false);
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      setErrorMessage("Unable to sign in with Google. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-100 px-4">
      <div className="w-full max-w-sm">
        <form onSubmit={onSubmit}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-6">
            <legend className="fieldset-legend text-lg">Sign In</legend>

            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="input w-full"
              placeholder="Email"
              autoComplete="email"
              required
            />

            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="input w-full"
              placeholder="Password"
              autoComplete="current-password"
              required
            />

            {errorMessage && (
              <p className="text-sm text-error" role="alert">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-neutral mt-4 w-full"
              disabled={loading || googleLoading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="divider">OR</div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full"
              disabled={loading || googleLoading}
            >
              {googleLoading ? "Redirecting..." : "Sign in with Google"}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;

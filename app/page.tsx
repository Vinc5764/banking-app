"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Spinner from "@/components/Spinner";
import useTokenStore from "@/lib/store";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const { token, setToken } = useTokenStore();

  const r = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);
    setEmailError(null);
    setPasswordError(null);
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3005/users/login", {
        userid: email,
        password: password,
      });
      console.log(response);

      setIsLoading(false);
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("usertype", response.data.user.usertype);

      if (response.data) {
        r.push("/dashboard/");
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 404) {
          setEmailError("User does not exist");
        } else if (status === 401) {
          setPasswordError("Incorrect password");
        } else {
          setError("Login failed. Please try again.");
        }
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <form
      className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900"
      onSubmit={handleSubmit}
    >
      <Card className="mx-auto  max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="m@example.com"
                onChange={(e) => setEmail(e.target.value)}
                className={emailError ? "border-red-500" : ""}
                required
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href={`/forgotpass/`}
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className={passwordError ? "border-red-500" : ""}
                required
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              {isLoading ? <Spinner /> : "Login"}
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href={`/sign-up`} className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default Page;

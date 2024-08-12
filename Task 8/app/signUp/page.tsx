"use client";
import { FcGoogle } from "react-icons/fc";
import { DevTool } from "@hookform/devtools";
import { SubmitHandler, useForm } from "react-hook-form";
import WelcomeBack from "../logIn/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { poppins, epilogue } from "@/fonts/CustomFont";
import { FormData } from "@/types/formData";
import { signIn } from "next-auth/react";
import Cookies from "js-cookie";
import { cookies } from "next/headers";

const googleSignIn = async () => {
  await signIn("google", {
    callbackUrl: "/",
  });
};

const signUp = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const dataWithRole = { ...data, role: "user" };
    try {
      const response = await fetch("https://akil-backend.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataWithRole),
      });
      const result = await response.json();

      if (response.ok) {
        console.log("Form Submitted", data);
        Cookies.set("auth-token", result.token);
        router.push(`/otp?email=${encodeURIComponent(data.email)}`);
      } else {
        console.log("Error", data);
        alert(`Signup failed: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <>
      {/* <DevTool control={control} /> */}
      <div className="flex items-center justify-center pt-5">
        <div className="centerd-div w-[408px]">
          <h2
            className={`text-4xl h-[38px] text-center mb-4 text-[#25324B]  ${poppins.className} font-[900]`}
          >
            Sign Up Today!
          </h2>
          <button
            onClick={googleSignIn}
            className="flex h-[50px] items-center justify-center w-full py-2 mb-6 text-[#4640DE]  font-bold border border-gray-300 rounded-[5px]  hover:bg-gray-100"
          >
            <FcGoogle className="mr-2" />
            Sign Up with Google
          </button>
          <div className="flex items-center justify-between mb-6">
            <hr className="w-1/4 " />
            <span className="text-gray-500 text-sm">Or Sign Up with Email</span>
            <hr className="w-1/4" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="name mb-4">
              <label className="block text-[#515B6F] font-semibold">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter your full name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="error text-red-500">Name is required</p>
              )}
            </div>
            <div className="email mb-4">
              <label className="block text-[#515B6F] font-semibold">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="error text-red-500">
                  {errors.email.message?.toString()}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-[#515B6F] font-semibold">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500">Password is required</p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-[#515B6F] font-semibold">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter password"
                {...register("confirmPassword", {
                  required: "password ",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500">Password don't match</p>
              )}
            </div>
            <button
              type="submit"
              onSubmit={handleSubmit(onSubmit)}
              className="w-full py-2 mb-4 text-white bg-[#4640DE] rounded-lg hover:bg-blue-600"
            >
              Continue
            </button>
          </form>
          <p className="">
            Already have an account?{" "}
            <Link href="/logIn" className="text-[#4640DE] hover:underline ">
              Login
            </Link>
          </p>
          <p className="text-xs  text-gray-500 mt-3">
            By clicking 'Continue', you acknowledge that you have read and
            accepted our{" "}
            <a href="#" className="text-blue-700 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="" className="text-blue-700 hover:underline">
              Privacy Policy.
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default signUp;

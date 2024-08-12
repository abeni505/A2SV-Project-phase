"use client";
import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { poppins, epilogue } from "@/fonts/CustomFont";
import { useRouter } from "next/navigation";
import { FormData } from "@/types/formData";
import Cookie from "js-cookie";

const LogIn = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const email = data.email;
    const password = data.password;

    try {
      const response = await fetch("https://akil-backend.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log("Login Verified", data);
        Cookie.set("auth-token", data.token);
        router.push("/");
      } else {
        console.log("Error", data);
        alert(`Login failed: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <>
      {/* <DevTool control={control} /> */}
      <div className="body absolute top-[141px] left-[792px] w-[408px] h-[390px]">
        <div
          className={`font-[900] ${poppins.className} text-3xl h-[50px] text-center text-[#202430]  `}
        >
          Welcome Back,
        </div>
        <div className="flex items-center justify-between mb-6">
          <hr className="w-1/4 " /> <hr className="w-1/4" />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-[230px]"
          noValidate
        >
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
          <button
            type="submit"
            className="w-full py-2  text-white bg-[#4640DE] rounded-full hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link
            href="/signUp"
            className="text-[#4640DE] font-bold  hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
};

export default LogIn;

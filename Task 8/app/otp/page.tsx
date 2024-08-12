"use client";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { otpFormData } from "@/types/otpFormData";
import { useSearchParams } from "next/navigation";
import { FormData } from "@/types/formData";

const Otp = () => {
  const [seconds, setSeconds] = useState(30); // Countdown start at 30 seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true); // Initially disable resend link

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false); // Enable resend link when timer reaches 0
    }

    return () => {
      if (timer) {
        clearInterval(timer); // Clean up the interval on component unmount
      }
    };
  }, [seconds]);

  const { register, control, handleSubmit, getValues } = useForm<otpFormData>();

  const [inputValues, setInputValues] = useState(["", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const router = useRouter();

  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleInputChange = (index: number, value: string) => {
    const newValues = [...inputValues];
    newValues[index] = value;
    setInputValues(newValues);

    if (value && index < inputValues.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const onKeyDownHandler = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !inputValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const clickAble = inputValues.every((value) => value !== "");

  const resendCode = async () => {
    setIsResendDisabled(true); // Disable resend link again
    setSeconds(30); // Reset the timer to 30 seconds
    const role = "user";

    const data = { email, role };
    try {
      const response = await fetch("https://akil-backend.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok) {
        console.log("Form Submitted", data);
      } else {
        console.log("Error", data);
        alert(`Signup failed: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  const onSubmit = async () => {
    const otp = inputValues.join("");
    try {
      const response = await fetch(
        "https://akil-backend.onrender.com/verify-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log("OTP Verified", data);
        document.cookie = `auth-token=${data.token}; path=/`;
        router.push("/logIn");
      } else {
        console.log("Error", data);
        alert(`Signup failed: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex flex-col justify-evenly w-[409px] h-[483px] ">
          <div className="top mb-6">
            <h2 className="text-4xl font-extrabold mb-9 text-[#25324B] text-center">
              Verify Email
            </h2>
            <p className="text-[#7C8493] font-medium text-sm text-justify">
              We've sent a verification code to the email address you provided.
              To complete the verification process, please enter the code here.
            </p>
          </div>
          <div className="bottom mb-6 ">
            <div className="flex justify-between mb-6">
              {[...Array(4)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  placeholder="0"
                  className="w-[76px] h-[50px] border-2 border-[#4640DE66] bg-[#F8F8FD]  text-2xl text-center rounded-lg"
                  value={inputValues[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  ref={(el: HTMLInputElement | null) => {
                    if (el) {
                      inputRefs.current[index] = el;
                    }
                  }}
                  onKeyDown={(e) => onKeyDownHandler(e, index)}
                />
              ))}
            </div>
            <p className="text-[#7C8493] text-center">
              You can request to{" "}
              <button
                onClick={resendCode}
                className={`text-[#4640DE] font-bold hover:underline ${
                  isResendDisabled ? "cursor-not-allowed text-gray-400" : ""
                }`}
                disabled={isResendDisabled}
              >
                Resend code
              </button>{" "}
              in
            </p>
            <div className="font-bold text-[#4640DE] text-center">
              0:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
          </div>

          <button
            className={`py-2 text-white bg-[#4640DE] rounded-full 
              ${clickAble ? "" : "opacity-50 cursor-not-allowed"}`}
            disabled={!clickAble}
            onClick={() => {
              console.log("Continue button clicked");
              onSubmit();
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default Otp;

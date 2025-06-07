"use client";
import AssetsFiles from "@/assets";
import {
  getStrength,
  getStrengthLabel,
  PasswordStrengthMeter,
} from "@/components/Forms/AuthForm";
import {
  BadgeCheck,
  Eye,
  EyeOff,
  Fingerprint,
  Mail,
  MailOpen,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef } from "react";

const ResetPasswordPage = () => {
  return (
    <section className="max-h-screen h-screen">
      <div className="flex items-center justify-between px-5">
        <Image src={AssetsFiles.LogoTwo} alt="Logo" />
        <section className="flex items-center gap-1.5">
          <p className="text-base">Remember Password?</p>
          <Link className="text-[#15BA5C] text-base" href="/auth?signin">
            Sign in here
          </Link>
        </section>
      </div>
      <div className="my-6 flex items-center justify-center">
        {/* <ForgotPassword/> */}
        <PasswordResetSuccesful />
        {/* <CreateNewPassword /> */}
        {/* <OtpInput /> */}
      </div>
    </section>
  );
};

export default ResetPasswordPage;

function ForgotPassword() {
  return (
    <form className="flex flex-col justify-between items-center w-1/2 h-[75vh]">
      <div className="flex flex-col items-center justify-center w-full flex-grow gap-4">
        <div className="bg-[#15BA5C] px-5 py-3 rounded-xl">
          <Fingerprint className="text-white" />
        </div>
        <h3 className="text-xl text-center text-[#1E1E1E] font-bold">
          Forgot Password
        </h3>
        <p className="text-center">Enter your email for instructions</p>
        <div className="flex items-center border border-[#E6E6E6] rounded-xl p-4 w-full">
          <Mail className="text-[#1E1E1E]" />
          <span className="h-[30px] w-0.5 bg-[#E6E6E6] mx-1.5"></span>
          <div className="flex flex-col w-full">
            <label className="text-sm text-[#898989] mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="text-[#1E1E1E] text-base font-medium focus:outline-none"
            />
          </div>
        </div>
      </div>
      <button
        className="bg-[#15BA5C] text-white font-bold text-xl py-3.5 rounded-[10px] hover:bg-[#13a551] w-full"
        type="submit"
      >
        Send 4 Digit Code
      </button>
    </form>
  );
}

function OtpInput() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <form className="flex flex-col justify-between items-center w-1/2 h-[75vh]">
      <div className="flex flex-col items-center justify-center w-full flex-grow gap-4">
        <div className="bg-[#15BA5C] px-5 py-3 rounded-xl">
          <MailOpen className="text-white" />
        </div>
        <h3 className="text-xl text-center text-[#1E1E1E] font-bold">
          Enter your Code
        </h3>
        <p className="text-sm text-[#1E1E1E] flex gap-1 text-center">
          We sent a code to{""}
          <span className="font-bold">yourmail@gmail.com</span>
        </p>

        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <div className="flex gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                className="w-[55px] h-14 text-center text-xl border rounded-lg focus:outline-none focus:border-[#15BA5C] border-gray-300"
              />
            ))}
          </div>

          <p className="text-sm text-gray-600">
            Didn’t receive the email?
            <button className="text-black font-medium underline hover:text-green-600">
              Click to resend
            </button>
          </p>
        </div>
      </div>
      <button
        className="bg-[#15BA5C] text-white font-bold text-xl py-3.5 rounded-[10px] hover:bg-[#13a551] w-full"
        type="submit"
      >
        Continue
      </button>
    </form>
  );
}

function CreateNewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const strength = getStrength(newPassword);
  const { label } = getStrengthLabel(strength);

  return (
    <form className="flex flex-col justify-between items-center w-1/2 h-[75vh]">
      <div className="flex flex-col items-center justify-center w-full flex-grow gap-4">
        <div className="bg-[#15BA5C] px-5 py-3 rounded-xl">
          <MailOpen className="text-white" />
        </div>
        <h3 className="text-xl text-center text-[#1E1E1E] font-bold">
          Set New Password
        </h3>
        <p className="text-[18px] text-[#1E1E1E] flex gap-1 text-center">
          Create a very strong Password you can remember
        </p>
        <div className="w-full flex flex-col gap-3.5">
          <div className="flex items-center border border-[#E6E6E6] rounded-xl p-4 w-full relative">
            <Image src={AssetsFiles.PasswordIcon} alt="Password Icon" />
            <span className="h-[30px] w-0.5 bg-[#E6E6E6] mx-1.5"></span>
            <div className="flex flex-col w-full relative">
              <label className="text-sm text-[#898989] mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder={
                  showPassword ? "Enter Password" : "***************"
                }
                className="text-[#1E1E1E] text-base font-medium focus:outline-none pr-8"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-4 text-[#1E1E1E] cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center border border-[#E6E6E6] rounded-xl p-4 w-full relative">
            <Image src={AssetsFiles.PasswordIcon} alt="Password Icon" />
            <span className="h-[30px] w-0.5 bg-[#E6E6E6] mx-1.5"></span>
            <div className="flex flex-col w-full relative">
              <label className="text-sm text-[#898989] mb-1">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder={
                  showConfirmPassword
                    ? "Enter Confirm Password"
                    : "***************"
                }
                className="text-[#1E1E1E] text-base font-medium focus:outline-none pr-8"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-4 text-[#1E1E1E] cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 p-4 w-full">
          {newPassword && <PasswordStrengthMeter password={newPassword} />}
          {newPassword && (
            <p className="text-sm text-gray-600 mt-1 text-left">{label}</p>
          )}
        </div>
      </div>
      <button
        className="bg-[#15BA5C] text-white font-bold text-xl py-3.5 rounded-[10px] hover:bg-[#13a551] w-full"
        type="submit"
      >
        Continue
      </button>
    </form>
  );
}

function PasswordResetSuccesful() {
  return (
    <form className="flex flex-col justify-between items-center w-1/2 h-[75vh]">
      <div className="flex flex-col items-center justify-center w-full flex-grow gap-4">
        <div className="bg-[#15BA5C] px-5 py-3 rounded-xl">
          <BadgeCheck className="text-white" />
        </div>
        <h3 className="text-xl text-center text-[#1E1E1E] font-bold">
          All Done
        </h3>
        <p className="text-sm text-[#1E1E1E] flex gap-1 text-center">
          Your Password has been reset successsfully
        </p>
      </div>

      <Link
        href="/auth?signin"
        className="bg-[#15BA5C] text-center text-white font-bold text-xl py-3.5 rounded-[10px] hover:bg-[#13a551] w-full"
      >
        Log in
      </Link>
    </form>
  );
}

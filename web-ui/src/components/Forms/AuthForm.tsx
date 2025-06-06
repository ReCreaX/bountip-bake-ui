"use client";
import { BriefcaseBusiness, LockKeyhole, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AssetsFiles from "@/assets";
import { useModalStore } from "@/stores/useUIStore";
import { useAuthStore } from "@/stores/useAuthStore";
import PinInput from "../Inputs/PinInput";

type Props = {
  mode: "signin" | "signup";
};

const signupSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signinSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormValues = z.infer<typeof signupSchema>;
type SigninFormValues = z.infer<typeof signinSchema>;
type FormValues = SignupFormValues | SigninFormValues;

const AuthForm = ({ mode }: Props) => {
  const [password, setPassword] = useState("");
  const { setShowSignUpSuccessModal } = useModalStore();
  const { pinLogin, setPinLogin } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(mode === "signup" ? signupSchema : signinSchema),
  });

  const strength = getStrength(password);
  const { label } = getStrengthLabel(strength);

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    setShowSignUpSuccessModal(true);
  };

  useEffect(() => {
    setPassword("");
  }, [pinLogin, mode]);

  const hasSignupErrors = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any
  ): errors is Partial<Record<keyof SignupFormValues, { message: string }>> => {
    return mode === "signup";
  };

  return (
    <AnimatePresence mode="wait">
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        key={mode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full flex flex-col gap-[24px]"
      >
        {!pinLogin && (
          <>
            {/* Business Name */}
            <div className="flex items-center border border-[#E6E6E6] rounded-xl p-4 w-full">
              <BriefcaseBusiness className="text-[#1E1E1E]" />
              <span className="h-[30px] w-0.5 bg-[#E6E6E6] mx-1.5"></span>
              <div className="flex flex-col w-full">
                <label className="text-sm text-[#898989] mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Business Name"
                  className="text-[#1E1E1E] text-base font-medium focus:outline-none"
                  {...register("businessName")}
                />
                {errors.businessName && (
                  <span className="text-sm text-red-500 mt-1">
                    {errors.businessName.message}
                  </span>
                )}
              </div>
            </div>

            {/* Signup Only Fields */}
            {mode === "signup" && (
              <>
                {/* Full Name */}
                <div className="flex items-center border border-[#E6E6E6] rounded-xl p-4 w-full">
                  <User className="text-[#1E1E1E]" />
                  <span className="h-[30px] w-0.5 bg-[#E6E6E6] mx-1.5"></span>
                  <div className="flex flex-col w-full">
                    <label className="text-sm text-[#898989] mb-1">
                      Representative Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Full Name"
                      className="text-[#1E1E1E] text-base font-medium focus:outline-none"
                      {...register("fullName" as keyof FormValues)}
                    />
                    {hasSignupErrors(errors) && errors.fullName && (
                      <span className="text-sm text-red-500 mt-1">
                        {errors.fullName.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center border border-[#E6E6E6] rounded-xl p-4 w-full">
                  <Mail className="text-[#1E1E1E]" />
                  <span className="h-[30px] w-0.5 bg-[#E6E6E6] mx-1.5"></span>
                  <div className="flex flex-col w-full">
                    <label className="text-sm text-[#898989] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      className="text-[#1E1E1E] text-base font-medium focus:outline-none"
                      {...register("email" as keyof FormValues)}
                    />
                    {hasSignupErrors(errors) && errors.email && (
                      <span className="text-sm text-red-500 mt-1">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Password Field */}
            <div className="flex items-center border border-[#E6E6E6] rounded-xl p-4 w-full">
              <Image src={AssetsFiles.PasswordIcon} alt="Password Icon" />
              <span className="h-[30px] w-0.5 bg-[#E6E6E6] mx-1.5"></span>
              <div className="flex flex-col w-full relative">
                <label className="text-sm text-[#898989] mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="text-[#1E1E1E] text-base font-medium focus:outline-none"
                  {...register("password")}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <span className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>

            {/* Password Strength */}
            {password && <PasswordStrengthMeter password={password} />}
            {password && <p className="text-sm text-gray-600 mt-1">{label}</p>}
          </>
        )}

        {/* PIN input screen */}
        {mode === "signin" && pinLogin && <PinInput />}

        {/* Submit button - always visible */}
        <button
          className="bg-[#15BA5C] text-white font-bold text-xl py-3.5 rounded-[10px] hover:bg-[#13a551]"
          type="submit"
        >
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </button>

        {/* Agreement (signup only) */}
        {!pinLogin && mode === "signup" && (
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="agreement"
              className="mt-1 h-4 w-4 accent-[#15BA5C]"
              required
            />
            <label htmlFor="agreement" className="text-sm text-gray-600">
              By checking this box, you agree to our{" "}
              <Link href="/privacy-policy" className="text-[#15BA5C] underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/terms-and-conditions"
                className="text-[#15BA5C] underline"
              >
                Terms & Conditions
              </Link>
              .
            </label>
          </div>
        )}

        {/* Forgot password (signin only) */}
        {!pinLogin && mode === "signin" && (
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-[#15BA5C] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        )}

        {/* Divider */}
        {!pinLogin && (
          <div className="flex items-center w-full my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-sm text-gray-500">Or Continue With</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
        )}

        {/* Google Auth Button */}
        {!pinLogin && (
          <button
            className="flex items-center justify-center gap-2 border py-3.5 rounded-[10px] border-[#E6E6E6] hover:bg-gray-50 transition-colors"
            type="button"
          >
            <Image src={AssetsFiles.GoogleIcon} alt="Google Icon" />
            <span className="text-[#1E1E1E] text-[17px] font-normal">
              {mode === "signup" ? "Sign Up With Google" : "Login With Google"}
            </span>
          </button>
        )}

        {/* Toggle between Email and PIN login */}
        {mode === "signin" && (
          <button
            className="flex items-center justify-center gap-2 border py-3.5 rounded-[10px] border-[#E6E6E6] hover:bg-gray-50 transition-colors"
            type="button"
            onClick={() => setPinLogin(!pinLogin)}
          >
            <LockKeyhole />
            <span className="text-[#1E1E1E] text-[17px] font-normal">
              {pinLogin ? "Login with Email" : "Login with Pin"}
            </span>
          </button>
        )}
      </motion.form>
    </AnimatePresence>
  );
};

export default AuthForm;

// Utility functions with proper TypeScript types
export const getStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 1) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
};

interface StrengthLabel {
  label: string;
  color: string;
}

export const getStrengthLabel = (strength: number): StrengthLabel => {
  switch (strength) {
    case 0:
    case 1:
      return { label: "Weak Password!", color: "bg-red-500" };
    case 2:
    case 3:
      return { label: "Average Password", color: "bg-yellow-400" };
    case 4:
      return { label: "Strong Password", color: "bg-green-500" };
    default:
      return { label: "", color: "" };
  }
};

interface PasswordStrengthMeterProps {
  password: string;
}

export const PasswordStrengthMeter = ({ password }: PasswordStrengthMeterProps) => {
  const strength = getStrength(password);
  const { color } = getStrengthLabel(strength);

  return (
    <div className="w-full flex space-x-1 h-2">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`flex-1 rounded transition-all duration-300 ${
            i < strength ? color : "bg-[#E6E6E6]"
          }`}
        />
      ))}
    </div>
  );
};

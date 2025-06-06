"use client";
import AssetsFiles from "@/assets";
import Image from "next/image";
import { useEffect, useState } from "react";
import AuthForm from "@/components/Forms/AuthForm";
import { useModalStore } from "@/stores/useUIStore";
import SuccessModal from "@/components/Modals/Auth/SuccessModal";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter, useSearchParams } from "next/navigation";

const SignInPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [active, setActive] = useState<"signin" | "signup">("signup");
  const { showsignUpSuccessModal } = useModalStore();
  const { setPinLogin } = useAuthStore();

  useEffect(() => {
    const modeParam =
      searchParams.get("signin") !== null
        ? "signin"
        : searchParams.get("signup") !== null
        ? "signup"
        : null;

    if (modeParam === "signin" || modeParam === "signup") {
      setActive(modeParam);
    }
  }, [searchParams]);

  const handleActiveClick = (tab: "signin" | "signup") => {
    setPinLogin(false);
    setActive(tab);
    const newQuery = tab === "signin" ? "?signin" : "?signup";
    router.replace(`/auth${newQuery}`);
  };

  return (
    <section className="min-h-screen flex">
      <aside className="flex-1">
        <Image
          src={AssetsFiles.AuthBgImage}
          className="h-full w-full object-cover"
          height={100}
          width={100}
          alt="Auth pages"
        />
      </aside>

      <section className="flex-1 flex items-center justify-center my-12">
        <section className="flex items-center justify-center flex-col gap-3.5 w-[450px] ">
          <Image src={AssetsFiles.LogoTwo} alt="Logo" />
          <h3 className="text-[#1E1E1E] font-bold text-[45px]">Welcome Back</h3>
          <p className="text-[#1E1E1E] text-[25px] font-light text-center">
            Welcome back, Please Enter your details
          </p>

          <div className="inline-flex bg-gray-100 w-full rounded-md p-1 my-2.5">
            <button
              onClick={() => handleActiveClick("signin")}
              className={`px-4 py-2 rounded-md transition-all duration-200  flex-1 ${
                active === "signin"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => handleActiveClick("signup")}
              className={`px-4 py-2 rounded-md transition-all duration-200 flex-1 ${
                active === "signup"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Sign Up
            </button>
          </div>

          <AuthForm mode={active} />
        </section>
      </section>
      {showsignUpSuccessModal && <SuccessModal />}
    </section>
  );
};

export default SignInPage;

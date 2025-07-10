

"use client";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { handleGoogleSignIn } from "@/utils/firebase/firebaseConfig";
import authService from "@/services/authServices";
import Image from "next/image";
import { useRef } from "react";
import AssetsFiles from "@/assets";
import { ApiResponseType } from "@/types/httpTypes";

interface GoogleSignInProps {
  mode: "signup" | "signin";
}



const GoogleSignIn = ({ mode }: GoogleSignInProps) => {
  const router = useRouter();
  const googleLoginRef = useRef<HTMLDivElement>(null);

  const handleGoogleLogin = async (firebaseId: string) => {
    console.log(firebaseId, "This is the firebase");
    const response = await authService.googleLogin(firebaseId) as ApiResponseType;
    console.log(response, "This is our response");
    if (response.status) {
      toast.success("Google sign-in successful");
      router.push("/dashboard");
      return;
    }

    toast.error("Error occurred while google sign in");
  };

 


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleGoogleAuth = async (credentialResponse:any) => {
    console.log(credentialResponse)
    if (credentialResponse.credential) {
      try {
        const userCredential = await handleGoogleSignIn(
          credentialResponse.credential
        );
        handleGoogleLogin(userCredential.user.uid as string);

        console.log("Signed in user:", userCredential.user.uid);
      } catch (error) {
        console.error("Google sign-in error:", error);
        toast.error("Google sign-in failed");
      }
    }
  };

  const triggerGoogleLogin = () => {
    // Find and click the actual Google login button
    const googleButton = googleLoginRef.current?.querySelector(
      '[role="button"]'
    ) as HTMLButtonElement;
    if (googleButton) {
      googleButton.click();
    }
  };

  return (
    <GoogleOAuthProvider
      clientId={
        "1080949035782-0k8mn49hvuc9q9loc10er0idr08lm4cl.apps.googleusercontent.com"
      }
    >
      {/* Your custom button */}
      <button
        type="button"
        className="flex items-center justify-center gap-2 border py-3.5 rounded-[10px] border-[#E6E6E6] hover:bg-gray-50 transition-colors w-full"
        onClick={triggerGoogleLogin}
      >
        <Image src={AssetsFiles.GoogleIcon} alt="Google Icon" />
        <span className="text-[#1E1E1E] text-[17px] font-normal">
          {mode === "signup" ? "Sign Up With Google" : "Login With Google"}
        </span>
      </button>

      {/* Hidden Google Login Component */}
      <div
        ref={googleLoginRef}
        className="opacity-0 absolute pointer-events-none -z-10 overflow-hidden"
        style={{ width: "1px", height: "1px" }}
      >
        <GoogleLogin
          onSuccess={handleGoogleAuth}
          onError={() => {
            toast.error("Google login failed");
          }}
          useOneTap={false}
          size="large"
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleSignIn;
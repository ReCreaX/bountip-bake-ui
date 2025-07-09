"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import authService from "@/services/authServices";
import { COOKIE_NAMES, setCookie } from "@/utils/cookiesUtils";
import { UserType } from "@/types/userTypes";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const error = searchParams.get("error");

        if (error) {
          setError("Google OAuth was cancelled or failed");
          toast.error("Google OAuth cancelled", {
            duration: 4000,
            position: "bottom-right",
          });
          setTimeout(() => router.push("/auth?signin"), 3000);
          return;
        }

        if (!code || !state) {
          setError("Missing required parameters");
          toast.error("OAuth callback failed", {
            duration: 4000,
            position: "bottom-right",
          });
          setTimeout(() => router.push("/auth?signin"), 3000);
          return;
        }

        // Handle the callback
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response:any = await authService.handleGoogleCallback(code, state);

        if (response.error) {
          setError(response.message || "OAuth authentication failed");
          toast.error(response.message || "OAuth authentication failed", {
            duration: 4000,
            position: "bottom-right",
          });
          setTimeout(() => router.push("/auth?signin"), 3000);
          return;
        }

        if (response.status && response.data) {
          // Store user data
          const userData: UserType = {
            id: response.data.user.id,
            fullName: response.data.user.fullName,
            email: response.data.user.email,
            status: response.data.user.status,
            lastLoginAt: response.data.user.lastLoginAt,
            createdAt: response.data.user.createdAt,
            userType: response.data.user.userType,
          };

          setCookie(COOKIE_NAMES.BOUNTIP_LOGIN_USER, userData);

          // Store tokens
          setCookie(COOKIE_NAMES.BOUNTIP_LOGIN_USER_TOKENS, {
            accessToken: response.data.tokens.accessToken,
            refreshToken: response.data.tokens.refreshToken,
          });

          toast.success("Google OAuth successful", {
            duration: 4000,
            position: "bottom-right",
          });

          // Redirect to dashboard
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("OAuth callback error:", error);
        setError("An unexpected error occurred");
        toast.error("An unexpected error occurred", {
          duration: 4000,
          position: "bottom-right",
        });
        setTimeout(() => router.push("/auth?signin"), 3000);
      } finally {
        setIsLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#15BA5C] mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Processing Google OAuth...
          </h2>
          <p className="text-gray-600">
            Please wait while we authenticate you.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <div className="text-red-500 mb-4">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            OAuth Failed
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            Redirecting to sign in page...
          </p>
        </div>
      </div>
    );
  }

  return null;
}

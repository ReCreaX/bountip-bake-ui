"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/utils/cookiesUtils";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie<{
      accessToken: string;
      refreshToken: string;
    }>("bountipLoginUserTokens");

    if (token?.accessToken) {
      router.push("/dashboard");
    } else {
      router.push("/auth?signin");
    }
  }, [router]);

  return null; // Nothing to render
}

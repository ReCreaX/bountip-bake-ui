import {
  SignupData,
  ForgotPasswordData,
  PinLoginData,
  SigninData,
  VerifyEmailData,
  ResetPasswordData,
} from "@/types/authTypes";
import getBaseUrl, { BaseUrlProdType } from "./baseUrl";
import { getCookie } from "@/utils/cookiesUtils";

class AuthService {
  private baseUrl: string;

  constructor(env: BaseUrlProdType = "local") {
    this.baseUrl = getBaseUrl(env);
  }

  async signup(data: SignupData) {
    return this.post("/auth/signup", data);
  }

  async verifyEmail({ email, otp }: VerifyEmailData) {
    return this.post("/auth/verify", { email, otp });
  }

  async signin(data: SigninData) {
    return this.post("/auth/login", {
      email: data.email,
      passCode: data.password,
      mode: "password",
    });
  }

  async pinLogin(data: PinLoginData) {
    const Token = getCookie<{
      accessToken: string;
      refreshToken: string;
    }>("bountipRegisteredUsers");
    return this.post(
      "/auth/set-pin",
      {
        pin: data.pin,
      },
      Token?.accessToken
    );
  }

  async forgotPassword(data: ForgotPasswordData) {
    return this.post("/auth/forgot-password", data);
  }

  async resetPassword(data: ResetPasswordData) {
    return this.post("/auth/reset-password", {
      otp: data.token,
      email: data.email,
      newPassword: data.password,
    });
  }

  private async post(path: string, data: unknown, authBearerToken?: string) {
    console.log(this.baseUrl, path, data);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (authBearerToken) {
      headers["Authorization"] = `Bearer ${authBearerToken}`;
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return { error: true, message: error.message || "Request Failed" };
    }

    return response.json();
  }
}

export default AuthService;

export const authService = new AuthService();

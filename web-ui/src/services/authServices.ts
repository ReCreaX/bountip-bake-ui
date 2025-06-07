import {
  SignupData,
  ForgotPasswordData,
  PinLoginData,
  SigninData,
  VerifyEmailData,
} from "@/types/authTypes";
import getBaseUrl, { BaseUrlProdType } from "./baseUrl";

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
    return this.post("/auth/signin", data);
  }

  async pinLogin(data: PinLoginData) {
    return this.post("/auth/pin-login", data);
  }

  async forgotPassword(data: ForgotPasswordData) {
    return this.post("/auth/forgot-password", data);
  }

  async resetPassword(token: string, newPassword: string) {
    return this.post("/auth/reset-password", { token, newPassword });
  }

  private async post(path: string, data: unknown) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

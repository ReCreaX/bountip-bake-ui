import {
  SignupData,
  ForgotPasswordData,
  PinLoginData,
  SigninData,
  VerifyEmailData,
  ResetPasswordData,
} from "@/types/authTypes";
import { HttpService } from "./httpService";
import { COOKIE_NAMES, getCookie } from "@/utils/cookiesUtils";

class AuthService {
  private request = new HttpService();
  private baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://seal-app-wzqhf.ondigitalocean.app/api/v1";

  async signup(data: SignupData) {
    return this.request.post("/auth/signup", data);
  }

  async verifyEmail({ email, otp }: VerifyEmailData) {
    return this.request.post("/auth/verify", { email, otp });
  }

  async signin(data: SigninData) {
    return this.request.post("/auth/login", {
      email: data.email,
      passCode: data.password,
      mode: "password",
    });
  }

  async signInViaPin(data: PinLoginData) {
    const cookie = getCookie<{ email: string }>(
      COOKIE_NAMES.BOUNTIP_LOGIN_USER
    );
    const email = cookie?.email;
    return this.request.post("/auth/login", {
      email: email,
      passCode: data.pin,
      mode: "pin",
    });
  }

  async pinLogin(data: PinLoginData) {
    return this.request.post(
      "/auth/set-pin",
      { pin: data.pin },
      COOKIE_NAMES.BOUNTIP_REGISTERED_USERS
    );
  }

  async forgotPassword(data: ForgotPasswordData) {
    return this.request.post("/auth/forgot-password", data);
  }

  async resetPassword(data: ResetPasswordData) {
    return this.request.post("/auth/reset-password", {
      otp: data.token,
      email: data.email,
      newPassword: data.password,
    });
  }

  /**
   * Starts Google OAuth flow by redirecting user to Google's auth URL
   */
  startGoogleOauth(): void {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!clientId) {
      throw new Error("Google Client ID is not configured");
    }

    const googleAuthUrl = new URL(
      "https://accounts.google.com/o/oauth2/v2/auth"
    );

    const state = this.generateRandomState();

    const params = {
      client_id: clientId,
      redirect_uri: `${window.location.origin}/auth/google/callback`,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline",
      prompt: "consent",
      state,
    };

    Object.entries(params).forEach(([key, value]) => {
      googleAuthUrl.searchParams.append(key, value);
    });

    // Store CSRF state
    sessionStorage.setItem("google_oauth_state", state);

    // Redirect to Google
    window.location.href = googleAuthUrl.toString();
  }

  /**
   * Handles Google OAuth callback after redirection
   */
  async handleGoogleCallback(code: string, state: string) {
    const storedState = sessionStorage.getItem("google_oauth_state");
    if (state !== storedState) {
      throw new Error("Invalid state parameter");
    }

    sessionStorage.removeItem("google_oauth_state");

    return this.request.post("/auth/google-login", {
      code,
      redirect_uri: `${window.location.origin}/auth/google/callback`,
    });
  }

  private generateRandomState(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
}

const authService = new AuthService();
export default authService;
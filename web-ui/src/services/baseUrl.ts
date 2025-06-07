export type BaseUrlProdType = "local" | "live";

const getBaseUrl = (env: BaseUrlProdType): string =>
  env === "live" ? "http://your-live-url.com/api" : "http://localhost:5000";

export default getBaseUrl;

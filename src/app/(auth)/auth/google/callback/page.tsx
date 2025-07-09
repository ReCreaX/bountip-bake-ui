import { Suspense } from "react";
import GoogleCallbackPage from "./GoogleCallbackPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoogleCallbackPage />
    </Suspense>
  );
}

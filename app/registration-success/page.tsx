import { Suspense } from "react";
import RegistrationDetails from "./registration-details";

export default function RegistrationSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#004aad]"></div>
        </div>
      }
    >
      <RegistrationDetails />
    </Suspense>
  );
}

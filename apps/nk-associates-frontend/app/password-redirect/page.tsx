"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

const PasswordRedirect = () => {
  const searchParams = useSearchParams();

  const code = searchParams.get("code");

  console.log(code);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      {/* {isMobile && (
        <div className="flex flex-col justify-center">
          <h3 className="font-metropolis-semibold text-2xl max-w-md text-nk-red mb-4">
            Thank you for verification
          </h3>
          <h4 className="text-center mb-7">You can continue using the App</h4>
          <LinkButton
            text="open app"
            clickEvent={() => {
              window.location.href = "nkapp://app/Login";
            }}
          />
        </div>
      )} */}
    </div>
  );
};

export default PasswordRedirect;

"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import LinkButton from "../../components/button/link-button";

const PasswordRedirect = () => {
  const searchParams = useSearchParams();

  const code = searchParams.get("code");

  console.log(code);

  useEffect(() => {
    console.log("useEffect called");
    window.location.href = "nkapp://app/NewPassword?code=1234";
  }, []);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <LinkButton
        text="open app"
        clickEvent={() => {
          window.location.href = "nkapp://app/NewPassword?code=1234";
        }}
      />
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

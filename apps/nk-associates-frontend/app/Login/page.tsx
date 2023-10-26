"use client";
import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import LinkButton from "../../components/button/link-button";

const LoginRedirect = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    if (
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      /Android/.test(navigator.userAgent)
    ) {
      setIsMobile(true);
      window.location.href = "nkapp://app/Login";
    } else {
      notFound();
    }
  }, [isMobile]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      {isMobile && (
        <div className="flex flex-col justify-center max-w-md">
          <h3 className="font-metropolis-semibold text-center text-2xl  text-nk-red mb-4">
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
      )}
    </div>
  );
};

export default LoginRedirect;

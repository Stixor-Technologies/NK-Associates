"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import LinkButton from "../../components/button/link-button";

const PasswordRedirect = () => {
  const searchParams = useSearchParams();

  const code = searchParams.get("code");

  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    if (
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      /Android/.test(navigator.userAgent)
    ) {
      setIsMobile(true);
      window.location.href = `nkapp://app/NewPassword?code=${code}`;
    } else {
      notFound();
    }
  }, [isMobile]);

  return (
    <div className="container min-h-[50vh] flex items-center justify-center">
      {isMobile && (
        <div className="flex flex-col justify-center max-w-md">
          <h3 className="font-metropolis-semibold text-center text-2xl max-w-md text-nk-red mb-4">
            Password Reset Request
          </h3>
          <h4 className="text-center mb-7">
            You can change your password by clicking on the button below
          </h4>
          <LinkButton
            text="Change Password"
            clickEvent={() => {
              window.location.href = `nkapp://app/NewPassword?code=${code}`;
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PasswordRedirect;

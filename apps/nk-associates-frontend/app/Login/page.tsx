"use client";
import React, { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import LinkButton from "../../components/button/link-button";
import Link from "next/link";

const Login = () => {
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    if (
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      /Android/.test(navigator.userAgent)
    ) {
      // setIsMobile(true);
    } else {
      // notFound();
    }
  }, [isMobile]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      {isMobile && (
        <div>
          <h3 className="font-metropolis-semibold text-2xl max-w-md text-nk-red mb-4">
            Thank you for verification
          </h3>
          <h4 className="text-center">You can continue using the App</h4>
          <a href={`${encodeURIComponent("nkapp://app/Login")}`}>jajaj</a>
          <LinkButton
            text="open app"
            clickEvent={() => {
              window.location.replace(encodeURIComponent("nkapp://app/Login"));
              // router.push("https://nkapp://app/Login");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Login;

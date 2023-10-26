"use client";
import React, { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import LinkButton from "../../components/button/link-button";
import Link from "next/link";

const Login = () => {
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    // window.location.href = "https://nkapp://app/Login";
    // window.location.href = "nkapp://app";
    window.open("nkapp://app/login");

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
              // window.location.href = encodeURI("nkapp://app/Login");
              // router.push(encodeURI("nkapp://app/Login"));
              window.location.href = "nkapp://app";

              // "https://play.google.com/store/apps/details?id=com.example.app"; // Android
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Login;

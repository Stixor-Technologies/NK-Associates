"use client"; // Error components must be Client Components

import { useEffect } from "react";
import LinkButton from "../../components/button/link-button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2>Something went wrong!</h2>
      <LinkButton
        text="Try Again"
        type="solid"
        clickEvent={() => reset()}
        className="w-96"
      />
    </div>
  );
}

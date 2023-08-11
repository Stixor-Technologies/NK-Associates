"use client"; // Error components must be Client Components

import { useEffect } from "react";

import { ErrorBoundry } from "../components/errorboundry";

export default function Error({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <ErrorBoundry error={error} />;
}

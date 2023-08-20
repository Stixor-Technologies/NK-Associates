"use client"; // Error components must be Client Components

import { useEffect } from "react";

import LinkButton from "../../../../components/button/link-button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error at 3D model: ", error);
  }, [error]);

  return (
    <div className="bg-nk-red/20 ">
      <section className="container w-full flex justify-between items-center py-4">
        <p className="mr-8">
          <b className="font-metropolis-bold font-bold">ERROR: </b> Something
          went wrong while loading the 3D model.
        </p>

        <LinkButton
          className="min-w-[7.5rem]"
          text="Try again"
          clickEvent={() => reset()}
        />
      </section>
    </div>
  );
}

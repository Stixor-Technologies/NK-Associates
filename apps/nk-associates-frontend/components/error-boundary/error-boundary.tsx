import { useMemo } from "react";
import { useRouter } from "next/navigation";
import LinkButton from "../button/link-button";
import Image from "next/image";
import Error from "../../public/assets/images/Error.svg"

const ErrorBoundary = ({ error }: { error: Error }) => {
  const router = useRouter();

  const isDevEnv = useMemo(() => {
    return process.env["NEXT_PUBLIC_ENV"] === "development";
  }, []);

  return (
    <section className="container mx-auto my-10 flex w-full flex-col items-center">
      <div className="justify-center items-center mx-auto">
        <Image src={Error} alt="Something has gone wrong"/>
      </div>
      <h2 className="my-10 font-metropolis-bold text-base md:text-3xl">Something Went Wrong!</h2>
      {isDevEnv && (
        <>
          <h3 className="mb-6 rounded-md bg-red-600 p-4 text-xl text-white">
            <b className="font-metropolis-bold font-bold">ERROR: </b>
            {error.message}
            <br />
            <span className="text-sm">
              Check console for detailed error messages.
            </span>
          </h3>
        </>
      )}

      <LinkButton
        text="Go Back"
        className="px-6"
        clickEvent={() => router.back()}
      />
    </section>
  );
};

export default ErrorBoundary;

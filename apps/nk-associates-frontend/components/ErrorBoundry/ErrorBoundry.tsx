import { useMemo } from "react";
import { useRouter } from "next/navigation";
import LinkButton from "../../components/button/link-button";

const ErrorBoundry = ({ error }: { error: Error }) => {
  const router = useRouter();

  const isDevEnv = useMemo(() => {
    return process.env["NEXT_PUBLIC_ENV"] === "development";
  }, []);

  return (
    <section className="container mx-auto my-10 flex w-full flex-col items-center">
      <h2 className="mb-10 text-2xl">Something went wrong!</h2>
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
        clickEvent={
          // Attempt to recover by trying to re-render the segment
          () => router.back()
        }
      />
    </section>
  );
};

export default ErrorBoundry;

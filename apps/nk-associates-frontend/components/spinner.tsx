import React, { FC } from "react";

interface SpinnerProps {
  color?: string;
  width?: string;
  height?: string;
}

const Spinner: FC<SpinnerProps> = ({
  color = "text-nk-red",
  width = "w-12",
  height = "h-12",
}) => {
  return (
    <div
      className="m-auto flex items-center justify-center text-center h-full w-full"
      role="status"
    >
      <svg
        className={`animate-spin ${width} ${height} ${color}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          stroke="currentColor"
          stroke-width="4"
          cx="12"
          cy="12"
          r="10"
        ></circle>
        <path
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;

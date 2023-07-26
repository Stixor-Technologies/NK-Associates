import React, {FC} from "react";


const Spinner: FC = () => {
  return (
    <div className="m-auto overflow-hidden text-center" role="status">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={`inline-block w-14 h-14 animate-spin fill-nk-red text-gray-200 dark:text-gray-600`}
        width="80"
        height="80"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        aria-label="blocks-loading"
        data-testid="color-ring-svg"
        aria-busy="true"
        role="status"
      >
        <defs>
          <mask id="ldio-4offds5dlws-mask">
            <circle
              cx="50"
              cy="50"
              r="26"
              fill="transparent"
              stroke="#fff"
              strokeLinecap="round"
              strokeDasharray="122.52211349000194 40.840704496667314"
              strokeWidth="9"
            />
          </mask>
        </defs>
        <g mask="url(#ldio-4offds5dlws-mask)">
          <rect x="14.5" y="14.5" width="70" height="70" />
        </g>
      </svg>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;

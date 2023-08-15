import React, {FC} from "react";
import Image from "next/image";
import Error_Icon from "../../public/assets/icons/error.svg"
import Success_Icon from "../../public/assets/icons/success.svg"


interface ToastProps {
  message: string;
};

const Toast: FC<ToastProps> = ({ message }) => {
  return (
    <div
      id="toast-top-right"
      className={`space-x absolute top-2 right-5 z-[100] mt-10 flex w-full max-w-xs items-center space-x-4 rounded-lg p-4 text-medium-gray shadow ${
        message.includes("Error") ? "bg-red-500" : "bg-green-500"
      }`}
      role="alert"
    >
      <div>
        <Image
          alt=""
          width={35}
          height={35}
          src={
            message.includes("Error")
              ? Error_Icon
              : Success_Icon
          }
        />
      </div>
      <div className="text-sm font-normal text-white">{message}</div>
    </div>
  );
};

export default Toast;

import React from "react";
import Image from "next/image";
import CursorIcon from "../../public/assets/icons/cursor-icon.svg";

const Cursor = () => {
  return (
    <div className=" w-20 h-20 flex justify-center items-center rounded-full bg-nk-white">
      <Image src={CursorIcon} width={25} height={25} alt="cursor-icon" />
    </div>
  );
};

export default Cursor;

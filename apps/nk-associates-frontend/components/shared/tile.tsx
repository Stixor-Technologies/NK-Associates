import React, { FC } from "react";

interface TileProps {
    label: string;
    value: string;
    round?: "left" | "right";
    className?: string;
}
{/* <div className={`flex flex-col gap-1 bg-white px-4 py-2 md:min-w-[150px] ${round === "left" ? "rounded-l-xl" : round === "right" ? "rounded-r-xl" : ""}`}> */}

const Tile: FC<TileProps> = ({label, value, round, className}) => {
  return (
<div className={`flex flex-col gap-1 bg-white px-4 py-2 md:min-w-[150px] ${className}`}>
        <span className="text-xs text-nk-red font-metropolis-medium md:text-xl">{label}</span>
        <span className="font-metropolis-light text-sm text-nk-black md:text-2xl">
          {value}
        </span>
      </div>
  );
};

export default Tile;

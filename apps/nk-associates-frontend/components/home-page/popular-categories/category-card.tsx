import React from "react";
import Link from "next/link";
import Image from "next/image";

const CategoryCard = () => {
  return (
    // <div className="max-w-[384px] min-w-[374px] w-full">
    <Link
      href={`/properties}`}
      className="group relative inline-block max-w-[384px] min-w-[374px] w-full"
    >
      {/* before:content-[''] before:absolute before:block before:w-full before:h-full before:bg-slate-500 group-hover:before:z-10 */}
      <div className="aspect-w-1 aspect-h-1 group relative w-full max-w-[37.5rem] overflow-hidden h-[358px] rounded-xl  before:transition-all before:duration-500 before:ease-in-out before:content-[''] before:absolute before:block before:w-full before:h-full before:bg-overlay-black before:opacity-0 before:z-10 group-hover:before:opacity-100 ">
        {/* group-hover:opacity-50 */}
        <Image
          src={"/assets/images/bg-project.jpeg"}
          fill
          alt=""
          className="object-cover "
        />
      </div>
      <p className="absolute w-full bottom-6 text-nk-white text-2xl font-metropolis-bold bg-fade-red py-3 z-20">
        <span className="mx-8">Commercial</span>
      </p>
    </Link>
    // </div>
  );
};

export default CategoryCard;

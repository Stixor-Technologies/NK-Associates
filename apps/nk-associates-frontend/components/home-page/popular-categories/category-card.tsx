import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { PopularCategory } from "../../../utils/types/types";
import { BASE_URL } from "../../../utils/constants";

type CategoryCardProps = {
  category: PopularCategory;
};

const CategoryCard: FC<CategoryCardProps> = ({ category }) => {
  const cat_image = category?.category_image?.data.attributes.url;
  return (
    <Link
      href={`/properties}`}
      className="group relative category-card w-full overflow-hidden"
    >
      <div className="aspect-w-1 aspect-h-1 group relative w-full overflow-hidden h-[358px] rounded-xl before:transition-all before:duration-500 before:ease-in-out before:content-[''] before:absolute before:block before:w-full before:h-full before:bg-overlay-black before:opacity-0 before:z-10 group-hover:before:opacity-100 ">
        <Image
          src={`${BASE_URL}${cat_image || "/"}`}
          fill
          alt={`${category.category_name}-image`}
          className="object-cover category-image"
        />
      </div>
      <p className="category-name absolute w-full bottom-6 text-nk-white text-2xl font-metropolis-bold bg-fade-red py-3 z-20">
        <span className="mx-8">{category.category_name}</span>
      </p>
    </Link>
  );
};

export default CategoryCard;

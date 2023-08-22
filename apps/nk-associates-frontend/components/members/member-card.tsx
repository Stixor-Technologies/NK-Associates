import React, { FC } from "react";
import { BASE_URL } from "../../utils/constants";
import Image from "next/image";
import Link from "next/link";
import { Member } from "../../utils/types/types";
import FbIcon from "../../public/assets/icons/facebook-icon.svg";
import WhatsAppIcon from "../../public/assets/icons/whatsapp-inverse.svg";
import InstagramIcon from "../../public/assets/icons/instagram-icon.svg";
import LinkedinIcon from "../../public/assets/icons/linkedIn-icon.svg";

interface CardProps {
  member: Member;
  className: string;
}

const memberCard: FC<CardProps> = ({ member, className }) => {
  const { name, role, description, whatsapp, linkedin, instagram, facebook } =
    member?.attributes;
  const id = member?.id;
  const member_image = member?.attributes?.member_image?.data?.attributes?.url;

  interface SocialLink {
    pathName: string;
    image;
  }
  const WA = `https://wa.me/${whatsapp}?text=I%20would%20like%20to%20connect`;
  const SocialLinks: SocialLink[] = [
    { pathName: facebook, image: FbIcon },
    { pathName: instagram, image: InstagramIcon },
    { pathName: linkedin, image: LinkedinIcon },
    { pathName: WA, image: WhatsAppIcon },
  ];

  console.log("image url", member_image);
  const SocialList = SocialLinks.map((socialLink, index) => {
    return (
      socialLink?.pathName && (
        <div
          key={index}
          className="my-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-md bg-nk-red transition-all duration-300 hover:bg-opacity-75"
        >
          <Link
            href={`${socialLink?.pathName}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={socialLink.image}
              width={20}
              height={30}
              alt="Facebook"
            />
          </Link>
        </div>
      )
    );
  });
  return (
    <div className="flex flex-col items-center flex-grow max-w-[18.125rem] min-w-[17.288rem]">
      <Image
        src={`${BASE_URL}${member_image || "/"}`}
        alt="Member Picture"
        className="justify-center items-center object-contain m-2"
        width={284}
        height={290}
      />
      <div className="font-metropolis-bold text-center text-[1.625rem]">
        {name}
      </div>
      <div className="my-1 font-metropolis-semibold text-center text-nk-red text-base">
        {role}
      </div>
      <div className="my-1 font-metropolis text-center text-nk-dark-gray text-xs ">
        {description}
      </div>
      <Link
        href={`teams/${id}`}
        className="my-2 text-nk-red font-metropolis-semibold text-xs underline"
      >
        View More
      </Link>
      <div className="flex gap-2">{SocialList}</div>
    </div>
  );
};

export default memberCard;

"use client";
import { useRouter } from "next/navigation";
import LinkButton from "../button/link-button";

const InquiresCompnent = () => {
  const router = useRouter();
  const handleInquiresClick = () => {
    router.push("/contact");
  };

  return (
    <LinkButton
      text="Inquires"
      clickEvent={handleInquiresClick}
      className="px-6 min-w-[8.125rem] lg:min-w-[11.75rem]"
    />
  );
};

export default InquiresCompnent;

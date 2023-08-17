"use client";
import LinkButton from "../button/link-button";

const InquiresCompnent = () => {
  const handleInquiresClick = () => {
    alert("Inquires clicked");
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

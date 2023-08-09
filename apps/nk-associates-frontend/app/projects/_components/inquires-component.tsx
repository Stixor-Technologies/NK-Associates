'use client';
import LinkButton from "../../../components/button/link-button";

const InquiresCompnent = () => {
  const handleInquiresClick = () => {
    alert("Inquires clicked");
  };

  return <LinkButton text="Inquires" clickEvent={handleInquiresClick} className="px-6 min-w-[130px] lg:min-w-[188px]" />;
};

export default InquiresCompnent;

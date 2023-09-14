"use client";
import { usePathname } from "next/navigation";
import LinkButton from "../button/link-button";
import InquiriesModal from "../shared/inquiries-modal";
import { useState } from "react";

const InquiresCompnent = () => {
  const projectId: string = usePathname().slice(1).split("/")[1];
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    document.body.style.overflow = "hidden";
    setIsOpen(true);
  };

  const closeModal = () => {
    document.body.style.overflow = "auto";
    setIsOpen(false);
  };

  return (
    <div>
      <InquiriesModal onClose={closeModal} open={isOpen} itemId={projectId} />
      <LinkButton
        text="Inquires"
        clickEvent={openModal}
        className="px-6 min-w-[8.125rem] lg:min-w-[11.75rem]"
      />
    </div>
  );
};

export default InquiresCompnent;

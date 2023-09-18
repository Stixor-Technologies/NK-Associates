"use client";
import React, { useState } from "react";
import LinkButton from "../button/link-button";
import InquiriesModal from "../shared/inquiries-modal";
import { usePathname } from "next/navigation";

const InquiresModal = () => {
  const propertyId: string = usePathname().slice(1).split("/")[1];
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
      <InquiriesModal onClose={closeModal} open={isOpen} itemId={propertyId} />
      <LinkButton
        text="Inquire"
        type="solid"
        clickEvent={openModal}
        className="mb-2 w-[11.75rem] text-lg sm:mb-0 md:w-[11.75rem]"
      />
    </div>
  );
};

export default InquiresModal;

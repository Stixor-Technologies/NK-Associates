"use client";
import React, { useState } from "react";
import LinkButton from "../button/link-button";
import InquiriesModal from "./inquiries-modal";
import { usePathname } from "next/navigation";

const InquiresModal = ({ itemName }: { itemName: string }) => {
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
      <InquiriesModal onClose={closeModal} open={isOpen} itemName={itemName} />
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

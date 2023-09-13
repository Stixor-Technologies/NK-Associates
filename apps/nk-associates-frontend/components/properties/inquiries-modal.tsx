"use client";
import { ModalOptions, Modal } from "flowbite";
import React, { useEffect, useMemo, useRef } from "react";

import ContactForm from "../shared/contact-form";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  propetyId: string;
}

const InquiriesModal: React.FC<ModalProps> = ({ open, onClose, propetyId }) => {
  const modalElement = useRef<HTMLDivElement | null>(null);

  const closeModal = () => {
    onClose();
    modal?.hide();
  };
  const modal = useMemo(() => {
    if (!modalElement.current) {
      return null;
    }
    const modalOptions: ModalOptions = {
      placement: "center",
      backdrop: "dynamic",
      backdropClasses: "bg-gray-900 bg-opacity-70 fixed inset-0 z-40",
      closable: true,
      onHide: () => {
        onClose();
      },
    };

    return new Modal(modalElement.current, modalOptions);
  }, [onClose]);

  useEffect(() => {
    if (!modalElement.current || !modal) {
      return;
    }
    if (open) {
      modal.show();
    } else {
      onClose();
      modal?.hide();
    }

    return () => {
      if (open) {
        onClose();
        modal?.hide();
      }
    };
  }, [modal, onClose, open]);

  return (
    <div
      ref={modalElement}
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 py-[6rem] z-50 hidden w-full overflow-y-auto overflow-x-hidden p-4 md:h-full"
    >
      <div className="relative m-auto w-full max-w-4xl overflow-hidden rounded-3xl bg-white">
        <button
          className="absolute right-0 top-0 mr-5 mt-5 h-[0.92rem] w-[0.92rem] "
          onClick={closeModal}
        >
          <svg
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.073 1.82996L1.00537 14.8975"
              stroke="black"
              stroke-width="1.82271"
              stroke-linecap="round"
            />
            <path
              d="M14.0728 14.8975L1.00517 1.82996"
              stroke="black"
              stroke-width="1.82271"
              stroke-linecap="round"
            />
          </svg>
        </button>
        <div>
          <div className="font-metropolis text-nk-black flex flex-wrap text-left text-[0.938rem] ">
            <ContactForm
              heading="Get in touch"
              propertyId={propetyId}
              closeModal={closeModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiriesModal;

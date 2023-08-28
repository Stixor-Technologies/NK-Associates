"use client";
import Image from "next/image";
import AreaMarker from "../../public/assets/icons/area-marker.svg";
import Envelope from "../../public/assets/icons/envelope-icon.svg";
import ContactIcon from "../../public/assets/icons/telephone-icon.svg";
import { Offices } from "../../utils/types/types";

interface ContactDetailProps {
  data: Offices[];
}

const ContactDetails: React.FC<ContactDetailProps> = ({ data }) => {
  return (
    <>
      {data?.map((contactItem: Offices, index: number) => {
        return (
          <div
            key={index}
            className="h-full w-full bg-nk-light-gray py-4 px-3 rounded-lg md:rounded-3xl md:py-8 md:px-5"
          >
            <div className="flex w-full flex-col gap-4">
              <div className="font-metropolis-bold text-nk-black text-xl md:text-[1.75rem] flex items-center gap-2">
                {`${contactItem?.attributes?.location} Office `}
                {contactItem?.isHeadOffice && (
                  <span className=" text-base font-metropolis text-nk-gray">
                    (Head Office)
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <Image
                  src={AreaMarker}
                  alt="Location Bar"
                  width={19}
                  height={27}
                  className="flex-shrink-0 w-4 md:w-5"
                />
                <p className="font-metropolis-extralight text-sm md:text-base">
                  {contactItem?.attributes?.address}
                </p>
              </div>

              {contactItem?.attributes?.emails?.length > 0 && (
                <div className="flex items-center gap-4">
                  <Image
                    src={Envelope}
                    alt="Envelope Icon"
                    width={19}
                    height={27}
                    className="flex-shrink-0 w-4 md:w-5"
                  />
                  <div className="flex flex-col">
                    {contactItem?.attributes?.emails?.map(
                      (emailItem, index) => {
                        return (
                          <p
                            key={index}
                            className="break-all my-[0.063rem] font-metropolis-extralight text-sm md:text-base"
                          >
                            {emailItem?.email}
                          </p>
                        );
                      },
                    )}
                  </div>
                </div>
              )}

              {contactItem?.attributes?.numbers?.length > 0 && (
                <div className="flex items-center gap-4">
                  <Image
                    src={ContactIcon}
                    alt="Contact Icon"
                    width={19}
                    height={27}
                    className="flex-shrink-0 w-4 md:w-5"
                  />
                  <div className="break-all my-[0.063rem] font-metropolis-extralight text-sm md:text-base">
                    {contactItem?.attributes?.numbers?.map((number, index) => {
                      return <p key={index}>{number?.contact_number}</p>;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ContactDetails;

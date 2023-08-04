import Image from "next/image";
import AreaMarker from "../../public/assets/icons/area-marker.svg";
import Envelope from "../../public/assets/icons/envelope-icon.svg";
import ContactIcon from "../../public/assets/icons/telephone-icon.svg";
import { Contacts } from "../../utils/types/types";

interface ContactDetailProps {
  data: Contacts[];
}

const ContactDetails: React.FC<ContactDetailProps> = ({ data }) => {
  return (
    <>
      {data?.map((contactItem, index) => {
        return (
          <div
            key={index}
            className="h-full w-full rounded-xl bg-nk-light-gray p-5"
          >
            <div className="flex w-full flex-col gap-4">
              <div className="font-metropolis-bold text-3xl text-nk-black">
                {`${contactItem?.attributes?.location} Office`}
              </div>
              <div className="flex items-start gap-4">
                <Image
                  src={AreaMarker}
                  alt="Location Bar"
                  width={24}
                  height={35}
                  className="flex-shrink-0"
                />
                <p className="font-metropolis-light text-lg">
                  {contactItem?.attributes?.address}
                </p>
              </div>

              {contactItem?.attributes?.emails.length > 0 && (
                <div className="flex items-start gap-4">
                  <Image
                    src={Envelope}
                    alt="Envelope Icon"
                    width={24}
                    height={35}
                    className="flex-shrink-0"
                  />
                  <div className="flex flex-col font-metropolis-light text-lg">
                    {contactItem?.attributes?.emails?.map(
                      (emailItem, index) => {
                        return (
                          <p key={index} className="break-all">
                            {emailItem?.email}
                          </p>
                        );
                      }
                    )}
                  </div>
                </div>
              )}

              {contactItem?.attributes?.numbers.length > 0 && (
                <div className="flex items-start gap-4">
                  <Image
                    src={ContactIcon}
                    alt="Contact Icon"
                    width={24}
                    height={35}
                    className="flex-shrink-0"
                  />
                  <div className="flex flex-col font-metropolis-light text-lg">
                    {contactItem?.attributes?.numbers?.map((number, index) => {
                      return <p key={index}>{number?.contactNumber}</p>;
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

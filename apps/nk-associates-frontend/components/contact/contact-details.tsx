import Image from "next/image";
import AreaMarker from "../../public/assets/icons/area-marker.svg";
import Envelope from "../../public/assets/icons/envelope-icon.svg";
import ContactIcon from "../../public/assets/icons/telephoneIcon.svg";

interface ContactDetailProps {
  data: any;
}

const ContactDetails: React.FC<ContactDetailProps> = ({ data }) => {
  console.log(data);
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
                {`${contactItem.attributes.location} Office`}
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
                  {contactItem.attributes.address}
                </p>
              </div>

              <div className="flex items-start gap-4">
                <Image
                  src={Envelope}
                  alt="Envelope Icon"
                  width={24}
                  height={35}
                  className="flex-shrink-0"
                />
                <div className="flex flex-col font-metropolis-light text-lg">
                  <p>{contactItem.attributes.email}</p>
                  {contactItem.attributes.altEmail && (
                    <p>{contactItem.attributes.altEmail}</p>
                  )}
                  {/* Additional emails can be added here if needed */}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Image
                  src={ContactIcon}
                  alt="Contact Icon"
                  width={24}
                  height={35}
                  className="flex-shrink-0"
                />
                <div className="flex flex-col font-metropolis-light text-lg">
                  <p>{contactItem.attributes.contactNumber}</p>
                  {contactItem.attributes.altContactNumber && (
                    <>
                      <p>{contactItem.attributes.altContactNumber}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ContactDetails;

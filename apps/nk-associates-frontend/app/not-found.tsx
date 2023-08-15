import Image from "next/image";
import LinkButton from "../components/button/link-button";
import ErrorImage from "../public/assets/images/404.svg";
export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image src={ErrorImage} alt="Error Image" />
      <LinkButton
        navigateTo="#"
        type="solid"
        text="Return Home"
        className="bg-nk-red metro w-44 h-10 py-10"
      />
    </div>
  );
}

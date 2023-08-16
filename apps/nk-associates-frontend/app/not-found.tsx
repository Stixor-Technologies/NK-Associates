import Image from "next/image";
import LinkButton from "../components/button/link-button";
import Footer from "../components/footer/footer";
import Navigation from "../components/navigation/navigation";
import ErrorImage from "../public/assets/images/404.svg";
export default function NotFound() {
  return (
    <div>
      <Navigation />
      <div className="flex flex-col justify-center items-center bg-nk-background">
        <Image src={ErrorImage} alt="Error Image" className="mt-24" />
        <LinkButton
          navigateTo="/"
          type="solid"
          text="Return Home"
          className="bg-nk-red metro w-44 h-10 my-10"
        />
      </div>
      {/* @ts-expect-error Async Server Component */}
      <Footer />
    </div>
  );
}

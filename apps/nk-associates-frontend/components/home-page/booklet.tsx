"use client";
import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import LinkButton from "../button/link-button";
import booklet from "../../public/assets/images/booklet.png";
import Image from "next/image";
import Spinner from "../spinner";
import { saveAs } from "file-saver";
import Toast from "../shared/toast";
import { BASE_URL } from "../../utils/constants";

const Booklet = ({
  bookletUrl,
  bookletName,
}: {
  bookletUrl: string;
  bookletName: string;
}) => {
  const [isDownloading, setdownloading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        id: "booklet-trigger",
        trigger: ref.current,
        start: "top 70%",
        toggleActions: "play none none none",
      },
    });
    tl.from(".text", {
      opacity: 0,
      y: 100,
      duration: 0.5,
    });
    tl.from(".btn", {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      ease: "linear",
    });
    tl.from(".booklet", {
      opacity: 0,
      x: 250,
      duration: 0.5,
      stagger: 0.2,
    });

    return () => {
      ScrollTrigger.getById("booklet-trigger")?.kill();
    };
  }, []);

  const downloadPDF = async () => {
    setdownloading(true);
    try {
      const response = await fetch(`${BASE_URL}${bookletUrl}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const pdfBlob = await response.blob();

      saveAs(pdfBlob, bookletName);

      setdownloading(false);
      setToastMessage("File is downloaded");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      setdownloading(false);
      setToastMessage(`Error: Error downloading file, try again later`);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
    }
  };

  return (
    <div
      ref={ref}
      className="relative mt-4 bg-[url('/assets/images/detail-service-bg.svg')] bg-cover bg-right-top bg-no-repeat py-9 text-center text-nk-white md:mt-0 md:py-20 md:text-left"
    >
      {showToast && <Toast message={toastMessage} />}

      <div className="container relative z-20 mx-auto">
        <div className="flex gap-16 xl:gap-10 flex-col xl:flex-row">
          <div className="w-full xl:w-1/2">
            <h3 className="text font-metropolis-semibold text-[1.625rem] md:text-4xl">
              NK Associates and Services
            </h3>
            <div className="text py-5 text-base md:font-metropolis-extralight md:text-lg">
              <p className="py-2.5">
                At NK Associates and Services, we excel in the art of real
                estate. Our core expertise lies in the meticulous design,
                precise construction, and strategic enhancement of existing real
                estate properties. We take pride in our remarkable proficiency
                in developing distinctive, ground-up projects that epitomize our
                innovative vision and unwavering commitment to excellence.
              </p>
              <p className="py-2.5">
                With a legacy of integrity and quality, we provide specialized
                services and an integrated approach that ensures unparalleled
                service and exceptional value for our esteemed clients. Our
                dedication to excellence defines us, and our track record speaks
                volumes.
              </p>
              <p className="py-2.5">
                Discover our Corporate Profile 2023 for a detailed insight into
                our journey and vision. Download it here.
              </p>
            </div>

            <div className="btn mt-4 mx-auto flex h-12 cursor-pointer items-center justify-center rounded-full bg-nk-white w-[20.5rem] md:w-[25rem] md:mx-0">
              {isDownloading ? (
                <Spinner color="text-nk-red" height="h-7" width="w-10" />
              ) : (
                <LinkButton
                  text="Download Corporate Profile 2023"
                  type="inverted"
                  clickEvent={downloadPDF}
                  className="mx-auto w-full h-full border py-2.5 text-lg hover:shadow-md md:mx-0"
                />
              )}
            </div>
          </div>
          <div className="xl:w-1/2 shrink-0 self-center">
            <Image
              src={booklet}
              width={870}
              height={670}
              alt="nk-manual"
              priority={true}
              className="booklet mx-auto"
            />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-nk-gradient-red-sharp-one to-nk-gradient-red-sharp-two opacity-80" />
    </div>
  );
};

export default Booklet;

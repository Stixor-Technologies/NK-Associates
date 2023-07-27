// 'use client'
import React, { FC } from "react";
import Image from "next/image";
import { getPropertyDetail } from "../../../utils/api-calls";
import DetailSlider from "../../../../components/properties/property-detail/detail-slider";
import Tile from "../../../../components/shared/tile";
import Bath_Icon from "../../../../public/assets/icons/bath-icon.svg";
import Bedroom_Icon from "../../../../public/assets/icons/bedrooms-icon.svg";
import Tour_Icon from "../../../../public/assets/icons/360-icon.svg";
import Area_Icon from "../../../../public/assets/icons/area-icon.svg";
import Area_Marker from "../../../../public/assets/icons/area-marker.svg";
import Map from "../../../../public/assets/images/map.svg";
import PDF_Icon from "../../../../public/assets/icons/pdf-file-icon.svg";
import LinkButton from "../../../../components/button/link-button";
import "./slider-styles.css";

interface PropertyDetailProps {
  params: {
    id: string;
  };
}

async function PropertyDetail({ params: { id } }) {
  const data = await getPropertyDetail(id);

  return (
    <section className="">
      <DetailSlider />
      <div className="mt-14 bg-right-top bg-no-repeat md:mt-3 md:bg-nk-bg">
        {/* <button className="ml-auto hidden items-center gap-2 rounded-l-md bg-white px-4 py-2 shadow-lg md:flex">
          <Image src={Tour_Icon} width={55} height={34} alt="360-tour" />
          <span className="text-[1.375rem] text-nk-black">View</span>
        </button> */}

        <button className="group relative z-50 ml-auto hidden items-center gap-2 overflow-hidden rounded-l-lg bg-nk-white px-4 py-3.5 w-48 shadow-3xl transition-all md:flex">
          <svg
            width="56"
            height="35"
            viewBox="0 0 56 35"
            // fill="#333333"
            className="fill-nk-red transition-all delay-200 duration-500 ease-in-out group-hover:fill-nk-white"

            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M45.1178 0.573625C44.5542 1.13561 44.1669 2.09917 44.1669 2.93946C44.1669 3.77976 44.5542 4.74333 45.1178 5.30531C45.6015 5.78769 45.8127 5.87454 46.5023 5.87454C47.1903 5.87454 47.4033 5.78752 47.8816 5.31048C49.0331 4.16218 49.0399 1.81533 47.895 0.604875C47.402 0.0836406 47.2189 0.00439453 46.5078 0.00439453C45.812 0.00439453 45.6025 0.0902018 45.1178 0.573625ZM47.1849 1.76941C47.3331 1.98039 47.4545 2.50697 47.4545 2.93946C47.4545 4.26784 46.6475 4.91235 45.8667 4.20759C45.6384 4.00162 45.5501 3.67496 45.5501 3.03753C45.5501 2.00249 45.9057 1.3856 46.5023 1.3856C46.7331 1.3856 47.0345 1.55515 47.1849 1.76941ZM14.3855 4.64457C12.6374 5.21518 11.323 6.75575 11.016 8.59379L10.8934 9.32756H12.4722C13.8264 9.32756 14.0638 9.28457 14.1407 9.02542C14.4175 8.0919 14.8561 7.51248 15.4579 7.28544C16.0309 7.06911 16.1639 7.0774 16.7563 7.3659C17.2622 7.61227 17.4752 7.85709 17.6682 8.41406C17.8929 9.06237 17.89 9.2036 17.6407 9.72483C17.3265 10.3821 16.449 10.8814 15.6085 10.8814H15.065L15.1154 12.3058L15.1656 13.7302L15.9932 13.825C18.0905 14.0653 18.7657 16.7821 16.9596 17.7136C15.9345 18.2421 14.6692 17.5881 14.2643 16.3199L14.099 15.802L12.5706 15.7517C11.7298 15.7241 10.9838 15.763 10.9127 15.8381C10.8415 15.9132 10.932 16.4522 11.114 17.0359C11.5382 18.3964 12.6414 19.6556 13.9054 20.222C15.1384 20.7747 17.3774 20.7954 18.5505 20.2652C20.2276 19.5071 21.2013 18.1828 21.4146 16.3698C21.5739 15.0162 21.2562 14.0924 20.2759 13.0584L19.4395 12.1763L19.8713 11.6584C21.3336 9.90456 21.3348 7.59483 19.8746 6.07498C18.9253 5.08673 17.7846 4.61436 16.2044 4.55496C15.4426 4.52648 14.6241 4.5667 14.3855 4.64457ZM38.1458 4.77095C37.1279 5.14439 35.6771 6.51714 35.1018 7.65111C34.43 8.97483 34.1335 10.1877 34.0163 12.09C33.7855 15.836 35.2005 18.9197 37.7128 20.1454C39.0166 20.7816 40.9302 20.8134 42.0875 20.2184C44.6217 18.9151 45.7589 16.8793 45.9948 13.224C46.2457 9.33705 44.7824 6.07205 42.2945 4.96812C41.2258 4.49402 39.1676 4.39612 38.1458 4.77095ZM26.4901 5.39974C25.0571 7.35709 23.3717 10.056 22.8905 11.1639C21.4707 14.4327 21.7567 17.3558 23.6774 19.2034C26.5142 21.9321 31.8561 20.6804 33.1809 16.9764C33.5 16.0843 33.4899 14.051 33.1619 13.0905C32.8203 12.0908 31.8971 11.0114 30.871 10.4118C30.2721 10.0618 29.7538 9.92131 28.8052 9.8519L27.5388 9.75919L29.273 7.34449C30.2268 6.01628 31.0071 4.8704 31.0071 4.79788C31.0071 4.72537 30.1116 4.66598 29.0171 4.66598H27.0273L26.4901 5.39974ZM41.1501 8.09984C42.6809 9.03077 43.2412 13.633 42.0961 15.8714C41.1288 17.7621 39.2677 17.976 38.1344 16.3267C36.7334 14.2877 37.1924 9.11986 38.865 8.10277C39.5511 7.68547 40.4668 7.68427 41.1501 8.09984ZM6.87524 10.5736C4.80512 11.8041 3.31533 13.0682 2.35757 14.4068C-1.65266 20.0109 2.38821 26 12.4296 29.3351C14.5972 30.055 17.5856 30.7702 19.7901 31.0966L21.1253 31.2943L21.1752 32.6515L21.2252 34.0087L26.1111 31.3798C28.7985 29.9338 30.9984 28.6731 31.0002 28.5782C31.0024 28.4495 22.1324 23.5126 21.2809 23.1685C21.2027 23.1367 21.1386 23.6953 21.1386 24.4093V25.7077L20.4894 25.6151C12.4383 24.4673 6.29733 21.611 4.93185 18.3785C4.56758 17.5162 4.57347 16.1658 4.94518 15.3042C5.31153 14.4551 6.72981 12.9522 7.82798 12.2495L8.67321 11.7088V10.6908C8.67321 10.1309 8.6095 9.67286 8.53176 9.67286C8.45385 9.67286 7.70852 10.0782 6.87524 10.5736ZM48.147 10.6723V11.7088L49.0078 12.2595C50.3853 13.1409 51.7307 14.707 52.0492 15.7994C53.0143 19.1102 49.6382 22.1492 42.6351 24.2738C40.6532 24.875 36.7877 25.6103 34.5563 25.8104C33.8897 25.8703 33.0523 25.961 32.6951 26.0121L32.0459 26.1051V28.8746V31.6441L33.4742 31.5245C41.3904 30.8615 48.6385 28.394 52.6993 24.9793C53.8235 24.0342 55.1566 22.2467 55.6169 21.0678C56.1206 19.778 56.1291 17.7113 55.6358 16.4537C54.8075 14.3422 52.8887 12.3339 50.1119 10.6727C48.0726 9.45273 48.147 9.45273 48.147 10.6723ZM28.7801 12.8792C29.1122 13.0504 29.4331 13.4367 29.6504 13.9266C30.1132 14.9698 29.9602 15.8619 29.1762 16.6908C28.6068 17.293 28.5583 17.3092 27.5498 17.2365C26.3364 17.149 25.7482 16.7201 25.4416 15.6994C25.0864 14.5173 25.5668 13.4684 26.7654 12.8089C27.265 12.534 28.1722 12.5656 28.7801 12.8792Z"
            />
          
          </svg>
     
          <span className="absolute bottom-0 left-0 -z-10 h-full w-full -translate-x-full translate-y-full rounded-l-lg bg-nk-red transition-all delay-200 duration-500 ease-in-out group-hover:mb-[63px] group-hover:translate-x-0"></span>
          <span className="text-[1.375rem] text-nk-black transition-all delay-200 duration-500 ease-in-out group-hover:text-nk-white">
            View
          </span>
        </button>


        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between md:items-center">
            <div className="flex flex-col gap-5 md:flex-row lg:gap-10 xl:gap-20 ">
              <h2 className="text-center font-metropolis-semibold text-4xl sm:text-left">
                DHA-III Residential Plots
              </h2>

              <div className="flex justify-center gap-6 sm:justify-start">
                <div className="flex items-center gap-1">
                  <Image
                    src={Bath_Icon}
                    width={27}
                    height={27}
                    alt="bath-icon"
                  />
                  <span className="font-metropolis-medium text-lg text-nk-black">
                    7
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Image
                    src={Bedroom_Icon}
                    width={27}
                    height={27}
                    alt="bed-icon"
                  />
                  <span className="font-metropolis-medium text-lg text-nk-black">
                    6
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Image src={Area_Icon} width={27} height={27} alt="" />
                  <span className="font-metropolis-medium text-lg text-nk-black">
                    4500 sq.ft
                  </span>
                </div>
              </div>
            </div>

            <LinkButton
              text="Inquires"
              type="solid"
              navigateTo="#"
              className="mb-2 w-[11.75rem] text-lg sm:mb-0 md:w-[11.75rem]"
            />
          </div>

          <div className="flex flex-col gap-3 py-8 md:py-10 lg:flex-row lg:gap-1">
            <div className="flex flex-grow gap-1 shadow-3xl">
              <Tile
                label="Category"
                value="Residential"
                className="flex-grow rounded-l-lg"
              />
              <Tile
                label="Coverd Area / Area"
                value="1 kanal (605yd2)"
                className="flex-grow"
              />
              <Tile
                label="Types"
                value="Plot"
                className="flex-grow rounded-r-lg lg:rounded-r-none"
              />
            </div>
            <div className="mx-auto flex w-full max-w-[300px] justify-center gap-1 shadow-3xl sm:max-w-sm md:max-w-md lg:flex-grow">
              <Tile
                label="Price"
                value="26000000"
                className="flex-grow rounded-l-lg lg:rounded-l-none"
              />
              <Tile
                label="City"
                value="Islamabad"
                className="flex-grow rounded-r-lg"
              />
            </div>
          </div>

          <p className="text-center font-metropolis-thin text-sm leading-snug text-nk-black md:py-3 md:text-left md:text-[1.375rem]">
            Experience prestigious living in DHA 3, Islamabad's most coveted
            housing society. Centrally located on the Islamabad GT Road, this 1
            kanal plot offers the perfect canvas for your dream home. Enjoy
            proximity to renowned educational institutions, world-class
            healthcare facilities, vibrant shopping centers, and lush
            recreational areas. Embrace a serene and upscale lifestyle in DHA 3,
            where luxury meets convenience.
          </p>

          <div className="">
            <h3 className="pt-8 text-center font-metropolis-semibold text-[2rem] md:py-10 md:text-4xl">
              Location
            </h3>
            <Image
              src={Map}
              width={1536}
              height={900}
              alt="map"
              className="mx-auto py-3"
            />
            <div className="flex items-center gap-3 py-1 md:gap-3.5 md:py-3">
              <Image
                src={Area_Marker}
                width={16}
                height={16}
                alt="address-marker"
                className="w-3.5 md:w-5"
              />
              <h2 className="self-end font-metropolis-thin text-sm text-nk-black md:text-[1.75rem]">
                Street: 12, Secor- B, Plot #: 24-C, DHA-III, Islamabad
              </h2>
            </div>

            <button className="mx-auto my-12 hidden items-center gap-4 rounded-full bg-nk-gradient-red-one bg-gradient-to-b to-nk-gradient-red-two px-20 py-2 text-lg text-nk-white md:flex">
              Download Broucher
              <Image src={PDF_Icon} alt="" width={17} height={17} />
            </button>
          </div>
        </div>

        {/* <div className="mt-4 bg-nk-gradient-red-sharp-one bg-gradient-to-b to-nk-gradient-red-sharp-two py-9 text-center text-nk-white opacity-80 md:text-left md:mt-0 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h3 className=" font-metropolis-semibold text-[1.625rem] md:text-4xl">
                NK Associates Services
              </h3>
              <p className="py-5 text-base md:font-metropolis-extralight md:text-lg">
                Our core expertise lies in the meticulous design, precise
                construction, and strategic enhancement of existing real estate
                properties. We possess a remarkable proficiency in developing
                unique, ground-up projects that showcase our innovative vision
                and unwavering dedication to quality. We are committed to
                excellence driving our specialized services and integrated
                approach, resulting in unparalleled service and exceptional
                value for our esteemed clients.
              </p>
              <LinkButton
                text="Explore all"
                type="inverted"
                navigateTo="#"
                className="mx-auto mt-3 w-64 md:mx-0 md:w-[25rem]"
              />
            </div>
          </div>
        </div> */}

        <div className="relative mt-4 bg-[url('/assets/images/detail-service-bg.svg')] bg-cover bg-right-top bg-no-repeat py-9 text-center text-nk-white opacity-80 md:mt-0 md:py-20 md:text-left">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h3 className="font-metropolis-semibold text-[1.625rem] md:text-4xl">
                NK Associates Services
              </h3>
              <p className="py-5 text-base md:font-metropolis-extralight md:text-lg">
                Our core expertise lies in the meticulous design, precise
                construction, and strategic enhancement of existing real estate
                properties. We possess a remarkable proficiency in developing
                unique, ground-up projects that showcase our innovative vision
                and unwavering dedication to quality. We are committed to
                excellence driving our specialized services and integrated
                approach, resulting in unparalleled service and exceptional
                value for our esteemed clients.
              </p>
              <LinkButton
                text="Explore all"
                type="inverted"
                navigateTo="#"
                className="mx-auto mt-3 w-64 md:mx-0 md:w-[25rem]"
              />
            </div>
          </div>

          <div className="absolute inset-0 -z-10 bg-nk-gradient-red-sharp-one bg-gradient-to-b to-nk-gradient-red-sharp-two"></div>
        </div>
      </div>
    </section>
  );
}

export default PropertyDetail;

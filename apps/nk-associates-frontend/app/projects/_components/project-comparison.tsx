"use client";
import {
  useState,
  useRef,
  useEffect,
  TouchEvent,
  useLayoutEffect,
} from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Thumbs, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "./project-comparison.css";

import { getComparisonImages } from "../../../utils/api-calls";
import { BASE_URL } from "../../../utils/constants";

type PropTypes = {
  projectId: number;
};

type DirectionType = "vertical" | "horizontal";

type ComparisonResponseType = {
  attributes: {
    comparisonImages: {
      comparison_images: {
        data: {
          attributes: {
            url: string;
          };
        }[];
      };
    }[];
  };
};

const CompareComponent = ({ url }) => {
  const compareImgContainer = useRef<HTMLDivElement>();
  const [imgRevealFraction, setImgRevealFraction] = useState(0.5);

  const handleSlide = (xPosition: number) => {
    if (compareImgContainer && compareImgContainer.current) {
      const container = compareImgContainer?.current?.getBoundingClientRect();
      let fraction = 0;
      if (xPosition < container.left) {
        fraction = 0;
      } else if (xPosition > container.right) {
        fraction = 1;
      } else {
        fraction = (xPosition - container.left) / container.width;
      }
      setImgRevealFraction(fraction);
    }
  };

  const handleMouseDown = () => {
    window.onmousemove = (e: MouseEvent) => {
      handleSlide(e.clientX);
    };
    window.onmouseup = () => {
      window.onmousemove = undefined;
      window.onmouseup = undefined;
    };
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    handleSlide(e.touches.item(0).clientX);
  };

  return (
    <div
      ref={compareImgContainer}
      className="relative h-full w-full select-none"
    >
      <Image
        src={`${BASE_URL}${url[0]}`}
        alt="Carousel Image"
        layout="fill"
        objectFit="cover"
        className="pointer-events-none h-full w-full object-cover"
      />
      <Image
        src={`${BASE_URL}${url[1]}`}
        alt="Carousel Image"
        layout="fill"
        objectFit="cover"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{
          clipPath: `polygon(0 0, ${imgRevealFraction * 100}% 0, ${
            imgRevealFraction * 100
          }% 100%, 0 100%)`,
        }}
      />
      <div
        style={{ left: `${imgRevealFraction * 100}%` }}
        className="absolute inset-y-0"
      >
        <div className="relative h-full">
          <div className="absolute inset-y-0 -ml-px w-0.5 bg-white opacity-50"></div>
          <div
            style={{ touchAction: "none" }}
            onMouseDown={handleMouseDown}
            onTouchMove={handleTouchMove}
            className="absolute top-1/2 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-white"
          >
            <svg
              width="19"
              height="14"
              viewBox="0 0 19 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.988769 7.09496L8.28086 0.206283L8.28086 13.9836L0.988769 7.09496Z"
                fill="url(#paint0_linear_451_3546)"
              />
              <path
                d="M18.6958 7.09498L11.4037 13.9837L11.4037 0.206299L18.6958 7.09498Z"
                fill="url(#paint1_linear_451_3546)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_451_3546"
                  x1="0.988769"
                  y1="7.09496"
                  x2="8.28086"
                  y2="7.09496"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#E4404A" />
                  <stop offset="1" stop-color="#EB4B5E" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_451_3546"
                  x1="18.6958"
                  y1="7.09498"
                  x2="11.4037"
                  y2="7.09498"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#E4404A" />
                  <stop offset="1" stop-color="#EB4B5E" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectComparison = ({ projectId }: PropTypes) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [direction, setDirection] = useState<DirectionType>("vertical");
  const [pictures, setPictures] = useState<string[][]>([[]]);

  const handleResize = (e) => {
    let direction = window.innerWidth <= 768 ? "horizontal" : "vertical";
    setDirection(direction as DirectionType);
  };

  const handleGetComparisonImages = async () => {
    const response: ComparisonResponseType = await getComparisonImages(
      projectId,
    );
    const comparisonImages = [];
    response.attributes.comparisonImages.forEach((set) => {
      const urlSets = [];
      set["comparison_images"].data.map((image) =>
        urlSets.push(image.attributes.url),
      );
      comparisonImages.push(urlSets);
    });
    setPictures(comparisonImages);
  };

  useEffect(() => {
    handleGetComparisonImages();
  }, []);

  useLayoutEffect(() => {
    gsap.to("[data-project-comparison] h2", {
      opacity: 1,
      transform: "translateY(0%)",
      scrollTrigger: {
        trigger: "[data-project-comparison]",
        start: "top 80%",
      },
    });

    gsap.to("[data-project-comparison-content]", {
      opacity: 1,
      duration: 0.8,
      scrollTrigger: {
        trigger: "[data-project-comparison]",
        start: "top 70%",
      },
    });
  }, []);

  return (
    <section data-project-comparison className="py-8 md:container md:py-14">
      <h2 className="mb-4 text-center font-metropolis-bold text-2xl md:mb-8 opacity-0 translate-y-full">
        Render Vs Actual Image
      </h2>

      <div data-project-comparison-content className="opacity-0">
        {pictures.length > 0 && pictures[0].length > 0 ? (
          <div className="gap-3 md:flex">
            <Swiper
              centeredSlides={true}
              initialSlide={0}
              pagination={false}
              allowTouchMove={false}
              thumbs={{
                swiper: thumbsSwiper,
              }}
              className="mySwiper carousel-slider h-[25rem] w-full sm:aspect-video sm:h-auto md:w-10/12 md:rounded-xl"
              modules={[Thumbs, FreeMode]}
            >
              {pictures?.map((url, index) => (
                <SwiperSlide key={index} className="relative">
                  <CompareComponent url={[url[0], url[1]]} />
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              modules={[Thumbs, FreeMode]}
              watchSlidesProgress
              spaceBetween={10}
              slidesPerView="auto"
              onSwiper={setThumbsSwiper}
              className="mySwiper2 mt-4 !px-4 md:mt-0 md:w-2/12 md:!px-0"
              direction={direction}
              onResize={handleResize}
            >
              {pictures?.map((url, index) => (
                <SwiperSlide
                  key={index}
                  className="aspect-video !w-[8.125rem] cursor-pointer md:max-h-[6.25rem] md:!w-auto lg:max-h-[7.5rem]"
                >
                  <Image
                    src={`${BASE_URL}${url[0]}`}
                    alt="Thumb Item"
                    layout="fill"
                    objectFit="cover"
                    className="w-full rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="flex h-[25rem] w-full items-center justify-center rounded-xl bg-white text-black">
            <div className="h-10 w-10">
              <svg
                fill="#000000"
                viewBox="0 0 32 32"
                id="icon"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs></defs>
                <title>no-image</title>
                <path d="M30,3.4141,28.5859,2,2,28.5859,3.4141,30l2-2H26a2.0027,2.0027,0,0,0,2-2V5.4141ZM26,26H7.4141l7.7929-7.793,2.3788,2.3787a2,2,0,0,0,2.8284,0L22,19l4,3.9973Zm0-5.8318-2.5858-2.5859a2,2,0,0,0-2.8284,0L19,19.1682l-2.377-2.3771L26,7.4141Z" />
                <path d="M6,22V19l5-4.9966,1.3733,1.3733,1.4159-1.416-1.375-1.375a2,2,0,0,0-2.8284,0L6,16.1716V6H22V4H6A2.002,2.002,0,0,0,4,6V22Z" />
                <rect
                  id="_Transparent_Rectangle_"
                  data-name="&lt;Transparent Rectangle&gt;"
                  className="fill-none"
                  width="32"
                  height="32"
                />
              </svg>
            </div>
            No Images Available
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectComparison;

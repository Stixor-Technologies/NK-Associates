import EventCard from "../../components/events/EventCard";
import Carousel from "../../components/events/carousel";
import MobileCarousel from "../../components/events/mobile-carousel";
import { BASE_URL } from "../../utils/constants";
import { Events } from "../../utils/types/types";

async function FetchData() {
  try {
    const response = await fetch(`${BASE_URL}/api/events?populate=*`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.error(error);
  }
}

const collectImages = (data: Events[]) => {
  let urls: string[] = [];
  data?.map((dataItem, index) => {
    dataItem?.attributes?.event_image?.data.map((imageData, index) => {
      urls.push(imageData?.attributes?.url);
    });
  });

  return urls;
};

export default async function Home() {
  const data = await FetchData();
  const images = collectImages(data);

  return (
    <div className="flex w-full flex-1 overflow-auto">
      <div className="h-auto min-h-screen w-full bg-nk-white-dark">
        <div className="mt-8 w-full rounded-lg p-4 shadow-lg md:rounded-lg md:p-20 md:shadow-none">
          <div className="flex items-center justify-center md:hidden ">
            <MobileCarousel images={images} />
          </div>

          <div className="text-center font-metropolis-extrabold text-3xl text-nk-black md:text-5xl">
            Unveiling Our Journey
          </div>

          <div className="mt-7 text-center font-metropolis-light text-xl text-gray-500 md:text-3xl">
            <span>
              Explore the Remarkable Journey that has Propelled us to the
              Forefront of the Industry
            </span>
          </div>

          <div className="hidden items-center justify-center md:flex ">
            <Carousel images={images} />
          </div>

          <div className="mt-6 text-center font-metropolis-extrabold text-3xl text-black md:mt-16 md:text-left">
            Latest News & Events
          </div>

          <div className="card-component mt-8 grid w-full grid-flow-row gap-14 lg:grid-cols-2">
            <EventCard data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

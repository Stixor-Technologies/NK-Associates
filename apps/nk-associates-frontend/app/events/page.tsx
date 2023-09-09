import { BASE_URL } from "../../utils/constants";
import { Events } from "../../utils/types/types";
import AllEvents from "../../components/events/events";

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
    dataItem?.attributes?.event_image?.data?.map((imageData, index) => {
      urls.push(imageData?.attributes?.url);
    });
  });

  return urls;
};

async function Events() {
  const data = await FetchData();
  const images = collectImages(data);

  return (
    <div className="flex w-full flex-1 overflow-auto">
      <div className="h-auto min-h-screen w-full bg-nk-white-dark">
        <AllEvents data={data} images={images} />
      </div>
    </div>
  );
}
export default Events;

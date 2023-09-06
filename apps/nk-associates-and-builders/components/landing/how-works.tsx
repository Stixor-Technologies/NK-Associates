import React from "react";
import Card from "./cards";
import Rectangle_9 from "../../public/assets/icons/rectangle-9.svg";
import Rectangle_10 from "../../public/assets/icons/rectangle-10.svg";
import Rectangle_11 from "../../public/assets/icons/rectangle-11.svg";
interface Props {
  title1: string;
  title2: string;
}

const HowWorks: React.FC<Props> = ({ title1, title2 }) => {
  const cardsData = [
    {
      text1: "Find Home",
      text2:
        "Lorem ipsum dolor sit amet consectetur. Massa nec mi justo pulvinar iaculis. Id massa a aenean lacus orci sit vehicula.",
      imageSrc: Rectangle_9,
      altText: "Rectangle 9",
    },
    {
      text1: "Find Home",
      text2:
        "Lorem ipsum dolor sit amet consectetur. Massa nec mi justo pulvinar iaculis. Id massa a aenean lacus orci sit vehicula.",
      imageSrc: Rectangle_10,
      altText: "Rectangle 10",
    },
    {
      text1: "Find Home",
      text2:
        "Lorem ipsum dolor sit amet consectetur. Massa nec mi justo pulvinar iaculis. Id massa a aenean lacus orci sit vehicula.",
      imageSrc: Rectangle_11,
      altText: "Rectangle 11",
    },
  ];

  return (
    <div>
      <div className="flex flex-col text-center">
        <div className="text-nk-red text-[2rem] md:texts-[2.537rem] font-metropolis-bold mb-[0.589rem] md:mb-[1rem]">
          {title1}
        </div>
        <div className="text-[1rem] md:text-[1.688rem] text-nk-black mb-[2.313rem] md:mb-[3.571rem] font-metropolis-extralight">
          {title2}
        </div>
        <div className="flex flex-col md:flex-row justify-center">
          {cardsData.map((card, index) => (
            <Card
              key={index}
              text1={card.text1}
              text2={card.text2}
              imageSrc={card.imageSrc}
              altText={card.altText}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowWorks;

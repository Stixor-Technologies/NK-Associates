import { DEFAULT_CHAT_MESSAGE } from "./constants";

export const convertToPakistaniNumbering = (input: number | string) => {
  let num: number = typeof input === "string" ? parseInt(input) : input;
  let res: number;
  // Nine zeros (1,00,00,000) => 1 Crore
  if (num >= 10000000) {
    res = num / 10000000;
    return (res % 1 !== 0 ? res.toFixed(2) : Math.floor(res)) + " Crore";
  }
  // Seven zeros (1,00,000) => 1 Lac
  else if (num >= 100000) {
    res = num / 100000;
    return (res % 1 !== 0 ? res.toFixed(2) : Math.floor(res)) + " Lac";
  }
  // Five zeros (1000) => Thousand
  else if (num >= 1000) {
    res = num / 1000;
    return (res % 1 !== 0 ? res.toFixed(2) : Math.floor(res)) + " Thousand";
  }
  return num.toString();
};

const SQ_METER_TO_SQ_FEET = 10.7639;
const MARLA_TO_SQ_FEET = 272.25;
const KANAL_TO_SQ_FEET = 5445;
const SQ_YARD_TO_SQ_FEET = 9;

export const convertAreaToSqFeet = (area: number, areaType: string) => {
  let areaSqFeet = area;
  switch (areaType) {
    case "Sq.M":
      areaSqFeet *= SQ_METER_TO_SQ_FEET;
      break;
    case "Marla":
      areaSqFeet *= MARLA_TO_SQ_FEET;
      break;
    case "Kanal":
      areaSqFeet *= KANAL_TO_SQ_FEET;
      break;
    case "Sq.Yd":
      areaSqFeet *= SQ_YARD_TO_SQ_FEET;
    default:
      break;
  }

  return areaSqFeet;
};

export const whatsAppChatLink = (number: string) => {
  const encodedText = encodeURIComponent(DEFAULT_CHAT_MESSAGE);
  return `https://wa.me/${number}?text=${encodedText}`;
};

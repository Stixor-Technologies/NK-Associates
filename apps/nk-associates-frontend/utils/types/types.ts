export interface ImageData {
  data: {
    attributes: {
      url: string;
      name: string;
    };
  };
}

export interface Properties {
  attributes: {
    area: number;
    area_type: string;
    image_thumbnail: ImageData;
    baths: number;
    bedrooms: number;
    category: string;
    latitude: number;
    longitude: number;
    price: number;
    property_images: ImageData;
    purpose: string;
    title: string;
    type: string;
  };
  id: number;
}

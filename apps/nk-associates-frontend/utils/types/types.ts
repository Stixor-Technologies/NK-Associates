export interface EventsImage {
  data: {
    attributes: {
      url: string;
    };
  }[];
}

export interface Events {
  attributes: {
    event_title: string;
    event_description: string;
    event_host: string;
    event_location: string;
    event_date: string;
    event_image: EventsImage;
  };
  id: number;
}

export interface MediaAttributes {
    attributes: {
      url: string;
      name: string;
    };

}

export interface Property {
  attributes: {
    area: number;
    area_type: string;
    image_thumbnail: {
      data: MediaAttributes;
    };
    baths: number;
    bedrooms: number;
    category: string;
    latitude: number;
    longitude: number;
    price: string;
    property_images: {
      data: MediaAttributes[]
    };
    purpose: string;
    title: string;
    type: string;
    address: string;
    city: string;
    description: string;
    property_pdf: {
      data: MediaAttributes;
    };
  };
  id: number;
}

export interface Project {
  attributes: {
    pictures: {
      data: Array<{ attributes: { url: string } }>;
    };
    title: string;
    plotSize: string;
    plotSizeUnits: string;
    plotNumber: string;
    coveredArea: string;
    coveredAreaUnits: string;
    address: string;
    city: string;
    description: string;
    category: string;
  };
}

export interface MapBounds {
  
}

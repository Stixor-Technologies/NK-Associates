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
    Pictures: {
      data: Array<{ attributes: { url: string } }>;
    };
    Title: string;
    PlotSize: string;
    PlotSizeUnits: string;
    PlotNumber: string;
    CoveredArea: string;
    CoveredAreaUnits: string;
    Address: string;
    City: string;
    Description: string;
    Category: string;
  };
}

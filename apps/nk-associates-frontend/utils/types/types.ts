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
    price: string;
    property_images: ImageData;
    purpose: string;
    title: string;
    type: string;
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


export interface Job {
  attributes: {
    title: string;
    description: string;
    responsibilities: string;
    qualification: string;
    positions: number;
    location: string;
    start: string;
    end: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    department: {
      id: number; 
      attributes: {
        name: string;
      }
    }
  };
}
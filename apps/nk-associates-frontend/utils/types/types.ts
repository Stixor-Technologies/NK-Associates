export interface EventsImage {
  data: {
    attributes: {
      url: string;
    };
  }[];
}
export interface Offices {
  isHeadOffice?: boolean;
  attributes: {
    location: string;
    address: string;
    latitude: number;
    longitude: number;
    emails: {
      id: number;
      email: string;
    }[];
    numbers: {
      id: number;
      contact_number: string;
    }[];
  };
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
    price: number;
    property_images: {
      data: MediaAttributes[];
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
  id: number;
  attributes: {
    pictures: {
      data: Array<{ attributes: { url: string } }>;
    };
    title: string;
    plotSize: string;
    plotSizeUnits: string;
    plotNumber: string;
    coveredArea: number;
    coveredAreaUnits: string;
    address: string;
    city: string;
    description: string;
    category: string;
    totalUnits: number;
    unitsSold: number;
    price: number;
    types: string[];
    latitude: number;
    longitude: number;
    projectOutcomeDescription: string;
    projectOutcomeImage: {
      data: { attributes: { url: string } };
    };
    pdf: {
      data: { attributes: { url: string } };
    };
    numberOfRooms?: number;
    numberOfBathRooms?: number;
    comparisonImages: {
      id: number;
    }[];
    threeDModel: {
      data: { attributes: { url: string } };
    };
  };
}

export interface Department {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface Job {
  id: number;
  attributes: {
    title: string;
    description: string;
    responsibilities: string;
    qualification: string;
    experience: string;
    positions: number;
    start: string;
    end: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    location: string;
    city: string;
    skills: string;
    days: {
      id: number;
      Monday: boolean;
      Tuesday: boolean;
      Wednesday: boolean;
      Thursday: boolean;
      Friday: boolean;
      Saturday: boolean;
    }[];
    department: {
      data: Department;
    };
  };
}

export interface Socials {
  id: number;
  attributes: {
    twitter: string;
    facebook: string;
    youtube: string;
    linkedin: string;
    snapchat: string;
    instagram: string;
    playstore: string;
    appstore: string;
    appgallery: string;
  };
}
export interface Services {
  attributes: {
    title: string;
    company: string;
    service_image: {
      data: MediaAttributes;
    };
    company_logo: {
      data: MediaAttributes;
    };
    expertise: string;
    expertise_image: {
      data: MediaAttributes;
    };
    outcome: string;
    outcome_image: {
      data: MediaAttributes;
    };
    description: string;
    process: ServiceProcess[];
  };
  id: number;
}

export interface PopularCategory {
  category_name: string;
  category_image: {
    data: MediaAttributes;
  };
}
export interface ServiceProcess {
  id: number;
  process_title: string;
  process_description: string;
  process_image: {
    data: MediaAttributes;
  };
}

export interface AboutOverview {
  about_summary: string;
  summary_image1: {
    data: MediaAttributes;
  };
  summary_image2: {
    data: MediaAttributes;
  };
}

export interface Member {
  id: number;
  attributes: {
    name: string;
    role: string;
    description: string;
    whatsapp: string;
    linkedin: string;
    instagram: string;
    facebook: string;
    member_image: {
      data: MediaAttributes;
    };
  };
}

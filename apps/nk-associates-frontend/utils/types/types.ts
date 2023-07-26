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

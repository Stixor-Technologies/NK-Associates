import { BASE_URL } from "./constants";
import { Department, Property } from "./types/types";
import { SIMILAR_PROPERTIES_LIMIT } from "./constants";
export const getGridProperties = async (start: number, limit = 12) => {
  try {
    const resp = await fetch(
      `${BASE_URL}/api/properties?populate=*&pagination[start]=${start}&pagination[limit]=${limit}&sort[1]=id`,
    );
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("There was an error getting the Property List", error);
  }
};

export const getMapProperties = async (
  southLat: number,
  northLat: number,
  westLng: number,
  eastLng: number,
) => {
  try {
    const resp = await fetch(
      `${BASE_URL}/api/properties?populate=*&filters[latitude][$between]=${southLat}&filters[latitude][$between]=${northLat}&filters[longitude][$between]=${westLng}&filters[longitude][$between]=${eastLng}&sort[1]=id`,
    );
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("There was an error getting the Property List", error);
  }
};

export const getPropertyDetail = async (id: string) => {
  try {
    const resp = await fetch(`${BASE_URL}/api/properties/${id}?populate=*`, {
      cache: "no-store",
    });
    const data = await resp.json();
    return data?.data;
  } catch (error) {
    console.error("There was an error getting the Property List", error);
  }
};

export const getSimilarProperties = async (
  type: string,
  category: string,
  currentPropertyId: string,
) => {
  const FILTER_PRIORITY = [
    { key: "type", value: "" },
    { key: "category", value: "" },
  ];
  try {
    let properties: Property[] = [];
    const uniquePropertyIds = new Set();

    FILTER_PRIORITY[0].value = type;
    FILTER_PRIORITY[1].value = category;

    for (let filter of FILTER_PRIORITY) {
      if (properties.length >= 4) break;

      const resp = await getPropertiesByFilter(filter, currentPropertyId);
      const data = await resp.json();
      for (let prop of data.data) {
        if (!uniquePropertyIds.has(prop.id) && properties.length < 4) {
          properties.push(prop);
          uniquePropertyIds.add(prop.id);
        }
      }
    }

    return properties;
  } catch (error) {
    console.error("There was an error getting the Similar Properties", error);
  }
};

const getPropertiesByFilter = async (
  filter: { key: string; value: string },
  excludeId: string,
) => {
  return fetch(
    `${BASE_URL}/api/properties?populate=*&filters[id][$ne]=${excludeId}&filters[${filter.key}]=${filter.value}&pagination[limit]=${SIMILAR_PROPERTIES_LIMIT}&sort[1]=id`,

    { cache: "no-store" },
  );
};

export const getJobDetail = async (id: string) => {
  try {
    const resp = await fetch(`${BASE_URL}/api/jobs/${id}?populate=*`, {
      cache: "no-store",
    });
    const data = await resp.json();
    return data?.data;
  } catch (error) {
    console.error("There was an error getting the Jobs Details", error);
  }
};

interface GetProjectsParams {
  category?: "Residential" | "Commercial" | "Hotel";
  cachePolicy?: { [key: string]: any };
  start?: Number;
  limit?: Number;
}

export const getProjects = async ({
  category = undefined,
  cachePolicy = undefined,
  start = 0,
  limit = 5,
}: GetProjectsParams = {}): Promise<Response> => {
  try {
    const fetchOptions: { [key: string]: any } = cachePolicy ? cachePolicy : {};
    const res = await fetch(
      //using concatenation because autosave causes linebreak in ` ` in the api call
      `${BASE_URL}/api/projects?populate=*${
        category ? `&filters[category]=${category}` : ""
      }${`&pagination[start]=${start}&pagination[limit]=${limit}&sort[1]=id`}`,
      fetchOptions,
    );

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    return res;
  } catch (error) {
    throw error;
  }
};

export const getOfficeAddress = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/offices?populate=*`, {
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
};

export const getHeadOffice = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/api/head-office?populate=*`, {
      cache: "no-store",
    });
    const data = await resp.json();
    return data?.data;
  } catch (error) {
    console.error("There was an error getting the Property List", error);
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/categories`, {
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
};

export const getProjectDetail = async (id: string) => {
  try {
    const resp = await fetch(`${BASE_URL}/api/projects/${id}?populate=*&`, {
      cache: "no-store",
    });
    const data = await resp.json();
    return data?.data;
  } catch (error) {
    console.error("There was an error getting the Project Details", error);
  }
};

export const getComparisonImages = async (id: number) => {
  try {
    const resp = await fetch(
      `${BASE_URL}/api/projects/${id}?populate[comparisonImages][populate]=*`,
      {
        cache: "no-store",
      },
    );
    const data = await resp.json();
    return data?.data;
  } catch (error) {
    console.error("There was an error getting the ComparisonImages", error);
  }
};

export const getJobs = async (departmentName, city) => {
  try {
    let apiUrl = `${BASE_URL}/api/jobs?populate=*`;

    if (departmentName) {
      apiUrl += `&filters[department][name]=${encodeURIComponent(
        departmentName,
      )}`;
    }

    if (city) {
      apiUrl += `&filters[city]=${encodeURIComponent(city)}`;
    }

    const resp = await fetch(apiUrl);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("There was an error getting the Property List", error);
  }
};

export const getCities = async () => {
  try {
    let apiUrl = `${BASE_URL}/api/jobs?populate=*`;
    const resp = await fetch(apiUrl);
    const data = await resp.json();

    const city = data?.data?.map((job) => job?.attributes?.city);
    const uniqueCitiesSet = new Set(city);
    const uniqueCitiesArray = Array.from(uniqueCitiesSet);

    return uniqueCitiesArray;
  } catch (error) {
    console.error("There was an error getting cities", error);
  }
};

export const getDepartments = async () => {
  try {
    let apiUrl = `${BASE_URL}/api/departments?populate=*`;
    const resp = await fetch(apiUrl);
    const data = await resp.json();
    const departments = data?.data?.map(
      (data: Department) => data?.attributes?.name,
    );
    return departments;
  } catch (error) {
    console.error("There was an error getting departments", error);
  }
};

export const getSocials = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/api/social`, {
      cache: "no-store",
    });
    const links = await resp.json();
    return links;
  } catch (error) {
    console.error("There was an error getting social media links", error);
  }
};

export const getServices = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/api/services?populate=deep`);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("There was an error getting services", error);
  }
};

export const getContactNumber = async () => {
  try {
    let apiUrl = `${BASE_URL}/api/phone`;
    const resp = await fetch(apiUrl, {
      cache: "no-store",
    });
    const links = await resp.json();
    return links;
  } catch (error) {
    console.error("There was an error getting the phone number", error);
  }
};

export const getFeaturedProperties = async () => {
  try {
    const resp = await fetch(
      `${BASE_URL}/api/featured-properties?populate=deep`,
    );
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("There was an error getting the featured properties", error);
  }
};

export const getFeaturedProjects = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/api/featured-project?populate=deep`);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("There was an error getting the featured projects", error);
  }
};

export const getPopularCategories = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/api/popular-categories?populate=*`);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("There was an error getting the popular categories", error);
  }
};

export const getHeroInfo = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/api/home?populate=*`);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(
      "There was an error getting the hero section information",
      error,
    );
  }
};

export const getHomeData = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/api/home?populate=deep`, {
      cache: "no-store",
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("There was an error getting the home information", error);
  }
};

export const getMembers = async () => {
  try {
    let apiUrl = `${BASE_URL}/api/teams?populate=*`;
    const resp = await fetch(apiUrl, {
      cache: "no-store",
    });
    const links = await resp.json();
    return links;
  } catch (error) {
    console.error("There was an error getting the team members", error);
  }
};

export const getServiceDetail = async (id: string) => {
  try {
    const resp = await fetch(`${BASE_URL}/api/services/${id}?populate=deep`, {
      cache: "no-store",
    });
    const data = await resp.json();
    return data?.data;
  } catch (error) {
    console.error("There was an error getting the service detail", error);
  }
};

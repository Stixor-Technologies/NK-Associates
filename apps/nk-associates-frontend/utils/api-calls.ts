import { BASE_URL } from "./constants";
import { Department } from "./types/types";
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

// export const getSimilarProperties = async (type: string) => {
//   try {
//     const resp = await fetch(
//       `${BASE_URL}/api/properties?populate=*&filters[type]=${type}&pagination[limit]=${SIMILAR_PROPERTIES_LIMIT}&sort[1]=id`,
//       {
//         cache: "no-store",
//       },
//     );
//     const data = await resp.json();
//     return data.data;
//   } catch (error) {
//     console.error("There was an error getting the Property List", error);
//   }
// };

// const getPropertiesByFilter = async (filterKey, filterValue, excludeIds) => {
//   try {
//     const resp = await fetch(
//       `${BASE_URL}/api/properties?populate=*&filters[${filterKey}]=${filterValue}&filters[id][$ne]=${excludeIds}&pagination[limit]=${SIMILAR_PROPERTIES_LIMIT}&sort[1]=id`,
//       {
//         cache: "no-store",
//       },
//     );
//     const data = await resp.json();

//     // Filter out properties with IDs that are in the excludeIds array
//     // return data.data;
//     console.log(data.data);
//     return data.data.filter((property) => !excludeIds.includes(property.id));
//   } catch (error) {
//     console.error("There was an error getting the Property List", error);
//     return [];
//   }
// };

// export const getSimilarProperties = async (
//   type,
//   price,
//   category,
//   currentPropertyId,
// ) => {
//   let similarProperties = [];
//   let excludeIds = [currentPropertyId];

//   // By Type
//   const propertiesByType = await getPropertiesByFilter(
//     "type",
//     type,
//     excludeIds,
//   );
//   similarProperties = [...propertiesByType];
//   excludeIds = [...excludeIds, ...propertiesByType.map((p) => p.id)];

//   // By Price, if needed
//   // if (similarProperties.length < SIMILAR_PROPERTIES_LIMIT) {
//   //   const propertiesByPrice = await getPropertiesByFilter(
//   //     "price",
//   //     price,
//   //     excludeIds,
//   //   );
//   //   similarProperties = [...similarProperties, ...propertiesByPrice];
//   //   excludeIds = [...excludeIds, ...propertiesByPrice.map((p) => p.id)];
//   // }

//   // By Category, if needed
//   if (similarProperties.length <= SIMILAR_PROPERTIES_LIMIT) {
//     const propertiesByCategory = await getPropertiesByFilter(
//       "category",
//       category,
//       excludeIds,
//     );

//     similarProperties = [...similarProperties, ...propertiesByCategory];
//   }

//   // return similarProperties.slice(0, SIMILAR_PROPERTIES_LIMIT);
//   return similarProperties;
// };

// Define the filter criteria and priority

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
    let properties: any[] = [];
    const uniquePropertyIds = new Set();

    FILTER_PRIORITY[0].value = type;
    FILTER_PRIORITY[1].value = category;

    for (let filter of FILTER_PRIORITY) {
      if (properties.length >= 4) break;

      const resp = await getPropertiesByFilter(filter, currentPropertyId);
      const data = await resp.json();
      console.log(data);
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

// Fetch data based on filter criteria
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

    const locations = data.data.map((job) => job.attributes.location);
    const uniqueCitiesSet = new Set(locations);
    const uniqueCitiesArray = Array.from(uniqueCitiesSet);

    return uniqueCitiesArray;
  } catch (error) {
    console.error("There was an error getting locations", error);
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
    let apiUrl = `${BASE_URL}/api/socials`;
    const resp = await fetch(apiUrl, {
      cache: "no-store",
    });
    const links = await resp.json();
    return links;
  } catch (error) {
    console.error("There was an error getting social media links", error);
  }
};

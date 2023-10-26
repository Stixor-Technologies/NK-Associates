import { BASE_URL } from "./constants";
import { Department, FiltersStateType, Property } from "./types/types";

import { SIMILAR_PROPERTIES_LIMIT } from "./constants";

const applyFilters = (
  filters: FiltersStateType,
  tabFilter?: number | undefined,
) => {
  let filtersString = "";
  if (filters) {
    if (filters?.minSelectedPrice) {
      filtersString += `&filters[price][$gte]=${filters?.minSelectedPrice}`;
    }

    if (filters?.maxSelectedPrice) {
      filtersString += `&filters[price][$lte]=${filters?.maxSelectedPrice}`;
    }

    if (filters?.selectedCategoryId) {
      filtersString += `&filters[property_category][id][$eq]=${filters?.selectedCategoryId}`;
    }

    if (filters?.selectedTypeId) {
      filtersString += `&filters[property_type][id][$eq]=${filters?.selectedTypeId}`;
    }

    if (filters?.selectedProjectId && filters?.selectedProjectId?.length > 0) {
      const selectedIds = filters?.selectedProjectId
        .map((id, index) => `filters[project][id][$in][${index}]=${id}`)
        .join("&");

      filtersString += `&${selectedIds}`;
    }

    if (filters?.selectedPurposeId) {
      filtersString += `&filters[property_purpose][id][$eq]=${filters?.selectedPurposeId}`;
    }

    if (filters?.selectedCompletionStatusId) {
      filtersString += `&filters[completion_status][id][$eq]=${filters?.selectedCompletionStatusId}`;
    }

    if (filters?.selectedRentFrequencyId) {
      filtersString += `&filters[rent_frequency][id][$eq]=${filters?.selectedRentFrequencyId}`;
    }

    if (filters?.selectedBathRoomsLimit) {
      filtersString += `&filters[baths][$lte]=${filters?.selectedBathRoomsLimit}`;
    }

    if (filters?.selectedRoomsLimit) {
      filtersString += `&filters[bedrooms][$lte]=${filters?.selectedRoomsLimit}`;
    }

    if (
      filters?.selectedAreaUnit?.toLowerCase() !== "all" &&
      filters?.minSelectedArea
    ) {
      filtersString += `&filters[area][$gte]=${filters?.minSelectedArea}`;
    }

    if (
      filters?.selectedAreaUnit?.toLowerCase() !== "all" &&
      filters?.maxSelectedArea
    ) {
      filtersString += `&filters[area][$lte]=${filters?.maxSelectedArea}`;
    }
    if (
      filters?.selectedAreaUnit &&
      filters?.selectedAreaUnit?.toLowerCase() !== "all"
    ) {
      filtersString += `&filters[area_type][$eq]=${filters?.selectedAreaUnit}`;
    }

    if (filters?.location && filters?.location?.length > 0) {
      const selectedIds = filters?.location
        .map(
          (id, index) => `filters[property_location][id][$in][${index}]=${id}`,
        )
        .join("&");
      filtersString += `&${selectedIds}`;
    }
  }

  if (tabFilter) {
    filtersString += `&filters[property_top_picks][id][$eq]=${tabFilter}`;
  }
  return filtersString;
};

export const getGridProperties = async (
  freshData: boolean,
  moreLoad: boolean,
  start: number,
  limit = 12,
  tabFilter: number | undefined,
  filters?: FiltersStateType | undefined,
) => {
  let url = `${BASE_URL}/api/properties?populate=*&pagination[start]=${start}&pagination[limit]=${limit}&sort[1]=id`;
  let filtersString = "";
  if (freshData || moreLoad) {
    filtersString = applyFilters(filters, tabFilter);
  }

  try {
    const resp = await fetch(url + filtersString);
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
  filters?: FiltersStateType | undefined,
) => {
  let url = `${BASE_URL}/api/properties?populate=*&filters[latitude][$between]=${southLat}&filters[latitude][$between]=${northLat}&filters[longitude][$between]=${westLng}&filters[longitude][$between]=${eastLng}&sort[1]=id`;
  let filtersString = applyFilters(filters);

  try {
    const resp = await fetch(url + filtersString);
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
  type: {
    data: { id: number; attributes: { name: string } };
  },
  category: {
    data: { id: number; attributes: { name: string } };
  },
  currentPropertyId: string,
) => {
  const FILTER_PRIORITY = [
    { key: "property_type", value: "" },
    { key: "property_category", value: "" },
  ];
  try {
    let properties: Property[] = [];
    const uniquePropertyIds = new Set();

    FILTER_PRIORITY[0].value = type?.data?.attributes?.name;
    FILTER_PRIORITY[1].value = category?.data?.attributes?.name;

    for (let filter of FILTER_PRIORITY) {
      if (properties?.length >= 4) break;

      const resp = await getPropertiesByFilter(filter, currentPropertyId);
      const data = await resp.json();
      for (let prop of data?.data) {
        if (!uniquePropertyIds.has(prop.id) && properties?.length < 4) {
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
    `${BASE_URL}/api/properties?populate=*&filters[id][$ne]=${excludeId}&filters[${filter.key}][name]=${filter.value}&pagination[limit]=${SIMILAR_PROPERTIES_LIMIT}&sort[1]=id`,

    { cache: "no-store" },
  );
};

export const fetchPropertyCategoriesList = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/api/property-categories?populate=*`);
    const data = await resp.json();
    return data?.data;
  } catch (error) {
    console.error(
      "There was an error getting the Property Categories List",
      error,
    );
  }
};

export const fetchPropertyTypesList = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/api/property-types?populate=*`);
    const data = await resp.json();
    return data?.data;
  } catch (error) {
    console.error("There was an error getting the Property Types List", error);
  }
};

export const fetchFilterProjectsList = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/api/projects?fields[0]=title`);
    const data = await resp.json();
    return data?.data;
  } catch (error) {
    console.error("There was an error getting the Filter Projects List", error);
  }
};

export const fetchPropertyPurposeList = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/api/property-purposes`);
    const data = await resp.json();
    return data?.data;
  } catch (error) {
    console.error(
      "There was an error getting the Property Purpose List",
      error,
    );
  }
};

export const fetchPropertyLocationList = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/api/property-locations`);
    const data = await resp.json();
    return data?.data;
  } catch (error) {
    console.error(
      "There was an error getting the Property Location List",
      error,
    );
  }
};

export const fetchPropertyTopPickList = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/api/property-top-picks`);
    const data = await resp.json();
    return data?.data;
  } catch (error) {
    console.error("There was an error getting the Property Top Pick", error);
  }
};

export const fetchCompletionStatusList = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/api/completion-statuses`);
    const data = await resp.json();
    return data?.data;
  } catch (error) {
    console.error(
      "There was an error getting the Completion Status List",
      error,
    );
  }
};

export const fetchRentFrequencyList = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/api/rent-frequencies`);
    const data = await resp.json();
    return data?.data;
  } catch (error) {
    console.error("There was an error getting the Rent Frequency List", error);
  }
};

export const fetchFilterOptionsList = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/api/filter-option?populate=*`);
    const data = await resp.json();
    return data?.data;
  } catch (error) {
    console.error("There was an error getting the Filter Options List", error);
  }
};

export const fetchAreaUnits = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/content-type-builder/content-types/api::property.property`,
    );
    const propertyContentType = await response.json();
    return propertyContentType?.data?.schema?.attributes?.area_type?.enum;
  } catch (error) {
    console.error("Error fetching property Area Units", error);
  }
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
    console.error("There was an error getting the Head Office", error);
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

export const getContactCategory = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/api/contact-categories?populate=*`);
    const data = await resp.json();
    const categories = data?.data?.map(
      (data: { id: number; attributes: { category: string } }) =>
        data?.attributes?.category,
    );
    return categories;
  } catch (error) {
    console.error("There was an error getting categories", error);
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
    const resp = await fetch(
      `${BASE_URL}/api/services?populate=deep&sort[1]=id`,
    );
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
    let apiUrl = `${BASE_URL}/api/teams?populate=*&sort[9]=rank`;
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

export const getAbout = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/api/about?populate=deep`);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("There was an error getting company information", error);
  }
};

export const fetchVRTourDetailsById = async (id: number) => {
  try {
    const resp = await fetch(`${BASE_URL}/api/vr-tours/${id}?populate=deep`);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(
      `There was an error getting VR Tour information for this ID: ${id}`,
      error,
    );
  }
};
export const resetPassword = async (
  passwordInfo: {
    password: string;
    confirmPassword: string;
  },
  verificationCode: string
) => {
  try {
    const body = {
      code: verificationCode,
      password: passwordInfo?.password,
      passwordConfirmation: passwordInfo.confirmPassword,
    };
    const resp = await fetch(`${BASE_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("There was an error resetting the password", error);
  }
};

import { BASE_URL } from "./constants";
export const getProperties = async (start: number, limit = 12) => {
  try {
    const resp = await fetch(
      `${BASE_URL}/api/properties?populate=*&pagination[start]=${start}&pagination[limit]=${limit}&sort[1]=id`
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
      cache: "no-store"
    });
    const data = await resp.json();
    return data?.data;
  } catch (error) {
    console.error("There was an error getting the Property List", error);
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
  limit = 5
}: GetProjectsParams = {}): Promise<Response> => {
  try {
    const fetchOptions: { [key: string]: any } = cachePolicy ? cachePolicy : {};
    const res = await fetch(
      //using concatenation because autosave causes linebreak in ` ` in the api call
      `${BASE_URL}/api/projects?populate=*${
        category ? `&filters[Category]=${category}` : ""
      }${`&pagination[start]=${start}&pagination[limit]=${limit}&sort[1]=id`}`,
      fetchOptions
    );

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    return res;
  } catch (error) {
    throw error;
  }
};

export const getJobs = async (departmentName, location) => {
  try {
    let apiUrl = `${BASE_URL}/api/jobs?populate=*`;

    if (departmentName) {
      apiUrl += `&filters[department][name]=${encodeURIComponent(
        departmentName
      )}`;
    }

    if (location) {
      apiUrl += `&filters[location]=${encodeURIComponent(location)}`;
    }

    const resp = await fetch(apiUrl);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("There was an error getting the Property List", error);
  }
};

export const getLocations = async () => {
  try {
    let apiUrl = `${BASE_URL}/api/jobs?populate=*`;
    const resp = await fetch(apiUrl);
    const data = await resp.json();

    const locations = data.data.map((job) => job.attributes.location);
    const uniqueLocationsSet = new Set(locations);
    const uniqueLocationsArray = Array.from(uniqueLocationsSet);

    return uniqueLocationsArray;
  } catch (error) {
    console.error("There was an error getting locations", error);
  }
};

export const getDepartments = async () => {
  try {
    let apiUrl = `${BASE_URL}/api/jobs?populate=*`;
    const resp = await fetch(apiUrl);
    const data = await resp.json();

    const departments = data.data.map(
      (job) => job.attributes.department.data.attributes.name
    );
    const uniqueDepartmentsSet = new Set(departments);
    const uniqueDepartmentsArray = Array.from(uniqueDepartmentsSet);
    return uniqueDepartmentsArray;
  } catch (error) {
    console.error("There was an error getting departments", error);
  }
};

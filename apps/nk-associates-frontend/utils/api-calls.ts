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
interface GetProjectsParams {
  category?: "Residential" | "Commercial" | "Hotel";
  cachePolicy?: { [key: string]: any };
}

export async function getProjects({
  category = undefined,
  cachePolicy = undefined,
}: GetProjectsParams = {}): Promise<Response> {
  try {
    const fetchOptions: { [key: string]: any } = cachePolicy ? cachePolicy : {};

    const res = await fetch(
      //using concatenation because autosave causes linebreak in ` ` in the api call
      `${process.env["NEXT_PUBLIC_BACKEND_API_URL"]}/projects?populate=*` +
        (category ? `&filters[Category]=${category}` : ""),
      fetchOptions
    );

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    return res;
  } catch (error) {
    throw error;
  }
}

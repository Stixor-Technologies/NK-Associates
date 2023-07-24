export const getProperties = async (start: number, limit = 12) => {
  try {
    const resp = await fetch(
      `http://localhost:1337/api/properties?populate=*&pagination[start]=${start}&pagination[limit]=${limit}&sort[1]=id`
    
    // `${process.env.NEXT_PUBLIC_BACKEND_URL}properties?populate=*&pagination[start]=${start}&pagination[limit]=${limit}&sort[1]=id`

    );
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error("There was an error getting the Property List", error);
  }
};

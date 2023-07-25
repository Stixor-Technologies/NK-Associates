export const getPropertyDetail = async (id: string) => {
    try {
      const resp = await fetch(
        `${process.env["NEXT_PUBLIC_BACKEND_URL"]}/api/properties?populate=*`
      );
      const data = await resp.json();
      return data;
    } catch (error) {
      console.error("There was an error getting the Property List", error);
    }
  };
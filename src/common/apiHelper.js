import axios from "axios";

export const apiHelper = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("cannot feching data", error);
  }
};

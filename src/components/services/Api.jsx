import axios from "axios"

axios.defaults.baseURL = 'https://pixabay.com//api';
const API_KEY = '33045436-8e58141e6d6ddbbbde7b75c75';

export const getImages = async (query, page = 1) => {
  const { data } = await axios.get('/', {
    params: {
      key: API_KEY,
      image_type: "photo",
      orientation: 'horizontal',
      q: query,
      page: page,
      per_page: 12,
    }
  })
  console.log("object", data);
  return data;
}


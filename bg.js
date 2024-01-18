import axios from "axios"
import FormData from "form-data";
import dotenv from "dotenv";            

dotenv.config();

export async function removeBackground( url ) {
  const API_KEY = process.env.REMOVE_BG_API_KEY;

  const formData = new FormData();
  formData.append('size', 'auto');
  formData.append('image_url', url);

  return axios({
    method: 'post',
    url: 'https://api.remove.bg/v1.0/removebg',
    data: formData,
    responseType: 'arraybuffer',
    headers: {
      ...formData.getHeaders(),
      'X-Api-Key': API_KEY,
    },
    encoding: null
  })
  .then((response) => {
    if (response.status != 200) {
      console.error('Error:', response.status, response.statusText);
      return null; // or throw an error
    }
    return response.data; // return the raw data
  })
  .catch((error) => {
      console.error('Request failed:', error);
      return null; // or throw an error
  });
}

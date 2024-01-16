
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');


export function removeBackground ({url}) {

    const API_KEY = process.env.REMOVE_BG_API_KEY;

const formData = new FormData();
formData.append('size', 'auto');
formData.append('image_url', url);

axios({
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
  if(response.status != 200) return console.error('Error:', response.status, response.statusText);
  fs.writeFileSync("no-bg.png", response.data);
})
.catch((error) => {
    return console.error('Request failed:', error);
});
}
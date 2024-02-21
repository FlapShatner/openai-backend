import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import { uploadImageToCloudinary } from './helpers.js';
import { getSuggest } from './helpers.js';
import { generateMidj } from './mjServices.js';


dotenv.config();
const app = express();
app.use(express.json());
const OPENAI_API_KEY=process.env.OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY, // This is the default and can be omitted
  });

 async function sendPrompt(prompt) {
    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });
      console.log(response.data)
      const data = response.data;
      const url = data[0].url;
  
      const urlWithCaption = {
            url: url,
            caption: prompt
      }

      return urlWithCaption;
}

app.get('/',  (req, res) => {
    res.send('Hello World!');
});

app.post('/prompt',async(req, res) => {
    const data = req.body;
    console.log(data);
    const {prompt, fullPrompt, style} = data;
    
    try{
   const imageUrl = await sendPrompt(fullPrompt);
// const imageUrl = {url:tempUrl}
//    const noBgData = await removeBackground(imageUrl.url);
   const cloudinaryUrl = await uploadImageToCloudinary(imageUrl.url, prompt, style); 
   console.log(cloudinaryUrl)
   res.send({
        url: cloudinaryUrl,
        caption: imageUrl.caption
   });}
   catch(error){
       console.log(error);
       res.send(error);
   } 
})

app.post('/suggest', async (req, res) => {
    const data = req.body;
    const {prompt} = data;
    const suggestions = await getSuggest(prompt);
    res.send(suggestions);

})

app.post('/midj', async (req, res) => {
    const data = req.body;
    const {prompt} = data;
    const response = await generateMidj(prompt);
      res.send(response);
})


const PORT = process.env.PORT || 8888
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`)
})

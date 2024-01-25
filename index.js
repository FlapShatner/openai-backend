import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import { uploadImageToCloudinary } from './helpers.js';
// import { removeBackground } from './bg.js';

// const tempUrl = 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-GYTkaS8Qcl0h8878at0BEe62/user-zDZWFfDMaIQWNkVU5As8LGvF/img-idThbLwRpsXuBMUfKLGyxN7t.png?st=2024-01-18T17%3A19%3A03Z&se=2024-01-18T19%3A19%3A03Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-01-18T16%3A40%3A01Z&ske=2024-01-19T16%3A40%3A01Z&sks=b&skv=2021-08-06&sig=kf4f09vFeVG%2BUitQ2qdmyHPz6bw6g4aAtO2eakLZhjU%3D'


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



const PORT = process.env.PORT || 8888
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`)
})

import express from 'express';
import OpenAI from 'openai';

const app = express();
app.use(express.json());
const OPENAI_API_KEY=process.env.OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY, // This is the default and can be omitted
  });

 async function sendPrompt(prompt, style) {
    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        style: style,
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
    const prompt = req.body.prompt;
    const style = req.body.style;
    // console.log( req.body);
   const imageUrl = await sendPrompt(prompt, style);
    res.send(imageUrl);
    // res.send( req.body)
})



const PORT = process.env.PORT || 8888
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`)
})

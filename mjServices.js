import 'dotenv/config'
import { Midjourney } from 'midjourney'


export const generateMidj = async (prompt) => {
    try{   
    const client = new Midjourney({
      ServerId: process.env.SERVER_ID,
      ChannelId: process.env.CHANNEL_ID,
      SalaiToken: process.env.SALAI_TOKEN,
      Debug: true,
      Ws: false,
    })
  
    const msg = await client.Imagine(prompt, (uri, progress) => {
      console.log('loading', uri, 'progress', progress)
    })
    return(JSON.stringify(msg))
} catch (error) {
    return { error: error.message };
  }}


  const Variation = await client.Custom({
    msgId: Imagine.id,
    flags: Imagine.flags,
    customId: V1CustomID,
    content: prompt, //remix mode require content
    loading: (uri, progress) => {
      console.log("loading", uri, "progress", progress);
    },
  });
  console.log(Variation);
  const U1CustomID = Imagine.options?.find((o) => o.label === "U1")?.custom;
  if (!U1CustomID) {
    console.log("no U1");
    return;
  }
  // Upscale U1
  const Upscale = await client.Custom({
    msgId: Imagine.id,
    flags: Imagine.flags,
    customId: U1CustomID,
    loading: (uri, progress) => {
      console.log("loading", uri, "progress", progress);
    },
  });
  if (!Upscale) {
    console.log("no Upscale");
    return;
  }
  console.log(Upscale);
  const zoomout = Upscale?.options?.find((o) => o.label === "Custom Zoom");
  if (!zoomout) {
    console.log("no zoomout");
    return;
  }
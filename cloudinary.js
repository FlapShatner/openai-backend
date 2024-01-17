// Require the cloudinary library
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();
// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

// Log the configuration
// console.log(cloudinary.config())

/////////////////////////
// Uploads an image file
/////////////////////////
export const uploadImage = async (imagePath) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    background_removal: "cloudinary_ai"
  }

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options)
    // console.log(result)
    return result.secure_url
  } catch (error) {
    console.error(error)
  }
}

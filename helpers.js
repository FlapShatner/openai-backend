
import { uploadImage } from "./cloudinary.js";

export const uploadImageToCloudinary = async (imageUrl) => {
    try {
       const cloudinaryUrl = await uploadImage(imageUrl)
        return cloudinaryUrl
    } catch (error) {
        return { error: error.message };
    }
};



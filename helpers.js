import { lowercaseTags } from './lowercaseTags.js';
import { excluded } from './excludeTags.js';
import { uploadImage } from "./cloudinary.js";

export const uploadImageToCloudinary = async (imageUrl, prompt, style) => {
    try {
       const cloudinaryUrl = await uploadImage(imageUrl, prompt, style )
        return cloudinaryUrl
    } catch (error) {
        return { error: error.message };
    }
};


export const getSuggest = async (prompt) => {
    let queryArray = prompt.split(' ');
    let lowercaseArray = queryArray.map(word => word.toLowerCase());
    let suggestions = [];

    lowercaseArray = lowercaseArray.filter(word => !excluded.includes(word.toLowerCase()));

    lowercaseArray.forEach(word => {
        if (lowercaseTags.includes(word) && !suggestions.includes(word.toLowerCase())) {
            suggestions.push(word);
        }
    });

    return suggestions;
}


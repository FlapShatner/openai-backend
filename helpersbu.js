import axios from "axios";
import fs from "fs";
import FormData from "form-data";



export const uploadImageToCloudinary = async (imageUrl) => {
    try {
        // First, download the image
        const imagePath = await downloadImage(imageUrl, 'tempImage.jpg'); // Specify your desired path and filename
        // console.log('imagePath', imagePath)
        // Then, upload the downloaded image to Cloudinary
        const reader = new FileReader();
        reader.readAsDataURL(imagePath);
        const base64 = reader.onloadend = async function () {
           return reader.result;
        }
        console.log('base64', base64)
        // const cloudinaryUrl = await uploadImage(fs.createReadStream(imagePath));
        // Optionally, delete the downloaded file after uploading
        // fs.unlinkSync(imagePath);
        // return cloudinaryUrl;
    } catch (error) {
        return { error: error.message, imageUrl };
    }
};

export async function downloadImage(url, filepath) {
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });
    return new Promise((resolve, reject) => {
        response.data.pipe(fs.createWriteStream(filepath))
            .on('error', reject)
            .once('close', () => resolve(filepath)); 
    });
}

export const uploadImage = async (image) => {
    console.log('image', image)
    const CLOUDINARY_UPLOAD_PRESET = 'jt3ld2no';
    const CLOUDINARY_CLOUD_NAME = 'dkxssdk96';
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    data.append('cloud_name', CLOUDINARY_CLOUD_NAME);
    // data.append('folder', 'Cloudinary-React');
    // console.log('data', data)
    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
            method: 'POST',
            body: data,
        });
        const res = await response.json();
        console.log('res', res)
        if(res.error) throw new Error(res.error.message);
        return res.url;
    } catch (error) {
        return { error: error.message };   
    }
};

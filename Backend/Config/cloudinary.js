import { v2 as cloudinary } from "cloudinary";

const cloudConfig = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, // Corrected variable name
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });
};
export default cloudConfig;

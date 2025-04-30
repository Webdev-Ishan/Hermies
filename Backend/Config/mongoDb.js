import mongoose from "mongoose";

const DbConnect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`).then(() => {
      console.log("Db connected successfully");
    
    });
  } catch (error) {
    console.log(error.message);
    console.log("MONGODB_URL:", process.env.MONGODB_URL);
  }
};
export default DbConnect;

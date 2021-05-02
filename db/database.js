import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/experience", {
      useNewUrlParser: true,
    });
    console.log("connext to database");
  } catch (error) {
    console.log(error.message);
  }
};

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DBURL, {
      useNewUrlParser: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};

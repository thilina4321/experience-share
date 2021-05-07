import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
    });
    console.log("connext to database");
  } catch (error) {
    console.log(error.message);
  }
};

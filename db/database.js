import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DBURL, {
      useNewUrlParser: true,
    });
    console.log("connext to database");
  } catch (error) {
    console.log(error.message);
  }
};

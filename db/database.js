import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://anuradha:zgDO8HnZlngkWcYL@cluster0.zxwnh.mongodb.net/exe?retryWrites=true&w=majority", {
      useNewUrlParser: true,
    });
    console.log("connext to database");
  } catch (error) {
    console.log(error.message);
  }
};

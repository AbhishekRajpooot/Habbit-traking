import mongoose from "mongoose";

export const connectToDb = async () => {
  await mongoose.connect("mongodb://localhost:27017/");
  console.log("COnnect to mongoDB ");
};

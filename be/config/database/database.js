import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.ashjo.mongodb.net/watchTrip?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
      }
    );

    console.log("DB is connected...");
  } catch (error) {
    console.log(error.message);
  }
};

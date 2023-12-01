import mongoose from "mongoose";

const key =
  "mongodb+srv://marrnuel123:nTi4Z0lkPDOUal9B@cluster0.h7rfa9x.mongodb.net/?retryWrites=true&w=majority";

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(key);
    if (connection) {
      console.log("connection established");
    }
  } catch (error) {
    console.log("error in connection");
    throw error;
  }
};

export default connectDatabase;

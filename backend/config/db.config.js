const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}` || ""
    );
    console.log(`Mongodb Connect at ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports= connectDb;

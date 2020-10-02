import mongoose from "mongoose";

// connect to the database

const connectDB = async () => {
  //build the connection string
  const DB = process.env.DB_STR.replace("<username>", process.env.DB_USER)
    .replace("<username>", process.env.DB_NAME)
    .replace("<password>", process.env.DB_PASSWORD);
  //console.log(DB);

  //connect to db
  try {
    const conn = await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log(`MongoDB connected : ${conn.connection.host}`.blue); //.blue colors package
  } catch (err) {
    console.error(`Error : ${err.message}`.trimEnd.bold);
    process.exit(1);
  }
};

export default connectDB;

import mongoose from "mongoose";
import config from "../config/config";
// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );
const connection = async () => {
  try {
    console.log('---------mongooose connection ------',config.db.uri);

    await mongoose.connect( 
      config.db.uri
      ,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    console.log("mongo DB Connected Successfully");
  } catch (err) {
    console.log(err);
  }
};

export default connection;

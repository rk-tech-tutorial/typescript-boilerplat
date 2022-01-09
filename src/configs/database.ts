import mongoose from "mongoose";
import { configs } from "@configs";

// Mongodb Setup
const mongoConnect = async () => {
  const databaseUrl = `mongodb+srv://${configs.mongoDB.user}:${configs.mongoDB.pass}@${configs.mongoDB.host}/${configs.mongoDB.db}`;
  const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };

  try {
    await mongoose.connect(databaseUrl, options);
    console.info("MONGODB: Connection OK");
  } catch (err) {
    console.error("MONGODB: Connection Error: ", err);
    process.exit(1);
  }
};

// TODO: Add disconnect method if env will be in test mode
export { mongoConnect as connectDatabase };

export default mongoose;

import mongoose from "mongoose";

export class dbManager {

  public dbManager() {}

  /**
   *
   */
  public static connect() {
    try {
      mongoose.connect(process.env.DBHOST!, {});
    } catch (error) {
      console.log("Error connecting to MongoDB:" + error);
    }

    mongoose.connection.once("open", () =>
      console.log("Connected succesfully to MongoDB")
    );
  }

  /**
   *
   */
  public static close() {
    if (mongoose.connection != null) mongoose.connection.close();
  }
}

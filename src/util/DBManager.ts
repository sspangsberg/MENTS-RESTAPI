import mongoose from "mongoose";

export class DBManager {
  public DBManager() {}

  /**
   *
   */
  public static async connect() {
    try {
      // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
      await mongoose.connect(process.env.DBHOST!, {});
      //await mongoose.connection.db.admin().command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } catch {
      // Ensures that the client will close when you finish/error
      console.log("Error connecting to the database.");
    }
  }

  /**
   *
   */
  public static close() {
    if (mongoose.connection != null) mongoose.connection.close();
  }
}

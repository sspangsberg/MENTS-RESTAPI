import mongoose from "mongoose";

export class DBManager {

  /**
   *
   */
  public async connect() {
    await mongoose
      .connect(process.env.DBHOST!, {
        //useUnifiedTopology:true,
        //useNewUrlParser: true
      })
      .catch((error) => console.log("Error connecting to MongoDB:" + error));

    mongoose.connection.once("open", () =>
      console.log("Connected succesfully to MongoDB")
    );
  }

  /**
   *
   */
  public async close() {
    if (mongoose.connection != null) await mongoose.connection.close();
  }
}
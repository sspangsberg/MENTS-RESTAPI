import mongoose from "mongoose";

/**
 *
 */
export async function connect() {
  try {
    if (!process.env.DBHOST) {
      throw new Error("DBHOST environment variable is not defined");
    }

    //console.log(process.env.DBHOST);
    await mongoose.connect(process.env.DBHOST);
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
export function close() {
  if (mongoose.connection != null) mongoose.connection.close();
}

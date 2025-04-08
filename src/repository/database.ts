import mongoose from "mongoose";


/**
 * Tests the connection to the db
 */
export async function testConnection() {

  try {
    await connect();
    await disconnect();
    console.log("Database connection test successful (connect + disconnect).");
  }
  catch (error) {
    console.log("Error testing database connection." + error);
  }
}

/**
 * Connects to the db
 */
export async function connect() {
  try {

    if (!process.env.DBHOST) {
      throw new Error("DBHOST environment variable is not defined");
    }
    await mongoose.connect(process.env.DBHOST);

    if (mongoose.connection.db) {
      await mongoose.connection.db.admin().command({ ping: 1 });
    } else {
      throw new Error("Database connection is not established.");
    }

  } catch (error) {
    console.log("Error connecting to the database. Error: " + error);
  }
}

/**
 * Closes the db connection
 */
export async function disconnect() {

  try {
    await mongoose.disconnect();
    //console.log(mongoose.connections.length);
  }
  catch (error) {
    console.log("Database connection closed." + error);
  }
}
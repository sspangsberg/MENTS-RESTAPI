import mongoose from "mongoose";

export const connect = () => {
  mongoose
    .connect(process.env.DBHOST!, {
      //useUnifiedTopology:true,
      //useNewUrlParser: true
    })
    .catch((error) => console.log("Error connecting to MongoDB:" + error));

  mongoose.connection.once("open", () =>
    console.log("Connected succesfully to MongoDB")
  );
};

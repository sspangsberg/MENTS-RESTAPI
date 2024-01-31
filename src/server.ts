import express, {Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { productRouter } from "./routes/product";
import { authRouter } from "./routes/auth";

const app: Application = express();

require("dotenv-flow").config();

app.use(bodyParser.json());

mongoose.connect(
    process.env.DBHOST!,
    {
        //useUnifiedTopology:true,
        //useNewUrlParser: true
    }
).catch(error => console.log("Error connecting to MongoDB:" + error));

mongoose.connection.once("open", () => console.log("Connected succesfully to MongoDB (" + process.env.DBHOST! + ")"));


// route
app.get("/api/welcome", (req: Request, res: Response) => {
    res.status(200).send({message: "Welcome to the MEN REST API"});
})

app.use("/api/products", productRouter);
app.use("/api/user", authRouter);


const PORT: Number = parseInt(process.env.PORT as string, 10) || 4000;

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
})



module.exports = app;
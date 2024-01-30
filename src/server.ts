//const express = require("express");
import express, {Application} from "express";
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/auth");
const app: Application = express();

require("dotenv-flow").config();

app.use(bodyParser.json());

mongoose.connect(
    process.env.DBHOST,
    {
        //useUnifiedTopology:true,
        //useNewUrlParser: true
    }
).catch(error => console.log("Error connecting to MongoDB:" + error));

mongoose.connection.once("open", () => console.log("Connected succesfully to MongoDB"));


// route
app.get("/api/welcome", (req, res) => {
    res.status(200).send({message: "Welcome to the MEN REST API"});
})

app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);


const PORT: Number = parseInt(process.env.PORT as string, 10) || 4000;

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
})



module.exports = app;
// Imports
import express, { Application } from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import cors from "cors";

// Project imports
import routes from "./routes";
import { connect } from "./util/DBManager";

require("dotenv-flow").config();

const PORT: Number = parseInt(process.env.PORT as string, 10) || 4000;
const app: Application = express();
app.use(bodyParser.json());

// CORS npm package
app.use(cors({
  "origin": "*"
}));



/*
app.use(function (req, res, next) {
  res.header("Acces-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
  next();
});
*/

//setup Swagger
const swaggerDocument = YAML.load("./docs/swagger.yaml");
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to database
connect();

// Attach routes handled by controllers
app.use("/api/", routes);

// Start server and listen for request on selected port
app.listen(PORT, function () {
  console.log("Server is running on port: " + PORT);
});

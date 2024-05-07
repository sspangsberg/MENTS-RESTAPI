// Imports
import express, { Application } from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

// Project imports
import routes from "./routes";
import { DBConnect } from "./util/DBManager";

require("dotenv-flow").config();

const PORT: Number = parseInt(process.env.PORT as string, 10) || 4000;
const app: Application = express();
app.use(bodyParser.json());

//setup Swagger
const swaggerDocument = YAML.load("./docs/swagger.yaml");
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to database
DBConnect();

// Attach routes handled by controllers
app.use("/api/", routes);

// Start server and listen for request on selected port
app.listen(PORT, function () {
  console.log("Server is running on port: " + PORT);
});

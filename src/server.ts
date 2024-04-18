// Imports
import express, { Application } from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./util/swagger_output.json";

// test
// Project imports
import routes from "./routes";
import { DBConnect } from "./util/DBManager";

require("dotenv-flow").config();

const PORT: Number = parseInt(process.env.PORT as string, 10) || 4000;
const app: Application = express();
app.use(bodyParser.json());

// Connect to database
DBConnect();

// Attach routes handled by controllers
app.use("/api/", routes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput));


// Start server and listen for request on selected port
app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
})
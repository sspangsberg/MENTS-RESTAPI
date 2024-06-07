// Imports
import express, { Application } from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import cors from "cors";

// Project imports
import routes from "./routes";
import { DBManager } from "./util/DBManager";

export class App {
  private app: Application = express();
  /**
   *
   */
  public startServer() {
    require("dotenv-flow").config();

    DBManager.connect();

    this.app.use(bodyParser.json());
    this.app.use("/api/", routes);

    this.setupCors();
    this.setupSwagger();

    const PORT: Number = parseInt(process.env.PORT as string, 10) || 4000;
    this.app.listen(PORT, function () {
      console.log("Server is running on port: " + PORT);
    });
  }

  /**
   *
   */
  private setupSwagger() {
    const swaggerDocument = YAML.load("./docs/swagger.yaml");
    this.app.use(
      "/api/docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  /**
   *
   */
  private setupCors() {
    this.app.use(
      cors({
        origin: "*",
      })
    );
  }
}

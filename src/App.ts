// Imports
import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";

// Project imports
import routes from "./routes";
import { dbManager } from "./util/dbManager";
import { DocManager } from "./util/DocManager";

export class App {
  private app: Application = express();
  /**
   *
   */
  public startServer() {
    require("dotenv-flow").config();

    dbManager.connect();
    DocManager.setupDocs(this.app);

    this.app.use(bodyParser.json());
    this.app.use("/api/", routes);

    this.setupCors();

    const PORT: Number = parseInt(process.env.PORT as string, 10) || 4000;
    this.app.listen(PORT, function () {
      console.log("Server is running on port: " + PORT);
    });
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

// Imports
import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";

// Project imports
import routes from "./routes";
import { DBManager } from "./util/DBManager";
import { DocManager } from "./util/DocManager";

export class App {
  private app: Application = express();
  /**
   *
   */
  public startServer() {
    require("dotenv-flow").config();

    DBManager.connect();
    DocManager.setupDocs(this.app);

    this.app.use(bodyParser.json());
    
    // kw 28-nov-2024 - init CORS before defining Routes
    this.setupCors();
    
    this.app.use("/api/", routes);



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
        origin: "*", // Allow requests from any origin
        // kw 29-nov-2024 - allow methods
        methods: 'GET,HEAD,PUT,OPTIONS,PATCH,POST,DELETE',
        credentials: true,
      })
    )
  }
}

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
 /*    this.app.use(
      cors({
        origin: "*", // Allow requests from any origin
        // kw 29-nov-2024 - allow methods + headers + credentials
        methods: 'GET,HEAD,PUT,OPTIONS,PATCH,POST,DELETE',
        allowedHeaders: ['auth-token', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'] // Allow specific headers
      })
    ); */

    // kw 2-dec-2024 - set the Access-Control-Allow-Origin header for preflight requests - console error 
    this.app.options('*', (req, res) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,OPTIONS,PATCH,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'auth-token, Origin, X-Requested-With, Content-Type, Accept');
      res.sendStatus(200);
    });
  }
}

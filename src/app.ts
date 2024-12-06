// Imports
import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenvFlow from "dotenv-flow";

// Project imports
import routes from "./routes";
import { connect as dbconnect } from "./util/DBManager";
import { setupDocs } from "./util/docManager";

dotenvFlow.config();
const app: Application = express();


/**
 *
 */
export function startServer() {

  dbconnect();
  setupDocs(app);

  app.use(bodyParser.json());

  // kw 28-nov-2024 - init CORS before defining Routes
  setupCors();

  app.use("/api/", routes);

  const PORT: number = parseInt(process.env.PORT as string, 10) || 4000;
  app.listen(PORT, function () {
    console.log("Server is running on port: " + PORT);
  });
}

/**
 *
 */

export function setupCors() {

  // kw 2-dec-2024 - Working CORS setup without credentials. Could refactor
  app.use(
    cors({
      origin: "*", // Allow requests from any origin
      // kw 29-nov-2024 - allow methods + headers + credentials
      methods: 'GET,HEAD,PUT,OPTIONS,PATCH,POST,DELETE',
      allowedHeaders: ['auth-token', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'], // Allow specific headers
      credentials: true,
    })
  );

  // kw 2-dec-2024 - set the Access-Control-Allow-Origin header for preflight requests - console error 
  app.options('*', (req: Request, res: Response) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,OPTIONS,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'auth-token, Origin, X-Requested-With, Content-Type, Accept');
    // test for credentials
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200);
  });
}
// Imports
import express, { Application, Request, Response } from "express";
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
  // CHATGPT test. Cant use a wildcard for the origin when credentials are set to true . ie origin: '*'
  private setupCors() {
    const allowedOrigins = ['http://localhost:5173', 'http://your-other-origin.com']; // Add other allowed origins here
  
    this.app.use(
      cors({
        origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
          // Allow requests with no origin (like mobile apps or curl requests)
          if (!origin) return callback(null, true);
          if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
          }
          return callback(null, true);
        },
        methods: 'GET,HEAD,PUT,OPTIONS,PATCH,POST,DELETE',
        allowedHeaders: ['auth-token', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'], // Allow specific headers
        credentials: true,
      })
    );
  
    // Manually set the Access-Control-Allow-Origin header for preflight requests
    this.app.options('*', (req: Request, res: Response) => {
      const origin = req.headers.origin;
      if (origin && allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
      }
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,OPTIONS,PATCH,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'auth-token, Origin, X-Requested-With, Content-Type, Accept');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.sendStatus(200);
    });
  }

  /* private setupCors() { // WORKING
    this.app.use(
      cors({
        origin: "*", // Allow requests from any origin
        // kw 29-nov-2024 - allow methods + headers + credentials
        methods: 'GET,HEAD,PUT,OPTIONS,PATCH,POST,DELETE',
        allowedHeaders: ['auth-token', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'], // Allow specific headers
        credentials: true,
      })
    );

    // kw 2-dec-2024 - set the Access-Control-Allow-Origin header for preflight requests - console error 
    this.app.options('*', (req, res) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,OPTIONS,PATCH,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'auth-token, Origin, X-Requested-With, Content-Type, Accept');
      // test for credentials
      res.header('Access-Control-Allow-Credentials', 'true');
      res.sendStatus(200);
    });
  } */
}

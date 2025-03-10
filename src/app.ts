// Imports
import express, { Application } from "express";
import cors from "cors";
import dotenvFlow from "dotenv-flow";

// Project imports
import routes from "./routes";
import { testConnection } from "./repository/database";
import { setupDocs } from "./util/docManager";

dotenvFlow.config();
const app: Application = express();


/**
 *
 */
export function startServer() {

    setupCors();

    app.use(express.json());

    app.use("/api", routes);

    setupDocs(app);
    
    // Repository connection test (database)
    testConnection();
    

    const PORT: number = parseInt(process.env.PORT as string) || 4000;
    app.listen(PORT, function () {
        console.log("Server is running on port: " + PORT);
    });
}

/**
 *
 */
export function setupCors() {

    app.use(
        cors({
            origin: "*", 
            methods: 'GET,HEAD,PUT,OPTIONS,PATCH,POST,DELETE',
            allowedHeaders: ['auth-token', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'], // Allow specific headers
            credentials: true,
        })
    );
}
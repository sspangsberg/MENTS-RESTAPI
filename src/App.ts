// Imports
import express, { Application } from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
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
    const swaggerDefinition = {
      openapi: "3.0.0",
      info: {
        title: "Express API for JSONPlaceholder",
        version: "1.0.0",
        description:
          "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
        license: {
          name: "Licensed Under MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "JSONPlaceholder",
          url: "https://jsonplaceholder.typicode.com",
        },
      },
      servers: [
        {
          url: "http://localhost:4000/api/",
          description: "Development server"
        }
      ],

      tags: [
        {
          name: "Product Routes",
          description: "Routes that handles products"
        },
        {
            name: "User Routes",
            description: "Routes that handles users"
        }
      ],

      components: {

        securitySchemes: {
            ApiKeyAuth: {
                type: "apiKey",
                in: "header",
                name: "auth-token"
            }            
        },           
        schemas: 
            {
                Product: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        description: { type: "string" },
                        price: { type: "number" },
                        stock: { type: "number" },
                        status: { type: "boolean" },
                        _createdBy: { type: "string" }
                    }
                },
                User: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        email: { type: "string" },
                        password: { type: "string" },
                        registerDate: { type: "string" }
                    }
                }
            }
        }      
    };

    const options = {
      swaggerDefinition,
      // Paths to files containing OpenAPI definitions
      apis: ["**/*.ts"],
    };

    const swaggerSpec = swaggerJSDoc(options);

    //const swaggerDocument = YAML.load("./docs/swagger.yaml");
    this.app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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

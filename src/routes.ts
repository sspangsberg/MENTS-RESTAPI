import { Router, Request, Response } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsInStock,
  getProductsBasedOnQuery,
  updateProductById,
  deleteProductById,
} from "./controllers/productController";

//import { ProductControllerC } from "./controllers/ProductControllerC";
//
import {
  registerUser,
  loginUser,
  verifyToken,
} from "./controllers/authController";

const router: Router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - App Routes
 *     summary: Health check
 *     description: Basic route to check if the api is running
 *     responses:
 *       200:
 *         description: Server up and running.
 */
router.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "Welcome to the TypeScript MEN REST-API" });
});

/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *       - User Routes
 *     summary: Register a new user
 *     description: Takes a user in the body and tries to register it in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       201:
 *         description: User created succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 _id:
 *                   type: string
 */
router.post("/user/register", registerUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - User Routes
 *     summary: Login an existing user
 *     description: Logs in an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in succesfully
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 */
router.post("/user/login", loginUser);

/**
 * @swagger
 * /products:
 *   post:
 *     tags:
 *       - Product Routes
 *     summary: Create a new Product
 *     description: Create a new Product
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Product"
 *           example:
 *             name: "Test Product"
 *             description: "Test Product description"
 *             price: 10.95
 *             stock: 10
 *             status: false
 *             _createdBy: ""
 *
 *     responses:
 *       201:
 *         description: Product created succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
 */
router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.get("/products/instock", getProductsInStock);
router.get("/products/query", getProductsBasedOnQuery);

router.get("/products/:id", getProductById);
router.put("/products/:id", verifyToken, updateProductById),
  router.delete("/products/:id", deleteProductById);

export default router;

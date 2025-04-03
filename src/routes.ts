import { Router, Request, Response } from 'express';

// Project imports
import {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsInStock,
  getProductsByQuery,
  updateProductById,
  deleteProductById,
} from './controllers/productController';

import { registerUser, loginUser, verifyToken } from './controllers/authController';
import { startCron } from './controllers/devToolsController';

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
router.get('/', (req: Request, res: Response) => {
  res.status(200).send({ message: 'Welcome to the TypeScript MEN REST-API' });
})


/**
 * @swagger
 * /start-cron/{duration}:
 *   get:
 *     tags:
 *       - Start Cron Jobs
 *     summary: Starts the cron job that keep render alive
 *     description: N/A
 *     parameters:
 *       - in: path
 *         name: duration
 *         required: true
 *         description: The total duration to keep the remote server alive in minutes
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Response from the cron job           
 */
router.get('/start-cron/:duration', startCron);

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
router.post('/user/register', registerUser);

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
router.post('/user/login', loginUser);

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
 *             name: "Mr. Burns statue"
 *             description: "The best and precious statue ever"
 *             imageURL: "https://picsum.photos/500/500"
 *             price: 10000.96
 *             stock: 3
 *             discount: false
 *             discountPct: 0
 *             isHidden: false
 *             _createdBy: "6748771972ba527f3a17a313"
 *     responses:
 *       201:
 *         description: Product created succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
 */
router.post('/products', verifyToken, createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *       - Product Routes
 *     summary: Retrieves a list of Products
 *     description: Retrieves a list of products as JSON objects.
 *     responses:
 *       200:
 *         description: A list of product JSON objects in an array.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Product"
 */
router.get('/products', getAllProducts);

/**
 * @swagger
 * /products/instock:
 *   get:
 *     tags:
 *       - Product Routes
 *     summary: Retrieves all Products with a positive stock
 *     description:
 *     responses:
 *       200:
 *         description: A list of Product JSON objects in an array.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Product"
 */
router.get('/products/instock', getProductsInStock);

/**
 * @swagger
 * /products/query/{field}/{value}:
 *   get:
 *     tags:
 *       - Product Routes
 *     summary: Retrieves all Products based on a specified query
 *     description:
 *     parameters:
 *       - in: path
 *         name: field
 *         required: true
 *         description: The field we want to query
 *         schema:
 *           type: string
 *       - in: path
 *         name: value
 *         required: true
 *         description: The value of the field
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of Product JSON objects in an array.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Product"
 */
router.get('/products/query/:field/:value', getProductsByQuery);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags:
 *       - Product Routes
 *     summary: Specific Product
 *     description: Retrieves a specific Product based on it id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A Product in the format of a JSON object.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Product"
 */
router.get('/products/:id', getProductById);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags:
 *       - Product Routes
 *     summary: Updates a specific Product
 *     description: Updates a specific Product based on it id
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Product"
 *
 *     responses:
 *       201:
 *         description: Product updated succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
 */
router.put('/products/:id', verifyToken, updateProductById);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags:
 *       - Product Routes
 *     summary: Deletes a specific Product
 *     description: Deletes a specific Product based on it id
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB id
 *         schema:
 *           type: string
 *
 *     responses:
 *       201:
 *         description: Product deleted succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
 */
router.delete('/products/:id', verifyToken, deleteProductById);

export default router;

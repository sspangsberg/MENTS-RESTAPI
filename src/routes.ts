import { Router, Request, Response } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsInStock,
  getProductsBasedOnFilter,
  updateProductById,
  deleteProductById,
} from "./controllers/productController";

import {
  registerUser,
  loginUser,
  verifyToken,
} from "./controllers/authController";

export const router: Router = Router();

// healthcheck
router.get("/welcome", (req: Request, res: Response) => {
  res.status(200).send({ message: "Welcome to the TypeScript MEN REST-API" });
});

// auth/user routes
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

// product routes
router.post("/products/", createProduct);
router.get("/products/", getAllProducts);
router.get("/products/instock", getProductsInStock);
router.get("/products/:field/:value", getProductsBasedOnFilter);

router.get("/products/:id", getProductById);
router.put("/products/:id", verifyToken, updateProductById),
router.delete("/products/:id", deleteProductById);

export default router;

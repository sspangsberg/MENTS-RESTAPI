import { Router } from 'express';
import { 
    createProduct,
    getAllProducts,
    getProductById,
    getProductsInStock,
    updateProductById,
    deleteProductById    
} from './controllers/ProductController';

import {
    registerUser,
    loginUser
} from './controllers/AuthController';

export const router: Router = Router();

const { verifyToken } = require("./validation");

// routes
/*
router.get("/api/welcome", (req: Request, res: Response) => {
    res.status(200).send({message: "Welcome to the MEN REST API"});
})
*/

// user routes
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);

// product routes
router.post('/products/', verifyToken, createProduct);
router.get('/products/',getAllProducts);
router.get('/products/:id', getProductById);
router.get('/products/instock', getProductsInStock);
router.put('/products/:id', verifyToken, updateProductById),
router.delete('/products/:',verifyToken, deleteProductById);

export default router;
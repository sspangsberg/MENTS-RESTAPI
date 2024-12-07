import { Request, Response } from 'express'
import { productModel } from '../models/productModel'

// CRUD routes

/**
 * Creates a new product based on the request body
 * @param req
 * @param res
 */
export async function createProduct(req: Request, res: Response) {

    const data = req.body;

    try {
        const product = new productModel(data);
        const result = await product.save();
        res.status(201).send(result);
    }
    catch (error) {
        res.status(500).send(
            {
                message: 'Error creating product.',
                error: error
            }
        );
    }
}

/**
 * Get all products
 * @param req
 * @param res
 */
export async function getAllProducts(req: Request, res: Response) {
    try {
        const result = await productModel.find({});
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: error });
    }
}

/**
 * Get all products in stock
 * @param req
 * @param res
 */
export async function getProductsInStock(req: Request, res: Response) {
    try {
        const result = await productModel.find({ stock: { $gt: 0 } });
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: error });
    }
}

/**
 * Get specific product by id
 * @param req
 * @param res
 */
export async function getProductById(req: Request, res: Response) {
    try {
        const result = await productModel.find({ _id: req.params.id });
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: error });
    }
}

/**
 *
 * @param req
 * @param res
 */
export async function getProductsBasedOnQuery(req: Request, res: Response) {
    const field = req.body.field;
    const value = req.body.value;

    try {
        const result = await productModel.find({ [field]: [value] });
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: error });
    }
}


/**
 * Update specific product by id
 * @param req 
 * @param res 
 */
export async function updateProductById(req: Request, res: Response) {
    const id = req.params.id;

    try {
        const result = await productModel.findByIdAndUpdate(id, req.body);

        if (!result) {
            res.status(404).send('Cannot update product with id=' + id);
        }
        else { res.status(200).send('Product was succesfully updated.'); }
    }
    catch (error) {
        res.status(500).send(
            {
                message: 'Error updating product with id=' + id,
                error: error
            }
        );
    }
}

/**
 * Delete specific product by id
 * @param req 
 * @param res 
 */
export async function deleteProductById(req: Request, res: Response) {

    const id = req.params.id;

    try {
        const result = await productModel.findByIdAndDelete(id);

        if (!result) {
            res.status(404).send('Cannot delete product with id=' + id);
        }
        else { res.status(200).send('Product was succesfully deleted.'); }
    }
    catch (error) {
        res.status(500).send(
            {
                message: 'Error deleting product with id=' + id,
                error: error
            }
        );
    }
}

import { Request, Response } from 'express';
import { Product } from '../models/product';

// CRUD routes
export const createProduct = (req: Request, res: Response) => {
    let data = req.body;

    Product.insertMany(data)
    .then(data => { res.send(data); })
    .catch((err:string) => { res.status(500).send( { message: err }); })
};

// Read all products - get
export const getAllProducts = (req: Request, res: Response) => {

    Product.find()
    .then(data => { res.send(data); })
    .catch((err:string) => { res.status(500).send( { message: err }); })
};

// Read all products currently in stock - get
export const getProductsInStock = (req: Request, res: Response) => {

    Product.find({ inStock: true })
    .then(data => { res.send(data); })
    .catch((err:string) => { res.status(500).send( { message: err }); })
};

// Read specific product - get
// Read all products - get
export const getProductById = (req: Request, res: Response) => {

    Product.findById(req.params.id)
    .then(data => { res.send(data); })
    .catch((err:string) => { res.status(500).send( { message: err }); })
};

// Update specific product - put
export const updateProductById = (req: Request, res: Response) => {

    const id = req.params.id;

    Product.findByIdAndUpdate(id, req.body)
    .then(data => { 
        if (!data) {
            res.status(404).send( { message: "Cannot update product with id=" + id + ". Maybe product was not found."});
        }
        else {
            res.send( { message: "Product was succesfully updated."});
        }
    })
    .catch((err:string) => { res.status(500).send( { message: "Error updating product with id=" + id }); })
};

// Delete specific product - delete
export const deleteProductById = (req: Request, res: Response) => {

    const id = req.params.id;

    Product.findByIdAndDelete(id)
    .then(data => { 
        if (!data) {
            res.status(404).send( { message: "Cannot delete product with id=" + id + ". Maybe product was not found."});
        }
        else {
            res.send( { message: "Product was succesfully deleted."});
        }
    })
    .catch((err:string) => { res.status(500).send( { message: "Error delete product with id=" + id }); })
};
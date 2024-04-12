import { Request, Response } from 'express';
import { ProductModel } from '../models/ProductModel';

// CRUD routes
export const createProduct = (req: Request, res: Response) => {
    let data = req.body;

    ProductModel.insertMany(data)
    .then(data => { res.send(data); })
    .catch((err:string) => { res.status(500).send( { message: err }); })
};

// Read all products - get
export const getAllProducts = (req: Request, res: Response) => {

    ProductModel.find()
    .then(data => { res.send(data); })
    .catch((err:string) => { res.status(500).send( { message: err }); })
};

// Read all products currently in stock - get
export const getProductsInStock = (req: Request, res: Response) => {

    ProductModel.find({ inStock: true })
    .then(data => { res.send(data); })
    .catch((err:string) => { res.status(500).send( { message: err }); })
};

// Read specific product - get
// Read all products - get
export const getProductById = (req: Request, res: Response) => {

    ProductModel.findById(req.params.id)
    .then(data => { res.send(data); })
    .catch((err:string) => { res.status(500).send( { message: err }); })
};

// Update specific product - put
export const updateProductById = (req: Request, res: Response) => {

    const id = req.params.id;

    ProductModel.findByIdAndUpdate(id, req.body)
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

    ProductModel.findByIdAndDelete(id)
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
//const router = require("express").Router(); // JS
import { type Request, type Response, type NextFunction, Router } from 'express';
export const productRouter: Router = Router();

import { Product } from '../models/product';
//const product = require("../models/product"); // JS
const { verifyToken } = require("../validation");


// CRUD operations
// Create product - post
productRouter.post("/", verifyToken, (req: Request, res: Response) => {
    let data = req.body;

    Product.insertMany(data)
    .then(data => { res.send(data); })
    .catch((err:string) => { res.status(500).send( { message: err }); })
});

// Read all products - get
productRouter.get("/", (req: Request, res: Response) => {

    Product.find()
    .then(data => { res.send(data); })
    .catch((err:string) => { res.status(500).send( { message: err }); })
})

// Read all products currently in stock - get
productRouter.get("/instock", (req: Request, res: Response) => {

    Product.find({ inStock: true })
    .then(data => { res.send(data); })
    .catch((err:string) => { res.status(500).send( { message: err }); })
})

// Read specific product - get
// Read all products - get
productRouter.get("/:id", (req: Request, res: Response) => {

    Product.findById(req.params.id)
    .then(data => { res.send(data); })
    .catch((err:string) => { res.status(500).send( { message: err }); })
})



// Update specific product - put
productRouter.put("/:id", verifyToken, (req: Request, res: Response) => {

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
})


// Delete specific product - delete
productRouter.delete("/:id", verifyToken, (req: Request, res: Response) => {

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
})



const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productSchema = new Schema(
    {
        name: {type:String},
        description: {type:String},
        price: {type:Number},
        inStock: {type:Boolean}
    }
)

module.exports = mongoose.model("product",productSchema);
import mongoose from "mongoose";
import { productModel } from "../models/productModel";
import { userModel } from "../models/userModel";
import { connect } from "./dbManager";
import bcrypt from "bcrypt";
import { Product } from "../interfaces/product";
require("dotenv-flow").config();

export const seed = async () => {
  try {
    connect();

    await deleteAllData();
    await seedData();
    console.log("Seeding process completed successfully...");
    process.exit();
  } catch (err) {
    console.log("Error Seeding data." + err);
  }
};

const deleteAllData = async () => {
  await productModel.deleteMany();
  await userModel.deleteMany();

  console.log("Cleared data successfully...");
};

const seedData = async () => {
  // has the password
  //const salt = await bcrypt.genSalt(10);
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash("12345678", salt);

  let user1 = new userModel();
  user1.name = "Peter Petersen";
  user1.email = "peter@petersen.com";
  user1.password = passwordHash;
  await user1.save();
  
  let user2 = new userModel();
  user2.name = "Heidi Jensen";
  user2.email = "heidi@jensen.com";
  user2.password = passwordHash;
  await user2.save();

  let products = [
    {
      name: "Product #1 (made by Peter)",
      description: "Product #1 description",
      price: 2,
      stock: 20,
      status: true,
      _createdBy: user1.id,
    },
    {
      name: "Product #2 (made by Peter)",
      description: "Product #2 description",
      price: 100.96,
      stock: 15,
      status: false,
      _createdBy: user1.id,
    },
    {
      name: "Product #3 (made by Heidi)",
      description: "Product #3 description",
      price: 100.96,
      stock: 15,
      status: false,
      _createdBy: user2.id,
    },
    {
      name: "Product #4 (made by Heidi)",
      description: "Product #4 description",
      price: 594.91,
      stock: 15,
      status: false,
      _createdBy: user2.id,
    }
  ];
      
  
    let p = new productModel();
    p.name = products[0].name;
    p.description = products[0].description;
    p.price = products[0].price;
    p.stock = products[0].stock;
    p.status = products[0].status;
    p._createdBy = products[0]._createdBy;

    await p.save();

    console.log(p.id);


  console.log("Seeded data successfully...");
}

// start the actual seeding
seed();

import { productModel } from "../models/productModel";
import { userModel } from "../models/userModel";
import { DBConnect } from "./dbManager";
import bcrypt from "bcrypt";
require("dotenv-flow").config();

export const seed = async () => {
  try {
    DBConnect();

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

  let users = [
    {
      name: "Peter Petersen",
      email: "peter@petersen.com",
      password: passwordHash,
    },
    {
      name: "Heidi Jensen",
      email: "heidi@jensen.com",
      password: passwordHash,
    },
  ];

  let products = [
    {
      name: "Product #1",
      description: "Product #1 description",
      price: 2,
      stock: 20,
      status: true,
      _createdBy: "peter@petersen.com",
    },
    {
      name: "Product #2",
      description: "Product #2 description",
      price: 100.96,
      stock: 15,
      status: false,
      _createdBy: "peter@petersen.com",
    },
    {
      name: "Product #3",
      description: "Product #3 description",
      price: 100.96,
      stock: 15,
      status: false,
      _createdBy: "heidi@jensen.com",
    },
    {
      name: "Product #4",
      description: "Product #4 description",
      price: 594.91,
      stock: 15,
      status: false,
      _createdBy: "heidi@jensen.com",
    },
  ];

  await userModel.insertMany(users);
  await productModel.insertMany(products);

  console.log("Seeded data successfully...");
};

// start the actual seeding
seed();

import { productModel } from "../models/productModel";
import { userModel } from "../models/userModel";
import { connect as dbconnect } from "./dbManager";
import bcrypt from "bcrypt";
import dotenvFlow from "dotenv-flow";

dotenvFlow.config();

export const seed = async () => {
  try {
    dbconnect();
    
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
  // hash the password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash("12345678", salt);

  const user1 = new userModel();
  user1.name = "Peter Petersen";
  user1.email = "peter@petersen.com";
  user1.password = passwordHash;
  await user1.save();

  const user2 = new userModel();
  user2.name = "Heidi Jensen";
  user2.email = "heidi@jensen.com";
  user2.password = passwordHash;
  await user2.save();

  const products = [
    {
      name: "Product #1 (made by Peter)",
      description: "Product #1 description",
      imageURL: "https://picsum.photos/500/500",
      price: 2,
      stock: 20,
      discount: true,
      discountPct: 10,
      isHidden: false,
      _createdBy: user1.id,
    },
    {
      name: "Product #2 (made by Peter)",
      description: "Product #2 description",
      imageURL: "https://picsum.photos/500/500",
      price: 100.96,
      stock: 15,
      discount: true,
      discountPct: 25,
      isHidden: false,
      _createdBy: user1.id,
    },
    {
      name: "Product #3 (made by Heidi)",
      description: "Product #3 description",
      imageURL: "https://picsum.photos/500/500",
      price: 192.96,
      stock: 150,
      discount: false,
      discountPct: 0,
      isHidden: false,
      _createdBy: user2.id,
    },
    {
      name: "Product #4 (made by Heidi)",
      description: "Product #4 description",
      imageURL: "https://picsum.photos/500/500",
      price: 594.91,
      stock: 15,
      discount: false,
      discountPct: 0,
      isHidden: false,
      _createdBy: user2.id,
    },
  ];

  await productModel.insertMany(products);

  console.log("Seeded data successfully...");
};

// start the actual seeding
seed();
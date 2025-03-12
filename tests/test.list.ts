process.env.NODE_ENV = 'test';

import { test } from '@playwright/test';

// Test Collections
import userTestCollection from './user.test';
import productTestCollection from './product.test';
import health from './health.test';

// Project imports
import { userModel } from "../src/models/userModel";
import { productModel } from "../src/models/productModel";
import { connect, disconnect } from '../src/repository/database';

import dotenvFlow from "dotenv-flow";
dotenvFlow.config();


function setup() {
    test.beforeEach(async () => {

        try {
            await connect();
            await userModel.deleteMany({});
            await productModel.deleteMany({});
        }
        finally {
            await disconnect();
        }
    });

    test.afterAll(async () => {
        try {
            await connect();
            await userModel.deleteMany({});
            await productModel.deleteMany({});
        }
        finally {
            await disconnect();
        }
    });
}

setup();

// Run tests sequentially
test.describe(health);
test.describe(userTestCollection);
test.describe(productTestCollection);
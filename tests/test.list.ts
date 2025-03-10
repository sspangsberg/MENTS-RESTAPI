process.env.NODE_ENV = 'test';

import { test } from '@playwright/test';
import myFirstTest from './example.test';
import { userModel } from "../src/models/userModel";
import { connect, disconnect } from '../src/repository/database';
import dotenvFlow from "dotenv-flow";

dotenvFlow.config();

function setup() {
    test.beforeAll(async () => {
    
        try {
            await connect();
            await userModel.deleteMany({});
        }    
        finally {
            await disconnect();
        }
    });
    
    test.afterAll(async () => {
        try {
            await connect();
            await userModel.deleteMany({});
        }    
        finally {
            await disconnect();
        }
    });
}


setup();


test.describe(myFirstTest);

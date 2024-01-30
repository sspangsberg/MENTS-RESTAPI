"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const express = require("express");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const product_1 = __importDefault(require("./routes/product"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
require("dotenv-flow").config();
app.use(body_parser_1.default.json());
mongoose_1.default.connect(process.env.DBHOST, {
//useUnifiedTopology:true,
//useNewUrlParser: true
}).catch(error => console.log("Error connecting to MongoDB:" + error));
mongoose_1.default.connection.once("open", () => console.log("Connected succesfully to MongoDB"));
// route
app.get("/api/welcome", (req, res) => {
    res.status(200).send({ message: "Welcome to the MEN REST API" });
});
app.use("/api/products", product_1.default);
app.use("/api/user", auth_1.default);
const PORT = parseInt(process.env.PORT, 10) || 4000;
app.listen(PORT, function () {
    console.log("Server is running on port: " + PORT);
});
module.exports = app;
//# sourceMappingURL=server.js.map
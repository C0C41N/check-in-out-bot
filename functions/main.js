"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const serverless = require("serverless-http");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.post('/.netlify/functions/main', async (req, res) => {
    res.end(JSON.stringify(req, null, 3));
});
module.exports = app;
module.exports.handler = serverless(app);
//# sourceMappingURL=main.js.map
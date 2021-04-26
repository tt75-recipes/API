const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const recipeRoutes = require("./recipes/recipe-router");
const authRoutes = require("./auth/auth-router");

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use("/api/auth", authRoutes);
server.use("/api/recipes", recipeRoutes);

module.exports = server;

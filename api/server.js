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

server.get("/", (req, res) => {
  res.json({
    message: "TT75 RECIPES APP",
    repo: "https://github.com/tt75-recipes",
  });
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = server;

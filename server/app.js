const express = require("express");
const cors = require("cors");
const app = express();
const helmet = require("helmet");
require("dotenv").config();

const userRoutes = require("./routes/user");

app.use(cors());
app.use(express.json());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use("/api", userRoutes);

module.exports = app;

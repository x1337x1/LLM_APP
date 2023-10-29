const db = require("./config/db")
const path = require("path");
const PORT = process.env.PORT || 1337
require("dotenv").config();
const logger = require("morgan");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");





const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());

db.once("open", () => {
    app.listen(PORT, async () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
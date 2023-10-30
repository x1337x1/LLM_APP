const express = require("express");
const router = express.Router();
const { home } = require("../controllers/home-controller")
const isAuthorized = require("../middlewares/authToken")


router.get("/home", isAuthorized, home)

module.exports = router;
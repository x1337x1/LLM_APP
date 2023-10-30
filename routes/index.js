const express = require("express");
const router = express.Router();
const accountsRoutes = require("./account.routes")
const homeRoutes = require("./home.routes")






router.use("/accounts/v1", accountsRoutes);
router.use("/home/v1", homeRoutes);

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

module.exports = router;

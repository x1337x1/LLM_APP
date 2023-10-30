const express = require("express");
const router = express.Router();
const accountsRoutes = require("./account.routes")






router.use("/accounts/v1", accountsRoutes);


/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

module.exports = router;

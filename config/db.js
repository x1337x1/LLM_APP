const mongoose = require("mongoose");
require("dotenv").config();

mongoose
    .connect(process.env.DEVELOP_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(`MongoDB Connection Error: ${err.message}`));
module.exports = mongoose.connection;

const db = require("./config/db")
const path = require("path");
const PORT = process.env.PORT || 1337
require("dotenv").config();
const logger = require("morgan");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const kafkaInstance = require("./controllers/integrations/kafka/index")

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(require("./utils/responseHandler/responseHandler"));
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api", require("./routes"));

app.post('/send-query', async (req, res) => {
    // Add your webhook handling logic here
    const payload = req.body
    await kafkaInstance.producer.sendQuery([payload])

    // Respond to the webhook request
    res.ok("success")
});

app.post('/send-stories', async (req, res) => {
    // Add your webhook handling logic here
    const payload = req.body
    console.log('Webhook received:');
    await kafkaInstance.producer.sendQuery([payload])


    // Respond to the webhook request
    res.ok("success")
});


db.once("open", () => {
    app.listen(PORT, async () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const mongodbUrl = process.env.mongodbUrl;
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3004;
const mainRouter = require("./routes/index")

app.use("/api/v1", cors(), mainRouter)


mongoose.connect(mongodbUrl).then(
    app.listen(PORT, () => {
        console.log(`MongoDb connected and server is running on ${PORT}`)
    })

)
const express = require("express");
require("dotenv").config();
const mongodbUrl = process.env.mongodbUrl;
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3004;
const mainRouter = require("./routes/index")

app.use("/api/v1", mainRouter)


mongoose.connect(mongodbUrl).then(
    app.listen(PORT, () => {
        console.log(`MongoDb connected and server is running on ${PORT}`)
    })

)
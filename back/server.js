require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => 
{
    console.log("MongoDB connected");
})
.catch((error)=>
{
    console.log("MongoDB connection error", error);
});

app.get("/", (req, res) =>

{
    res.json({ message: "API working" });
});

app.listen(PORT, () => {
    console.log (`Server running on port ${PORT}`);
});
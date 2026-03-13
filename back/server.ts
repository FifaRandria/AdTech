import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import mongoose from "mongoose";

import campaignRoutes from "./routes/Campaigns";


const app: Application = express();

app.use(cors());
app.use(express.json());

const PORT: number = parseInt(process.env.PORT ?? "5000", 10);

const MONGO_URI: string = process.env.MONGO_URI ?? "";

if (!MONGO_URI)
{
    console.error("MONGO_URI undefined in file .env or .env missing")
    process.exit(1);
}

mongoose.connect(MONGO_URI).then(() =>{
    console.log("Mongodeb connected");
})
.catch((error: Error) =>{
    console.log ("MongoDB connection error", error.message);
});

app.get("/", (req, res) =>{
    res.json({message: "API working"});
});

app.use("/campaigns", campaignRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
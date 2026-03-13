import { Router } from "express";
import { serveAd } from "../controllers/Adcontroller";
import { getStats } from "../controllers/Adcontroller";

const router: Router = Router();

router.post("/", serveAd); 

export { router as serveAdRouter };

export { getStats };
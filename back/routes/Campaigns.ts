import { Router } from "express"

import {createCampaign, getCampaigns} from "../controllers/Campaigncontroller"

const router: Router = Router();

router.post("/", createCampaign);
router.get("/", getCampaigns);

export default router;

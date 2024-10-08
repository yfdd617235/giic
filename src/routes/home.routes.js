import { Router } from "express";
import { wakeUpServer } from "../controllers/wakeupserver.controller.js";


const router = Router();

router.get('/ping', wakeUpServer);

export default router;
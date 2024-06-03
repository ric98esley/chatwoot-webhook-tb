import { json, Router } from "express";
import { chatwootWebhookController } from "../../controllers/index.js";

const router = Router();

router.post("/", chatwootWebhookController)


export default router;
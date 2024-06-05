import { Router } from "express";
import { changeStatusController, chatwootWebhookController } from "../../controllers/index.js";

const router = Router();

router.post("/", chatwootWebhookController)
router.put("/change-status", changeStatusController)


export default router;
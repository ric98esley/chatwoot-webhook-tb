import { json, Router } from "express";
import { chatwootEventMap } from "../../mappers/chatwoot/index.js";
import { typeBotInstance } from "../../factories/typebot.factory.js";
import { typebotEventMap, typeBotMessagesMap } from "../../mappers/typebot/index.js";

const router = Router();

router.post("/", async (req, res, next) => {
  const data = req.body;
  const mappedData = chatwootEventMap(data);

  const typeBotSession = await typeBotInstance.createSession()

  const typeBotEventMapped = typebotEventMap(typeBotSession)
  const messagesMapped = typeBotMessagesMap(typeBotSession.messages)

  console.log("typeBotEventMapped", typeBotEventMapped)
  console.log("messagesMapped", messagesMapped)


  res.status(200).json({
    success: true,
    message: "Post request successful"
  })
})


export default router;
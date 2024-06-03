import { chatwootEventMap } from '../../mappers/chatwoot/index.js';
import { typeBotInstance } from '../../factories/typebot.factory.js';
import { chatwootFlow } from '../../factories/chatwoot-flow.factory.js';

export const chatwootWebhookController = (req, res, next) => {
  const data = req.body;
  chatwootEventMap(data)
    .then(async (chatwootEventMapped) => {
      const typeBotSession = await typeBotInstance.startChat();

      const chatwootPB = await chatwootFlow.upsertChatwootFlowSession(
        chatwootEventMapped.conversation.id,
        typeBotSession.typebot.sessionId,
        'started'
      );

      res.status(200).json({
        success: true,
        message: 'Post request successful',
      });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error in chatwootEventMap function' });
      console.log('error', error);
    });
};

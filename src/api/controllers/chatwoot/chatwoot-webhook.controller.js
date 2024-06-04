import { chatwootEventMap } from '../../mappers/chatwoot/index.js';
import { typeBotInstance } from '../../factories/typebot.factory.js';
import { chatwootFlow } from '../../factories/chatwoot-flow.factory.js';
import { chatwoot } from '../../factories/chatwoot.factory.js';

export const chatwootWebhookController = (req, res, next) => {
  const body = req.body;
  chatwootEventMap(body)
    .then(async (data) => {
      console.log('data', data);
      const flow = await chatwootFlow.findChatwootFlowSession(
        data.conversation.id
      );
      if (data.event === 'conversation_resolved') {
        await chatwootFlow.upsertChatwootFlowSession(
          data.conversation.id,
          null,
          'stopped'
        );
      }

      if (data.messageType === 'incoming' && data.event === 'message_created') {
        if (!flow || flow.status == 'stopped') {
          const typeBotSession = await typeBotInstance.startChat();
          await chatwootFlow.upsertChatwootFlowSession(
            data.conversation.id,
            typeBotSession.typebot.sessionId,
            'started'
          );

          chatwoot.sendMessages({
            messages: typeBotSession.messages,
            account: data.account.id,
            conversationId: data.conversation.id,
          });
        }

        if (flow && flow.status == 'started') {
          const { messages, typebot } = await typeBotInstance.continueChat(
            flow.session_id,
            data.conversation.content
          );

          if (typebot) {
            await chatwootFlow.upsertChatwootFlowSession(
              data.conversation.id,
              typebot.sessionId,
              'started'
            );
          }

          chatwoot.sendMessages({
            messages: messages,
            account: data.account.id,
            conversationId: data.conversation.id,
          });
        }
      }

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

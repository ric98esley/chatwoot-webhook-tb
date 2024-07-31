import { chatwootEventMap } from '../../mappers/chatwoot/index.js';
import { typeBotInstance } from '../../factories/typebot.factory.js';
import { chatwootFlow } from '../../factories/chatwoot-flow.factory.js';
import { chatwoot } from '../../factories/chatwoot.factory.js';

const pendingConversations = new Set(); // Set to keep track of pending conversations

export const chatwootWebhookController = async (req, res, next) => {
  try {
    const body = req.body;
    const data = await chatwootEventMap(body);

    const flow = await chatwootFlow.findChatwootFlowSession(data.conversation.id);

    // End the chat session when the conversation is resolved
    if (data.event === 'conversation_resolved') {
      await chatwootFlow.upsertChatwootFlowSession({
        conversationId: data.conversation?.id,
        sessionId: null,
        status: 'stopped',
      });
      pendingConversations.delete(data.conversation.id); // Remove from pending set
    }

    // Send the bot response when the user writes a message
    if (data.messageType === 'incoming' && data.event === 'message_created') {
      // Check if there's a pending response
      if (pendingConversations.has(data.conversation.id)) {
        return res.status(200).json({
          success: false,
          message: 'There is already a pending response for this conversation',
        });
      }

      pendingConversations.add(data.conversation.id); // Add to pending set

      let messagesToSend = [];
      let requiredNewSession = false;

      if (flow && flow.status == 'started') {
        const { messages, error } = await typeBotInstance.continueChat(
          flow.session_id,
          data.conversation.content
        );
        if (error) {
          requiredNewSession = true;
        } else {
          messagesToSend = messages;
        }
      }

      if (!flow || flow.status == 'stopped' || requiredNewSession) {
        // Set of variables will be prefilled in the typebot
        const prefilledVariables = {
          name: data.sender.name,
          email: data.sender.email,
          userPhone: data.sender.phoneNumber,
          conversationId: data.conversation.id,
          senderId: data.sender.id,
          accountId: data.account.id,
          agentCode: data.sender.agentCode ?? null,
          rustDeskCode: data.sender.rustDeskCode ?? null,
          cedula: data.sender.cedula ?? null,
          address: data.sender.address ?? null,
        };

        const { messages, typebot } = await typeBotInstance.startChat(prefilledVariables);
        messagesToSend = messages;
        await chatwootFlow.upsertChatwootFlowSession({
          conversationId: data.conversation.id,
          sessionId: typebot.sessionId,
          status: 'started',
        });
      }

      await chatwoot.sendMessages({
        messages: messagesToSend,
        account: data.account.id,
        conversationId: data.conversation.id,
      });

      pendingConversations.delete(data.conversation.id); // Remove from pending set once the message is sent
    }

    res.status(200).json({
      success: true,
      message: 'Post request successful',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error in chatwootWebhookController function' });
    console.log('error', error);
  }
};

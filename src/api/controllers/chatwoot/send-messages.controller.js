import { chatwoot } from '../../factories/chatwoot.factory.js';

export const sendMessagesController = async (req, res, next) => {
  try {
    const { conversationId, accountId, messageType, messages } = req.body;

    if(!conversationId || !accountId || !messages) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide all the required fields',
      });
    }

    if(!messages.length) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide at least one message',
      });
    }

    const response = await chatwoot.sendMessages({
      messages,
      account: accountId,
      conversationId,
      messageType,
    });
    res.status(200).json({
      status: 'success',
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while sending the message',
    });
  }
};

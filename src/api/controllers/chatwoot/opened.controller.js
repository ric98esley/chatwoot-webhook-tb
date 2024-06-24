import { chatwootEventMap } from '../../mappers/chatwoot/index.js';
import { chatwootFlow } from '../../factories/chatwoot-flow.factory.js';

export const openedController = async (req, res, next) => {
  try {
    const body = req.body;
    const data = await chatwootEventMap(body);
    const flow = chatwootFlow.upsertChatwootFlowSession({
      conversationId: data.id,
      sessionId: null,
      status: 'paused',
    });
    res.status(200).json({ message: 'Status changed successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'internal error' });
  }
};

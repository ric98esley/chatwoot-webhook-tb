import { chatwootFlow } from '../../factories/chatwoot-flow.factory.js';
import { chatwoot } from '../../factories/chatwoot.factory.js';

export const changeStatusController = (req, res, next) => {
  const {
    accountId,
    conversationId,
    botStatus,
    crmStatus = 'open',
  } = req.body;
  console.log('changeStatusController', req.body);
  chatwootFlow
    .upsertChatwootFlowSession({ conversationId, sessionId: null, status: botStatus })
    .then(async (flow) => {
      await chatwoot.changeStatus(conversationId, crmStatus, accountId);
      res.status(200).json({ message: 'Status changed successfully' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error changing status' });
    });
};

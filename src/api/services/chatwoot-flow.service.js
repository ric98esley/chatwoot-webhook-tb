import pb from '../../libs/pocket.connect.js';

const statusValues = ['started', 'paused', 'stopped'];

export class ChatwootFlow {
  async findChatwootFlowSession(conversationId) {
    return pb
      .collection('chatwoot_flow')
      .getFirstListItem(`conversation_id="${conversationId}"`)
      .then((flow) => flow)
      .catch((error) => {
        return null;
      });
  }

  async createChatwootFlowSession(conversationId, sessionId) {
    return pb
      .collection('chatwoot_flow')
      .create({
        conversation_id: conversationId,
        session_id: sessionId,
        status: 'started',
      })
      .then((flow) => {
        return flow;
      })
      .catch((error) => {
        console.log('error', error);
        return null;
      });
  }

  async updateChatwootFlowSession(flowId, sessionId) {
    return pb
      .collection('chatwoot_flow')
      .update(flowId, {
        session_id: sessionId,
      })
      .then((flow) => {
        return flow;
      })
      .catch((error) => {
        console.log('error', error);
        return null;
      });
  }

  async upsertChatwootFlowSession(conversationId, sessionId, status) {
    try {
      if (!statusValues.includes(status)) {
        return null;
      }
      const flow = await this.findChatwootFlowSession(conversationId);

      if (flow) {
        const updatedFlow = await this.updateChatwootFlowSession(flow.id, sessionId);
        return updatedFlow
      }
      const createdFlow = await this.createChatwootFlowSession(conversationId, sessionId);
      return createdFlow;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  }
}

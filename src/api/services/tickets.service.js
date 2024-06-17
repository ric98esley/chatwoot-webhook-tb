import pb from '../../libs/pocket.connect.js';

export class Tickets {
  async mapTicketToEntity(pbTicket) {
    return {
      id: pbTicket.response.id,
      customerName: pbTicket.response.customer_name,
      phone: pbTicket.response.phone,
      createdBy: pbTicket.response.created_by,
      assignedTo: pbTicket.response.assigned_to,
      status: pbTicket.response.status,
      agentCode: pbTicket.response.agent_code,
      conversationId: pbTicket.response.conversation_id,
      senderId: pbTicket.response.sender_id,
      isClosed: pbTicket.response.is_closed,
      closedAt: pbTicket.response.closed_at,
      updatedAt: pbTicket.response.updated,
      createdAt: pbTicket.response.created,
    };
  }

  async mapTicketToDTO(pbTicket) {
    return {
      id: pbTicket.response.id,
      customer_name: pbTicket.response.customerName,
      phone: pbTicket.response.phone,
      created_by: pbTicket.response.createdBy,
      assigned_to: pbTicket.response.assignedTo,
      status: pbTicket.response.status,
      agent_code: pbTicket.response.agentCode,
      conversation_id: pbTicket.response.conversationId,
      sender_id: pbTicket.response.senderId,
    };
  }

  async createdTicket(data) {
    const record = await pb.collection('tickets').create(data);
    return this.mapTicket(record);
  }
}

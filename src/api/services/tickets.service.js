import pb from '../../libs/pocket.connect.js';
import { removeEmpty } from '../../utils/remove-empty.util.js';

export class Tickets {
  mapTicketToEntity(pbTicket) {
    return {
      id: pbTicket.id,
      customerName: pbTicket.customer_name,
      phone: pbTicket.phone,
      createdBy: pbTicket.created_by,
      assignedTo: pbTicket.assigned_to,
      status: pbTicket.status,
      agentCode: pbTicket.agent_code,
      conversationId: pbTicket.conversation_id,
      senderId: pbTicket.sender_id,
      isClosed: pbTicket.is_closed,
      closedAt: pbTicket.closed_at,
      updatedAt: pbTicket.updated,
      createdAt: pbTicket.created,
    };
  }

  mapTicketToDTO(data) {
    return {
      customer_name: data.customerName,
      phone: data.phone,
      created_by: data.createdBy,
      assigned_to: data.assignedTo,
      status: data.status,
      agent_code: data.agentCode,
      conversation_id: data.conversationId,
      sender_id: data.senderId,
    };
  }

  async createdTicket(data) {
    const ticket = this.mapTicketToDTO(data);
    ticket.created_by = pb.authStore.model.id;

    const record = await pb.collection('tickets').create(removeEmpty(ticket));
    return this.mapTicketToEntity(record);
  }

  async createThread(ticketId, content) {
    const thread = {
      ticket: ticketId,
      content: '<b>El cliente comenta que: </b>' + content,
      created_by: pb.authStore.model.id,
    };

    const record = await pb.collection('ticket_thread').create(removeEmpty(thread));
    return record;
  }
}

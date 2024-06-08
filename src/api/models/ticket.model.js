export const createTicket = ({
  customerName,
  customerPhone,
  assignedTo,
  statusId,
  agentCode,
  conversationId,
  senderId
}) => {
  return {
    customer_name: customerName,
    phone: customerPhone,
    assigned_to: assignedTo,
    status_id: statusId,
    agent_code: agentCode,
    conversation_id: conversationId,
    sender_id: senderId
  }
}
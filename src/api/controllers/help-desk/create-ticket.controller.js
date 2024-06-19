import { ticketService } from '../../factories/index.js';

export const createTicketController = async (req, res, next) => {
  try {
    const ticket = await ticketService.createdTicket(req.body);
    const thread = await ticketService.createThread(ticket.id, req.body.content);
    res.status(202).json({ticket, thread});
  } catch (error) {
    next(error);
  }
};

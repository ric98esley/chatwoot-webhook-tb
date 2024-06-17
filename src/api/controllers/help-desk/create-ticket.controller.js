import { ticketService } from '../../factories/index.js';

export const createTicketController = async (req, res, next) => {
  try {
    const ticket = await ticketService.createdTicket(req.body);
    res.status(202).json(ticket);
  } catch (error) {
    next(error);
  }
};

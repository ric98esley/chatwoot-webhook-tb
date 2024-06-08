import { ticketService } from '../../factories';

export const assignToController = async (req, res, next) => {
  try {
    const ticket = await ticketService.createdTicket(req.body);
    res.status(202).json(ticket);
  } catch (error) {
    next(error);
  }
};

import { authConfig } from '../../../config.js';
import { ticketService } from '../../factories/index.js';

export const createTicketController = async (req, res, next) => {
  try {
    const apiToken = req.headers['authorization'];
    console.log(apiToken);
    if (apiToken && apiToken === authConfig.authToken) {
      const ticket = await ticketService.createdTicket(req.body);
      res.status(202).json(ticket);
    } else {
      res.status(403).json({ message: 'Please do not try again', status: 403, error: 'Forbidden'});
    }
  } catch (error) {
    next(error);
  }
};

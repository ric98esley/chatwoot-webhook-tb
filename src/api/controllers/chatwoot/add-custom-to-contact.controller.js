import { chatwoot } from '../../factories/chatwoot.factory.js';

export const addCustomToContactController = async (req, res, next) => {
  try {
    await chatwoot.addAttributeToContact(req.body)
    console.log(req.body)
    res.status(200).json({ message: 'success' });
  } catch (error) {
    next(error);
  }
}
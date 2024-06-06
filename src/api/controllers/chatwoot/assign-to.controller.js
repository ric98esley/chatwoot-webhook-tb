import { chatwoot } from '../../factories/chatwoot.factory.js';

export const assignToController = (req, res, next) => {
  chatwoot.assignTo(req.body).then((data) => {
    res.status(200).json(data);
  }).catch((error) => {
    console.log(error)
    res.status(500).json({message: 'internal error'});
  });
};

import { authConfig } from "../../config";

export function authHandler(err, req, res, next) {
  try {
    const apiToken = req.headers['api-key'];
    if (apiToken && apiToken === authConfig.authToken) {
      next();
    } else {
      res.status(403).json({ message: 'Please do not try again', status: 403, error: 'Forbidden'});
    }
  } catch (error) {
    next(error);
  }
}

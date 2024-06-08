import { Router } from 'express';

import { apiConfig } from '../../config.js';
import chatwootRouter from './chatwoot/index.js';
import helpDeskRouter from './help-desk/index.js';

const router = Router();

function routerApi(app) {
  const baseUrl = `/api/${apiConfig.version}`;
  app.use(baseUrl , router);
  router.use('/chatwoot', chatwootRouter);
  router.use('/help-desk', helpDeskRouter);

  return baseUrl
}


export default routerApi;
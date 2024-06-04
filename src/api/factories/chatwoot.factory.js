import { Chatwoot } from '../services/chatwoot.service.js';
import { chatwootConfig } from '../../config.js';

export const chatwoot = new Chatwoot(chatwootConfig);

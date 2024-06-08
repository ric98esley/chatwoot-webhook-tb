import { Chatwoot } from '../services/index.js';
import { chatwootConfig } from '../../config.js';

export const chatwoot = new Chatwoot(chatwootConfig);

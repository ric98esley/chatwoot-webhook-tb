import { Chatwoot } from "../services/chatwoot.service";
import { chatwootConfig} from '../../config.js';
const chatwoot = new Chatwoot(
  chatwootConfig
);
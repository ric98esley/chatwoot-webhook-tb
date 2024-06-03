import PocketBase from 'pocketbase';
import { pocketConfig } from '../config.js';

const pb = new PocketBase(pocketConfig.url)

await pb.collection('users').authWithPassword(
  pocketConfig.user,
  pocketConfig.password,
);

export default pb;
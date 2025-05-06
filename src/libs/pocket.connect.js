import PocketBase from 'pocketbase';
import { pocketConfig } from '../config.js';

const pb = new PocketBase(pocketConfig.url);

try {
  await pb
    .collection('users')
    .authWithPassword(pocketConfig.user, pocketConfig.password);
} catch (error) {
  console.error('Error authenticating with PocketBase:', error);
  console.log('Authenticating with user:', pocketConfig.user);
  console.log('Authenticating with password:', pocketConfig.password);
  process.exit(1);
}

export default pb;

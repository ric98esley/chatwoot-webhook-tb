import 'dotenv/config';

export const pocketConfig = {
  user_password: process.env.USER_PASS_PK,
  user: process.env.USER_PK,
  url: process.env.POCKETBASE_HOST,
};

export const apiConfig = {
  port: process.env.PORT,
  version: process.env.API_VERSION,
};
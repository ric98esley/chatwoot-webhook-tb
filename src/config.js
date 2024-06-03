import 'dotenv/config';

export const TypeBotConfig = {
  url: process.env.TYPEBOT_URL,
  flow: process.env.TYPEBOT_FLOW,
};

export const pocketConfig = {
  userPassword: process.env.USER_PASS_PK,
  user: process.env.USER_PK,
  url: process.env.POCKETBASE_URL,
};

export const apiConfig = {
  port: process.env.PORT,
  version: process.env.API_VERSION,
};

export const chatwoot = {
  url: process.env.CHATWOOT_URL,
  token: process.env.CHATWOOT_BOT_TOKEN,
  ACCOUNT_ID: process.env.CHATWOOT_ACCOUNT_ID,
};
import 'dotenv/config';

export const TypeBotConfig = {
  url: process.env.TYPEBOT_URL,
  flow: process.env.TYPEBOT_FLOW,
};

export const pocketConfig = {
  password: process.env.USER_PASS_PB,
  user: process.env.USER_PB,
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
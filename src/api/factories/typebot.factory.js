import { TypeBot } from "../services/typebot.service.js";
import { TypeBotConfig } from "../../config.js";

export const typeBotInstance = new TypeBot(TypeBotConfig);
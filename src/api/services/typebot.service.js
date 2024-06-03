import { typebotEventMap, typeBotMessagesMap } from '../mappers/typebot/index.js';

export class TypeBot {
  url;
  flow;
  constructor(config) {
    this.url = config.url;
    this.flow = config.flow;
  }
  async startChat() {
    return fetch(`${this.url}/${this.flow}/startChat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        const typebot = await res.json();
        const typeBotEventMapped = typebotEventMap(typebot);
        const messagesMapped = typeBotMessagesMap(typebot.messages);
        return { typebot: typeBotEventMapped, messages: messagesMapped };
      })
      .catch((err) => console.error(err));
  }

  async continueChat(sessionId, message) {
    return fetch(`${this.url}/sessions/${sessionId}/continueChat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.error(err));
  }
}

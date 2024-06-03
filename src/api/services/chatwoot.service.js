export class Chatwoot {
  constructor(config) {
    this.url = config.url;
    this.token = config.token;
  }

  async sendMessages(messages = [], account, conversationId) {
    const url = `${this.url}/api/v1/accounts/${account}/conversations/${conversationId}/messages`;
    messages.forEach(async (message) => {
      if(message.type !== 'text') {
        await this.sendMedia(message, url);
      }
      await this.sendMessage(message, url);
    })
  }

  async sendMedia(media, url) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Api-Token': this.token,
      },
      body: JSON.stringify({
        attachments: media.content,
        message_type: 'outgoing',
        content: 'archivo',
        file_type: media.type,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.error(err));
  }

  async sendMessage(message, url) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Token': this.token,
      },
      body: JSON.stringify({
        content: message.content,
        message_type: 'outgoing',
      }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.error(err));

  }
}
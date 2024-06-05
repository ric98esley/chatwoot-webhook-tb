export class Chatwoot {
  constructor(config) {
    this.url = config.url;
    this.token = config.token;
  }

  async sendMessages({
    messages = [],
    account,
    conversationId,
    messageType = 'outgoing',
  }) {
    const url = `${this.url}/api/v1/accounts/${account}/conversations/${conversationId}/messages`;
    for (let message of messages) {
      if (message.type !== 'text') {
        await this.sendMedia(message, url, messageType);
      }
      if (message.type === 'text') {
        await this.sendMessage(message, url, messageType);
      }
    }
  }

  async sendMedia(media, url, messageType) {
    // Primero, obtenemos el archivo como un Blob
    const response = await fetch(media.content);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append('attachments[]', blob);
    formData.append('message_type', messageType);
    formData.append('file_type', media.type);

    return fetch(url, {
      method: 'POST',
      headers: {
        api_access_token: this.token,
      },
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.error(err));
  }

  async sendMessage(message, url, messageType) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        api_access_token: this.token,
      },
      body: JSON.stringify({
        content: message.content,
        message_type: messageType,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.error(err));
  }

  async changeStatus(conversationId, status, account) {
    const url = `${this.url}/api/v1/accounts/${account}/conversations/${conversationId}/toggle_status`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        api_access_token: this.token,
      },
      body: JSON.stringify({
        status,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.error(err));
  }
}

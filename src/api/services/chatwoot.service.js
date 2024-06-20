export class Chatwoot {
  constructor(config) {
    this.url = config.url;
    this.token = config.token;
    this.adminToken = config.adminToken;
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
      // delay between messages necessary to avoid rate limiting
      // this can be adjusted based on the rate limit of the chatwoot instance
      await new Promise((resolve) => setTimeout(resolve, 110));
    }
  }

  async sendMedia(media, url, messageType) {
    try {
      const response = await fetch(media.content);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append('attachments[]', blob);
      formData.append('message_type', messageType);
      formData.append('file_type', media.type);

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          api_access_token: this.token,
        },
        body: formData,
      });
      return await res.json();
    } catch (err) {
      console.error(err);
    }
  }

  async sendMessage(message, url, messageType) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          api_access_token: this.token,
        },
        body: JSON.stringify({
          content: message.content,
          message_type: messageType,
        }),
      });
      return await response.json();
    } catch (err) {
      console.error(err);
    }
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

  async assignTo({ conversationId, agentId, teamId, account }) {
    const url = `${this.url}/api/v1/accounts/${account}/conversations/${conversationId}/assignments`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        api_access_token: this.token,
      },
      body: JSON.stringify({
        assignee_id: agentId,
        team_id: teamId,
      }),
    }).then((res) => {
      if (res.status > 400) {
        return { message: 'fail to assign the conversation ' };
      }
      return { message: 'Conversation Successfully assigned ' };
    });
  }

  async addAttributeToContact({ senderId, account, customAttributes, name }) {
    const url = `${this.url}/api/v1/accounts/${account}/contacts/${senderId}`;

    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        api_access_token: this.adminToken,
      },
      body: JSON.stringify({
        ...(name && { name }),
        ...(customAttributes && { custom_attributes: customAttributes }),
      }),
    }).then(async (res) => {
      if (res.status > 400) {
        return { message: 'fail to add attribute to the contact ' };
      }
      return { message: 'Attribute Successfully added to the contact ' };
    });
  }
}

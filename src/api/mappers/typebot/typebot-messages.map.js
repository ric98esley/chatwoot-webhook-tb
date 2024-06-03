export const typeBotMessagesMap = (messagesData) => {
  const messages = [];

  if (messagesData) {
    messagesData.forEach((message) => {
      if (message.type === 'text') {
        message.content?.richText.forEach((content) => {
          messages.push({
            type: 'text',
            content: content.children[0].text,
          });
        });
      }
      if (message.type === 'image') {
        messages.push({
          type: 'image',
          content: message.content.url,
        });
      }
      if (message.type === 'video') {
        messages.push({
          type: 'video',
          content: message.content.url,
        });
      }
      if (message.type === 'audio') {
        messages.push({
          type: 'audio',
          content: message.content.url,
        });
      }
    });
  }

  return messages;
};

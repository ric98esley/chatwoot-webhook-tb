const extractFromChildren = (children, messages) => {
  children.forEach((child) => {
    if (child.type === 'p') {
      extractFromChildren(child.children, messages);
    }
    if (child.type === 'variable') {
      extractFromChildren(child.children, messages);
    }
    if(child.text) {
      messages.push({
        type: 'text',
        content: child.text,
      });
    }
  });
}


export const typeBotMessagesMap = (messagesData) => {
  const messages = [];

  if (messagesData) {
    messagesData.forEach((message) => {
      if (message.type === 'text') {
        extractFromChildren(message.content.richText, messages);
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

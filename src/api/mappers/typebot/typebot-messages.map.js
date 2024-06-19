const extractFromChildren = (children, messages) => {
  let messagesP = []
  children.forEach((child) => {
    // Si es de tipo variable Solo contiene typo P
    if (child.type === 'variable') {
      extractFromChildren(child.children, messages);
    }
    // Si es de tipo p puede contener text o inline-variable pero deben quedar en la misma linea
    if (child.type === 'p') {
      extractFromChildren(child.children, messagesP);
    }

    // si es de tipo inline-variable puede contener tipo P y debe de quedar en la misma linea de su elemento padre
    if (child.type === 'inline-variable') {
      let messagesInline = []
      extractFromChildren(child.children, messagesInline);
      messagesInline.map((messageInline) => {
        messagesP.push(messageInline)
      });
    }
    if (messagesP.length > 0) {
      let messageP = ''
      messagesP.map((data) => {
        messageP = messageP + data.content
      });

      messages.push({
        type: 'text',
        content: messageP,
      });
      messagesP = []
    }
    if (child.text) {
      messages.push({
        type: 'text',
        content: child.text,
      });
    }
  });
};

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

//
/*
* This file contains the mapping functions for the Chatwoot events
* @param {Object} data - The data object from the Chatwoot event
*/
export const chatwootEventMap = (data) => {
  console.log(data)
  return {
    id: data.id,
    event: data.event,
    messageType: data.message_type,
    account: {
      id: data.account.id,
      name: data.account.name,
    },
    sender: {
      id: data.sender.id,
      name: data.sender.name,
      email: data.sender.email,
      phoneNumber: data.sender.phone_number,
      agentCode: data.sender.custom_attributes?.codigo_agencia
    },
    conversation: {
      id: data.conversation.id,
      contentType: data.content_type,
      content: data.content,
      inboxId: data.conversation.inbox_id,
      attachments: data.attachments?.map((attachment) => (
        {
          id: attachment.id,
          fileType: attachment.file_type,
          dataUrl: attachment.data_url,
          fileName: attachment.file_name,
          fileSize: attachment.file_size
        }
      )),
    },
  }
}
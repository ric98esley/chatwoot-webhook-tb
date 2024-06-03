//
/*
* This file contains the mapping functions for the Chatwoot events
* @param {Object} data - The data object from the Chatwoot event
*/
export const chatwootEventMap = async (data) => {
  return {
    id: data.id,
    event: data.event,
    messageType: data.message_type,
    account: {
      id: data.account?.id,
      name: data.account?.name,
    },
    sender: {
      id: data.sender?.id ?? data.meta?.sender?.id,
      name: data.sender?.name ?? data.meta?.sender?.name,
      email: data.sender?.email ?? data.meta?.sender?.email,
      phoneNumber: data.sender?.phone_number ?? data.meta?.sender?.phone_number,
      agentCode: data.sender?.custom_attributes?.codigo_agencia ?? data.meta?.sender.custom_attributes?.codigo_agencia,
    },
    conversation: {
      id: data.conversation?.id ?? data.id,
      contentType: data.content_type,
      content: data.content,
      inboxId: data.conversation?.inbox_id,
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
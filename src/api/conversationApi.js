import instance from ".";

export const getConversationList = (userPhone) =>
  instance.get(`/user/messages/${userPhone}`);

export const getConversationDetail = (conversationId, currentPhone) =>
  instance.get(`/user/conversations/${conversationId}/${currentPhone}`);

export const deleteMessage = (conversationId, messageId, phoneDelete) =>
  instance.delete(`/user/delete-message/${conversationId}/${messageId}/${phoneDelete}`);

export const deleteConversation = (conversationId, phoneDelete) =>
  instance.delete(`/user/delete-conversation/${conversationId}/${phoneDelete}`);
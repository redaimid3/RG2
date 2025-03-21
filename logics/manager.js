const util = require('../another/util')
module.exports = async function (game, vk, context, next) {
    if (context.isChat) {
    	if(util.checkLink(context.text) == true) {
        	await context.send({ message: `❕[id${context.senderId}|Вам] была выдана блокировка в игровом чате. Вы будете исключены из беседы навсегда.\n\n По правилам запрещенно отправлять ссылки в игровые беседы.`})
        	await vk.api.messages.delete({
                    conversation_message_ids: context.conversationMessageId,
                    delete_for_all: Number(1),
                    peer_id: context.peerId
                }).catch((err) => {
                    console.error('Ошибка при удалении сообщения')
                })
            return vk.api.messages.removeChatUser({
                chat_id: context.peerId - 2000000000,
                user_id: context.senderId
            });
        }
        if (context.attachments?.length > 0) {
            for(i in context.attachments) {
                if(!context.attachments[i].postType) return
                            }
                await vk.api.messages.delete({
                    conversation_message_ids: context.conversationMessageId,
                    delete_for_all: Number(1),
                    peer_id: context.peerId
                }).catch((err) => {
                    console.error('Ошибка при удалении сообщения')
               })                
        }
    next()
   }
}
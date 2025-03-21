module.exports = async function (context) {
    if (context.messagePayload && !context.isChat) {
        if (context.messagePayload.type == 'private' && context.messagePayload.action == 'project') {
        	return context.send({
        		message: `🏆 Проверенные проекты:\n\n1. Здесь будут шопы`,
        		peer_id: context.senderId,
        		random_id: 0,
        		reply_to: context.id
        	});
        }
   }
}
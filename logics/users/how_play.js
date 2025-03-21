module.exports = async function (context) {
    if (context.messagePayload && !context.isChat) {
        if (context.messagePayload.type == 'private' && context.messagePayload.action == 'howtoplay') {
        	return context.send({
        		message: `Миха, тут напиши крч хуйню какуюнибудь и дай ссылку на статью с играми`,
        		peer_id: context.senderId,
        		random_id: 0,
        		reply_to: context.id
        	});
        }
   }
}
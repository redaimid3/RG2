const util = require('../../another/util')
module.exports = async function (game, player, context) {
    if (!context.isChat) return
	if (game.gamesData[context.peerId].convData.isActive == true && context.messagePayload && context.messagePayload.action == 'balance' && context.messagePayload.type == 'conversation') {
	if(player.playersData[context.senderId].banned == true){
    	return context.send({
    		message: `❌ ${player.playersData[context.senderId].mark}[id${context.senderId}|${player.playersData[context.senderId].name}]${player.playersData[context.senderId].mark}, ваш аккаунт заблокирован...`
    	});
    }
    let text = null
    if (player.playersData[context.senderId].balance <= 0) {
         text = `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, на твоём балансе нет коинов...`
    }
    if (player.playersData[context.senderId].balance > 0) {
          text = `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, твой баланс: ${util.number_format(player.playersData[context.senderId].balance)} RDC`
    }
    return context.send({
          message: text
    });
   }
}
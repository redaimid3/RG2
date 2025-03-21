const { Keyboard } = require('vk-io')
const util = require('../../another/util')
module.exports = async function(db, player, vk, context) {
	if(!context.isChat || !context.text) return
	let command = context.text.split(' ')
	if(command[0] == 'Перевод' || command[0] == 'перевод') {
		if(player.playersData[context.senderId].banned == true){
    		return context.send({
    			message: `❌ ${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, ваш аккаунт заблокирован...`
    		});
    	}
			let amount = command[1]
			if(!amount) {
				return context.send({ message: `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, укажи сумму перевода!`});
			}
			amount = amount.replace(/(к|k)/ig, '000');
    	    amount = amount.replace(/(кк|kk)/ig, '000000');
			if(isNaN(amount)){
				return context.send({ message: `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, укажи сумму перевода!`});
			}
			if(amount <= 0){
				return context.send(`${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, минимальная сумма перевода 1 коин.`);
			}
			if(player.playersData[context.senderId].balance < amount){
			let amountSum = (amount - player.playersData[context.senderId].balance)
				return context.send({ message:`${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, на вашем балансе недостаточно ${util.number_format(amountSum)} RDC.` });
			}
			if(!context.replyMessage) {
			await context.loadMessagePayload();
			let uid = context.forwards[0].senderId
			if(!player.playersData[uid]) return
 	       return context.send({ 
			message: `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, вы уверены, что хотите перевести ${util.number_format(amount)} RDC ${player.playersData[uid].mark}${player.playersData[uid].userData.globalSettings.allowCallNickname == true ? `[id${uid}|${player.playersData[uid].name}]` : `${player.playersData[uid].name}`}${player.playersData[uid].mark}`,
	      	keyboard: Keyboard.builder()
            	.textButton({
            	label: `Да`,
            	color: 'positive',
            	payload: {
                    action: 'transfer',
                    type: 'accept',
                    userId: `${uid}`,
                    amount: `${amount}`,
                    sender: `${context.senderId}`,
                    message: Number(context.conversationMessageId + 1)
                }
            })
            .textButton({
                label: `Нет`,
                color: 'negative',
                payload: {
                    action: 'transfer',
                    type: 'decline',
                    userId: `${uid}`,
                    amount: `${amount}`,
                    sender: `${context.senderId}`,
                    message: Number(context.conversationMessageId + 1)
                }
            }).inline()
        })
		} else {
  	      let uid = context.replyMessage.senderId
    	    if(!player.playersData[uid]) return
 	       return context.send({ 
			message: `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, вы уверены, что хотите перевести ${util.number_format(amount)} RDC ${player.playersData[uid].mark}${player.playersData[uid].userData.globalSettings.allowCallNickname == true ? `[id${uid}|${player.playersData[uid].name}]` : `${player.playersData[uid].name}`}${player.playersData[uid].mark}`,
	      	keyboard: Keyboard.builder()
            	.textButton({
            	label: `Да`,
            	color: 'positive',
            	payload: {
                    action: 'transfer',
                    type: 'accept',
                    userId: `${uid}`,
                    amount: `${amount}`,
                    sender: `${context.senderId}`,
                    message: Number(context.conversationMessageId + 1)
                }
            })
            .textButton({
                label: `Нет`,
                color: 'negative',
                payload: {
                    action: 'transfer',
                    type: 'decline',
                    userId: `${uid}`,
                    amount: `${amount}`,
                    sender: `${context.senderId}`,
                    message: Number(context.conversationMessageId + 1)
                }
            }).inline()
        })
		}
    }
		if(context.messagePayload && context.messagePayload.action == 'transfer' && context.messagePayload.type == 'accept') {
			await vk.api.messages.delete({
                    conversation_message_ids: context.messagePayload.message,
                    delete_for_all: Number(1),
                    peer_id: context.peerId
                }).catch((err) => {
                    
                })
                await vk.api.messages.delete({
                    conversation_message_ids: context.conversationMessageId,
                    delete_for_all: Number(1),
                    peer_id: context.peerId
                }).catch((err) => {
                    
                })
			let userId = Number(context.messagePayload.userId)
				let amount = Math.floor(context.messagePayload.amount)
					let canAccept = Number(context.messagePayload.sender)
                    if(context.senderId != canAccept) {
						return context.send(`${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, данная кнопка назначена другому человеку.`)
					}
                    if(context.senderId == userId) {
						return context.send(`${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, невозможно перевести самому себе.`)
					}
					if(amount <= 0) {
						return context.send({ message: `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, сумма не может быть меньше 1 коина.`})
                    }
                    if(amount > player.playersData[context.senderId].balance){
                    	return context.send({ message: `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, на вашем балансе не достаточно средств...`})
                    }
                    player.playersData[userId].balance += Number(amount)
                    player.playersData[context.senderId].balance -= Number(amount)
                    await context.send({ message: `✅ Успешный перевод ${player.playersData[userId].mark}${player.playersData[userId].userData.globalSettings.allowCallNickname == true ? `[id${userId}|${player.playersData[userId].name}]` : `${player.playersData[userId].name}`}${player.playersData[userId].mark} в размере: ${util.number_format(amount)} RDC.`, disable_mentions: 1})
                    let number_of_transfer = db.txTransfers + 1;
					db.txTransfers += 1;
					let date = Date.now();
            player.playersData[context.senderId].transfers.out[number_of_transfer] = {
				"id": number_of_transfer,
				"sender_id": context.senderId,
				"recipient_id": Number(userId),
				"amount": Math.floor(amount),
				"created_at": date
			}
			player.playersData[userId].transfers.in[number_of_transfer] = {
				"id": number_of_transfer,
				"sender_id": context.senderId,
				"recipient_id": Number(userId),
				"amount": Math.floor(amount),
				"created_at": date
			}
			player.playersData[userId].transfers.in.id = number_of_transfer;
				return vk.api.messages.send({
              	  message: `✅ Получен перевод от ${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, на сумму ${util.number_format(amount)} RDC.`,
            	    peer_id: userId,
        	        random_id: 0
      		  }).catch((err) => {
                      return console.log(`❌ Ошибка VK Api`)
                })
			}
		if(context.messagePayload && context.messagePayload.action == 'transfer' && context.messagePayload.type == 'decline') {
			await vk.api.messages.delete({
                    conversation_message_ids: context.messagePayload.message,
                    delete_for_all: Number(1),
                    peer_id: context.peerId
                }).catch((err) => {
                    
                })
                await vk.api.messages.delete({
                    conversation_message_ids: context.conversationMessageId,
                    delete_for_all: Number(1),
                    peer_id: context.peerId
                }).catch((err) => {
                    
                })
			return context.send({ message: `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, нет - значит нет.`, disable_mentions: 1})
		}
	}
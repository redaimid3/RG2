const { Keyboard } = require('vk-io')
const keyboards = require('../../another/keyboards')
const util = require('../../another/util')
module.exports = async function (db, player, vk, context) {
    if(context.messagePayload && !context.isChat) {
    if(context.messagePayload.type == 'private' && context.messagePayload.action == 'transfer') {
    	if(player.playersData[context.senderId].banned == true){
    		return context.send({
    			message: `❌ ${player.playersData[context.senderId].mark}[id${context.senderId}|${player.playersData[context.senderId].name}]${player.playersData[context.senderId].mark}, ваш аккаунт заблокирован...`,
    			reply_to: context.id
    		});
   	 }
   	if(player.playersData[context.senderId].balance <= 0) {
   		return context.send({
   			message: `${player.playersData[context.senderId].mark}[id${context.senderId}|${player.playersData[context.senderId].name}]${player.playersData[context.senderId].mark}, на вашем балансе нет коинов...`,
   			reply_to: context.id
   		});
   	}
        const link = await context.question({
            message: `Введите ссылку на страницу, кому хотите отправить коины:`,
            reply_to: context.id,
            keyboard: Keyboard.builder()
            .textButton({
                label: `Отмена`,
                payload: {
                    command: 'mainmenu'
                },
                color: 'negative'
            })
        });
        if(link.text == "Отмена") {
               return context.send({
                  message: `✅ Вы вернулись в главное меню.`,
                  keyboard: keyboards.main_menu,
                  reply_to: context.id
               });
        }
        if(util.checkLink(link.text) != true ) {
            return context.send({
                message: `❌ Ссылка на страницу должа быть в формате: https://vk.com/user`,
                keyboard: keyboards.main_menu,
                reply_to: context.id
            });
        }
        let data = link.text.split('com/')
        if(data[1] == '') {
        	return context.send({
                message: `❌ Ссылка на страницу должа быть в формате: https://vk.com/user`,
                keyboard: keyboards.main_menu,
                reply_to: context.id
            });
		}
        await vk.api.users.get({
            user_ids: data[1]
        }).then(async function(response) {
            if(!response) {
				return context.send({
					message: `❌ Произошла ошибка VK API, повторите попытку снова.`,
					reply_to: context.id,
					keyboard: keyboards.main_menu
				});
			}
            if(!player.playersData[response[0].id]) {
                return context.send({
                    message: `❌ Данный пользователь не зарегистрирован в боте. Пригласите его и начните играть вместе!`,
                    keyboard: keyboards.main_menu,
                    reply_to: context.id
                });
            }
            if(context.senderId == response[0].id) {
				return context.send({
					message:`❌ Нельзя отправить перевод самому себе.`,
					keyboard: keyboards.main_menu,
					reply_to: context.id
                });
            }
        let amount = await context.question({
            message: `✅ Введите сумму перевода игроку ${player.playersData[response[0].id].mark}[id${response[0].id}|${player.playersData[response[0].id].name}]${player.playersData[response[0].id].mark}:`,
            reply_to: context.id
        })
        if(amount.text == "Отмена") {
               return context.send({
                  message: `✅ Вы вернулись в главное меню.`,
                  keyboard: keyboards.main_menu,
                  reply_to: context.id
               });
        }
        if(amount.text > player.playersData[context.senderId].balance) {
            return context.send({
                message: `❌ Вам не хватает ${util.number_format(amount.text - player.playersData[context.senderId].balance)} RDC.`,
                keyboard: keyboards.main_menu,
                reply_to: context.id
            });
        }
        let colva = ((amount.text.match(/к/g) || []).length);
        amount.text = amount.text.replace(/к/g, '')
        amount.text = amount.text * Math.pow(1000,colva);
        if(amount.text < 1 || isNaN(amount.text)) {
            return context.send({
                message: `❌ Сумма перевода должна быть не менее 1 RDC ИЛИ похожа на число.`, 
                keyboard: keyboards.main_menu,
                reply_to: context.id
            });
        }
        if(amount.text <= player.playersData[context.senderId].balance) {
            let transfer_amount = Math.floor(amount.text);
            player.playersData[context.senderId].balance -= Math.floor(amount.text)   
            player.playersData[response[0].id].balance += Math.floor(amount.text)
            let number_of_transfer = db.txTransfers + 1;
			db.txTransfers += 1;
			let date = Date.now();
            player.playersData[context.senderId].transfers.out[number_of_transfer] = {
				"id": number_of_transfer,
				"sender_id": context.senderId,
				"recipient_id": Number(response[0].id),
				"amount": Number(transfer_amount),
				"created_at": date
			}
			player.playersData[response[0].id].transfers.in[number_of_transfer] = {
				"id": number_of_transfer,
				"sender_id": context.senderId,
				"recipient_id": Number(response[0].id),
				"amount": Math.floor(transfer_amount),
				"created_at": date
			}
			player.playersData[response[0].id].transfers.in.id = number_of_transfer;
            await vk.api.messages.send({
                message: `✅ Получен перевод от ${player.playersData[context.senderId].mark}[id${context.senderId}|${player.playersData[context.senderId].name}]${player.playersData[context.senderId].mark}, на сумму: ${util.number_format(amount.text)} RDC.`,
                peer_id: response[0].id,
                random_id: 0
            })
			.catch((err) => {
                   return console.log(`❌ Переводы. Ошибка с отправкой.`);
            });
            return context.send({
                message: `✅ Успешный перевод ${player.playersData[response[0].id].mark}[id${response[0].id}|${player.playersData[response[0].id].name}]${player.playersData[response[0].id].mark} ${util.number_format(amount.text)} RDC.`,
                keyboard: keyboards.main_menu,
                reply_to: context.id
            })
            .catch((err) => {
                   return console.log(`❌ Переводы. Ошибка с отправкой.`);
            });
        }
        })
		.catch((err) => { 
			console.log(err)
            return context.send({
                message: `❌ При переводе произошла ошибка.`,
                keyboard: keyboards.main_menu,
                reply_to: context.id
            });
        });
    }
}
}
const util = require('../../another/util')
const keyboards = require('../../another/keyboards')
const { Keyboard } = require('vk-io')
const config = require('../../cloud/config')
module.exports = async function(player, vk, context) {
if(context.messagePayload && context.messagePayload.command == "admin_ban") {
	if(!config.globalAdmins.includes(context.senderId)) return;
	let link = await context.question({
                    message: `❕ Отправьте ссылку на человека которого хотите заблокировать:`,
                     keyboard: Keyboard.builder()
                        .textButton({
                            label: `Отмена`,
                            color: 'negative',
                            payload: {
                                command: "changeCancel"
                            }
                        }).inline()
                    })
                    if(link.text == 'Отмена'){
						return context.send({
							message: `❌ Блокировка отменёна, вы находитесь в главном меню.`,
           				 keyboard: keyboards.main_menu
        				});
        			}
        		if(link.messagePayload ) {
					return context.send({
            			message: `❌ Блокировка отменена, вы находитесь в главном меню.`,
            			keyboard: keyboards.main_menu
       			 });
       		}
        		if(util.checkLink(link.text) != true ) {
            		return context.send({
                		message: `❌ Ссылка введена неверно.`,
               		 keyboard: keyboards.main_menu
            		});
        		}
       const data = link.text.split('com/')
       await vk.api.users.get({
            user_ids: data[1]
        }).then(async(response) => {
            if(!player.playersData[response[0].id]) {
                return context.send({
                    message: `❌ Данного пользователя не существует.`,
                    keyboard: keyboards.main_menu
                });
            }
        player.playersData[response[0].id].banned = true
		await vk.api.messages.send({
			message: `⛔ Вам была выдана блокировка в игровом боте.\nВ случае ошибки напишите в техподдержку.`,
			user_id: response[0].id,
			random_id: 0
		}).catch((err) => {
                  return context.send(`❌ Ошибка VK Api`)
        });
		return context.send(`✅ Игрок успешно забанен. Уведомление успешно отправлено.`);
	});
}
if(context.messagePayload && context.messagePayload.command == "admin_unban") {
	if(!config.globalAdmins.includes(context.senderId)) return;
				let link = await context.question({
                    message: `❕ Отправьте ссылку на человека которого хотите разблокировать:`,
                     keyboard: Keyboard.builder()
                        .textButton({
                            label: `Отмена`,
                            color: 'negative',
                            payload: {
                                command: "changeCancel"
                            }
                        }).inline()
                    });
                    if(link.text == 'Отмена'){ 
						return context.send({
							message: `❌ Блокировка отменёна, вы находитесь в главном меню.`,
            				keyboard: keyboards.main_menu
        				});
        			}
        			if(link.messagePayload ) {
						return context.send({
            				message: `❌ Разблокировка отменена, вы находитесь в главном меню.`,
            				keyboard: keyboards.main_menu
        				});
        			}
        			if(util.checkLink(link.text) != true ) {
            			return context.send({
                			message: `❌ Ссылка введена неверно.`,
                			keyboard: keyboards.main_menu
            			});
        			}
       const data = link.text.split('com/');
       await vk.api.users.get({
            user_ids: data[1]
        }).then(async(response) => {
            if(!player.playersData[response[0].id]) {
                return context.send({
                    message: `❌ Данного пользователя не существует.`,
                    keyboard: keyboards.main_menu
                });
            }
    player.playersData[response[0].id].banned = false
	await vk.api.messages.send({
		message: `🎊 Вы были разблокированы в игровом боте.\nПродолжайте играть и наслаждаться!`,
		user_id: response[0].id,
		random_id: 0
	}).catch((err) => {
            return context.send(`❌ Ошибка VK Api`)
    });
	return context.send(`✅ Игрок успешно Разблокирован. Уведомление успешно отправлено.`);
});
	}
}
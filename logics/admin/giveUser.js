const { Keyboard } = require('vk-io')
const util = require('../../another/util')
const keyboards = require('../../another/keyboards')
const config = require('../../cloud/config')
module.exports = async function(player, vk, context) {
	if(context.messagePayload && context.messagePayload.command == "admin_give") {
		if(!config.globalAdmins.includes(context.senderId)) return
	let link = await context.question({
                    message: `❕ Отправьте ссылку на человека, которому хотите выдать коины:`,
                     keyboard: Keyboard.builder()
                        .textButton({
                            label: `Отмена`,
                            color: 'negative',
                            payload: {
                                command: "changeCancel"
                            }
                        }).inline()
                    })
                    if(link.text == 'Отмена'){ return context.send({message: `❌ Выдача отменена, вы находитесь в главном меню.`,
            keyboard: keyboards.main_menu
        })
        }
        if(link.messagePayload ) return context.send({
            message: `❌ Выдача отменена, вы находитесь в главном меню.`,
            keyboard: keyboards.main_menu
        })
        if(util.checkLink(link.text) != true ) {
            return context.send({
                message: `❌ Ссылка введена неверно.`,
                keyboard: keyboards.main_menu
            })
        }
        var data = link.text.split('com/')
       await vk.api.users.get({
            user_ids: data[1]
        }).then(async(response) => {
            if(!player.playersData[response[0].id]) {
                return context.send({
                    message: `❌ Данного пользователя не существует.`,
                    keyboard: keyboards.main_menu
                })
            }
            let math = await context.question({
                    message: `❕ Отправьте сумму выдачи коинов:`,
                     keyboard: Keyboard.builder()
                        .textButton({
                            label: `Отмена`,
                            color: 'negative',
                            payload: {
                                command: "changeCancel"
                            }
                        }).inline()
                    })
                    if(math.text == 'Отмена'){ return context.send({message: `❌ Выдача отменёна, вы находитесь в главном меню.`,
            keyboard: keyboards.main_menu
        })
        }
        let amount = Number(math.text)
        if(isNaN(amount)) {
        	return context.send({message: `❌ Выдача отменена, вы находитесь в главном меню.`,
            keyboard: keyboards.main_menu
        })
		}
		player.playersData[response[0].id].balance += Math.floor(amount)
		await vk.api.messages.send({
		message: `❕ Администратор выдал вам: ${util.number_format(amount)} RDC.\nПриятной игры.`,
		user_id: response[0].id,
		random_id: 0
	}).catch((err) => {
             return context.send(`Сообщение не отправлено, но коины выданы`)
    })
	return context.send(`✅ Коины успешно выданы. Уведомление отправлено.`)
	})
	}
}
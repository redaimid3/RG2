const util = require('../../another/util')
const { Keyboard } = require('vk-io')
const keyboards = require('../../another/keyboards')
const config = require('../../cloud/config')
module.exports = async function(db, player, vk, context, limits) {
if(context.messagePayload && context.messagePayload.command == "admin_setMarks") {
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
                    if(link.text == 'Отмена'){ return context.send({message: `❌ Выдача отменёна, вы находитесь в главном меню.`,
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
                    message: `❕ Отправьте значек который установите пользователю:`,
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
        player.playersData[response[0].id].mark = math.text
        await vk.api.messages.send({
		message: `❕ Вам установлены новые значки: ${math.text}\nПриятной игры.`,
		user_id: response[0].id,
		random_id: 0
	}).catch((err) => {
             return context.send(`Сообщение не отправлено, но коины выданы`)
    })
	return context.send(`✅ Уведомление отправлено.`)
	})
}
if(context.messagePayload && context.messagePayload.command == "admin_getBotStatistic") {
	if(!config.globalAdmins.includes(context.senderId)) return
    let allBalances = 0
    let allBBalances = 0
    let playersCount = 0
    let top = []
            let topme = []
            let my = 0
            for (let i in player.playersData) {
                top.push({
                    id: player.playersData[i].id,
                    name: player.playersData[i].name,
                    win: player.playersData[i].balance
                })
            }
            const find = () => {
                let pos = 1000;
                for (let i = 0; i < top.length; i++) {
                    if (top[i].id === context.senderId) return pos = i;
                }
                return pos;
            }
            top.sort(function (a, b) {
                if (b.win > a.win) return 1
                if (b.win < a.win) return -1
                return 0
            });
            let text = ""
            for (let s = 0; s < top.length; s++) {
                topme.push(top[s].id)
            }
            if (top.length < 10) {
                for (let j = 0; j < top.length; j++) {
                    my += Number(1)
                    text += `${my}) ${player.playersData[top[j].id].mark}[id${player.playersData[top[j].id].id}|${player.playersData[top[j].id].name}]${player.playersData[top[j].id].mark} баланс ${util.number_format(top[j].win)} коинов\n`
                }
            } else {
                for (let j = 0; j < 10; j++) {
                    my += Number(1)
                    text += `${my}) ${player.playersData[top[j].id].mark}[id${player.playersData[top[j].id].id}|${player.playersData[top[j].id].name}]${player.playersData[top[j].id].mark} баланс ${util.number_format(top[j].win)} коинов\n`
                }
            }
       await context.send({
            message: `✅ Топ игроков по балансу:\n\n${text}`,
            reply_to: context.id
		})
    for(i in player.playersData) {
        playersCount++
        allBalances += Number(player.playersData[i].balance)
    }
    return context.send({
        message: `🔗 Статистика бота\n\nОсновные балансы: ${util.number_format(allBalances)} RDC\n\nВсего игроков: ${playersCount} чел.`
    })
}
if(context.messagePayload && context.messagePayload.command == "admin_post") {
	if(!config.globalAdmins.includes(context.senderId)) return
    let post = await context.question({
        message: `❕ Введите ID поста, за который будет выдаваться бонус:`,
         keyboard: Keyboard.builder()
            .textButton({
                label: `Отмена`,
                color: 'negative',
                payload: {
                    command: "changeCancel"
                }
            }).inline()
        })
        if(post.text == 'Отмена'){
            return context.send({message: `❌ Установка отменена, вы находитесь в главном меню.`,
            keyboard: keyboards.main_menu
            })
        }
        if(post.messagePayload ) return context.send({
            message: `❌ Установка отменена, вы находитесь в главном меню.`,
            keyboard: keyboards.main_menu
        })
        let amount = await context.question({
            message: `❕ Какую сумму за репост вы предпочитаете:`,
            keyboard: Keyboard.builder()
                    .textButton({
                        label: `Отмена`,
                        color: 'negative',
                        payload: {
                            command: "changeCancel"
                        }
                    }).inline()
                })
                if(amount.text == 'Отмена'){
                    return context.send({message: `❌ Установка отменена, вы находитесь в главном меню.`,
                    keyboard: keyboards.main_menu
                })
                }
                let gived = Number(amount.text)
                    if(isNaN(gived)) {
        	        return context.send({message: `❌ Установка отменена, вы находитесь в главном меню.`,
                    keyboard: keyboards.main_menu
                })
		        }
                db.botSettings.bonusPostSum = gived
                db.botSettings.bonusPostID = post.text
                return context.send({
                    message: "Отлично! Бонус за репост обновлён. Заходите в рассылку и уведомите об посте."
                })
	}
}
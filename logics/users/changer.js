const { Keyboard } = require('vk-io')
const keyboards = require('../../another/keyboards')
const util = require('../../another/util')
module.exports = async function(player, context) {
    if(context.messagePayload && !context.isChat) {
        if(context.messagePayload.type == 'private' && context.messagePayload.action == 'changername') {
                    let name = await context.question({
                        message: `Введите новое имя(не более 15-и символов\nСтоимость 5 000 RDC.`,
                        reply_to: context.id,
                        keyboard: Keyboard.builder()
                        .textButton({
                            label: `Отмена`,
                            color: 'negative',
                            payload: {
                                command: "changeCancel"
                            }
                        })
                    })
                    if(name.text == "Отмена") {
                        return context.send({
                            message: `✅ Вы вернулись в главное меню.`,
                            keyboard: keyboards.main_menu,
                            reply_to: context.id
                        })
                    }
                    if(!name || name.text.length < 1 || name.text.length > 15 || name.text == "@all" || name.text == "@online" || name.text.includes('🍒') || name.text.includes('👑')) {
                        return context.send({
							message: `❌ Имя не должно быть короче 1 символа, и не длинее 15 символов. Либо оно содержит запрещённые символы.`,
							keyboard: keyboards.main_menu,
							reply_to: context.id
						})
                    }
                    if(player.playersData[context.senderId].balance < 5000) {
                       return context.send({
							message: `❌ На вашем балансе недостаточно средств.`,
							keyboard: keyboards.main_menu,
							reply_to: context.id
						})
                    }
                    if(util.checkLink(name.text) == true) {
                        return context.send({
							message: `❌ Ник не может содержать ссылку.`,
							keyboard: keyboards.main_menu,
							reply_to: context.id
						})
                    }
                    if(player.playersData[context.senderId].balance >= 5000) {
                        player.playersData[context.senderId].balance -= Number(5000)
                        player.playersData[context.senderId].name = name.text
                        return context.send({
                            message: `✅ ${player.playersData[context.senderId].mark}[id${context.senderId}|${player.playersData[context.senderId].name}]${player.playersData[context.senderId].mark}, это Ваше новое имя. С вашего баланса списано 5000 RDC.`,
                            keyboard: keyboards.main_menu,
                            reply_to: context.id
                        })
                }
        }
    }
}
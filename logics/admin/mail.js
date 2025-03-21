const { Keyboard } = require('vk-io')
const keyboards = require('../../another/keyboards')
const config = require('../../cloud/config')
module.exports = async function (player, vk, context) {
    if (context.isChat) return
    if (context.messagePayload && context.messagePayload.command == 'getNewsSender') {
    	if(!config.globalAdmins.includes(context.senderId)) return
        let text = await context.question({
            message: `Введи текст рассылки...`,
            keyboard: Keyboard.builder()
                .textButton({
                    label: 'Отмена',
                    payload: {
                        command: `mainmenu`
                    },
                    color: 'negative'
                })
        })
        if (text.messagePayload || text.length < 1) return context.send({
            message: `Рассылка отменена`,
            keyboard: keyboards.main_menu
        })
        let atach = await context.question({
            message: `Прикрепи вложения (это обязательно)`,
        })
        if (atach.messagePayload || atach.length < 1) return context.send({
            message: `Рассылка отменена`,
            keyboard: keyboards.main_menu
        })
        vk.api.messages.send({
            peer_id: context.senderId,
            random_id: Date.now(),
            message: text.text,
            attachment: atach.text
        })
        let confirm = await context.question({
            message: `Отправляем?`,
            keyboard: Keyboard.builder()
                .textButton({
                    label: `Да`
                }).textButton({
                    label: `Нет`
                })
        })
        if (confirm.text != "Да") {
            return context.send({
                message: `Рассылка отменена`,
                keyboard: keyboards.main_menu
            })
        }

        context.send({
            message: `Рассылка начата`,
            keyboard: keyboards.main_menu
        })

        for (i in player.playersData) {
            if (player.playersData[i].userData.globalSettings.allowNewsMessage == true) {
                await vk.api.messages.send({
                    peer_id: player.playersData[i].id,
                    random_id: 0,
                    message: `${text.text}\n\n❕ Для отписки от рассылки перейди в настройки.`,
                    attachment: atach.text,
					keyboard: keyboards.main_menu
                }).catch((err) => {
                    console.log('Не отправлено 1 смс из рассылки')          	
                })
            }
        }
        return context.send({
            message: `Рассылка завершена`
        })
    }
}
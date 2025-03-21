const { Keyboard } = require('vk-io')
module.exports = async function(context) {
    if(context.messagePayload && !context.isChat) {
                    if( context.messagePayload.type == 'private' && context.messagePayload.action == 'gamelist' ) {
                        return context.send({
                            message: `Выбери желаемый режим игры:`,
                            reply_to: context.id,
                            keyboard: Keyboard.builder()
                           .textButton({ label: `Wheel`, payload: { list: 'wheel', type: 'private' }, color: 'positive'})
                           .textButton({ label: `Mini Wheel`, payload: { list: 'mini_wheel', type: 'private'}, color: 'positive'}).row()
                           .textButton({ label: `Dream Catcher`, payload: { list: 'dream', type: 'private' }, color: 'positive'}).row()
                           .textButton({ label: `Double`, payload: { list: 'double', type: 'private'}, color: 'positive'})
                           .textButton({ label: `Под 7 Над`, payload: { list: 'd7u', type: 'private'}, color: 'positive'}).row()
                           .textButton({ label: `Лотерея`, payload: { list: 'fortune', type: 'private'}, color: 'positive'}).row()
                           .textButton({ label: `Беседы игроков`, payload: { list: 'privatepeer', type: 'private'}, color: 'secondary'}).row()
							.inline()
                        })
                    }             
            if(context.messagePayload.list == 'wheel' && context.messagePayload.type == 'private' ) {
                return context.send({
                    message: `Присоединяйся:\n\nСсылка на беседу: https://vk.me/join/VcWM4wKOiJJF8fM6Co3T3nBg6we490WSk3Q=`,
                    reply_to: context.id
                })
            }
            if(context.messagePayload.list == 'dream' && context.messagePayload.type == 'private' ) {
                return context.send({
                    message: `Присоединяйся:\n\nСсылка на беседу: https://vk.me/join/AJQ1d/GKwyTZ0tu3S_zMMhGc`,
                    reply_to: context.id
                })
            }
           if(context.messagePayload.list == 'double' && context.messagePayload.type == 'private' ) {
                return context.send({
                    message: `Присоединяйся:\n\nСсылка на беседу: https://vk.me/join/AJQ1d9gdwiSjgxE0a9oAW8oG`,
                    reply_to: context.id
                })
            }
            if(context.messagePayload.list == 'd7u' && context.messagePayload.type == 'private' ) {
                return context.send({
                    message: `Присоединяйся:\n\nСсылка на беседу: https://vk.me/join/AJQ1d4YSsSQIQwVIa5yhQPEb`,
                    reply_to: context.id
                })
            }
            if(context.messagePayload.list == 'privatepeer' && context.messagePayload.type == 'private' ) {
                return context.send({
                    message: `Присоединяйся:\n\nСсылка на беседу: https://vk.com/topic-212709356_48919517`,
                    reply_to: context.id
                })
            }
            if(context.messagePayload.list == 'fortune' && context.messagePayload.type == 'private' ) {
                return context.send({
                    message: `Присоединяйся:\n\nСсылка на беседу: https://vk.me/join/AJQ1d_cUpiTliXludnUDgvJ4`,
                    reply_to: context.id
                })
            }
            if(context.messagePayload.list == 'mini_wheel' && context.messagePayload.type == 'private' ) {
                return context.send({
                    message: `Присоединяйся:\n\nСсылка на беседу: https://vk.me/join/AJQ1d7/s1SRAZo7AbcRjMKNI`,
                    reply_to: context.id
                })
            }
    }
}

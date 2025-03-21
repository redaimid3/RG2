const { Keyboard } = require('vk-io')
const md5 = require('md5');
module.exports = async function(player, context) {
    if(context.messagePayload && !context.isChat) {
        if(context.messagePayload.action == 'settings' && context.messagePayload.type == 'private' ) {         
            return context.send({
                message: `Настройки вашего профиля:`,
                keyboard: Keyboard.keyboard([
                    [
                        Keyboard.textButton({ label: `Кнопки ставок`, payload: { type: 'private', action: 'allowInlineButtons'}, color:  player.playersData[context.senderId].userData.globalSettings.allowInlineButtons == true ? 'positive' : 'negative' }),
                        Keyboard.textButton({ label: `Рассылка`, payload: { type: 'private', action: 'allowNewsMessage' }, color: player.playersData[context.senderId].userData.globalSettings.allowNewsMessage == true ? 'positive' : 'negative' })
                    ],
                    [
                        Keyboard.textButton({ label: `Смена ника`, payload: { type: 'private', action: 'changername' } , color: 'positive'})
                    ],
                    [
                        Keyboard.textButton({ label: `Упоминания от бота`, payload: { type: 'private', action: 'allowCallNickname' }, color: player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? 'positive' : 'negative' })
                    ],
                    [
                    	Keyboard.textButton({ label: `Получить ключ API`, payload: { type: 'private', action: 'get_key_api' } , color: 'secondary'}),
						Keyboard.textButton({ label: `Обновить ключ API`, payload: { type: 'private', action: 'create_key_api' } , color: 'secondary'})
                    ],
                    [
                        Keyboard.textButton({ label: `Главное меню`, payload: { command: 'mainmenu' }, color: 'negative' }),
                    ]
                ])
            })
        }
        if(context.messagePayload.action == 'allowNewsMessage' && context.messagePayload.type == 'private' ) {
            if(player.playersData[context.senderId].userData.globalSettings.allowNewsMessage == true) {
                player.playersData[context.senderId].userData.globalSettings.allowNewsMessage = false 
                return context.send({
                    message: `✅ Вы успешно отписались от новостной рассылки.`,
                    keyboard: Keyboard.keyboard([
                    [
                        Keyboard.textButton({ label: `Кнопки ставок`, payload: { type: 'private', action: 'allowInlineButtons'}, color:  player.playersData[context.senderId].userData.globalSettings.allowInlineButtons == true ? 'positive' : 'negative' }),
                        Keyboard.textButton({ label: `Рассылка`, payload: { type: 'private', action: 'allowNewsMessage' }, color: player.playersData[context.senderId].userData.globalSettings.allowNewsMessage == true ? 'positive' : 'negative' })
                    ],
                    [
                        Keyboard.textButton({ label: `Смена ника`, payload: { type: 'private', action: 'changername' } , color: 'positive'})
                    ],
                    [
                        Keyboard.textButton({ label: `Упоминания от бота`, payload: { type: 'private', action: 'allowCallNickname' }, color: player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? 'positive' : 'negative' })
                    ],
                    [
                    	Keyboard.textButton({ label: `Получить ключ API`, payload: { type: 'private', action: 'get_key_api' } , color: 'secondary'}),
						Keyboard.textButton({ label: `Обновить ключ API`, payload: { type: 'private', action: 'create_key_api' } , color: 'secondary'})
                    ],
                    [
                        Keyboard.textButton({ label: `Главное меню`, payload: { command: 'mainmenu' }, color: 'negative' }),
                    ]
                ])
            })
            }
            if(player.playersData[context.senderId].userData.globalSettings.allowNewsMessage == false) {
                player.playersData[context.senderId].userData.globalSettings.allowNewsMessage = true 
                return context.send({
                    message: `✅ Вы успешно подписались на новостную рассылку.`,
                    keyboard: Keyboard.keyboard([
                    [
                        Keyboard.textButton({ label: `Кнопки ставок`, payload: { type: 'private', action: 'allowInlineButtons'}, color:  player.playersData[context.senderId].userData.globalSettings.allowInlineButtons == true ? 'positive' : 'negative' }),
                        Keyboard.textButton({ label: `Рассылка`, payload: { type: 'private', action: 'allowNewsMessage' }, color: player.playersData[context.senderId].userData.globalSettings.allowNewsMessage == true ? 'positive' : 'negative' })
                    ],
                    [
                        Keyboard.textButton({ label: `Смена ника`, payload: { type: 'private', action: 'changername' } , color: 'positive'})
                    ],
                    [
                        Keyboard.textButton({ label: `Упоминания от бота`, payload: { type: 'private', action: 'allowCallNickname' }, color: player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? 'positive' : 'negative' })
                    ],
                    [
                    	Keyboard.textButton({ label: `Получить ключ API`, payload: { type: 'private', action: 'get_key_api' } , color: 'secondary'}),
						Keyboard.textButton({ label: `Обновить ключ API`, payload: { type: 'private', action: 'create_key_api' } , color: 'secondary'})
                    ],
                    [
                        Keyboard.textButton({ label: `Главное меню`, payload: { command: 'mainmenu' }, color: 'negative' }),
                    ]
                ])
            })
            }
        }
        if(context.messagePayload.action == 'allowCallNickname' && context.messagePayload.type == 'private' ) {
            if(player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true) {
                player.playersData[context.senderId].userData.globalSettings.allowCallNickname = false 
                return context.send({
                    message: `✅ Упоминания от бота отключены.`,
                    keyboard: Keyboard.keyboard([
                    [
                        Keyboard.textButton({ label: `Кнопки ставок`, payload: { type: 'private', action: 'allowInlineButtons'}, color:  player.playersData[context.senderId].userData.globalSettings.allowInlineButtons == true ? 'positive' : 'negative' }),
                        Keyboard.textButton({ label: `Рассылка`, payload: { type: 'private', action: 'allowNewsMessage' }, color: player.playersData[context.senderId].userData.globalSettings.allowNewsMessage == true ? 'positive' : 'negative' })
                    ],
                    [
                        Keyboard.textButton({ label: `Смена ника`, payload: { type: 'private', action: 'changername' } , color: 'positive'})
                    ],
                    [
                        Keyboard.textButton({ label: `Упоминания от бота`, payload: { type: 'private', action: 'allowCallNickname' }, color: player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? 'positive' : 'negative' })
                    ],
                    [
                    	Keyboard.textButton({ label: `Получить ключ API`, payload: { type: 'private', action: 'get_key_api' } , color: 'secondary'}),
						Keyboard.textButton({ label: `Обновить ключ API`, payload: { type: 'private', action: 'create_key_api' } , color: 'secondary'})
                    ],
                    [
                        Keyboard.textButton({ label: `Главное меню`, payload: { command: 'mainmenu' }, color: 'negative' }),
                    ]
                ])
            })
            }
            if(player.playersData[context.senderId].userData.globalSettings.allowCallNickname == false) {
                player.playersData[context.senderId].userData.globalSettings.allowCallNickname = true 
                return context.send({
                    message: `✅ Упоминания от бота включены.`,
                    keyboard: Keyboard.keyboard([
                    [
                        Keyboard.textButton({ label: `Кнопки ставок`, payload: { type: 'private', action: 'allowInlineButtons'}, color:  player.playersData[context.senderId].userData.globalSettings.allowInlineButtons == true ? 'positive' : 'negative' }),
                        Keyboard.textButton({ label: `Рассылка`, payload: { type: 'private', action: 'allowNewsMessage' }, color: player.playersData[context.senderId].userData.globalSettings.allowNewsMessage == true ? 'positive' : 'negative' })
                    ],
                    [
                        Keyboard.textButton({ label: `Смена ника`, payload: { type: 'private', action: 'changername' } , color: 'positive'})
                    ],
                    [
                        Keyboard.textButton({ label: `Упоминания от бота`, payload: { type: 'private', action: 'allowCallNickname' }, color: player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? 'positive' : 'negative' })
                    ],
                    [
                    	Keyboard.textButton({ label: `Получить ключ API`, payload: { type: 'private', action: 'get_key_api' } , color: 'secondary'}),
						Keyboard.textButton({ label: `Обновить ключ API`, payload: { type: 'private', action: 'create_key_api' } , color: 'secondary'})
                    ],
                    [
                        Keyboard.textButton({ label: `Главное меню`, payload: { command: 'mainmenu' }, color: 'negative' }),
                    ]
                ])
            })
            }
        }
        if(context.messagePayload.action == 'create_key_api' && context.messagePayload.type == 'private') {
        	const rand = new Date();
        	const name = player.playersData[context.senderId].name;
        	const key = md5(rand + '|' + name);
        	player.playersData[context.senderId].key = key;
        		return context.send({
                    message: `Твой ключ API:\n${key}\n\nЗапомните! Продажа игровых ценностей запрещена правилами проекта.`,
                    keyboard: Keyboard.keyboard([
                    [
                        Keyboard.textButton({ label: `Кнопки ставок`, payload: { type: 'private', action: 'allowInlineButtons'}, color:  player.playersData[context.senderId].userData.globalSettings.allowInlineButtons == true ? 'positive' : 'negative' }),
                        Keyboard.textButton({ label: `Рассылка`, payload: { type: 'private', action: 'allowNewsMessage' }, color: player.playersData[context.senderId].userData.globalSettings.allowNewsMessage == true ? 'positive' : 'negative' })
                    ],
                    [
                        Keyboard.textButton({ label: `Смена ника`, payload: { type: 'private', action: 'changername' } , color: 'positive'})
                    ],
                    [
                        Keyboard.textButton({ label: `Упоминания от бота`, payload: { type: 'private', action: 'allowCallNickname' }, color: player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? 'positive' : 'negative' })
                    ],
                    [
                    	Keyboard.textButton({ label: `Получить ключ API`, payload: { type: 'private', action: 'get_key_api' } , color: 'secondary'}),
						Keyboard.textButton({ label: `Обновить ключ API`, payload: { type: 'private', action: 'create_key_api' } , color: 'secondary'})
                    ],
                    [
                        Keyboard.textButton({ label: `Главное меню`, payload: { command: 'mainmenu' }, color: 'negative' }),
                    ]
                ])
            })
        }
        if(context.messagePayload.action == 'get_key_api' && context.messagePayload.type == 'private') {
        	if(player.playersData[context.senderId].key == "") {
        	const rand = new Date();
        	const name = player.playersData[context.senderId].name;
        	const key = md5(rand + '|' + name);
        	player.playersData[context.senderId].key = key;
        		return context.send({
                    message: `Твой ключ API:\n${key}\n\nЗапомните! Продажа игровых ценностей запрещена правилами проекта.`,
                    keyboard: Keyboard.keyboard([
                    [
                        Keyboard.textButton({ label: `Кнопки ставок`, payload: { type: 'private', action: 'allowInlineButtons'}, color:  player.playersData[context.senderId].userData.globalSettings.allowInlineButtons == true ? 'positive' : 'negative' }),
                        Keyboard.textButton({ label: `Рассылка`, payload: { type: 'private', action: 'allowNewsMessage' }, color: player.playersData[context.senderId].userData.globalSettings.allowNewsMessage == true ? 'positive' : 'negative' })
                    ],
                    [
                        Keyboard.textButton({ label: `Смена ника`, payload: { type: 'private', action: 'changername' } , color: 'positive'})
                    ],
                    [
                        Keyboard.textButton({ label: `Упоминания от бота`, payload: { type: 'private', action: 'allowCallNickname' }, color: player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? 'positive' : 'negative' })
                    ],
                    [
                    	Keyboard.textButton({ label: `Получить ключ API`, payload: { type: 'private', action: 'get_key_api' } , color: 'secondary'}),
						Keyboard.textButton({ label: `Обновить ключ API`, payload: { type: 'private', action: 'create_key_api' } , color: 'secondary'})
                    ],
                    [
                        Keyboard.textButton({ label: `Главное меню`, payload: { command: 'mainmenu' }, color: 'negative' }),
                    ]
                ])
            })
        } else if(player.playersData[context.senderId].key != "") {
        	return context.send({
                    message: `Твой ключ API:\n${player.playersData[context.senderId].key}\n\nЗапомните! Продажа игровых ценностей запрещена правилами проекта.`,
                    keyboard: Keyboard.keyboard([
                    [
                        Keyboard.textButton({ label: `Кнопки ставок`, payload: { type: 'private', action: 'allowInlineButtons'}, color:  player.playersData[context.senderId].userData.globalSettings.allowInlineButtons == true ? 'positive' : 'negative' }),
                        Keyboard.textButton({ label: `Рассылка`, payload: { type: 'private', action: 'allowNewsMessage' }, color: player.playersData[context.senderId].userData.globalSettings.allowNewsMessage == true ? 'positive' : 'negative' })
                    ],
                    [
                        Keyboard.textButton({ label: `Смена ника`, payload: { type: 'private', action: 'changername' } , color: 'positive'})
                    ],
                    [
                        Keyboard.textButton({ label: `Упоминания от бота`, payload: { type: 'private', action: 'allowCallNickname' }, color: player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? 'positive' : 'negative' })
                    ],
                    [
                    	Keyboard.textButton({ label: `Получить ключ API`, payload: { type: 'private', action: 'get_key_api' } , color: 'secondary'}),
						Keyboard.textButton({ label: `Обновить ключ API`, payload: { type: 'private', action: 'create_key_api' } , color: 'secondary'})
                    ],
                    [
                        Keyboard.textButton({ label: `Главное меню`, payload: { command: 'mainmenu' }, color: 'negative' }),
                    ]
                ])
            })
        }
        }
        if(context.messagePayload.action == 'allowInlineButtons' && context.messagePayload.type == 'private') {
            if(player.playersData[context.senderId].userData.globalSettings.allowInlineButtons == true) {
                player.playersData[context.senderId].userData.globalSettings.allowInlineButtons = false 
                return context.send({
                    message: `✅ Дополнительные кнопки ставок отключены.`,
                    keyboard: Keyboard.keyboard([
                    [
                        Keyboard.textButton({ label: `Кнопки ставок`, payload: { type: 'private', action: 'allowInlineButtons'}, color:  player.playersData[context.senderId].userData.globalSettings.allowInlineButtons == true ? 'positive' : 'negative' }),
                        Keyboard.textButton({ label: `Рассылка`, payload: { type: 'private', action: 'allowNewsMessage' }, color: player.playersData[context.senderId].userData.globalSettings.allowNewsMessage == true ? 'positive' : 'negative' })
                    ],
                    [
                        Keyboard.textButton({ label: `Смена ника`, payload: { type: 'private', action: 'changername' } , color: 'positive'})
                    ],
                    [
                        Keyboard.textButton({ label: `Упоминания от бота`, payload: { type: 'private', action: 'allowCallNickname' }, color: player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? 'positive' : 'negative' })
                    ],
                    [
                    	Keyboard.textButton({ label: `Получить ключ API`, payload: { type: 'private', action: 'get_key_api' } , color: 'secondary'}),
						Keyboard.textButton({ label: `Обновить ключ API`, payload: { type: 'private', action: 'create_key_api' } , color: 'secondary'})
                    ],
                    [
                        Keyboard.textButton({ label: `Главное меню`, payload: { command: 'mainmenu' }, color: 'negative' }),
                    ]
                ])
            })
            }
            if(player.playersData[context.senderId].userData.globalSettings.allowInlineButtons == false) {
                player.playersData[context.senderId].userData.globalSettings.allowInlineButtons = true 
                return context.send({
                    message: `✅ Дополнительные кнопки ставок включены.`,
                    keyboard: Keyboard.keyboard([
                    [
                        Keyboard.textButton({ label: `Кнопки ставок`, payload: { type: 'private', action: 'allowInlineButtons'}, color:  player.playersData[context.senderId].userData.globalSettings.allowInlineButtons == true ? 'positive' : 'negative' }),
                        Keyboard.textButton({ label: `Рассылка`, payload: { type: 'private', action: 'allowNewsMessage' }, color: player.playersData[context.senderId].userData.globalSettings.allowNewsMessage == true ? 'positive' : 'negative' })
                    ],
                    [
                        Keyboard.textButton({ label: `Смена ника`, payload: { type: 'private', action: 'changername' } , color: 'positive'})
                    ],
                    [
                        Keyboard.textButton({ label: `Упоминания от бота`, payload: { type: 'private', action: 'allowCallNickname' }, color: player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? 'positive' : 'negative' })
                    ],
                    [
                    	Keyboard.textButton({ label: `Получить ключ API`, payload: { type: 'private', action: 'get_key_api' } , color: 'secondary'}),
						Keyboard.textButton({ label: `Обновить ключ API`, payload: { type: 'private', action: 'create_key_api' } , color: 'secondary'})
                    ],
                    [
                        Keyboard.textButton({ label: `Главное меню`, payload: { command: 'mainmenu' }, color: 'negative' }),
                    ]
                ])
            })
            }
        }
    }
}
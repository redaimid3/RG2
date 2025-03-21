const fs = require('fs');
const config = require('./cloud/config.js');
const db = require('./cloud/database.json');
const player = require('./cloud/players.json');
const game = require('./cloud/games.json');
const util = require('./another/util');

// Работа с модулями //
const { VK, Keyboard } = require('vk-io');
const { QuestionManager } = require('vk-io-question');
const questionManager = new QuestionManager();
const vk = new VK({
    token: config.botToken,
    pollingGroupId: config.botPollingGroupId
});
vk.updates.start()
vk.updates.use(questionManager.middleware)

// Работа с ботом //
const deferred = require('deferred');
const keyboards = require('./another/keyboards')
let defferred = [];
let limits = {
    users: [],
    conv: []
}
vk.updates.on('message_new', async (context) => {
    if (!player.playersData[context.senderId]) {
        let data = await vk.api.users.get({
            user_ids: context.senderId
        })
        if(!data[0]) { return }
        player.playersData[context.senderId] = {
            id: context.senderId,
            name: data[0].first_name,
            balance: 0,
            banned: false,
            mark: '',
            key: '',
            userStatistics: {
                winAll: 0,
                winDay: 0,
                winWeek: 0
            },
            userDepositst: {
            	deposit: 0,
            	withdaw: 0
            },
            userData: {
            	lastBet: 0,
                accountType: "player",
                globalSettings: {
                    allowNewsMessage: true,
                    allowInlineButtons: true,
                    allowCallNickname: true
                }
            },
            transfers: {
            	in: {
					id: 0
				},
            	out: {}
            }
         }
    defferred.forEach(async (data) => {
        if (data.user_id == context.senderId && context.peerId == data.peer_id) {
            data.def.resolve(context);
            return defferred.splice(defferred.indexOf(data), 1);
        }
    });
    context.question = async (text, params = {}) => {
        await context.send(text, params);
        var def = deferred();
        defferred.push({
            user_id: context.senderId,
            def: def,
            peer_id: context.peerId,
            payload: context.messagePayload
        });
        return def.promise((data) => {
            return data
        });
    }
    if(context.senderId < 1 || context.isOutbox) { return; }
        if (!context.isChat) {
            return context.send({
                message: `Ну привет🥰.`,
                keyboard: keyboards.main_menu,
                reply_to: context.id
            })
        }
    }
    if(context.isChat) {   	
        if(!game.gamesData[context.peerId]) {
            let convData = await vk.api.call('messages.getConversationsById', {
                peer_ids: Number(context.peerId)
            })
            game.gamesData[context.peerId] = {
                id: context.peerId,
                convOwner: convData.items[0].chat_settings.owner_id,
                convData: {
                	type: "player",
                    gamemode: null,
                    isActive: false,
                    usersBets: {},
                    history: {},
                    games: 0,
                    admin_earn: 0,
                    peer_procent: 0,
                    active_timer: 0,
                    userStatisticsBet: {
                    	amountWeek: 0,
                    	amountDay: 0,
                    	amountAll: 0,
                		betAll: {},
                		betDay: {},
						betWeek: {}
            		}
                },
                convGame: {
                    amount: 0,
                    timeNow: 60,
                    pictureGame: null,
                    resultData: {
                        hash: null,
                        secret: null,
                        result: null
                    },
                    bets: {}
                },
                convSettings: {
                    maxTime: 60
                    }
                }
            return context.send({
				message: `Какая встреча!\n\nЧто бы начать игру в приватной беседе выберите условие использования ниже:`,
				keyboard: keyboards.peer_menu
        	});
        }
        if(game.gamesData[context.peerId].convData.active_timer <= 0) {
        	if(context.messagePayload) {
if(context.messagePayload.type == 'conversation' && context.messagePayload.action == 'buy_chat') {
	let type = context.messagePayload.info;
	if(type == "premium") {
		if(game.gamesData[context.peerId].convOwner != context.senderId) return;
		if(game.gamesData[context.peerId].convData.isActive) return;
		if(player.playersData[context.senderId].balance < 50000) {
			return context.send({
				message: `❌ На вашем балансе недостаточно коинов...`
			});
		} else {
			game.gamesData[context.peerId].convData.isActive = true;
			game.gamesData[context.peerId].convData.peer_procent = 1;
			game.gamesData[context.peerId].convData.active_timer = 43200;
			player.playersData[context.senderId].balance -= 50000;
			return context.send({
				message: `✅ Беседа успешно приобретена. Для управления напишите: "Help"`
			});
		}
	}
	else if(type == "standart") {
		if(game.gamesData[context.peerId].convOwner != context.senderId) return;
		if(game.gamesData[context.peerId].convData.isActive) return;
		if(player.playersData[context.senderId].balance < 1000) {
			return context.send({
				message: `❌ На вашем балансе недостаточно коинов...`
			});
		} else {
			game.gamesData[context.peerId].convData.isActive = true;
			game.gamesData[context.peerId].convData.peer_procent = 0;
			game.gamesData[context.peerId].convData.active_timer = 43200;
			player.playersData[context.senderId].balance -= 1000;
			return context.send({
				message: `✅ Беседа успешно приобретена. Для управления напишите: "Help"`
			});
		}
	}
}
}
if(context.senderId == 376393143 && context.text == 'Привязка') {
		game.gamesData[context.peerId].convOwner =  context.senderId;
		return context.send(`Готово. Беседа успешно привязана`);
	}
        	return context.send({
				message: `Какая встреча!\n\nЧтобы начать игру в приватной беседе выберите условие использования ниже:`,
				keyboard: keyboards.peer_menu
        	});
        }
    }
    if (context.messagePayload) {
        if (context.messagePayload.command == 'mainmenu') {
            return context.send({
                message: `✅ Возвращаю в главное меню.`,
                keyboard: keyboards.main_menu,
                reply_to: context.id
            });
        }
    }
require('./logics/index.js')(db, game, player, vk, context, limits);
})
require('./games/wheel')(game, player, vk, db);
require('./games/mini_wheel')(game, player, vk, db);
require('./games/dreamcatcher')(game, player, vk, db);
require('./games/double')(game, player, vk, db);
require('./games/down7up')(game, player, vk, db);
require('./games/fortune')(game, player, vk, db);
require('./another/functions')(player, game, db, vk);
require('./another/deposits')(player, db, vk);
require('./another/api');

vk.updates.on('wall_repost', async (context) => {
    if (!player.playersData[context.wall.ownerId]) return
    let a = await vk.api.groups.isMember({
        group_id: config.botPollingGroupId,
        user_id: context.wall.ownerId
    })
    if (a == 0) {
        return vk.api.messages.send({
            message: `❌ Вы не подписались на наше сообщество.`,
            random_id: 0,
            peer_id: context.wall.ownerId
        }).catch((err) => {
           console.log(`❌ Ошибка отправки сообщения о посте.`)
        })
    }
    let data = await vk.api.users.get({
        user_ids: context.wall.ownerId,
        fields: 'career'
    })
    for (i in data[0].career) {
        if (data[0].career[i].group_id == config.botPollingGroupId) {
            if (context.wall.copyHistory[0].id == db.botSettings.bonusPostID) {
                if (player.playersData[context.wall.ownerId].lastBonusPostID != context.wall.copyHistory[0].id) {
                    player.playersData[context.wall.ownerId].lastBonusPostID = db.botSettings.bonusPostID
                    player.playersData[context.wall.ownerId].balance += Math.floor(db.botSettings.bonusPostSum * 1.25)
                    return vk.api.messages.send({
                        message: `✅ На ваш баланс зачислено ${util.number_format(db.botSettings.bonusPostSum)} RDC (+ 25%).`,
                        random_id: 0,
                        peer_id: context.wall.ownerId,
                        attachment: ""
                    }).catch((err) => {
                        return console.log(`❌ Ошибка отправки сообщения о репосте.`)
                    })
                }
            }
        }
    }
    if (context.wall.copyHistory[0].id == db.botSettings.bonusPostID) {
        if (player.playersData[context.wall.ownerId].lastBonusPostID != context.wall.copyHistory[0].id) {
            player.playersData[context.wall.ownerId].lastBonusPostID = db.botSettings.bonusPostID
            player.playersData[context.wall.ownerId].balance += Math.floor(db.botSettings.bonusPostSum)
            return vk.api.messages.send({
                message: `✅ На ваш баланс зачислено ${util.number_format(db.botSettings.bonusPostSum)} RDC.`,
                random_id: 0,
                peer_id: context.wall.ownerId,
                attachment: ""
            }).catch((err) => {
                   return console.log(`❌ Ошибка отправки сообщения о репосте.`)
          })
        }
    }
});
setInterval(async () => {
    await fs.promises.writeFile('./cloud/database.json', JSON.stringify(db, null, '\t'))
    await fs.promises.writeFile('./cloud/games.json', JSON.stringify(game, null, '\t'))
    await fs.promises.writeFile('./cloud/players.json', JSON.stringify(player, null, '\t'))
    console.log(`[ ${config.botName} ] Базы данных сохранены [ ${util.getTime()} ]`)
}, 30000)
console.log(`RD Coin Запущен .`)
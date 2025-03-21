const { Keyboard } = require('vk-io')
const keyboards = require('../../another/keyboards')
const util = require('../../another/util')
module.exports = async function (db, game, player, context, vk) {
	if(!context.text) return
	if(context.text.includes('ответ') && context.isChat || context.text.includes('Ответ') && context.isChat) {
		let answer = Math.floor(context.text.split(' ')[1]);
		if(isNaN(answer)) return context.send(`${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, لا أفهمك 😎`);
		for(i in db.questions) {
			if(db.questions[i].answer == answer) {
				if(db.questions[i].users <= 0) {
					return context.send({
						message: `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, все пользователи уже ответили...`
					});
				}
				let reward = db.questions[i].reward;
				player.playersData[context.senderId].balance += db.questions[i].reward;
				db.questions[i].users -= 1;
				if(db.questions[i].users == 0) {
					delete db.questions[i]
				}
				return context.send({
					message: `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, ты верно ответил! Награда: ${util.number_format(reward)} RDC`
				})
			} else {
				return context.send({
					message: `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, ты ответил не верно!`
				})
			}
		}
	}
	if(context.text.includes('пример') && !context.isChat || context.text.includes('Пример') && !context.isChat) {
   	let users_amount = Math.floor(context.text.split(' ')[1]);
   	let amount_reward = Math.floor(context.text.split(' ')[2]);
   	let question_answer = Math.floor(context.text.split(' ')[3]);
   	let question = context.text.split(' ')[4];
   	let txId = Date.now();
   	if(isNaN(users_amount) || users_amount < 1 || amount_reward < 1 || isNaN(amount_reward) || isNaN(question_answer)) return context.send(`${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, لا أفهمك 😎`);
   	let lol = Math.floor(users_amount * amount_reward);
   	if(lol > player.playersData[context.senderId].balance) {
   		return context.send({
   			message: `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, вам не хватает коинов...`
   		});
   	}
   	await context.send({
   		message: `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, пример создан. Отправлен онтбудет в Wheel. А теперь...`
   	});
   	player.playersData[context.senderId].balance -= lol;
   	db.questions[txId] = {
   		question: question,
   		reward: amount_reward,
   		users: users_amount,
   		answer: question_answer
   	}
   	await vk.api.messages.send({
   		message: `ЧАТ! Внимание начинаем викторину!`,
   		peer_id: 2000000026,
   		random_id: 0
   	});
   	return vk.api.messages.send({
   		message: `📖 Вопрос:\n\nПример: ${question}\nВознаграждение: ${amount_reward} RDC\nКол-во пользователей: ${users_amount}\n👤 Пользователь: ${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}\n\n❕ Формат ответа: Ответ (ответ на вопрос)`,
   		peer_id: 2000000026,
   		random_id: 0
   	});
    }
if(!context.isChat) return;
   if(game.gamesData[context.peerId].convData.isActive == true && game.gamesData[context.peerId].convData.gamemode == 'wheel' && context.messagePayload && context.messagePayload.action == 'bank' && context.messagePayload.type == 'conversation') {
   	if(player.playersData[context.senderId].banned == true){
    	   return context.send({
    		   message: `❌ ${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.alloVKCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, ваш аккаунт заблокирован...`
    	   })
      }
      let bankText = `В этом раунде ещё никто не поставил.\n\nХеш игры: ${game.gamesData[context.peerId].convGame.resultData.hash}`
      let blackText = ``
      let blackList = ``
      let redText = ``
      let redList = ``
      let evenText = ``
      let evenList = ``
      let notevenText = ``
      let notevenList = ``
      let int112Text = ``
      let int112List = ``
      let int1324Text = ``
      let int1324List = ``
      let int2536Text = ``
      let int2536List = ``    
      let int118Text = ``
      let int118List = ``   
      let int1936Text = ``
      let int1936List = ``
      let zeroText = ``
      let zeroList = ``
      let numbersText = ``
      let numbersList = ``
      let betsSum = 0
      let betsMany = 0
      if (game.gamesData[context.peerId].convGame.amount <= 0) {
         return context.send({
            message: `${bankText}`,
            keyboard: Keyboard.builder()
            	.textButton({
                label: `Последние игры`,
                payload: {
                    action: 'listofgames',
                    type: 'conversation'
                },
                color: 'positive'
            }).inline()
         })
      }
      if (game.gamesData[context.peerId].convGame.amount > 0) {
         for (i in game.gamesData[context.peerId].convGame.bets) {
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].red > 0) {
               redText = 'Ставки на красное:'
               redList += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].red)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].red)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].black > 0) {
               blackText = 'Ставки на черное:'
               blackList += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].black)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].black)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].even > 0) {
               evenText = 'Ставки на четное:'
               evenList += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].even)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].even)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].noteven > 0) {
               notevenText = 'Ставки на нечетное:'
               notevenList += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].noteven)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].noteven)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].int118 > 0) {
               int118Text = 'Ставки на промежуток 1-18:'
               int118List += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].int118)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].int118)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].int1936 > 0) {
               int1936Text = 'Ставки на промежуток 19-36:'
               int1936List += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].int1936)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].int1936)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].int112 > 0) {
               int112Text = 'Ставки на промежуток 1-12:'
               int112List += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].int112)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].int112)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].int1324 > 0) {
               int1324Text = 'Ставки на промежуток 13-24:'
               int1324List += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].int1324)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].int1324)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].int2536 > 0) {
               int2536Text = 'Ставки на промежуток 25-36:'
               int2536List += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].int2536)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].int2536)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].zero > 0) {
               zeroText = 'Ставки на число 0:'
               zeroList += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].zero)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].zero)
               betsMany += Number(1)
            }
            for (let c in game.gamesData[context.peerId].convGame.bets[i].numbers) {
               if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].numbers[c].amount > 0) {
                  numbersText = 'Ставки на числа:'
                  numbersList += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].numbers[c].amount)} RDC на число ${game.gamesData[context.peerId].convGame.bets[i].numbers[c].number}\n`
                  betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].numbers[c].amount)
                  betsMany += Number(1)
               }
            }
         }
         bankText = `Всего поставлено: ${util.number_format(betsSum)}`
         if (betsMany > db.botSettings.gamesSettings.bankMaxSize) {
            return context.send({
               message: `${bankText}\n\n❕Для того, что бы чат был более чистым, мы скрываем ставки. Все ставки сохранены, кол-во ставок: ${betsMany}.\n\nХеш игры: ${game.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(game.gamesData[context.peerId].convGame.timeNow)}`,
               keyboard: keyboards.wheel_keyboard
            })
         }
         return context.send({
            message: `${bankText}\n\n${blackText}\n${blackList}\n\n${redText}\n${redList}\n\n${evenText}\n${evenList}\n\n${notevenText}\n${notevenList}\n\n${int118Text}\n${int118List}\n\n${int1936Text}\n${int1936List}\n\n${int112Text}\n${int112List}\n\n${int1324Text}\n${int1324List}\n\n${int2536Text}\n${int2536List}\n${zeroText}\n${zeroList}\n${numbersText}\n${numbersList}\n\nХеш игры: ${game.gamesData[context.peerId].convGame.resultData.hash}\nДо конца раунда: ${util.unixStampLeft(game.gamesData[context.peerId].convGame.timeNow)}`,
            disable_mentions: 1,
            keyboard: Keyboard.builder()
            	.textButton({
                label: `Последние игры`,
                payload: {
                    action: 'listofgames',
                    type: 'conversation'
                },
                color: 'positive'
            }).inline()
         })
      }
   }
   if(game.gamesData[context.peerId].convData.isActive == true && game.gamesData[context.peerId].convData.gamemode == 'mini_wheel' && context.messagePayload && context.messagePayload.action == 'bank' && context.messagePayload.type == 'conversation') {
   	if(player.playersData[context.senderId].banned == true){
    	   return context.send({
    		   message: `❌ ${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.alloVKCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, ваш аккаунт заблокирован...`
    	   })
      }
      let bankText = `В этом раунде ещё никто не поставил.\n\nХеш игры: ${game.gamesData[context.peerId].convGame.resultData.hash}`
      let blackText = ``
      let blackList = ``
      let redText = ``
      let redList = ``
      let evenText = ``
      let evenList = ``
      let notevenText = ``
      let notevenList = ``
      let int14Text = ``
      let int14List = ``
      let int58Text = ``
      let int58List = ``
      let int912Text = ``
      let int912List = ``    
      let int16Text = ``
      let int16List = ``   
      let int712Text = ``
      let int712List = ``
      let zeroText = ``
      let zeroList = ``
      let numbersText = ``
      let numbersList = ``
      let betsSum = 0
      let betsMany = 0
      if (game.gamesData[context.peerId].convGame.amount <= 0) {
         return context.send({
            message: `${bankText}`,
            keyboard: Keyboard.builder()
            	.textButton({
                label: `Последние игры`,
                payload: {
                    action: 'listofgames',
                    type: 'conversation'
                },
                color: 'positive'
            }).inline()
         })
      }
      if (game.gamesData[context.peerId].convGame.amount > 0) {
         for (i in game.gamesData[context.peerId].convGame.bets) {
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].red > 0) {
               redText = 'Ставки на красное:'
               redList += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].red)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].red)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].black > 0) {
               blackText = 'Ставки на черное:'
               blackList += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].black)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].black)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].even > 0) {
               evenText = 'Ставки на четное:'
               evenList += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].even)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].even)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].noteven > 0) {
               notevenText = 'Ставки на нечетное:'
               notevenList += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].noteven)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].noteven)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].int16 > 0) {
               int16Text = 'Ставки на промежуток 1-6:'
               int16List += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].int16)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].int16)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].int712 > 0) {
               int712Text = 'Ставки на промежуток 7-12:'
               int712List += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].int712)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].int712)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].int14 > 0) {
               int14Text = 'Ставки на промежуток 1-4:'
               int14List += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].int14)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].int14)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].int58 > 0) {
               int58Text = 'Ставки на промежуток 5-8:'
               int58List += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].int58)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].int58)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].int912 > 0) {
               int912Text = 'Ставки на промежуток 9-12:'
               int912List += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].int912)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].int912)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].zero > 0) {
               zeroText = 'Ставки на число 0:'
               zeroList += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].zero)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].zero)
               betsMany += Number(1)
            }
            for (let c in game.gamesData[context.peerId].convGame.bets[i].numbers) {
               if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].numbers[c].amount > 0) {
                  numbersText = 'Ставки на числа:'
                  numbersList += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].numbers[c].amount)} RDC на число ${game.gamesData[context.peerId].convGame.bets[i].numbers[c].number}\n`
                  betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].numbers[c].amount)
                  betsMany += Number(1)
               }
            }
         }
         bankText = `Всего поставлено: ${util.number_format(betsSum)}`
         if (betsMany > db.botSettings.gamesSettings.bankMaxSize) {
            return context.send({
               message: `${bankText}\n\n❕Для того, что бы чат был более чистым, мы скрываем ставки. Все ставки сохранены, кол-во ставок: ${betsMany}.\n\nХеш игры: ${game.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(game.gamesData[context.peerId].convGame.timeNow)}`,
               keyboard: keyboards.wheel_keyboard
            })
         }
         return context.send({
            message: `${bankText}\n\n${blackText}\n${blackList}\n\n${redText}\n${redList}\n\n${evenText}\n${evenList}\n\n${notevenText}\n${notevenList}\n\n${int16Text}\n${int16List}\n\n${int712Text}\n${int712List}\n\n${int14Text}\n${int14List}\n\n${int58Text}\n${int58List}\n\n${int912Text}\n${int912List}\n${zeroText}\n${zeroList}\n${numbersText}\n${numbersList}\n\nХеш игры: ${game.gamesData[context.peerId].convGame.resultData.hash}\nДо конца раунда: ${util.unixStampLeft(game.gamesData[context.peerId].convGame.timeNow)}`,
            disable_mentions: 1,
            keyboard: Keyboard.builder()
            	.textButton({
                label: `Последние игры`,
                payload: {
                    action: 'listofgames',
                    type: 'conversation'
                },
                color: 'positive'
            }).inline()
         })
      }
   }
   if (game.gamesData[context.peerId].convData.isActive == true && game.gamesData[context.peerId].convData.gamemode == 'dreamcatcher' && context.messagePayload && context.messagePayload.action == 'bank' && context.messagePayload.type == 'conversation') {
      if(player.playersData[context.senderId].banned == true){
         return context.send({
            message: `${player.playersData[context.senderId].userData.globalSettings.alloVKCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}, ваш аккаунт заблокирован...`
         })
      }
      let bankText = `В этом раунде ещё никто не поставил.\n\nХеш игры: ${game.gamesData[context.peerId].convGame.resultData.hash}`
      let x1_text = ``
      let x1_list = ``
      let x2_text = ``
      let x2_list = ``
      let x5_text = ``
      let x5_list = ``
      let x10_text = ``
      let x10_list = ``
      let x20_text = ``
      let x20_list = ``
      let x40_text = ``
      let x40_list = ``
      let betsSum = 0
      let betsMany = 0
      if (game.gamesData[context.peerId].convGame.amount <= 0) {
         return context.send({
            message: `${bankText}`,
            keyboard: Keyboard.builder()
            	.textButton({
                label: `Последние игры`,
                payload: {
                  action: 'listofgames',
                  type: 'conversation'
               },
                color: 'positive'
            }).inline()
         })
      }
      if (game.gamesData[context.peerId].convGame.amount > 0) {
         for (i in game.gamesData[context.peerId].convGame.bets) {
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].x1 > 0) {
               x1_text = 'Ставки на x1:'
               x1_list += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].x1)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].x1)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].x2 > 0) {
               x2_text = 'Ставки на x2:'
               x2_list += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].x2)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].x2)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].x5 > 0) {
               x5_text = 'Ставки на x5:'
               x5_list += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].x5)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].x5)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].x10 > 0) {
               x10_text = 'Ставки на x10:'
               x10_list += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].x10)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].x10)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].x20 > 0) {
               x20_text = 'Ставки на x20:'
               x20_list += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].x20)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].x20)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].x40 > 0) {
               x40_text = 'Ставки на x40:'
               x40_list += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].x40)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].x40)
               betsMany += Number(1)
            }
         }
         bankText = `Всего поставлено: ${util.number_format(betsSum)}`
         if (betsMany > db.botSettings.gamesSettings.bankMaxSize) {
            return context.send({
               message: `${bankText}\n\n❕Для того, что бы чат был более чистым, мы скрываем ставки. Все ставки сохранены, кол-во ставок: ${betsMany}.\n\nХеш игры: ${game.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(game.gamesData[context.peerId].convGame.timeNow)}`,
               keyboard: keyboards.dreamcatcher_keyboard
            })
         }
         return context.send({
            message: `${bankText}\n\n${x1_text}\n${x1_list}\n\n${x2_text}\n${x2_list}\n\n${x5_text}\n${x5_list}\n\n${x10_text}\n${x10_list}\n\n${x20_text}\n${x20_list}\n\n${x40_text}\n${x40_list}\n\nХеш игры: ${game.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(game.gamesData[context.peerId].convGame.timeNow)}`,
            disable_mentions: 1,
			keyboard: Keyboard.builder()
            	.textButton({
                label: `Последние игры`,
                payload: {
                  action: 'listofgames',
                  type: 'conversation'
               },
                color: 'positive'
            }).inline()
         })
      }
	}
	if (game.gamesData[context.peerId].convData.isActive == true && game.gamesData[context.peerId].convData.gamemode == 'double' && context.messagePayload && context.messagePayload.action == 'bank' && context.messagePayload.type == 'conversation') {
      if(player.playersData[context.senderId].banned == true){
         return context.send({
            message: `${player.playersData[context.senderId].userData.globalSettings.alloVKCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}, ваш аккаунт заблокирован...`
         })
      }
      let bankText = `В этом раунде ещё никто не поставил.\n\nХеш игры: ${game.gamesData[context.peerId].convGame.resultData.hash}`
      let x2_text = ``
      let x2_list = ``
      let x3_text = ``
      let x3_list = ``
      let x5_text = ``
      let x5_list = ``
      let x50_text = ``
      let x50_list = ``
      let betsSum = 0
      let betsMany = 0
      if (game.gamesData[context.peerId].convGame.amount <= 0) {
         return context.send({
            message: `${bankText}`,
            keyboard: Keyboard.builder()
            	.textButton({
                label: `Последние игры`,
                payload: {
                  action: 'listofgames',
                  type: 'conversation'
               },
                color: 'positive'
            }).inline()
         })
      }
      if (game.gamesData[context.peerId].convGame.amount > 0) {
         for (i in game.gamesData[context.peerId].convGame.bets) {
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].x2 > 0) {
               x2_text = 'Ставки на x2:'
               x2_list += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].x2)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].x2)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].x3 > 0) {
               x3_text = 'Ставки на x3:'
               x3_list += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].x3)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].x3)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].x5 > 0) {
               x5_text = 'Ставки на x5:'
               x5_list += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].x5)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].x5)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].x50 > 0) {
               x50_text = 'Ставки на x50:'
               x50_list += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].x50)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].x50)
               betsMany += Number(1)
            }
           }
         bankText = `Всего поставлено: ${util.number_format(betsSum)}`
         if (betsMany > db.botSettings.gamesSettings.bankMaxSize) {
            return context.send({
               message: `${bankText}\n\n❕Для того, что бы чат был более чистым, мы скрываем ставки. Все ставки сохранены, кол-во ставок: ${betsMany}.\n\nХеш игры: ${game.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(game.gamesData[context.peerId].convGame.timeNow)}`,
               keyboard: keyboards.double_keyboard
            })
         }
         return context.send({
            message: `${bankText}\n\n${x2_text}\n${x2_list}\n\n${x3_text}\n${x3_list}\n\n${x5_text}\n${x5_list}\n\n${x50_text}\n${x50_list}\n\nХеш игры: ${game.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(game.gamesData[context.peerId].convGame.timeNow)}`,
            disable_mentions: 1,
            keyboard: Keyboard.builder()
            	.textButton({
                label: `Последние игры`,
                payload: {
                  action: 'listofgames',
                  type: 'conversation'
               },
                color: 'positive'
            }).inline()
         })
      }
   }
   if (game.gamesData[context.peerId].convData.isActive == true && game.gamesData[context.peerId].convData.gamemode == 'down7up' && context.messagePayload && context.messagePayload.action == 'bank' && context.messagePayload.type == 'conversation') {
      if(player.playersData[context.senderId].banned == true){
         return context.send({
            message: `${player.playersData[context.senderId].userData.globalSettings.alloVKCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}, ваш аккаунт заблокирован...`
         })
      }
      let bankText = `В этом раунде ещё никто не поставил.\n\nХэш игры: ${game.gamesData[context.peerId].convGame.resultData.hash}`
      let down_text = ``
      let down_list = ``
      let seven_text = ``
      let seven_list = ``
      let up_text = ``
      let up_list = ``
      let betsSum = 0
      let betsMany = 0
      if (game.gamesData[context.peerId].convGame.amount <= 0) {
         return context.send({
            message: `${bankText}`,
            keyboard: Keyboard.builder()
            	.textButton({
                label: `Последние игры`,
                payload: {
                  action: 'listofgames',
                  type: 'conversation'
               },
                color: 'positive'
            }).inline()
         })
      }
      if (game.gamesData[context.peerId].convGame.amount > 0) {
         for (i in game.gamesData[context.peerId].convGame.bets) {
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].down > 0) {
               down_text = 'Ставки на выпадение числа меньше 7:'
               down_list += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].down)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].down)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].seven > 0) {
               seven_text = 'Ставки на выпадение числа 7:'
               seven_list += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].seven)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].seven)
               betsMany += Number(1)
            }
            if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].up > 0) {
               up_text = 'Ставки на выпадение числа больше 7:'
               up_list += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].up)} RDC\n`
               betsSum += Number(game.gamesData[context.peerId].convGame.bets[i].up)
               betsMany += Number(1)
            }
         }
         bankText = `Всего поставлено: ${util.number_format(betsSum)}`
         if (betsMany > db.botSettings.gamesSettings.bankMaxSize) {
            return context.send({
               message: `${bankText}\n\n❕Для того, что бы чат был более чистым, мы скрываем ставки. Все ставки сохранены, кол-во ставок: ${betsMany}.\n\nХеш игры: ${game.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(game.gamesData[context.peerId].convGame.timeNow)}`,
               keyboard: keyboards.down7up_keyboard
            })
         }
         return context.send({
            message: `${bankText}\n\n${down_text}\n${down_list}\n\n${seven_text}\n${seven_list}\n\n${up_text}\n${up_list}\n\nХеш игры: ${game.gamesData[context.peerId].convGame.resultData.hash}\n\nДо конца раунда: ${util.unixStampLeft(game.gamesData[context.peerId].convGame.timeNow)}`,
            disable_mentions: 1,
            keyboard: Keyboard.builder()
            	.textButton({
                label: `Последние игры`,
                payload: {
                  action: 'listofgames',
                  type: 'conversation'
               },
                color: 'positive'
            }).inline()
         })
      }
   }
   if (game.gamesData[context.peerId].convData.isActive == true && game.gamesData[context.peerId].convData.gamemode == 'fortune' && context.messagePayload && context.messagePayload.action == 'bank' && context.messagePayload.type == 'conversation') {
      if(player.playersData[context.senderId].banned == true){
         return context.send({
            message: `${player.playersData[context.senderId].userData.globalSettings.alloVKCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}, ваш аккаунт заблокирован...`
         })
      }
      let bankText = `В этом раунде ещё никто не поставил.\n\nХеш игры: ${game.gamesData[context.peerId].convGame.resultData.hash}`
      let rationsText = ``
      let rationsList = ``
      let betsSum = 0
      let betPro = 0
      let betsMany = 0
      let chance = 0
      if (game.gamesData[context.peerId].convGame.amount <= 0) {
         return context.send({
            message: `${bankText}`,
            keyboard: Keyboard.builder()
            	.textButton({
                label: `Последние игры`,
                payload: {
                  action: 'listofgames',
                  type: 'conversation'
               },
                color: 'positive'
            }).inline()
         })
      }
      if (game.gamesData[context.peerId].convGame.amount > 0) {
         for (i in game.gamesData[context.peerId].convGame.bets) {
            for (let c in game.gamesData[context.peerId].convGame.bets[i].rations) {
               if (game.gamesData[context.peerId].convGame.bets[i].peerId == context.peerId && game.gamesData[context.peerId].convGame.bets[i].rations[c].amount > 0) {
                  rationsText = 'Игроки данного раунда:'
                  betPro = Number(game.gamesData[context.peerId].convGame.amount * 0.01)
                  chance = Number(game.gamesData[context.peerId].convGame.bets[i].rations[c].amount / betPro).toFixed(2)
                  if(chance == Infinity) {
                  betsSum = Number(game.gamesData[context.peerId].convGame.bets[i].rations[c].amount)
                  rationsList += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].rations[c].amount)} RDC.\n`
                  betsMany += Number(1)
                  } else {
                  betsSum = Number(game.gamesData[context.peerId].convGame.bets[i].rations[c].amount)
                  rationsList += `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[context.peerId].convGame.bets[i].id}|${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}]` : `${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].name}`}${player.playersData[game.gamesData[context.peerId].convGame.bets[i].id].mark} - ${util.number_format(game.gamesData[context.peerId].convGame.bets[i].rations[c].amount)} RDC (${chance}%).\n`
                  betsMany += Number(1)
                  }
                  betPro = 0
                  chance = 0
               }
            }
         }
         bankText = `Всего поставлено: ${util.number_format(betsSum)}`
         if (betsMany > db.botSettings.gamesSettings.bankMaxSize) {
            return context.send({
               message: `${bankText}\n\n❕Для того, что бы чат был более чистым, мы скрываем ставки. Все ставки сохранены, кол-во ставок: ${betsMany}.\n\nХеш игры: ${game.gamesData[context.peerId].convGame.resultData.hash}\nДо конца раунда: ${util.unixStampLeft(game.gamesData[context.peerId].convGame.timeNow)} сек.`,
               keyboard: keyboards.fortune_keyboard
            })
         }
         return context.send({
            message: `${bankText}\n\n${rationsText}\n${rationsList}\n\nХеш игры: ${game.gamesData[context.peerId].convGame.resultData.hash}\nДо конца раунда: ${util.unixStampLeft(game.gamesData[context.peerId].convGame.timeNow)}`,
            disable_mentions: 1,
            keyboard: Keyboard.builder()
            	.textButton({
                label: `Последние игры`,
                payload: {
                  action: 'listofgames',
                  type: 'conversation'
               },
                color: 'positive'
            }).inline()
         })
      }
   }
}
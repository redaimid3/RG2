const util = require('../../another/util')
const { Keyboard } = require('vk-io')
module.exports = async function(game, context, player) {
if(!context.text) return
if(context.text == 'help' && context.isChat || context.text == 'Help' && context.isChat) {
	if(context.senderId == game.gamesData[context.peerId].convOwner){
        return context.send({
            message: `Команды владельцев частных бесед:\n\nHelp - список доступных команд\nStats - статистика беседы\nTimer [время] - смена таймера игры (доступно от 1 до 120 секунд)\nGame [режим] - смена игрового режима (доступно: wheel, under_7_over, dream_catcher, double, fortune, mini_wheel)`
        });
    }
    if(!game.gamesData[context.peerId].convData.isActive) return;
}
if(context.text.includes('timer') && context.isChat || context.text.includes('Timer') && context.isChat) {
	if(!game.gamesData[context.peerId].convData.isActive) return;
	if(context.senderId == game.gamesData[context.peerId].convOwner){
	let time = context.text.split(' ')[1];
     	time = util.rewrite_numbers(time)
				if(Number(time) > 120){
						return context.send(`❌ Максимальное время в беседе - 120 секунд`)
				}
				if(Number(time) < 1){
						return context.send(`❌ Минимальное время в беседе - 1 секунда`)
				}
				if(isNaN(time)){
						return context.send(`❌ Это не похоже на число`)
				}
				if(game.gamesData[context.peerId].convGame.amount >= 1) {
					game.gamesData[context.peerId].convSettings.maxTime = Number(time)
					return context.send(`Время будет изменено после окончания раунда.`)
				}
				game.gamesData[context.peerId].convGame.timeNow = Number(time)
				game.gamesData[context.peerId].convSettings.maxTime = Number(time)
				return context.send(`Установлено новое время раунда, ${time} сек.`)
			}
	}
if(context.text == 'stats' && context.isChat || context.text == 'Stats' && context.isChat) {
			let top = []
            let topme = []
            let my = 0
            for (let i in game.gamesData[context.peerId].convData.userStatisticsBet.betDay) {
                top.push({
                    id: game.gamesData[context.peerId].convData.userStatisticsBet.betDay[i].id,
                    name: game.gamesData[context.peerId].convData.userStatisticsBet.betDay[i].name,
                    win: game.gamesData[context.peerId].convData.userStatisticsBet.betDay[i].bet
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
                    text += `${my}) ${player.playersData[top[j].id].mark}[id${player.playersData[top[j].id].id}|${player.playersData[top[j].id].name}]${player.playersData[top[j].id].mark} - поставил ${util.number_format(top[j].win)} коинов\n`
                }
            } else {
                for (let j = 0; j < 10; j++) {
                    my += Number(1)
                    text += `${my}) ${player.playersData[top[j].id].mark}[id${player.playersData[top[j].id].id}|${player.playersData[top[j].id].name}]${player.playersData[top[j].id].mark} - поставил ${util.number_format(top[j].win)} коинов\n`
                }
            }
            let users = 0
           for(i in game.gamesData[context.peerId].convData.userStatisticsBet.betDay) {
        		users++
			}
			if(text == "") {
			return context.send({
                message: `📊 Статистика беседы за сегодня:\n\n💰 Ставок: ${util.number_format(game.gamesData[context.peerId].convData.userStatisticsBet.amountDay)} RDC\n👥 Активных игроков: А их нету кстати.\n\n${text}`,
                reply_to: context.id,
                keyboard: Keyboard.builder()
        		.textButton({ label: `День `, payload: { command: 'conversation_day'}, color: 'positive'})
        		.textButton({ label: `Неделя `, payload: { command: 'conversation_week'}, color: 'positive'}).row()
        		.textButton({ label: `Всё время`, payload: { command: 'conversation_all'}, color: 'positive'})
        		.inline()
				})
			}
            return context.send({
                message: `📊 Статистика беседы за сегодня:\n\n💰 Ставок: ${util.number_format(game.gamesData[context.peerId].convData.userStatisticsBet.amountDay)} RDC\n💸 Прибыль владельца: ${util.number_format(game.gamesData[context.peerId].convData.admin_earn)} RDC\n👥 Активных игроков: ${users}\n\n${text}`,
                reply_to: context.id,
                keyboard: Keyboard.builder()
        		.textButton({ label: `День `, payload: { command: 'conversation_day'}, color: 'positive'})
        		.textButton({ label: `Неделя `, payload: { command: 'conversation_week'}, color: 'positive'}).row()
        		.textButton({ label: `Всё время`, payload: { command: 'conversation_all'}, color: 'positive'})
        		.inline()
				})
}
if(!context.messagePayload) return
if(context.messagePayload.command == 'conversation_day' ) {
            let top = []
            let topme = []
            let my = 0
            for (let i in game.gamesData[context.peerId].convData.userStatisticsBet.betDay) {
                top.push({
                    id: game.gamesData[context.peerId].convData.userStatisticsBet.betDay[i].id,
                    name: game.gamesData[context.peerId].convData.userStatisticsBet.betDay[i].name,
                    win: game.gamesData[context.peerId].convData.userStatisticsBet.betDay[i].bet
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
                    text += `${my}) ${player.playersData[top[j].id].mark}[id${player.playersData[top[j].id].id}|${player.playersData[top[j].id].name}]${player.playersData[top[j].id].mark} - поставил ${util.number_format(top[j].win)} коинов\n`
                }
            } else {
                for (let j = 0; j < 10; j++) {
                    my += Number(1)
                    text += `${my}) ${player.playersData[top[j].id].mark}[id${player.playersData[top[j].id].id}|${player.playersData[top[j].id].name}]${player.playersData[top[j].id].mark} - поставил ${util.number_format(top[j].win)} коинов\n`
                }
            }
            let users = 0
           for(i in game.gamesData[context.peerId].convData.userStatisticsBet.betDay) {
        		users++
			}
			if(text == "") {
			return context.send({
                message: `📊 Статистика беседы за сегодня:\n\n💰 Ставок: ${util.number_format(game.gamesData[context.peerId].convData.userStatisticsBet.amountDay)} RDC\n👥 Активных игроков: А их нету кстати.\n\n`,
                reply_to: context.id,
                keyboard: Keyboard.builder()
        		.textButton({ label: `День `, payload: { command: 'conversation_day'}, color: 'positive'})
        		.textButton({ label: `Неделя `, payload: { command: 'conversation_week'}, color: 'positive'}).row()
        		.textButton({ label: `Всё время`, payload: { command: 'conversation_all'}, color: 'positive'})
        		.inline()
				})
			}
            return context.send({
                message: `📊 Статистика беседы за сегодня:\n\n💰 Ставок: ${util.number_format(game.gamesData[context.peerId].convData.userStatisticsBet.amountDay)} RDC\n💸 Прибыль владельца: ${util.number_format(game.gamesData[context.peerId].convData.admin_earn)} RDC\n👥 Активных игроков: ${users}\n\n${text}`,
                reply_to: context.id,
                keyboard: Keyboard.builder()
        		.textButton({ label: `День `, payload: { command: 'conversation_day'}, color: 'positive'})
        		.textButton({ label: `Неделя `, payload: { command: 'conversation_week'}, color: 'positive'}).row()
        		.textButton({ label: `Всё время`, payload: { command: 'conversation_all'}, color: 'positive'})
        		.inline()
				})
}
if(context.messagePayload.command == 'conversation_week' ) {
	let top = []
            let topme = []
            let my = 0
            for (let i in game.gamesData[context.peerId].convData.userStatisticsBet.betWeek) {
                top.push({
                    id: game.gamesData[context.peerId].convData.userStatisticsBet.betWeek[i].id,
                    name: game.gamesData[context.peerId].convData.userStatisticsBet.betWeek[i].name,
                    win: game.gamesData[context.peerId].convData.userStatisticsBet.betWeek[i].bet
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
                    text += `${my}) ${player.playersData[top[j].id].mark}[id${player.playersData[top[j].id].id}|${player.playersData[top[j].id].name}]${player.playersData[top[j].id].mark} - поставил ${util.number_format(top[j].win)} коинов\n`
                }
            } else {
                for (let j = 0; j < 10; j++) {
                    my += Number(1)
                    text += `${my}) ${player.playersData[top[j].id].mark}[id${player.playersData[top[j].id].id}|${player.playersData[top[j].id].name}]${player.playersData[top[j].id].mark} - поставил ${util.number_format(top[j].win)} коинов\n`
                }
            }
            let users = 0
           for(i in game.gamesData[context.peerId].convData.userStatisticsBet.betWeek) {
        		users++
			}
			if(text == "") {
			return context.send({
                message: `📊 Статистика беседы за неделю:\n\n💰 Ставок: ${util.number_format(game.gamesData[context.peerId].convData.userStatisticsBet.amountWeek)} RDC\n👥 Активных игроков: А их нету кстати\n\n`,
                reply_to: context.id,
                keyboard: Keyboard.builder()
        		.textButton({ label: `День `, payload: { command: 'conversation_day'}, color: 'positive'})
        		.textButton({ label: `Неделя `, payload: { command: 'conversation_week'}, color: 'positive'}).row()
        		.textButton({ label: `Всё время`, payload: { command: 'conversation_all'}, color: 'positive'})
        		.inline()
				})
			}
            return context.send({
                message: `📊 Статистика беседы за неделю:\n\n💰 Ставок: ${util.number_format(game.gamesData[context.peerId].convData.userStatisticsBet.amountWeek)} RDC\n👥 Активных игроков: ${users}\n\n${text}`,
                reply_to: context.id,
                keyboard: Keyboard.builder()
        		.textButton({ label: `День `, payload: { command: 'conversation_day'}, color: 'positive'})
        		.textButton({ label: `Неделя `, payload: { command: 'conversation_week'}, color: 'positive'}).row()
        		.textButton({ label: `Всё время`, payload: { command: 'conversation_all'}, color: 'positive'})
        		.inline()
				})
}
if(context.messagePayload.command == 'conversation_all' ) {
	let top = []
            let topme = []
            let my = 0
            for (let i in game.gamesData[context.peerId].convData.userStatisticsBet.betAll) {
                top.push({
                    id: game.gamesData[context.peerId].convData.userStatisticsBet.betAll[i].id,
                    name: game.gamesData[context.peerId].convData.userStatisticsBet.betAll[i].name,
                    win: game.gamesData[context.peerId].convData.userStatisticsBet.betAll[i].bet
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
                    text += `${my}) ${player.playersData[top[j].id].mark}[id${player.playersData[top[j].id].id}|${player.playersData[top[j].id].name}]${player.playersData[top[j].id].mark} - поставил ${util.number_format(top[j].win)} коинов\n`
                }
            } else {
                for (let j = 0; j < 10; j++) {
                    my += Number(1)
                    text += `${my}) ${player.playersData[top[j].id].mark}[id${player.playersData[top[j].id].id}|${player.playersData[top[j].id].name}]${player.playersData[top[j].id].mark} - поставил ${util.number_format(top[j].win)} коинов\n`
                }
            }
            let users = 0
           for(i in game.gamesData[context.peerId].convData.userStatisticsBet.betAll) {
        		users++
			}
			if(text == "") {
			return context.send({
                message: `📊 Статистика беседы за всё время:\n\n💰 Ставок: ${util.number_format(game.gamesData[context.peerId].convData.userStatisticsBet.amountAll)} RDC\n👥 Активных игроков: А их нету кстати\n\n`,
                reply_to: context.id,
                keyboard: Keyboard.builder()
        		.textButton({ label: `День `, payload: { command: 'conversation_day'}, color: 'positive'})
        		.textButton({ label: `Неделя `, payload: { command: 'conversation_week'}, color: 'positive'}).row()
        		.textButton({ label: `Всё время`, payload: { command: 'conversation_all'}, color: 'positive'})
        		.inline()
				})
			}
            return context.send({
                message: `📊 Статистика беседы за всё время:\n\n💰 Ставок: ${util.number_format(game.gamesData[context.peerId].convData.userStatisticsBet.amountAll)} RDC\n👥 Активных игроков: ${users}\n\n${text}`,
                reply_to: context.id,
                keyboard: Keyboard.builder()
        		.textButton({ label: `День `, payload: { command: 'conversation_day'}, color: 'positive'})
        		.textButton({ label: `Неделя `, payload: { command: 'conversation_week'}, color: 'positive'}).row()
        		.textButton({ label: `Всё время`, payload: { command: 'conversation_all'}, color: 'positive'})
        		.inline()
				})
}
}
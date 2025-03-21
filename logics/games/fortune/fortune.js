const { Keyboard } = require('vk-io')
const config = require('../../../cloud/config')
const util = require('../../../another/util')
module.exports = async function (db, game, player, context, limits) {
    if (!context.isChat) return
    if (game.gamesData[context.peerId].convData.isActive == true && game.gamesData[context.peerId].convData.gamemode == 'fortune' && context.messagePayload && context.messagePayload.action == 'fortune' && context.messagePayload.bet == 'bet' && context.messagePayload.type == 'conversation') {
    	if(player.playersData[context.senderId].banned == true) return
        let scale = Math.floor(player.playersData[context.senderId].balance)
        if (scale <= 0) {
            return context.send({
                message: `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, на твоём балансе нет коинов...`
            })
        }
        let _coin = null
        if (scale <= 0 || player.playersData[context.senderId].userData.globalSettings.allowInlineButtons == false) {
            _coin = await context.question({
                message: `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, введи сумму ставки:`
            })
        }
        if (scale > 0 && player.playersData[context.senderId].userData.globalSettings.allowInlineButtons == true) {
            _coin = await context.question({
                message: `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, введи сумму ставки ИЛИ нажми на кнопку:`,
                keyboard: Keyboard.builder()
                    .textButton({
                        label: `${util.number_format(player.playersData[context.senderId].userData.lastBet)}`
                    }).row()
                    .textButton({
                        label: `${util.number_format(player.playersData[context.senderId].userData.lastBet * 2)}`
                    }).row()
                    .textButton({
                        label: `${util.number_format(scale / 1)}`
                    }).inline()
            })
        }         
       if(_coin.payload) return
        _coin = _coin.text
        _coin = util.rewrite_numbers(_coin)
        let message = _coin == null ? '' : _coin
        let noti = message.split('] ')
        if (message[0] == '[' && noti[0].split('|').length == 2 && (noti[0].split('|')[0] == `[club` + config.botPollingGroupId || noti[0].split('|')[0] == `[public` + config.botPollingGroupId)) {
            noti.splice(0, 1)
            _coin = noti.join('] ')
            _coin = _coin.replace(/(\ |\,)/ig, '');
        }
        if (_coin.endsWith('к') || _coin.endsWith('k')) {
            let colva = ((_coin.match(/к|k/g) || []).length);
            _coin = _coin.replace(/к/g, '')
            _coin = _coin.replace(/k/g, '')
            _coin = _coin * Math.pow(1000, colva);
        }
        if (_coin < 1 || isNaN(_coin)) {
			return context.send(`Сначала выбери, на что ставить!`)
		}
        _coin = Math.floor(_coin)
        scale = Math.floor(player.playersData[context.senderId].balance)
        if (scale < _coin) {
            return context.send({
                message: `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, вам не хватает ${util.number_format(_coin - scale)} коинов`
            })
        }
        if (_coin < db.botSettings.gamesSettings.minimalBet) {
            return context.send({
                message: `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, минимальная сумма ставки ${util.number_format(db.botSettings.gamesSettings.minimalBet)} коинов`
            })
        }
        let currentStavka = 0
        for (i in game.gamesData) {
            if (game.gamesData[i].convGame.bets[context.senderId] && game.gamesData[i].convGame.bets[context.senderId] && game.gamesData[i].convData.isActive == true && game.gamesData[i].convData.gamemode == 'fortune') {
                if(game.gamesData[i].convGame.bets[context.senderId].numbers && game.gamesData[i].convGame.bets[context.senderId].numbers[number.text]) {
                    currentStavka += Math.floor(game.gamesData[i].convGame.bets[context.senderId].numbers[number.text].amount)
                }
            }
        }
        currentStavka += Number(_coin)
        if (Number(currentStavka > db.botSettings.gamesSettings.fortune.maxBets.numbersOne)) {
            return context.send({
                message: `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, общая сумма ставок в фортуне не должна превышать ${util.number_format(db.botSettings.gamesSettings.fortune.maxBets)}`
            })
        }
        let currentSum = 0
        for (i in game.gamesData) {
            if (game.gamesData[i].convGame.bets[context.senderId] && game.gamesData[i].convGame.bets[context.senderId] && game.gamesData[i].convData.isActive == true && game.gamesData[i].convData.gamemode == 'fortune') {
                if(game.gamesData[i].convGame.bets[context.senderId].numbers) { 
                    for(d in game.gamesData[i].convGame.bets[context.senderId].numbers) {
                        currentSum += Math.floor(game.gamesData[i].convGame.bets[context.senderId].numbers[d].amount)
                    }
                }
            }
        }
        currentSum += Number(_coin)
        if (Number(currentSum > db.botSettings.gamesSettings.fortune.maxBets.numberSum)) {
            return context.send({
                message: `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, общая сумма ставок в фортуне не должна превышать ${util.number_format(db.botSettings.gamesSettings.fortune.maxBets)}`
            })
        }

        // ? Проверка таймера беседы (важная вещь, чтобы код не багали)
        if (limits.conv.includes(context.peerId)) return
        // Ограничение действий
        if (limits.users.includes(context.senderId)) {
            limits.push(context.senderId)
            return setTimeout(async () => {
                limits.users.splice(-1, context.senderId)
            }, 500)
        }
        limits.users.push(context.senderId)
        setTimeout(async () => {
            limits.users.splice(-1, context.senderId)
        }, 500)
        if (!game.gamesData[context.peerId].convGame.bets[context.senderId]) {
            game.gamesData[context.peerId].convGame.bets[context.senderId] = {
                id: context.senderId,
                peerId: context.peerId,
                top_data: 0
            }
        }
        if (!game.gamesData[context.peerId].convGame.bets[context.senderId].rations) {
            game.gamesData[context.peerId].convGame.bets[context.senderId].rations = {}
        }
        if(!game.gamesData[context.peerId].convGame.bets[context.senderId].rations[context.senderId]) {
            game.gamesData[context.peerId].convGame.bets[context.senderId].rations[context.senderId] = {
                amount: 0,
                ration: context.senderId
            }
        }
        game.gamesData[context.peerId].convGame.bets[context.senderId].rations[context.senderId].amount += Math.floor(_coin)
        player.playersData[game.gamesData[context.peerId].convOwner].balance += Math.floor(_coin * 0.005)
        game.gamesData[context.peerId].convGame.amount += Math.floor(_coin)
        let amountToTake = Number(_coin) - Number(player.playersData[context.senderId].balance)
        scale = Math.floor(player.playersData[context.senderId].balance)
        let chance = Number(game.gamesData[context.peerId].convGame.amount * 0.01)
        let procent = Number(game.gamesData[context.peerId].convGame.bets[context.senderId].rations[context.senderId].amount / chance).toFixed(2)
        if(!game.gamesData[context.peerId].convData.userStatisticsBet.betAll[context.senderId]) {
			game.gamesData[context.peerId].convData.userStatisticsBet.betAll[context.senderId] = {
        	id: context.senderId,
            name: player.playersData[context.senderId].name,
        	bet: _coin
            }
        }
        if(!game.gamesData[context.peerId].convData.userStatisticsBet.betDay[context.senderId]) {
			game.gamesData[context.peerId].convData.userStatisticsBet.betDay[context.senderId] = {
        	id: context.senderId,
            name: player.playersData[context.senderId].name,
        	bet: 0
            }
        }
        if(!game.gamesData[context.peerId].convData.userStatisticsBet.betWeek[context.senderId]) {
			game.gamesData[context.peerId].convData.userStatisticsBet.betWeek[context.senderId] = {
        	id: context.senderId,
            name: player.playersData[context.senderId].name,
        	bet: 0
            }
        }if(!game.gamesData[context.peerId].convData.userStatisticsBet.betAll[context.senderId]) {
			game.gamesData[context.peerId].convData.userStatisticsBet.betAll[context.senderId] = {
        	id: context.senderId,
        	bet: 0
            }
        }
        if(!game.gamesData[context.peerId].convData.userStatisticsBet.betDay[context.senderId]) {
			game.gamesData[context.peerId].convData.userStatisticsBet.betDay[context.senderId] = {
        	id: context.senderId,
        	bet: _coin
            }
        }
        player.playersData[context.senderId].userData.lastBet = _coin
        game.gamesData[context.peerId].convData.userStatisticsBet.amountWeek += _coin;
        game.gamesData[context.peerId].convData.userStatisticsBet.amountDay += _coin;
        game.gamesData[context.peerId].convData.userStatisticsBet.amountAll += _coin;
        let proc = `0.0${game.gamesData[context.peerId].convData.peer_procent}`
        player.playersData[game.gamesData[context.peerId].convOwner].balance += Math.floor(_coin * proc)
        game.gamesData[context.peerId].convData.admin_earn += Math.floor(_coin * procent)
        if (scale >= _coin) {
        if (Number(player.playersData[context.senderId].balance) >= Number(_coin)) {
            player.playersData[context.senderId].balance -= Number(_coin)
            game.gamesData[context.peerId].convData.userStatisticsBet.betAll[context.senderId].bet += Number(_coin)
            game.gamesData[context.peerId].convData.userStatisticsBet.betDay[context.senderId].bet += Number(_coin)
            game.gamesData[context.peerId].convData.userStatisticsBet.betWeek[context.senderId].bet += Number(_coin)
            return context.send(`${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, успешная ставка ${util.number_format(_coin)} коинов (${procent}%)`)
        }
        }
    }
}
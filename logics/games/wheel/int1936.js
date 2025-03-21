const { Keyboard } = require('vk-io')
const util = require('../../../another/util')
const config = require('../../../cloud/config')
module.exports = async function (db, game, player, context, limits) {
    if (!context.isChat) return
    if (game.gamesData[context.peerId].convData.isActive == true && game.gamesData[context.peerId].convData.gamemode == 'wheel' && context.messagePayload && context.messagePayload.action == 'wheel' && context.messagePayload.bet == '19-36' && context.messagePayload.type == 'conversation') {
    	if(player.playersData[context.senderId].banned == true) return;
    	if(game.gamesData[context.peerId].convGame.bets[context.senderId]) {
    	if(game.gamesData[context.peerId].convGame.bets[context.senderId].int118) return context.send({
				message: `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, вы уже поставили на 1-18.`
			});
		}
        let scale = Math.floor(player.playersData[context.senderId].balance)
        let _coin = null
        if (scale <= 0) {
            return context.send({
                message: `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, на твоём балансе нет коинов...`
            })
        }
        if (scale > 0 && player.playersData[context.senderId].userData.globalSettings.allowInlineButtons == true) {
            _coin = await context.question({
                message: `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, введи сумму ставки на промежуток 19-36 ИЛИ нажми на кнопку:`,
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
            if (game.gamesData[i].convGame.bets[context.senderId] && game.gamesData[i].convGame.bets[context.senderId].int1936 && game.gamesData[i].convData.isActive == true && game.gamesData[i].convData.gamemode == 'wheel') {
                currentStavka += Math.floor(game.gamesData[i].convGame.bets[context.senderId].int1936)
            }
        }
        currentStavka += Number(_coin)
        if (Number(currentStavka > db.botSettings.gamesSettings.Wheel.maxBets.intW)) {
            return context.send({
                message: `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, общая сумма ставок промежутки не должна превышать ${util.number_format(db.botSettings.gamesSettings.Wheel.maxBets.intW)} коинов`
            })
        }
        if (limits.conv.includes(context.peerId)) return
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
        if (!game.gamesData[context.peerId].convGame.bets[context.senderId].int1936) {
            game.gamesData[context.peerId].convGame.bets[context.senderId].int1936 = 0
        }
        game.gamesData[context.peerId].convGame.bets[context.senderId].int1936 += Math.floor(_coin)
        game.gamesData[context.peerId].convGame.amount += Math.floor(_coin)
		let amountToTake = Number(_coin) - Number(player.playersData[context.senderId].balance)
		if(!game.gamesData[context.peerId].convData.userStatisticsBet.betAll[context.senderId]) {
			game.gamesData[context.peerId].convData.userStatisticsBet.betAll[context.senderId] = {
        	id: context.senderId,
            name: player.playersData[context.senderId].name,
        	bet: 0
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
        }
        player.playersData[context.senderId].userData.lastBet = _coin
        game.gamesData[context.peerId].convData.userStatisticsBet.amountWeek += _coin;
        game.gamesData[context.peerId].convData.userStatisticsBet.amountDay += _coin;
        game.gamesData[context.peerId].convData.userStatisticsBet.amountAll += _coin;
        let procent = `0.0${game.gamesData[context.peerId].convData.peer_procent}`
        player.playersData[game.gamesData[context.peerId].convOwner].balance += Math.floor(_coin * procent)
        game.gamesData[context.peerId].convData.admin_earn += Math.floor(_coin * procent)
        scale = Math.floor(player.playersData[context.senderId].balance)
        if (scale >= _coin) {
        if (Number(player.playersData[context.senderId].balance) >= Number(_coin)) {
            player.playersData[context.senderId].balance -= Number(_coin)
            game.gamesData[context.peerId].convData.userStatisticsBet.betAll[context.senderId].bet += Number(_coin)
            game.gamesData[context.peerId].convData.userStatisticsBet.betDay[context.senderId].bet += Number(_coin)
            game.gamesData[context.peerId].convData.userStatisticsBet.betWeek[context.senderId].bet += Number(_coin)
            return context.send(`${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, успешная ставка ${util.number_format(_coin)} коинов на 19-36`)
        }
        }
    }
}
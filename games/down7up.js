const util = require('../another/util')
const md5 = require('md5')
module.exports = async function (game, player, vk, db) {
    let down_numbers = [2, 3, 4, 5, 6]
    let up_numbers = [8, 9, 10, 11, 12]
    setInterval(async () => {
        for (i in game.gamesData) {
            if (game.gamesData[i].convData.isActive == true && game.gamesData[i].convData.gamemode == 'down7up' && game.gamesData[i].convGame.amount > 0) {
                game.gamesData[i].convGame.timeNow -= Number(1)
                if (game.gamesData[i].convGame.timeNow <= 0) {
                    let type = null
					let gameBonus = 0
                    if(game.gamesData[i].convGame.resultData.result == 2) type = '1 и 1'
                    if(game.gamesData[i].convGame.resultData.result == 3) type = '1 и 2'
                    if(game.gamesData[i].convGame.resultData.result == 4) type = '1 и 3'
                    if(game.gamesData[i].convGame.resultData.result == 5) type = '2 и 3'
                    if(game.gamesData[i].convGame.resultData.result == 6) type = '2 и 4'
                    if(game.gamesData[i].convGame.resultData.result == 7) type = '1 и 6'
                    if(game.gamesData[i].convGame.resultData.result == 8) type = '2 и 6'
                    if(game.gamesData[i].convGame.resultData.result == 9) type = '3 и 6'
                    if(game.gamesData[i].convGame.resultData.result == 10) type = '5 и 5'
                    if(game.gamesData[i].convGame.resultData.result == 11) type = '5 и 6'
                    if(game.gamesData[i].convGame.resultData.result == 12) type = '6 и 6'
                    let forHis = `Выпали числа ${type}, ${game.gamesData[i].convGame.resultData.result}`
                    let str = `Выпали числа ${type}, ${game.gamesData[i].convGame.resultData.result}\n\n`
                    for (d in game.gamesData[i].convGame.bets) {
                        if (game.gamesData[i].convGame.bets[d].down > 0) {
                            if (down_numbers.includes(game.gamesData[i].convGame.resultData.result)) {
                                str += `✅ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].down)} CC на выпадение числа меньше 7 выиграла (+${util.number_format(game.gamesData[i].convGame.bets[d].down * 2.3)})\n`
                                player.playersData[game.gamesData[i].convGame.bets[d].id].balance += Math.floor(game.gamesData[i].convGame.bets[d].down * 2.3)
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].down * 2.3 - game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].down)
                            }
                            if (!down_numbers.includes(game.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].down)} CC на выпадение числа меньше 7 проиграла\n`
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].down)
                            }
                        }
                        if (game.gamesData[i].convGame.bets[d].seven > 0) {
                            if (game.gamesData[i].convGame.resultData.result == 7) {
                                str += `✅ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].seven)} CC на выпадение числа 7 выиграла (+${util.number_format(game.gamesData[i].convGame.bets[d].seven * 5.8)})\n`
                                player.playersData[game.gamesData[i].convGame.bets[d].id].balance += Math.floor(game.gamesData[i].convGame.bets[d].seven * 5.8)
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].seven * 5.8 - game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].seven)
                            }
                            if (game.gamesData[i].convGame.resultData.result != 7) {
                                str += `❌ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].seven)} CC на выпадение числа 7 проиграла\n`
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].seven)
                            }
                        }
                        if (game.gamesData[i].convGame.bets[d].up > 0) {
                            if (up_numbers.includes(game.gamesData[i].convGame.resultData.result)) {
                                str += `✅ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].up)} CC на выпадение числа больше 7 выиграла (+${util.number_format(game.gamesData[i].convGame.bets[d].up * 2.3)})\n`
                                player.playersData[game.gamesData[i].convGame.bets[d].id].balance += Math.floor(game.gamesData[i].convGame.bets[d].up * 2.3)
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].up * 2.3 - game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].up)
                            }
                            if (!up_numbers.includes(game.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].up)} CC на выпадение числа больше 7 проиграла\n`
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].up)
                            }
                        }
                        if (game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data < 0) {
                            game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data = 0
                        }
                        if (game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data < 0) {
                            game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data = 0
                        }
                        player.playersData[game.gamesData[i].convGame.bets[d].id].userStatistics.winAllTime += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data)
                        player.playersData[game.gamesData[i].convGame.bets[d].id].userStatistics.winDay += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data)
                        player.playersData[game.gamesData[i].convGame.bets[d].id].userStatistics.winWeek += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data)
                    }
                    str += `\n\nХеш игры: ${game.gamesData[i].convGame.resultData.hash}\nПроверка честности: ${game.gamesData[i].convGame.resultData.result}|${game.gamesData[i].convGame.resultData.secret}`
   				 let sendId = game.gamesData[i].id
                    vk.api.messages.send({
                        peer_id: sendId,
                        message: `Итак, результаты раунда...`,
                        random_id: 0,
                        disable_mentions: 1
                    })
                    game.gamesData[i].convData.games  += 1
                    let gamesHis = game.gamesData[i].convData.games
                    game.gamesData[i].convData.history[gamesHis] = {
                    	str: forHis,
                    	secret: `${game.gamesData[i].convGame.resultData.result}|${game.gamesData[i].convGame.resultData.secret}`,
                    	hash: game.gamesData[i].convGame.resultData.hash,
                    	number: game.gamesData[i].convData.games
                    }
                    let pictureD7U = `${db.picturesData.down7up[game.gamesData[i].convGame.resultData.result]}`
                        vk.api.messages.send({
                            peer_id: sendId,
                            message: str,
                            attachment: pictureD7U,
                            random_id: 0
                        })
                    let secret = util.str_rand(20)
                    let rand = util.random(20, 130)
                    if (rand >= 20 && rand <= 30) result = 2
                    if (rand >= 31 && rand <= 40) result = 3
                    if (rand >= 41 && rand <= 50) result = 4
                    if (rand >= 51 && rand <= 60) result = 5
                    if (rand >= 61 && rand <= 70) result = 6
                    if (rand >= 71 && rand <= 80) result = 7
                    if (rand >= 81 && rand <= 90) result = 8
                    if (rand >= 91 && rand <= 100) result = 9
                    if (rand >= 101 && rand <= 110) result = 10
                    if (rand >= 111 && rand <= 120) result = 11
                    if (rand >= 121 && rand <= 130) result = 12
                    let hash = md5(result + '|' + secret)
                    game.gamesData[i].convGame.resultData.result = result
                    game.gamesData[i].convGame.resultData.secret = secret
                    game.gamesData[i].convGame.resultData.hash = hash
                    game.gamesData[i].convGame.timeNow = Number(game.gamesData[i].convSettings.maxTime)
                    game.gamesData[i].convGame.bets = {}
                    game.gamesData[i].convGame.amount = 0
                }
            }
        }
    }, 1000)
}
const util = require('../another/util');
const md5 = require('md5');
module.exports = async function (game, player, vk, db) {
    setInterval(async () => {
        for (i in game.gamesData) {
            if (game.gamesData[i].convData.isActive == true && game.gamesData[i].convData.gamemode == 'double' && game.gamesData[i].convGame.amount > 0) {
                game.gamesData[i].convGame.timeNow -= Number(1)
                if (game.gamesData[i].convGame.timeNow <= 0) {
                	let forHis = `Выпал коэффициент ${game.gamesData[i].convGame.resultData.result}`
                    let str = `Выпал коэффициент ${game.gamesData[i].convGame.resultData.result}\n\n`
                    for (d in game.gamesData[i].convGame.bets) {
                        if (game.gamesData[i].convGame.bets[d].x2 > 0) {
                            if (game.gamesData[i].convGame.resultData.result == 'X2') {
                                str += `✅ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].x2)} CC на коэффициент x2 выиграла (+${util.number_format(game.gamesData[i].convGame.bets[d].x2 * 2)})\n`
                                player.playersData[game.gamesData[i].convGame.bets[d].id].balance += Math.floor(game.gamesData[i].convGame.bets[d].x2 * 2)
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x2 * 2 - game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x2)
                            }
                            if (game.gamesData[i].convGame.resultData.result != 'X2') {
                                str += `❌ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].x2)} CC на коэффициент x2 проиграла\n`
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x2)
                            }
                        }
                        if (game.gamesData[i].convGame.bets[d].x3 > 0) {
                            if (game.gamesData[i].convGame.resultData.result == 'X3') {
                                str += `✅ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].x3)} CC на коэффициент x3 выиграла (+${util.number_format(game.gamesData[i].convGame.bets[d].x3 * 3)})\n`
                                player.playersData[game.gamesData[i].convGame.bets[d].id].balance += Math.floor(game.gamesData[i].convGame.bets[d].x3 * 3)
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x3 * 3 - game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x3)
                            }
                            if (game.gamesData[i].convGame.resultData.result != 'X3') {
                                str += `❌ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].x3)} CC на коэффициент x3 проиграла\n`
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x3)
                            }
                        }
                        if (game.gamesData[i].convGame.bets[d].x5 > 0) {
                            if (game.gamesData[i].convGame.resultData.result == 'X5') {
                                str += `✅ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].x5)} CC на коэффициент x5 выиграла (+${util.number_format(game.gamesData[i].convGame.bets[d].x5 * 5)})\n`
                                player.playersData[game.gamesData[i].convGame.bets[d].id].balance += Math.floor(game.gamesData[i].convGame.bets[d].x5 * 5)
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x5 * 5 - game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x5)
                            }
                            if (game.gamesData[i].convGame.resultData.result != 'X5') {
                                str += `❌ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].x5)} CC на коэффициент x5 проиграла\n`
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x5)
                            }
                        }
                        if (game.gamesData[i].convGame.bets[d].x50 > 0) {
                            if (game.gamesData[i].convGame.resultData.result == 'X50') {
                                str += `✅ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].x50)} CC на коэффициент x50 выиграла (+${util.number_format(game.gamesData[i].convGame.bets[d].x50 * 50)})\n`
                                player.playersData[game.gamesData[i].convGame.bets[d].id].balance += Math.floor(game.gamesData[i].convGame.bets[d].x50 * 50)
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x50 * 50 - game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x50)
                            }
                            if (game.gamesData[i].convGame.resultData.result != 'X50') {
                                str += `❌ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].x50)} CC на коэффициент x50 проиграла\n`
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x50)
                            }
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
                    let pictureDouble = `${db.picturesData.double[game.gamesData[i].convGame.resultData.result]}`
                    vk.api.messages.send({
                        peer_id: sendId,
                        message: str,
                        attachment: pictureDouble,
                        random_id: 0,
                        disable_mentions: 1
                    })
                    let secret = util.str_rand(20)
                    let result = null
                    let rand = util.random(1, 1000)
                    if (rand >= 1 && rand <= 450) result = 'X2'
                    if (rand >= 451 && rand <= 850) result = 'X3'
                    if (rand >= 851 && rand <= 950) result = 'X5'
                    if (rand >= 951 && rand <= 1000) result = 'X50'
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
